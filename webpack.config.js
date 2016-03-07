var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname + "/src",
  entry: "./jsx/main.jsx",
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'js/app.js',
    publicPath: "/"
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ["src/jsx", "node_modules"],
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        loader: "babel-loader",
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: "file?name=img/[name].[ext]"
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.sass$/,
        loaders: ["style", "css", "sass?indentedSyntax"]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  // context: path.join(__dirname, 'build'),
  plugins: [
    new webpack.EnvironmentPlugin('NODE_ENV')
  ]
};