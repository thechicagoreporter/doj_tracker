/**
 * Move inlined critical CSS and async loaded stylesheets to a place
 * where they can be loaded outside the HTML page's <head>.
 *
 * This is needed because we're ultimately pushing this HTML into the body
 * of a WordPress post.
 */
import { JSDOM } from 'jsdom';
import UglifyJS from 'uglify-js';
import { updateUrl } from './util';

// Deferred loading script.  This is from
// https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery
const loadDeferredScript = UglifyJS.minify(`
var loadDeferredStyles = function() {
  var addStylesNode = document.getElementById("deferred-styles");
  var replacement = document.createElement("div");
  replacement.innerHTML = addStylesNode.textContent;
  document.body.appendChild(replacement)
  addStylesNode.parentElement.removeChild(addStylesNode);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
else window.addEventListener('load', loadDeferredStyles);
`).code;

const main = function cliMain(argv) {
  const targetSel = argv._[0];
  const chunks = [];

  process.stdin.resume();
  process.stdin.on('data', chunk => chunks.push(chunk));
  process.stdin.on('end', () => {
    const html = chunks.join('');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Move all styles from the head to the container element
    const target = document.querySelector(targetSel);
    document.querySelectorAll('head style').forEach((el) => {
      target.insertBefore(el, target.firstChild);
    });

    const afterLastStyle = target.querySelector('style:last-of-type')
      .nextSibling;
    const link = document.querySelector('head link[rel="preload"]');
    const noscript = document.querySelector('head link[rel="preload"] + noscript');
    const script = document.querySelector('head link[rel="preload"] + noscript + script');
    const newScript = document.createElement('script');
    newScript.textContent = loadDeferredScript;
    noscript.setAttribute('id', 'deferred-styles');

    if (argv.staticurl) {
      const dummy = document.createElement('div');
      dummy.innerHTML = noscript.textContent;
      updateUrl(dummy.querySelector('link'), argv.staticurl, 'href');
      noscript.textContent = dummy.querySelector('link').outerHTML;
    }
    afterLastStyle.parentNode.insertBefore(noscript, afterLastStyle);
    afterLastStyle.parentNode.insertBefore(newScript, afterLastStyle);

    link.remove();
    script.remove();

    process.stdout.write(document.documentElement.innerHTML);
  });
};

export default main;
