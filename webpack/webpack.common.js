const path = require("path");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

if (isDev){
	process.traceDeprecation = true; // 跟踪弃用api信息
}

module.exports = {
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
	}
};

// 注：在Webpack4上用extract-text-webpack-plugin会出错，可以安装beta版本extract-text-webpack-plugin@next。