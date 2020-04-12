/*
* @author RexHang(rexhang@vip.qq.com)
* @date 2020年4月11日, 0011 14:06
* @description webpack production basic mode configs
*/

const path = require("path");

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //用于压缩CSS代码

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");  //用于压缩JS代码

const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin'); // 使用 antd-dayjs-webpack-plugin 插件用 Day.js 替换 momentjs 来大幅减小打包大小。

const prodBasicConfig = {
	output: {
		filename: '[name].[chunkhash:8].pkg.js',
		path: path.resolve(__dirname, '../dist')
	},
	plugins: [
		new AntdDayjsWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash:8].pkg.css",    // [name]为chunk名称
		}),
		new CleanWebpackPlugin({
			verbose: true,
			cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')]
		}),
	],
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

module.exports = prodBasicConfig;
