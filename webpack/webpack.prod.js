/*
* @author RexHang(rexhang@vip.qq.com)
* @date 2020年4月11日, 0011 14:06
* @description webpack production mode configs
*/


const merge = require("webpack-merge");

const common = require("./webpack.common.js");     //引入公共配置

const prodBasicConfig = require('./webpack.prod.basic');

const webpackConfigs = merge(common, prodBasicConfig);

module.exports = webpackConfigs;
