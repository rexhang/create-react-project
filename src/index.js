import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

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

ReactDOM.render(<App />, document.getElementById('create-react-project-app'));

console.log($$('#create-react-project-app').attr('id'));
console.log(pkg.version);