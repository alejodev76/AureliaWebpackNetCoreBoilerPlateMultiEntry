var devConfig = require('./webpack.config');

var PurifyCss = require("purifycss-webpack-plugin");
var WebpackStrip = require('strip-loader');
var webpack = require('webpack');
var path = require('path');

console.error('!!!!!!!!!!!Production configuration is under development. Please try again later!!!!!!!!!!!!!!!!!');
module.exports = [];
return;

/*
 plugins: [

 new CleanPlugin('wwwroot'),

 new WebpackNotifierPlugin(),

 new AureliaWebpackPlugin(),


 new AureliaWebpackPlugin({
 src: 'bundle?lazy!' + path.resolve('./src')
 }),

 new AureliaWebpackPlugin({
 src: 'bundle?lazy!' + path.resolve('./src') + '/Apps/SignIn/'
 }),

 new AureliaWebpackPlugin({
 src: 'bundle?lazy!' + path.resolve('./src') + '/Apps/Site/'
 }),

 new webpack.optimize.CommonsChunkPlugin({
 name: "commons",
 // (the commons chunk name)

 filename: "commons.js",
 // (the filename of the commons chunk)

 minChunks: 3,
 // (Modules must be shared between 3 entries)

 // chunks: ["pageA", "pageB"],
 // (Only use these entries)
 }),

 new webpack.optimize.CommonsChunkPlugin("commons", "commons.js"),

 new ExtractCss('[name].css', {disable:false}),

 new CopyWebpackPlugin([{ from: './src/Apps/SignIn/index.html', to:path.resolve('wwwroot') + "/signin/index.html" }]),

 new CopyWebpackPlugin([{ from: './src/Apps/Site/index.html', to:path.resolve('wwwroot') + "/site/index.html" }])
 ],
 */

var loaders = devConfig.module.loaders;

// Removes all development code to prepare it to production*/
var stripLoader = {
	test:[/\.js$/],
	exclude:/node_modules/,
	loader:WebpackStrip.loader('console.log', 'debugger;', 'debugger')
}
loaders.push(stripLoader);

// turns off source-map. Not recommended to turn it on for production
devConfig.devtool = '';

// configure production plugins
var plugins = [];

var commonPlugins = require('commonPlugins');
console.log(commonPlugins);

devConfig.plugins = plugins;

//Search for equal or similar files and deduplicate them in the output
var dedupe = new webpack.optimize.DedupePlugin();
plugins.push(dedupe);

var orderPlugin = new webpack.optimize.OccurenceOrderPlugin();
plugins.push(orderPlugin);

var purifyCss = new PurifyCss({
	output: '[name].css',
	basePath: __dirname,
	paths: [
		"wwwroot/*.html",
	],
	minify:true
});
plugins.push(purifyCss);


var commons = new webpack.optimize.CommonsChunkPlugin({
	name: "commons",
	// (the commons chunk name)

	filename: "commons.js",
	// (the filename of the commons chunk)

	minChunks: 3,
	// (Modules must be shared between 3 entries)

	// chunks: ["pageA", "pageB"],
	// (Only use these entries)
})
plugins.push(commons);

//var chunkLimit = webpack.optimize.LimitChunkCountPlugin({maxChunks: 8})
//plugins.push(chunkLimit);

// This plugin prevents Webpack from creating chunks
// that would be too small to be worth loading separately
var minChunk = new webpack.optimize.MinChunkSizePlugin({
	minChunkSize: 128000, // ~50kb
})
plugins.push(minChunk);


//var mergePlugin =  new webpack.optimize.AggressiveMergingPlugin();
//plugins.push(mergePlugin);


module.exports = devConfig;