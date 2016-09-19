const webpack = require('webpack');
const config = require('./webpack.config');

module.exports = {
    entry: config.entry,
    module: config.module,
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
        }),
        new webpack.EnvironmentPlugin([
            'NODE_ENV',
        ]),
        new webpack.NoErrorsPlugin(),
    ],
    output: {
        path: config.output.path,
        filename: 'es6-geometry.min.js',
    },
    resolve: config.resolve,
};
