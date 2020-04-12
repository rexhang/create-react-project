import * as React from "react";

import './Footer.scss';

import {GithubOutlined, CopyrightOutlined} from '@ant-design/icons';

export class Footer extends React.Component<any, any>{
    render(): React.ReactNode {
        return (
            <div className='App-Footer'>
                Copyright <CopyrightOutlined /> 2020 RexHang <a href="https://github.com/rexhang"><GithubOutlined /></a>
            </div>
        );
    }
}