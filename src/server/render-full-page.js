const renderFullPage = (ctx, preloadedState) => (`
  <!doctype html>
  <html>
      <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1">

          <title>${ctx.title}</title>

      </head>

      <body>
          <div id="tracker-container" class="tracker-container">${ctx.appHtml}</div>
          <script id="tracker-bundle" src="bundle.js"></script>
          <script id="tracker-init">
              dojtracker.renderApp(
                document.querySelector('.tracker-container'),
                ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')},
                window
              );
          </script>
      </body>
  </html>
`);

export default renderFullPage;
