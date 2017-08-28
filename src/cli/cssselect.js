import { JSDOM } from 'jsdom';

const main = function cliMain(argv) {
  const chunks = [];

  process.stdin.resume();
  process.stdin.on('data', chunk => chunks.push(chunk));
  process.stdin.on('end', () => {
    const html = chunks.join('');
    const dom = new JSDOM(html);
    if (argv._.length) {
      argv._.forEach((sel) => {
        dom.window.document.querySelectorAll(sel).forEach((el) => {
          process.stdout.write(el.outerHTML);
        });
      });
    } else {
      process.stdout.write(html);
    }
  });
};

export default main;
