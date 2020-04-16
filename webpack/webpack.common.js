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

const CelebrityQuotes = [
	`只有经历过地狱般的磨砺，才能练就创造天堂的力量；只有流过血的手指，才能弹出世间的绝响。——泰戈尔`,
	`你以为挑起生活的担子是勇气，其实去过自己真正想要的生活才更需要勇气。——萨姆门德斯`,
	`没有目的，就做不成任何事情；目的渺小，就做不成任何大事——狄德罗`,
	`生活就像海洋，只有意志坚强的人，才能到达彼岸。——马克思`,
	`未曾失败的人恐怕也未曾成功过——佚名`,
	`在这个并非尽善尽美的世界上，勤奋会得到报偿，而游手好闲则要受到惩罚——毛姆`,
	`锲而舍之，朽木不折；锲而不舍，金石可镂。——荀子《劝学》`,
	`有些梦想，纵使永远也没办法实现，纵使光是连说出来都很奢侈。但如果没有说出来温暖自己一下，就无法获得前进的动力。——九把刀`,
	`人的一切痛苦，本质上都是对自己的无能的愤怒。——王小波`,
	`只要朝着一个方向努力，一切都会变得得心应手。——勃朗宁`,
	`乐观的人在每个危机里看到机会，悲观的人在每个机会里看见危机。——邱吉尔`,
	`让自己的内心藏着一条巨龙，既是一种苦刑，也是一种乐趣——雨果`,
	`心若改变，你的态度跟着改变；态度改变，你的习惯跟着改变；习惯改变，你的性格跟着改变；性格改变，你的人生跟着改变。——亚伯拉罕·马斯洛`,
	`要随时牢记在心中：决心取得成功比任何一件事情都重要。——林肯`,
	`人生的旅途，前途很远，也很暗，然而不要怕。不怕的人面前才有路——有岛武郎`,
	`一花凋零，荒芜不了整个春天。——巴尔扎克`,
	`人生活在世界上好比一只船在大海中航行，最重要的是要辨清前进的方向。——潘菽`,
	`没有斗争就没有功绩，没有功绩就没有奖赏，而没有行动就没有生活——别林斯基`,
	`烈火试真金，逆境试强者。——塞内加`,
	`顽强的毅力可以征服世界上任何一座高峰！——狄更斯`,
	`天才就是百分之一的灵感加百分之九十九的汗水。——爱迪生`,
	`每一个不曾起舞的日子，都是对生命的辜负。——尼采`
];

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
				notes: [
					chalk.yellow(`${CelebrityQuotes[parseInt(Math.random() * 10)]}`)
					+'\n'+chalk.blue('\u5feb\u4e50\u7f16\u7a0b\uff0c\u5f00\u5fc3\u6bcf\u4e00\u5929\uff0c\u4eca\u5929\u4e5f\u8981\u52a0\u6cb9\u5594~ >>> Ps: \u5982\u7a0b\u5e8f\u8fd0\u884c\u6709\u95ee\u9898\u8bf7\u8054\u7cfb@rexhang ^-^\n')
				],
			},
			clearConsole: true,
		}),
		new WebpackBuildNotifierPlugin(
			{
				title: 'create-react-project -> build',
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
