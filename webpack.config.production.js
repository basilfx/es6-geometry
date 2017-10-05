const config = require('./webpack.config');
const webpack = require('webpack');

const BabiliPlugin = require('babili-webpack-plugin');

module.exports = {
    entry: config.entry,
    module: config.module,
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.EnvironmentPlugin({
            'NODE_ENV': 'production',
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new BabiliPlugin(),
    ],
    output: {
        path: config.output.path,
        filename: 'es6-geometry.min.js',
    },
    resolve: config.resolve,
};
