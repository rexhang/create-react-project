import React from 'react';
import logoRex from '@c-i/logo-rex.svg';
import logoReact from '@c-i/logo-react.svg';
import './App.scss';
import { hot } from 'react-hot-loader/root';

import {Button, ConfigProvider, DatePicker} from "antd";

const { RangePicker } = DatePicker;

import moment from 'moment';

import 'dayjs/locale/zh-cn';

import cn from 'antd/es/locale/zh_CN';
import en from 'antd/es/locale/en_US';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      lang: cn,
    };
  }
  
  test()  {
      return new Promise((resolve, reject) => {
        const condition = false;
        if (condition){
          window.setTimeout(()=>{
            resolve('ok');
          }, 1000);
        }
        window.setTimeout(()=>{
          reject('err');
        }, 1000);
      })
  };
  
  async componentDidMount () {
    try {
      const result = await this.test();
      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      console.log('finally');
    }
  }
  
  render() {
    return (
        <ConfigProvider locale={this.state.lang}>
          <div className="App">
            <header className="App-header">
              <Button ghost type='primary' onClick={()=>{
                this.setState({
                  lang: en
                }, ()=>{
                  console.log('设置为英文');
                })
              }}>切换语言</Button>
              <br/>
              <RangePicker defaultValue={[moment('2015-01-01', 'YYYY-MM-DD'), moment('2018s-02-02', 'YYYY-MM-DD')]} />
              <div className='App-logo'>
                <img src={logoReact} className="App-logo-react" alt="logo-react" />
                <img src={logoRex} className="App-logo-rex" alt="logo-rex" />
              </div>
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        </ConfigProvider>
    );
  }
  
}

export default hot(App);
