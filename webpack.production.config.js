'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
	entry: [
		path.join(__dirname, 'app/main.js')
	],
	output: {
		path: path.join(__dirname, '/dist/'),
		filename: '[name]-[hash].min.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new HtmlWebpackPlugin({
			template: 'app/index.tpl.html',
			inject: 'body',
			filename: 'index.html'
		}),
		new ExtractTextPlugin('[name]-[hash].min.css'),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
				screw_ie8: true
			}
		}),
		new StatsPlugin('webpack.stats.json', {
			source: false,
			modules: false
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	],
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				"presets": ["es2015", "stage-2"]
			}
		}, {
			test: /\.json?$/,
			loader: 'json'
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[local]!postcss')
		}, {
			test : /\.(jp?g|png|gif|svg)$/i,
			loader : "file-loader?name=/public/media/[name].[ext]"
		}]
	},
	postcss: [
		require('autoprefixer')
	]
};