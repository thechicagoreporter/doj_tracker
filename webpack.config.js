require('babel-register');

const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StaticSiteGeneratorPlugin = require(
  'static-site-generator-webpack-plugin'
);
const getLocals = require('./src/staticsite/getlocals').default;
const drive = require('./src/google-drive');

const docUrl = process.env.DOCUMENT_URL;
const tokenFilename = process.env.TOKEN_FILENAME || 'doj_tracker.json';
const tokenPath = path.join(drive.DEFAULT_TOKEN_DIR, tokenFilename);
const clientIdPath = process.env.CLIENT_ID_PATH || 'client_id.json';
const facebookAppId = process.env.FB_APP_ID;

module.exports = getLocals(docUrl, clientIdPath, tokenPath)
  .then(function(locals) {
    return {
      entry: {
        app: './src/index.js',
        staticSite: './src/staticsite/index.js'
      },

      output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // This is required by static-site-generator-webpack-plugin so that
        // the bundle can be required by Node
        libraryTarget: 'umd',
        library: "dojtracker"
      },

      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
          },
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              // creates style nodes from JS strings
              fallback: 'style-loader',
              use: [
                {
                  loader: "css-loader", // translates CSS into CommonJS
                  options: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                  }
                },
                {
                  loader: "postcss-loader",
                  options: {
                    plugins: loader => [
                      require('postcss-modules-values')
                    ]
                  }
                }
              ]
            })
          }
        ]
      },

      devtool: "cheap-eval-source-map",

      devServer: {
        contentBase: './dist'
      },

      plugins: [
        new ExtractTextPlugin("styles.css"),
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
      ],

    };
  });
