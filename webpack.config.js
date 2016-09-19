const path = require('path');
const webpack = require('webpack');

module.exports = {
    debug: true,
    devtool: ' cheap-eval-source-map',
    entry: {
        'bundle': './src/index.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
            {
                test: /\.(less|css)$/,
                loader: 'style!css!less',
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=102400',
            },
        ],
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.WatchIgnorePlugin([
            path.resolve('./node_modules'),
        ]),
    ],
    output: {
        path: path.resolve('./dist/'),
        filename: 'es6-geometry.js',
    },
    resolve: {
        extensions: ['', '.js'],
        root: [
            path.resolve('./app'),
            path.resolve('./node_modules'),
        ],
    },
};
