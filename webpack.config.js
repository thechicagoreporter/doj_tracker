var path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: "dojtracker"
  },

  module: {
    rules: [
      {
        // TODO: Extract style sheets into a dedicated file.
        // See https://github.com/webpack-contrib/sass-loader#in-production
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  },

  devtool: "cheap-eval-source-map"
};
