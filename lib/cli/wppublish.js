import WPAPI from 'wpapi';

const main = function cliMain(argv) {
  const chunks = [];

  process.stdin.resume();
  process.stdin.on('data', chunk => chunks.push(chunk));
  process.stdin.on('end', () => {
    const content = chunks.join();
    const username = process.env.WP_USERNAME;
    const password = process.env.WP_PASSWORD;
    const wp = new WPAPI({
      endpoint: argv._[0],
      username,
      password,
    });

    if (process.env.WP_POST_ID) {
      const postId = parseInt(process.env.WP_POST_ID, 10);
      wp.posts().id(postId).auth().update({
        title: process.env.WP_POST_TITLE,
        content,
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      wp.posts().auth().create({
        title: process.env.WP_POST_TITLE,
        content,
      }).then((response) => {
        console.log(`Post published. To update this post in the future, set the environment variable WP_POST_ID to ${response.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  });
};

export default main;
