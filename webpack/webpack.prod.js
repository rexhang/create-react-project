const path = require("path");

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //用于压缩CSS代码

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");  //用于压缩JS代码

const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin'); // 使用 antd-dayjs-webpack-plugin 插件用 Day.js 替换 momentjs 来大幅减小打包大小。

const merge = require("webpack-merge");

const common = require("./webpack.common.js");     //引入公共配置

const prodConfig = {
	output: {
		filename: '[name].[chunkhash:8].pkg.js',
		path: path.resolve(__dirname, '../dist')
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 1024 * 30,         //30KB 以下的文件采用 url-loader
						fallback: 'file-loader',  //否则采用 file-loader，默认值就是 file-loader
						outputPath: 'images',     //图片输出路径，相对于output.path
					}
				}, 'image-webpack-loader'],
				exclude: path.resolve(__dirname, '../start/assets')
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
				}],
				exclude: path.resolve(__dirname, '../start/assets')
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
		new AntdDayjsWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash:8].pkg.css",    // [name]为chunk名称
		}),
		new CleanWebpackPlugin({
			verbose: true,
			cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')]
		}),
		new HtmlWebpackPlugin({
			chunks: ['root', 'common', 'vendor'],
			template: './start/index.html',
			filename: 'index.html',
			minify: {
				collapseWhitespace: true,
				minifyCSS: true,
				minifyJS: true
			}
		}),
		new webpack.ProvidePlugin({
			$$: 'jquery',
		}),
		new CopyWebpackPlugin([{
			from: './start',  // 将此目录下的文件
			to: './'              // 输出到此目录，相对于output.path目录
		}])
	],
	resolve: {
		// 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
		modules: [path.resolve(__dirname, '../node_modules')],
		// 尽可能的减少后缀尝试的可能性 速度更快
		extensions: [".ts", ".tsx", ".js", ".jsx", '.json'],
		alias: {
			'react-dom': '@hot-loader/react-dom',
			'@images': path.resolve(__dirname, '../src/common-images')   //把导入语句里的 assets 关键字替换成 根目录/src/assets/
		}
	},
	devtool: "source-map",
	optimization: {
		minimize: true,
		minimizer: [
			new UglifyJsPlugin({}),
			new OptimizeCSSAssetsPlugin({})  //压缩css
		],
		splitChunks: {
			cacheGroups: {           //缓存组
				common: {           //提取入口文件之间的公共代码
					chunks: 'all',   //块的范围，有三个可选值：initial、async、all，默认为all
					minChunks: 1,    //被引用次数
					minSize: 0,      //文件大小
					name: "common"   //拆分出来块的名字
				},
				vendor: {
					chunks: "all",
					test: /node_modules/,//控制哪些模块被这个缓存组匹配到
					name: "vendor",
					priority: 10,
				},
			}
		},
	}
};

const webpackConfigs = merge(common, prodConfig);

module.exports = webpackConfigs;
