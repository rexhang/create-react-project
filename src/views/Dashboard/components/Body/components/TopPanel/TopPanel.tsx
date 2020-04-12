import * as React from "react";

import { Breadcrumb } from 'antd';

import { HomeOutlined, UserOutlined } from '@ant-design/icons';

import { withRouter } from 'react-router-dom';

import {PageHeader} from "antd";

import './TopPanel.scss';

import routes from '../../../../../../router';

// @ts-ignore
@withRouter
class TopPanel extends React.Component<any, any>{
    componentDidMount(): void {
        console.log(this.props);
        console.log(routes);
    }

    render(): React.ReactNode {
        const { location } = this.props;
        return (
            <div className='App-Top-Panel'>
                <div className="App-header">
                    <PageHeader
                        className="site-page-header"
                        // onBack={() => null}
                        title="版块名称"
                        subTitle="版块的功能描述信息..."
                    />
                </div>

                <div className="App-Breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            主页
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="">导航</a>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
        </div>
        )
    }
}

export {TopPanel};