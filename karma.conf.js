const webpack = require('./webpack.config');

module.exports = (config) => {
    config.set({
        autoWatch: true,
        colors: true,
        concurrency: Infinity,
        files: [
            'test/index.js',
        ],
        frameworks: ['jasmine'],
        logLevel: config.LOG_INFO,
        port: 9876,
        preprocessors: {
            'test/index.js': ['webpack', 'sourcemap'],
        },
        reporters: ['progress'],
        singleRun: false,
        webpack,
        webpackMiddleware: {
            noInfo: true,
        },
    });
};
