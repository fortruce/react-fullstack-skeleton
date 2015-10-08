/*
  TODO:
    * add a production flag that disables debug/sourcemaps and minifies
 */

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var frontendConfig = {
  entry: [
    'webpack-hot-middleware/client',
    './src/frontend/index.js'
  ],

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build', 'public')
  },

  devtool: 'sourcemap',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Skele',
      filename: 'index.html',
      template: 'src/frontend/index.template.html',
      inject: true
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src', 'frontend'),
        loaders: ['babel']
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'src', 'frontend', 'scss'),
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
};

var serverConfig = {
  entry: './src/server/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },

  devtool: 'sourcemap',

  target: 'node',
  // do not include polyfills or mocks for node stuff
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },
  // all non-relative modules are external
  // abc -> require('abc')
  externals: /^[a-z\-0-9]+$/,

  plugins: [
    // enable source-map-support by installing at the head of every chunk
    new webpack.BannerPlugin('require("source-map-support").install();',
      {raw: true, entryOnly: false})
  ],

  module: {
    loaders: [
      {
        // transpile all .js files using babel
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
};

module.exports = [frontendConfig, serverConfig];