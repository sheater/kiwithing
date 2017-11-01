var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: [
		'babel-polyfill',
		'react-hot-loader/patch',
		'./src/index.js',
		'./src/index.scss'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'file-loader'
			},
			{
				test: /\.(scss|sass|css)$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	},
	/*
	  {
		include: [
			path.resolve(__dirname, "src")
		],
		test: /\.tsx?$/,
		// loader: 'ts-loader',
		loader: isProd ?
			'babel-loader?presets[]=es2015&plugins[]=transform-runtime!ts-loader' :
			'ts-loader',
	},*/
	// module: {
	//     loaders
	//   },
	plugins: [
		new WebpackCleanupPlugin(),
	// new webpack.DefinePlugin({
	//   'process.env': {
	//     NODE_ENV: '"production"'
	//   }
	// }),
	// new webpack.optimize.UglifyJsPlugin({
	//   compress: {
	//     warnings: false,
	//     screw_ie8: true,
	//     drop_console: true,
	//     drop_debugger: true
	//   }
	// }),
	// new webpack.optimize.OccurrenceOrderPlugin(),
		new ExtractTextPlugin({
			filename: 'style.css',
			// allChunks: true
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
			files: {
				css: ['style.css'],
				js: ['bundle.js'],
			}
		})
	]
};
