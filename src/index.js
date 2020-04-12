/*
* @author RexHang(rexhang@vip.qq.com)
* @date 2020年4月12日, 0012 16:54
* @description 入口文件
*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './common.scss';
import Application from "./Application";

import pkg from '../package';

/*StrictMode目前有助于：
* 识别具有不安全生命周期的组件
* 有关旧式字符串ref用法的警告
* 关于已弃用的findDOMNode用法的警告
* 检测意外的副作用
* 检测遗留 context API*/
// ReactDOM.render(
//   <React.StrictMode>
//       <App />
//   </React.StrictMode>,
//   document.getElementById('create-react-project-app')
// );

ReactDOM.render(<Application />, document.getElementById('create-react-project-app'));

console.log(pkg.version);
