/*
* @author RexHang(rexhang@vip.qq.com)
* @date 2020年4月11日, 0011 14:22
* @description webpack common configs
*/

const path = require("path");

const chalk = require('chalk');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ProgressBarPlugin = require('./plugins/progress-bar-webpack-plugin');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const aliasConfig = require('../alias.config');

const devBasicConfig = require('./webpack.dev.basic');

const webpackCustomizeConfig = require('./wepack.customize.config');

const notifierIcon = path.resolve(__dirname, './plugins/static/icon.png');

const isDev = process.env.NODE_ENV === 'development';

const themeConfig = require('../ant-design.theme.config');

if (isDev) {
	process['traceDeprecation'] = true; // 跟踪弃用api信息
}

const completeIcon = "█";

const incompleteIcon = "░";

let comConfig = {
	mode: isDev ? 'development' : 'production', // development 模式下会自动压缩 development模式下是不会自动进行压缩的 --这是一个必须选项
	stats: {
		chunks: false,
		colors: true,
		modules: false,
		children: false,
	},
	entry: {
		root: ['babel-polyfill', path.resolve(__dirname, '../src') + '/index.js']
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							config: {path: path.resolve(__dirname, './postcss.config.js')}
						}
					},
				
				],
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							config: {path: path.resolve(__dirname, './postcss.config.js')}
						}
					},
					'sass-loader',
				]
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							config: {path: path.resolve(__dirname, './postcss.config.js')}
						}
					},
					{
						loader: 'less-loader',
						options: {
							javascriptEnabled: true,
							modifyVars: themeConfig.settings
						}
					},
				]
			},
			{
				test: /\.styl(us)?$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							config: {path: path.resolve(__dirname, './postcss.config.js')}
						}
					},
					'stylus-loader',
				]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 1024 * 30,         //30KB 以下的文件采用 url-loader
						fallback: 'file-loader',  //否则采用 file-loader，默认值就是 file-loader
						outputPath: 'images',     //图片输出路径，相对于output.path
					}
				}]
			},
			{
				test: /\.(eot|ttf|woff)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 1024 * 30,         //30KB 以下的文件采用 url-loader
						fallback: 'file-loader',  //否则采用 file-loader，默认值就是 file-loader
						outputPath: 'fonts',      //字体输出路径
					}
				}]
			},
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader'
				},
				exclude: /node_modules/
			},
			{
				test: /\.(ts|tsx)$/,
				use: [
					{
						loader: 'babel-loader',
					},
					{
						loader: 'ts-loader'
					}
				],
				exclude: /node_modules/
			},
		]
	},
	watch: false,
	plugins: [
		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				messages: [`web\u7a0b\u5e8f\u8fd0\u884c\u5730\u5740\u5728: ${devBasicConfig.devServer.https ? 'https' : 'http'}://${devBasicConfig.devServer.host}:${devBasicConfig.devServer.port}`],
				notes: [chalk.yellow('\u5feb\u4e50\u7f16\u7a0b\uff0c\u5f00\u5fc3\u6bcf\u4e00\u5929 >>> \u5982\u7a0b\u5e8f\u8fd0\u884c\u6709\u95ee\u9898\u8bf7\u8054\u7cfb@rexhang ^-^')],
			},
			clearConsole: true,
		}),
		new WebpackBuildNotifierPlugin(
			{
				title: 'My Project Webpack Build',
				suppressSuccess: true,
				logo: notifierIcon,
				showDuration: true,
			}
		),
		new ProgressBarPlugin({
			format: `  ${isDev ? '正在编译...' : '正在打包...'} [-> :bar <-] ` + chalk.green.bold(':percent') + ` (${chalk.yellow.bold(':current/:total')})` + ' :msg' + ' (:elapsed seconds)',
			clear: true,
			width: 20,
			complete: completeIcon,
			incomplete: incompleteIcon,
			renderThrottle: 10
		}),
		new HtmlWebpackPlugin({
			chunks: ['root', 'common', 'vendor'],
			template: './start/index.html',
			filename: 'index.html',
			minify: {
				collapseWhitespace: !isDev,
				minifyCSS: !isDev,
				minifyJS: !isDev
			}
		}),
		new CopyWebpackPlugin([{
			from: './start',     // 将此目录下的文件缓存
			to: './'              // 输出到此目录，相对于output.path目录
		}]),
	],
	resolve: {
		// 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
		modules: [
			path.resolve(__dirname, '..'),
			path.resolve(__dirname, '../node_modules')
		],
		// 尽可能的减少后缀尝试的可能性 速度更快
		extensions: [".ts", ".tsx", ".js", ".jsx", '.json'],
		alias: aliasConfig.resolve.alias,
	},
	devtool: isDev?'eval-source-map':'source-map'
};

if (webpackCustomizeConfig.jquery){
	comConfig.plugins.push(
		new webpack.ProvidePlugin({
			$$: 'jquery',
		})
	)
}

module.exports = comConfig;
