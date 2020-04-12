import * as React from "react";

import logo from "@images/logo-rex.svg";

import './Logo.scss';

export class Logo extends React.Component<any, any>{

    render(): React.ReactNode {
        return (
            <div className="rex-admin-sider-menu-logo" id="logo">
                <a href="/">
                    <img src={logo} alt="logo" />
                    <h1>Rex Admin System</h1>
                </a>
            </div>
        )
    }
}