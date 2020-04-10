const path = require("path");

const chalk = require('chalk');// 改变命令行中输出日志颜色插件

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

if (isDev){
	process['traceDeprecation'] = true; // 跟踪弃用api信息
}

const completeIcon = "█";

const incompleteIcon = "░";

module.exports = {
	mode: isDev?'development':'production', // development || prduction 模式下会自动压缩，development模式下是不会自动进行压缩的。【这是一个必须选项】
	stats: {
		chunks: false, // 不添加chunk信息
		colors: true,
		modules: false, // 不添加构建模块信息
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
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === 'development',
						},
					},
					'css-loader',
				],
			},
		]
	},
	plugins: [
		new ProgressBarPlugin({
			format: `  ${isDev?'正在编译...':'正在打包...'} [:bar] ` + chalk.green.bold(':percent') + ` (${chalk.yellow.bold(':current/:total')})` + ' :msg' + ' (:elapsed seconds)',
			clear: false,
			width: 20,
			complete: completeIcon,
			incomplete: incompleteIcon
		})
	]
};
