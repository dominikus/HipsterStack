var path = require('path');
var webpack = require('webpack');

module.exports = {
	context: __dirname + "/src",
	entry: "./jsx/main.jsx",
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'js/app.js'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [path.resolve("src/jsx"), path.resolve("node_modules"), path.resolve("src")],
		alias: {}
	},
	devServer: {
		port: 8080,
		historyApiFallback: true
 	},
	module: {
		loaders: [
			{
				exclude: /node_modules/,
				test: /\.jsx?$/,
				loader: 'babel-loader'
			},
			{
				test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$|\.tsv$/,
				loader: 'file-loader',
				options: {
					name: '[name]-[hash:6].[ext]'
				}
			},
			{
        test: /\.html$/,
        use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]'
						}
					},
					'extract-loader',
					{
						loader: 'html-loader',
						options: {
							interpolate: 'require'
						}
					}
				]
      },
			{
				test: /\.sass$/,
				use: [
					{
						loader: "style-loader",
						options: {
							name: '[name]-[hash:6].[ext]'
						}
					},
					"css-loader", 
					{
						loader: "sass-loader",
						options: {
							indentedSyntax: true
						}
					}
				]
			}
		]
	},
	// context: path.join(__dirname, 'build'),
	plugins: [
		new webpack.EnvironmentPlugin('NODE_ENV')
	]
};