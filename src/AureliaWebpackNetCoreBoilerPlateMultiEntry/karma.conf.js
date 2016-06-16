/*eslint-disable no-var*/

var path = require('path');

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        coverageReporter: {
            reporters: [
                { type: 'html', subdir: 'html' },
                { type: 'lcovonly', subdir: '.' },
            ],
        },
        files: [
            'tests.webpack.js',
        ],
        frameworks: [
            'jasmine',
        ],
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap', 'babel'],
        },
        reporters: ['progress', 'coverage'],
        webpack: {
            cache: true,
            devtool: 'inline-source-map',
            module: {
                preLoaders: [
                    {
                        test: /-test\.js$/,
                        include: /test/,
                        exclude: /(node_modules|src)/,
                        loader: 'babel',
                        query: {
                            cacheDirectory: true,
                        },
                    },
                    {
                        test: /\.js?$/,
                        include: /src/,
                        exclude: /(node_modules)/,
                        loader: 'babel-istanbul',
                        query: {
                            cacheDirectory: true,
                        },
                    },
                ],
                loaders: [
                    {
                        test: /\.js$/,
                        include: path.resolve('./src'),
                        exclude: /(node_modules)/,
                        loader: 'babel',
                        query: {
                            cacheDirectory: true,
                        },
                    },
                    {
                        test: /\.js$/,
                        include: path.resolve('./test'),
                        exclude: /(node_modules)/,
                        loader: 'babel',
                        query: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
        },
    });
};

