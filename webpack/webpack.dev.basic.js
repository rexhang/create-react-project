/*
* @author RexHang(rexhang@vip.qq.com)
* @date 2020年4月11日, 0011 14:06
* @description webpack development basic mode configs
*/

const path = require("path");

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const open = require('opn');//打开浏览器

const chalk = require('chalk');// 改变命令行中输出日志颜色插件

const ip = require('ip'); // 获取本机ip

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackCustomizeConfig = require('./wepack.customize.config');

const devBasicConfig = {
	output: {
		filename: '[name].pkg.js',
		path: path.resolve(__dirname, '../dist')
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].pkg.css",    // [name]为chunk名称
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		quiet: true,
		progress: false,             // 启动进度条
		compress: true,             // 启动zip压缩
		inline: true,                //页面实时刷新
		hot: true,                 //开启模块热替换
		contentBase: webpackCustomizeConfig.contentBase,     //将dist目录下的文件，作为额外可访问文件
		host: webpackCustomizeConfig.host,           //DevServer 服务监听的地址，默认是localhost。当需要同个局域网可访问你的服务时，可设成0.0.0.0
		port: webpackCustomizeConfig.port,                //DevServer 服务监听的端口，默认8080
		https: false,              //是否使用HTTPS服务
		open: false,                 //自动打开网页，地址是host:port
		overlay: true,              // 若编译过程中有错误，显示到网页上,便于定位错误
		historyApiFallback: false,   // 如果找不到界面就返回默认首页 详细配置参考官方文档
		/*https: {
			key: fs.readFileSync('/path/to/server.key'),
			cert: fs.readFileSync('/path/to/server.crt'),
			ca: fs.readFileSync('/path/to/ca.pem'),
		},*/
		before(){
		},
		after() {
			if (webpackCustomizeConfig.OpenInBrowser){
				open(`http://${this.host || ip}:${this.port}`)
					.then(() => {
						console.log(chalk.cyan(`成功打开链接： http://${this.host || ip}:${this.port}`));
					})
					.catch(err => {
						console.log(chalk.red(err));
					});
			}
		}
	},
};

module.exports = devBasicConfig;