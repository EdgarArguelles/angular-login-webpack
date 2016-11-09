'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var open = require('gulp-open'); // Open a URL in a web browser
var webpack = require('webpack'); // Compile with Webpack
var WebpackDevServer = require('webpack-dev-server'); // Compile and Run with Webpack
var KarmaServer = require('karma').Server; // Start test server
var drakov = require('drakov'); // Mock API
var runSequence = require('run-sequence'); // Run tasks in sequence

// Open a URL in a web browser
gulp.task('open', function () {
  gulp.src('./src/index.html')
    .pipe(open({uri: 'http://localhost:8080/webpack-dev-server/index.html'}));
});

// Webpack
gulp.task('webpack', function (callback) {
  var webpackConfig = require('./webpack.config');
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
  webpack(webpackConfig, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString());
    callback();
  });
});

// Webpack-dev-server
gulp.task('dev', function (callback) {
  var webpackConfig = require('./webpack.config');
  webpackConfig.output.path = '/';
  var compiler = webpack(webpackConfig);
  new WebpackDevServer(compiler).listen(8080, 'localhost', function (err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
    callback();
  });
});

// Run tests
gulp.task('test', function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

// Mock API
gulp.task('mock', function () {
  var argv = {
    sourceFiles: './api/**/**.md',
    serverPort: 3030,
    disableCORS: false,
    autoOptions: true,
    delay: 500,
    method: ['HEAD', 'GET', 'PUT', 'DELETE', 'OPTIONS', 'POST', 'PATCH']
  };
  drakov.run(argv);
});

gulp.task('build', function () {
  runSequence('test', 'webpack');
});

gulp.task('default', function () {
  runSequence('mock', 'test', 'dev', 'open');
});
