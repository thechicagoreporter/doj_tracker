const renderFullPage = (ctx, preloadedState) => (`
  <!doctype html>
  <html>
      <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1">

          <link rel="stylesheet" href="styles.css">

          <title>${ctx.title}</title>

      </head>

      <body>
          <div id="tracker-container" class="tracker-container">
            <div id="tracker-container-inner" class="tracker-container-inner">${ctx.appHtml}</div>
          </div>
          <script id="tracker-bundle" src="app.bundle.js"></script>
          <script id="tracker-init">
              dojtracker.renderApp(
                document.querySelector('.tracker-container-inner'),
                ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')},
                window,
                '${ctx.shareUrl}',
                '${ctx.facebookAppId}'
              );
          </script>
      </body>
  </html>
`);

export default renderFullPage;
