// Karma configuration
var webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({

    // Frameworks to use
    frameworks: ['jasmine'],

    // List of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/app/**/*.spec.js'
    ],

    // Plugins to use
    plugins: [
      'karma-coverage',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-spec-reporter',
      'karma-webpack'
    ],

    // Test results reporter to use
    // Possible values: 'dots', 'progress'
    reporters: ['spec', 'coverage'],

    // Processors before test
    preprocessors: {
      'src/app/**/*.spec.js': ['webpack']
    },

    // Webpack configuration
    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    },

    // Optionally, configure the reporter
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    // Web server port
    port: 9876,

    // Start these browsers
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // If true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
