import * as React from "react";

import logo from "@images/logo-rex.svg";

import './Logo.scss';

export class Logo extends React.Component<any, any>{

    render(): React.ReactNode {
        return (
            <div className="rex-admin-sider-menu-logo" id="logo">
                <a href="/">
                    <img src={logo} alt="logo" />
                    <h1>后台管理系统</h1>
                </a>
            </div>
        )
    }
}