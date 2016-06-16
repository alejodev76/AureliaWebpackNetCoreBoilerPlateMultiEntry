/*eslint-disable */

//suppress all warnings between comments
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');

var path = require('path');
var AureliaWebpackPlugin = require('aurelia-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var ExtractCss = require('./node_mode_modified/extract-text-webpack-plugin/index');

var config ={
    rootDir:path.resolve('wwwroot'),
    apps: [

        {
            src:'./src/Apps/Site/index.html',
            dest:'/site/index.html'
        },
        {
            src:'./src/Apps/SignIn/index.html',
            dest:'/signin/index.html'
        }
    ]
}

var commonPlugins = [

    new CleanPlugin(config.rootDir),

    new webpack.optimize.CommonsChunkPlugin("commons", "commons.js"),

    new ExtractCss('[name].css', {disable:false})
];

for( var i=0; i<config.apps.length; i++)
{
    var app = config.apps[i];
	commonPlugins.push( new CopyWebpackPlugin([{ from: app.src, to: config.rootDir + app.dest }]))
}

module.exports.commponPlugins = commonPlugins;

var devPlugins = [

    new WebpackNotifierPlugin(),

    new AureliaWebpackPlugin(),
];

Array.prototype.push.apply(devPlugins, commonPlugins);

module.exports = {

	entry: {
		'/signin/signin': ['./src/Apps/SignIn/index'],
		'/site/site': ['./src/Apps/Site/index'],
	},

	output: {
		path: config.rootDir,
		chunkFilename: '[name]-[chunkhash].js',
		filename: '[name].js',
		publicPath: '/'
	},

	plugins:devPlugins,

	resolve: {
		extensions: ['', '.js']
	},

	devtool: 'source-map',

	module: {

		loaders: [
			{
				test: /\.js?$/,
				include: /src/,
				loader: 'babel', // 'babel-loader' is also a legal name to reference
				query: {
					cacheDirectory: true,
					presets: ['es2015-loose', 'stage-1'],
					plugins: ['transform-decorators-legacy']
				}
			},
			{
				test: /\.css$/,
				loader: ExtractCss.extract('style-loader', 'css-loader')
			},
			{
				test: /\.scss?$/,
				loader: ExtractCss.extract('style', 'css-loader!sass-loader')
			},
			{
				test: /\.html?$/,
				loader: 'html'
			},
			{
				test: /\.(png|gif|jpe?g|svg|woff2|eot|woff|ttf)$/i,
				loader: 'url?limit=10000'
			}
		],
		preLoaders: [
			{
				test: /\.js/,
				loader: 'eslint',
				include: /src/
			}
		]
	}
};

/*eslint-enable */