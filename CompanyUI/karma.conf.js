var webpack = require('webpack');

module.exports = function (config) {
  config.set({

    browsers: [ 'Chrome' ],

    singleRun: true,

    frameworks: [ 'jasmine' ],

    files: [
      'load.tests.and.dependencies.webpack.js'
    ],

    preprocessors: {
      'load.tests.and.dependencies.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'mocha' ],

    webpack: {
      performance: { hints: false },
      mode: 'production',
      devtool: 'inline-source-map',
      module: {
        rules: [
          { test: /\.js$/, loader: 'babel-loader' },
          { test: /\.css$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }] }
        ]
      }
    },

    webpackServer: {
      noInfo: true
    }

  });
};
