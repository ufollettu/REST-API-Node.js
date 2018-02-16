require('babel-polyfill');
const webpack = require('webpack');
const nodeEnv = process.env.NODE_ENV || 'production';
const path = require('path');
const nodeExternals = require('webpack-node-externals');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
	filename: '[name].[contenthash].css'
});

module.exports = {
	devtool: 'source-map', // enhance debugging by adding meta info for the browser devtools
	entry: ['babel-polyfill', './www.js'],
	output: {
		path: path.join(process.cwd(), 'dist'),
		filename: '[name].[hash].js',
		publicPath: '/',
		sourceMapFilename: '[name].map'
	},
	target: 'node', // in order to ignore built-in modules like path, fs, etc.
	externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
	resolve: {
		extensions: ['.js'],  // extensions that are used
		modules: [
			path.join(process.cwd(), 'bin'),
			// path.join(process.cwd(), 'app'),
			// path.join(process.cwd(), 'config'),
			// path.join(process.cwd(), 'public'),
			'node_modules' // directories where to look for modules
		]
	},
	module: {
		rules: [{
			enforce: 'pre', //to check source files, not modified by other loaders (like babel-loader)
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'eslint-loader'
		}, {
			// Only run `.js` and `.jsx` files through Babel
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					plugins: ['transform-runtime'],
					presets: ['env', 'react']
				}
			}
		}, {
			test: /\.scss$/,
			use: extractSass.extract({
				use: [{
					loader: 'css-loader',
					options: {
						sourceMap: true
					}
				}, {
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}],
				// use style-loader in development
				fallback: 'style-loader'
			})
		}]
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], {root: process.cwd()}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		// new HtmlWebpackPlugin({
		// 	template: 'index.html'
		// }),
		extractSass,
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			mangle: {
				screw_ie8: true,
				keep_fnames: true
			},
			compress: {
				screw_ie8: true,
				warnings: false
			},
			output: {
				comments: false
			},
			sourceMap: true
		}),
		new webpack.DefinePlugin({
			'process.env': {NODE_ENV: JSON.stringify(nodeEnv)}
		}),
		// new webpack.HotModuleReplacementPlugin()
	],
	// alternate webpack-dev-server
	// devServer: {
	//     publicPath: '/',
	//     port: 9000,
	//     contentBase: path.join(process.cwd(), 'dist'), // static file location
	//     host: 'localhost',
	//     historyApiFallback: true, // true for index.html upon 404, object for multiple paths
	//     noInfo: false,
	//     stats: 'minimal',
	//     hot: true  // hot module replacement. Depends on HotModuleReplacementPlugin
	// }
};