import * as React from "react";

import {Button, Result} from "antd";

import { SmileOutlined } from '@ant-design/icons';

import {Link} from "react-router-dom";

import logoReact from "@images/logo-react.svg";

import logoRex from "@images/logo-rex.svg";

import './Home.scss';

export class Home extends React.Component<any, any>{
    render(): React.ReactNode {
        return (
            <div className="App-Home">
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
                <div className="App-info">
                    <div className='App-Home-logo'>
                        <img src={logoReact} className="App-logo-react" alt="logo-react"/>
                        <img src={logoRex} className="App-logo-rex" alt="logo-rex"/>
                    </div>
                    {/*<FileUpload title='开始' onSuccess={this.handleLists.onFileSuccess} onError={this.handleLists.onFileError} />*/}
                    <p className='learn-doc'>
                        Edit <code>src/Application.tsx</code> and save to reload.
                    </p>
                    <a
                        className="App-info-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </div>


            </div>
        )
    }
}