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
	mode: 'development', // development || prduction 模式下会自动压缩，development模式下是不会自动进行压缩的。【这是一个必须选项】
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
					loader: 'babel-loader',
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
					
				},
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
		hot: true,                 //开启模块热替换
		contentBase: './dist',     //将dist目录下的文件，作为额外可访问文件
		host: '127.0.0.1',           //DevServer 服务监听的地址，默认是localhost。当需要同个局域网可访问你的服务时，可设成0.0.0.0
		port: 2333,                //DevServer 服务监听的端口，默认8080
		https: false,              //是否使用HTTPS服务
		open: false,                 //自动打开网页，地址是host:port
		overlay: true,              // 若编译过程中有错误，显示到网页上,便于定位错误
		historyApiFallback: true,   // 如果找不到界面就返回默认首页 详细配置参考官方文档
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
		modules: [path.resolve(__dirname, '../node_modules')],
		// 尽可能的减少后缀尝试的可能性 速度更快
		extensions: [".ts", ".tsx", ".js", ".jsx", '.json'],
		alias: {
			'react-dom': '@hot-loader/react-dom',
			'@c-i': path.resolve(__dirname, '../src/common-images')   //把导入语句里的 assets 关键字替换成 根目录/src/assets/
		}
	},
	devtool: "#cheap-module-eval-source-map"
};

module.exports = merge(common, devConfig);