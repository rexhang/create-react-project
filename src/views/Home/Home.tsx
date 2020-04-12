import * as React from "react";

import {Button, Result} from "antd";

import { SmileOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";

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
            </div>
        )
    }
}