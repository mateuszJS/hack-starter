"use strict";
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "7777";

module.exports = {
	node: {
		fs: 'empty'
	},
	entry: {
		index: `${__dirname}/src/index.js`,
	},
	output: {
		path: `${__dirname}/dist`,
		publicPath: '/',
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
			{
				test: /\.(svg|png|jpg|woff|woff2|eot|ttf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10 * 1024
						}
					}
				],
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: {loader: 'html-loader'}
			},
		]
	},
	devServer: {
		contentBase: "./dist",
		// enable HMR
		hot: true,
		// embed the webpack-dev-server runtime into the bundle
		inline: true,
		port: PORT,
		host: HOST
	},
	plugins: [
		new UglifyJSPlugin({
			compress: true
		}),
	  new HtmlWebpackPlugin({
	    template: 'src/template.html'
		}),
		new CopyWebpackPlugin([
			{ from: 'src/assets/export/*', to: './', flatten: true }
		])
	]
}
