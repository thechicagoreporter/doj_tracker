require('babel-register');

var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var app = require('./lib/app').default; 
var drive = require('./lib/google-drive');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");

var docUrl = argv._[0];

fs.readFile(argv['client-secret'], function (err, content) {
  if (err) {
    process.stderr.write(`Error loading client secret file: ${err}\n`);
    return;
  }

  drive.authorize(JSON.parse(content), function (oauth2Client) {
    var compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
      publicPath: "/" // Same as `output.publicPath` in most cases.
    }));

    app.locals.oauth2Client = oauth2Client;
    app.locals.docUrl = docUrl;
    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    });
  });
});
