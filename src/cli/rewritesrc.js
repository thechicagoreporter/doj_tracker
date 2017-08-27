import { JSDOM } from 'jsdom';

const main = function cliMain(argv) {
  const chunks = [];

  process.stdin.resume();
  process.stdin.on('data', chunk => chunks.push(chunk));
  process.stdin.on('end', () => {
    const html = chunks.join();
    const dom = new JSDOM(html);

    dom.window.document.querySelectorAll('script').forEach((el) => {
      const src = el.getAttribute('src');
      if (src) {
        let staticUrl = argv._[0];
        if (staticUrl[staticUrl.length - 1] !== '/') {
          staticUrl = `${staticUrl}/`;
        }
        el.setAttribute('src', `${staticUrl}${src}`);
      }
    });

    process.stdout.write(dom.window.document.documentElement.innerHTML);
  });
};

export default main;
