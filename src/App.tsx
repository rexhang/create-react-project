import * as React from 'react';

import logoRex from '@images/logo-rex.svg';

import logoReact from '@images/logo-react.svg';

import {Button, ConfigProvider, DatePicker, Result} from "antd";

import { SmileOutlined } from '@ant-design/icons';

import {FileUpload} from "./upload";

const {RangePicker} = DatePicker;

import moment from 'moment';

import 'dayjs/locale/zh-cn';

import cn from 'antd/es/locale/zh_CN';
import en from 'antd/es/locale/en_US';

import './App.scss';

import './App.less';

import './App.styl';

import {Link} from "react-router-dom";

class App extends React.Component<any, any> {

    state = {};

    constructor(props: any) {
        super(props);
        this.state = {
            lang: cn,
        };
    }

    test() {
        return new Promise((resolve, reject) => {
            const condition = false;
            if (condition) {
                window.setTimeout(() => {
                    resolve('ok');
                }, 1000);
            }
            window.setTimeout(() => {
                reject('err');
            }, 1000);
        })
    };

    async componentDidMount() {
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
            }, () => {
                console.log('设置为英文');
            })
        }
    };

    render() {
        const defaultValue: any = [
            moment('2020-03-12', 'YYYY-MM-DD'), moment()
        ];
        return (
            <ConfigProvider locale={this['state']['lang']}>
                <div className="App-React">
                    <header className="App-header">
                        <Result
                            icon={<SmileOutlined />}
                            title="欢迎使用本系统~"
                            subTitle="Please go to the control panel for more features."
                            extra={
                                <Button type="primary" key="console">
                                    <Link to='/dashboard'>前往控制面板</Link>
                                </Button>
                            }
                        />
                        {/*<div className='hello hi'></div>*/}
                        {/*<div className='sy hi'></div>*/}
                        {/*<Button ghost type='primary' onClick={this.handleLists.setEn}>切换语言</Button>*/}
                        {/*<RangePicker defaultValue={defaultValue}/>*/}
                        <div className='App-logo'>
                            <img src={logoReact} className="App-logo-react" alt="logo-react"/>
                            <img src={logoRex} className="App-logo-rex" alt="logo-rex"/>
                        </div>
                        {/*<FileUpload title='开始' onSuccess={this.handleLists.onFileSuccess} onError={this.handleLists.onFileError} />*/}
                        <p className='learn-doc'>
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

export default App;
