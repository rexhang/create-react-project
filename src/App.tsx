import * as React from 'react';
// @ts-ignore
import logoRex from '@images/logo-rex.svg';
// @ts-ignore
import logoReact from '@images/logo-react.svg';

import './App.scss';

import { hot } from 'react-hot-loader/root';

import { Button, ConfigProvider, DatePicker } from "antd";

import { FileUpload } from "./upload";

const { RangePicker } = DatePicker;

import moment from 'moment';

import 'dayjs/locale/zh-cn';

import cn from 'antd/es/locale/zh_CN';
import en from 'antd/es/locale/en_US';
console.log('3');
class App extends React.Component<any, any> {

  state = {

  };

  constructor(props: any) {
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

  handleLists = {
    onFileSuccess: (file: object) => {
      console.log(file);
    },
    onFileError: (file: object) => {
      console.log(file);
    },
    setEn: () => {
      this.setState({
        lang: en
      }, ()=>{
        console.log('设置为英文');
      })
    }
  };
  
  render() {
    const defaultValue: any = [
      moment('2018-01-01', 'YYYY-MM-DD'), moment('2020-03-12', 'YYYY-MM-DD')
    ];
    return (
        <ConfigProvider locale={this['state']['lang']}>
          <div className="App">
            <header className="App-header">
              <FileUpload title='文件上传' onSuccess={this.handleLists.onFileSuccess} onError={this.handleLists.onFileError} />
              <br/>
              <Button ghost type='primary' onClick={this.handleLists.setEn}>切换语言</Button>
              <br/>
              <RangePicker defaultValue={defaultValue} />
              <div className='App-logo'>
                <img src={logoReact} className="App-logo-react" alt="logo-react" />
                <img src={logoRex} className="App-logo-rex" alt="logo-rex" />
              </div>
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
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
