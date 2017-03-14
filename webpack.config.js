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
		extensions: ['', '.js', '.jsx'],
		modulesDirectories: ["src/jsx", "node_modules"],
		root: [
			path.resolve("./src")
		],
		alias: {
			'lima': path.resolve('node_modules/lima/dist')
		}
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
				loader: "babel"
			},
			{
				test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$|\.tsv$/,
				loader: "file?name=[name]-[hash:6].[ext]"
			},
			{
        test: /\.html$/,
        loader: 'file?name=[name].[ext]!extract-loader!html?interpolate=require'
      },
			{
				test: /\.sass$/,
				loaders: ["style?name=[name]-[hash:6].[ext]", "css", "sass?indentedSyntax"]
			}
		]
	},
	// context: path.join(__dirname, 'build'),
	plugins: [
		new webpack.EnvironmentPlugin('NODE_ENV')
	]
};