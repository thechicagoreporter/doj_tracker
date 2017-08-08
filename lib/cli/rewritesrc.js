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
        const staticUrl = argv._[0];
        $(el).attr('src', `${staticUrl}${src}`);
      }
    });
    console.log($('body').html());
  });
};

export default main;
