var webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/index.html',
    js: './src/app/app.js'
  },
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['web_modules', 'node_modules', 'bower_components']
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    )
  ],
  module: {
    preLoaders: [
      {test: /\.js$/, exclude: [/bower_components/, /node_modules/, /\.spec.js$/], loaders: ['istanbul-instrumenter']},
      {test: /\.js$/, exclude: [/bower_components/, /node_modules/], loaders: ['eslint']}
    ],
    loaders: [
      // index
      {test: /index.html$/, loader: 'file?name=[name].[ext]'},
      // assets
      {test: /\.(eot|ico|png|jpg)$/, loader: 'file?name=assets/[name].[ext]'},
      {test: /\.(woff|woff2)$/, loader: 'url?name=assets/[name].[ext]&limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf$/, loader: 'url?name=assets/[name].[ext]&limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg$/, loader: 'url?name=assets/[name].[ext]&limit=10000&mimetype=image/svg+xml'},
      // less
      {test: /\.less$/, loaders: ['style', 'css', 'less']},
      // templates
      {test: /\.tpl.html$/, loader: 'ng-cache'},
      // angular annotate
      {test: /\.js$/, exclude: [/bower_components/, /node_modules/], loader: 'ng-annotate'}
    ]
  }
};
