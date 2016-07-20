const webpack = require('./webpack.config');

module.exports = (config) => {
    config.set({
        autoWatch: true,
        browsers: ['PhantomJS'],
        colors: true,
        concurrency: Infinity,
        files: [
            'test/*.js',
        ],
        frameworks: [
            'jasmine',
            'jasmine-matchers',
        ],
        logLevel: config.LOG_INFO,
        port: 9876,
        preprocessors: {
            'test/*.js': ['webpack', 'sourcemap'],
        },
        reporters: ['progress'],
        singleRun: !!process.env.CI,
        webpack,
        webpackMiddleware: {
            noInfo: true,
        },
    });
};
