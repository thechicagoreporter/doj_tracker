const renderFullPage = (ctx, preloadedState) => (`
  <!doctype html>
  <html>
      <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1">

          <title>${ctx.title}</title>

          <script src="bundle.js"></script>
      </head>

      <body>
          <div class="tracker-container">${ctx.appHtml}</div>
          <script>
              dojtracker.renderApp(
                document.querySelector('.tracker-container'),
                ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
              );
          </script>
      </body>
  </html>
`);

export default renderFullPage;
