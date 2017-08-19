import path from 'path';
import webpack from 'webpack'

const ExtractTextPlugin = require('extract-text-webpack-plugin')

export default {
	devtool: '#source-map',
	entry: [
		path.resolve(__dirname, 'src/assets/js/index')
	],
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'src'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		//new ExtractTextPlugin('assets/css/custom-materialize.css') //,
		//new webpack.optimize.DedupePlugin(),
		// new webpack.optimize.UglifyJsPlugin({
		// 	sourceMap: true
		// })
	],
	module: {
		rules: [
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: [{
							loader: 'css-loader',
							options: {
								//minimize: true,
								sourceMap: true
							}
						},
						{
							loader: 'less-loader',
							options: {
								sourceMap: true
							}
						}
					]
				})
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: [{
							loader: 'css-loader',
							options: {
								//minimize: true,
								sourceMap: true
							}
						}, {
							loader: 'sass-loader',
							options: {
								//minimize: true,
								sourceMap: true
							}
						},

					]
				})
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 80000,
						mimetype: "application/font-woff"
					}
				}]
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [{
					loader: "file-loader"
				}]
			}
		]
	}
}
