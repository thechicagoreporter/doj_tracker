import cheerio from 'cheerio';

const main = function cliMain(argv) {
  const chunks = [];

  process.stdin.resume();
  process.stdin.on('data', chunk => chunks.push(chunk));
  process.stdin.on('end', () => {
    const html = chunks.join();
    const $ = cheerio.load(html);
    if (argv._.length) {
      argv._.forEach((sel) => {
        console.log($.html(sel));
      });
    } else {
      console.log(html);
    }
  });
};

export default main;
