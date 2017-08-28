import { JSDOM } from 'jsdom';
import { updateUrl } from './util';

const main = function cliMain(argv) {
  const staticUrl = argv._[0];
  const chunks = [];

  process.stdin.resume();
  process.stdin.on('data', chunk => chunks.push(chunk));
  process.stdin.on('end', () => {
    const html = chunks.join('');
    const dom = new JSDOM(html);

    dom.window.document.querySelectorAll('script').forEach(
      el => updateUrl(el, staticUrl, 'src'),
    );

    process.stdout.write(dom.window.document.documentElement.innerHTML);
  });
};

export default main;
