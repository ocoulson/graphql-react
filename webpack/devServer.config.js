var base = require('./base.config');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var extraConfig = {
  mode: 'development',
  devtool: 'sourcemap',
  watch: true,
  devServer: {
    contentBase: path.resolve('build'),
    port: 3000,
    writeToDisk: true,
    proxy: {
      '/api': 'http://localhost:3001/graphql',
    },
    historyApiFallback: {
      rewrites: [
        { from: /./, to: '/index.html' }
      ],
      index: 'index.html',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      path: path.resolve('build'),
      template: path.resolve('src', 'index.html'),
      filename: 'index.html',
      chunks: ['app'],
    }),
  ]
};

module.exports = Object.assign(base, extraConfig);
