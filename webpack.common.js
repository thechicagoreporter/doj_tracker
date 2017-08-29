require('babel-register');

const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
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

  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
};
