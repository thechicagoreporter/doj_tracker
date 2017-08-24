import cheerio from 'cheerio';

const main = function cliMain(argv) {
  const chunks = [];

  process.stdin.resume();
  process.stdin.on('data', chunk => chunks.push(chunk));
  process.stdin.on('end', () => {
    const html = chunks.join();
    const $ = cheerio.load(html);
    $('script').each((i, el) => {
      const src = $(el).attr('src');
      if (src) {
        let staticUrl = argv._[0];
        if (staticUrl[staticUrl.length -1] !== '/') {
          staticUrl = `${staticUrl}/`;
        }
        $(el).attr('src', `${staticUrl}${src}`);
      }
    });
    process.stdout.write($('body').html());
  });
};

export default main;
