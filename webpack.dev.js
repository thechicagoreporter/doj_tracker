require('babel-register');

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const getLocals = require('./src/staticsite/getlocals').default;
const drive = require('./src/google-drive');

const docUrl = process.env.DOCUMENT_URL;
const tokenFilename = process.env.TOKEN_FILENAME || 'doj_tracker.json';
const tokenPath = path.join(drive.DEFAULT_TOKEN_DIR, tokenFilename);
const clientIdPath = process.env.CLIENT_ID_PATH || 'client_id.json';
const facebookAppId = process.env.FB_APP_ID;

const StaticSiteGeneratorPlugin = require(
  'static-site-generator-webpack-plugin'
);

module.exports = getLocals(docUrl, clientIdPath, tokenPath)
  .then(function(locals) {
    return merge(common, {
      devtool: "cheap-eval-source-map",

      devServer: {
        contentBase: './dist'
      },

      plugins: [
        new StaticSiteGeneratorPlugin({
          entry: 'staticSite',
          locals: Object.assign({}, locals, {
            facebookAppId: facebookAppId
          }),
          paths: ['/'],
          globals: {
            window: {},
            document: {
              createElement: function() {},
            },
          }
        })
      ] 
    });
  });
