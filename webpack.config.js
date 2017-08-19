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
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        // TODO: Extract style sheets into a dedicated file.
        test: /\.css$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
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
      }
    ]
  },

  devtool: "cheap-eval-source-map"
};
