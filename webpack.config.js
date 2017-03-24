'use strict';
const webpack = require('webpack'),
  path = require('path');

module.exports = {
  entry: {
    app: ['./src/app/app.js']
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  resolve: {
    modules: ['node_modules', 'bower_components']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      // pre
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: [/bower_components/, /node_modules/, /\.spec.js$/],
        loaders: ['istanbul-instrumenter-loader']
      },
      {test: /\.js$/, enforce: 'pre', exclude: [/bower_components/, /node_modules/], loaders: ['eslint-loader']},
      // index
      {test: /index.html$/, loader: 'file-loader?name=[name].[ext]'},
      // assets
      {test: /\.(eot|ico|png|jpg)$/, loader: 'file-loader?name=assets/[name].[ext]'},
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader?name=assets/[name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {test: /\.ttf$/, loader: 'url-loader?name=assets/[name].[ext]&limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg$/, loader: 'url-loader?name=assets/[name].[ext]&limit=10000&mimetype=image/svg+xml'},
      // less
      {test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader']},
      // templates
      {test: /\.tpl.html$/, loader: 'ng-cache-loader'},
      // angular annotate
      {test: /\.js$/, exclude: [/bower_components/, /node_modules/], loader: 'ng-annotate-loader'}
    ]
  }
};
