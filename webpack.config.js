const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isPro = () => {
	return process.env.NODE_ENV = 'production';
};

const config = {
	mode: isPro() ? 'production' : 'development',
	entry: ['babel-polyfill', './src/dev-entry/dev.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'shadow.[hash:5].js',
		publicPath: '/'
	},
	plugins: [
		new UglifyJsPlugin({
			include: /\/src/,
			exclude: /\/node_modules/,
			uglifyOptions: {
				ecma: 5,
				sourceMap: false,
				beautify: false,
				warnings: false
			}
		}),
		new VueLoaderPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/template/index.html'
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015'],
					}
				}
			},
			{
				test: /\.vue$/,
				use: {
					loader: 'vue-loader',
					options: {
						loaders: {
							scss: [
								{
									loader: 'vue-style-loader'
								},
								{
									loader: 'css-loader'
								},
								{
									loader: 'sass-loader'
								}
							]
						}
					}
				}
			},
			{
				test: /\.(less|css)$/,
				use: [{
					loader: 'style-loader' // creates style nodes from JS strings
				}, {
					loader: 'css-loader' // translates CSS into CommonJS
				}, {
					loader: 'less-loader' // compiles Less to CSS
				}]
			},
			{
				test: /\.(png|jpg|gif|mp4)$/,
				use: [
					{
						loader: 'file-loader',
						options: {}
					}
				]
			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						attrs: [':data-src']
					}
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': path.resolve('src')
		}
	},
	devtool: 'source-map',
	context: __dirname,
	devServer: {
		host: '192.168.1.106',
		// host: '0.0.0.0',
		contentBase: path.join(__dirname, 'dist'), // boolean | string | array, static file location
		compress: true, // enable gzip compression
		historyApiFallback: true, // true for index.html upon 404, object for multiple paths
		hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
		https: false, // true for self-signed, object for cert authority
		noInfo: true  // only errors & warns on hot reload
	}
};

module.exports = config;