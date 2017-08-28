import WPAPI from 'wpapi';

const main = function cliMain(
  input,
  output,
  endpointUrl,
  username,
  password,
  postId,
  postTitle,
) {
  const chunks = [];

  input.resume();
  input.on('data', chunk => chunks.push(chunk));
  input.on('end', () => {
    const content = chunks.join();
    const wp = new WPAPI({
      endpoint: endpointUrl,
      username,
      password,
    });

    if (process.env.WP_POST_ID) {
      const postIdInt = parseInt(postId, 10);
      wp.posts().id(postIdInt).auth().update({
        title: postTitle,
        content,
      })
      .catch((err) => {
        output.write(err);
      });
    } else {
      wp.posts().auth().create({
        title: postTitle,
        content,
      }).then((response) => {
        output.write(`Post published. To update this post in the future, set the environment variable WP_POST_ID to ${response.id}`);
      })
      .catch((err) => {
        output.write(err);
      });
    }
  });
};

export default main;
