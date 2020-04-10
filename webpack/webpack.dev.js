const path = require("path");

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const open = require('opn');//打开浏览器

const chalk = require('chalk');// 改变命令行中输出日志颜色插件

const ip = require('ip'); // 获取本机ip

const CopyWebpackPlugin = require('copy-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const merge = require("webpack-merge");

const common = require("./webpack.common.js");     //引入公共配置

const devConfig = {
	output:{
		filename:'[name].pkg.js',
		path: path.resolve(__dirname, '../dist')
	},
	module: {
		rules : [
			/*{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader:'css-loader'
					}
				]
			},*/
			{
				test: /\.scss$/,
				use: ['style-loader','css-loader', 'sass-loader']
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
				test : /\.(js|jsx)$/,
				use : {
					loader: 'babel-loader'
				},
				exclude : /node_modules/
			},
			{
				test : /\.(ts|tsx)$/,
				use : [
					{
						loader: 'babel-loader',
					},
					{
						loader: 'ts-loader'
					}
				],
				exclude : /node_modules/
			},
		
		]
	},
	watch : false,
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].pkg.css",    // [name]为chunk名称
		}),
		new HtmlWebpackPlugin({
			chunks: ['root'],
			template:'./start/index.html',
			filename:'index.html',
			minify: {
				collapseWhitespace: false,
				minifyCSS: false,
				minifyJS: false
			}
		}),
		new webpack.ProvidePlugin({
			$$: 'jquery',
		}),
		new webpack.HotModuleReplacementPlugin(),
		new CopyWebpackPlugin([{
			from: './start',     // 将此目录下的文件缓存
			to:'./'              // 输出到此目录，相对于output.path目录
		}]),
	],
	devServer:{
		quiet: true,
		progress:false,             // 启动进度条
		compress:false,             // 启动zip压缩
		inline:true,                //页面实时刷新
		hot: true,                 //开启模块热替换
		contentBase: './dist',     //将dist目录下的文件，作为额外可访问文件
		host: '127.0.0.1',           //DevServer 服务监听的地址，默认是localhost。当需要同个局域网可访问你的服务时，可设成0.0.0.0
		port: 2333,                //DevServer 服务监听的端口，默认8080
		https: false,              //是否使用HTTPS服务
		open: false,                 //自动打开网页，地址是host:port
		overlay: true,              // 若编译过程中有错误，显示到网页上,便于定位错误
		historyApiFallback: true,   // 如果找不到界面就返回默认首页 详细配置参考官方文档
		/*https: {
			key: fs.readFileSync('/path/to/server.key'),
			cert: fs.readFileSync('/path/to/server.crt'),
			ca: fs.readFileSync('/path/to/ca.pem'),
		},*/
		after() {
			open(`http://${this.host||ip}:${this.port}`)
				.then(() => {
					console.log(chalk.cyan(`成功打开链接： http://${this.host||ip}:${this.port}`));
				})
				.catch(err => {
					console.log(chalk.red(err));
				});
		}
	},
	resolve: {
		// 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
		modules: [
			path.resolve(__dirname, '..'),
			path.resolve(__dirname, '../node_modules')
		],
		// 尽可能的减少后缀尝试的可能性 速度更快
		extensions: [".ts", ".tsx", ".js", ".jsx", '.json'],
		alias: {
			'react-dom': '@hot-loader/react-dom',
			'@images': path.resolve(__dirname, '../src/common-images')   //把导入语句里的 assets 关键字替换成 根目录/src/assets/
		}
	},
	devtool: "eval-source-map"
};

const webpackConfigs = merge(common, devConfig);

module.exports = webpackConfigs;

// devSettings = {
// --content-base //设定webpack-dev-server的director根目录。如果不进行设定的话，默认是在当前目录下。
// --quiet: //控制台中不输出打包的信息，开发中一般设置为false，进行 打印，这样查看错误比较方面
// --no-info: // 不显示任何信息
// --colors: //对信息进行颜色输出
// --no-colors: //对信息不进行颜色输出
// --compress:  //开启gzip压缩
// --host <hostname/ip>: //设置ip
// --port <number>: //设置端口号，默认是:8080
// --inline: //webpack-dev-server会在你的webpack.config.js的入口配置文件中再添加一个入口,
// --hot: //开发热替换
// --open: //启动命令，自动打开浏览器
// --history-api-fallback: //查看历史url
// }