/*
* @author RexHang(rexhang@vip.qq.com)
* @date 2020年4月11日, 0011 14:06
* @description webpack development mode configs
*/
const merge = require("webpack-merge");

const common = require("./webpack.common.js");

const devBasicConfig = require('./webpack.dev.basic');

const webpackConfigs = merge(common, devBasicConfig);

module.exports = webpackConfigs;