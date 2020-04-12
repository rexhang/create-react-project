import * as React from "react";
import { Menu, Button } from 'antd';
import logo from '@images/logo-rex.svg';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';

import {Logo} from './components/Logo';

import {Link} from 'react-router-dom';

const { SubMenu } = Menu;

import './MenuBar.scss';

import { menuConfig } from "../../../../menu.config";

export class MenuBar extends React.Component<any, any> {
    state = {
        collapsed: false,
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    renderChild = (menuConfig: any[]) => {
        return menuConfig.map(v=>{
            if (v.children){
                return (
                    <SubMenu
                        key={v.key}
                        title={
                            <span>
                                <MailOutlined />
                                {v.name}
                            </span>
                        }
                    >
                        {
                            this.renderChild(v.children)
                        }
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={v.key}>
                        <PieChartOutlined />
                        <Link to={v.path}>{v.name}</Link>
                    </Menu.Item>
                )
            }
        });
    }

    render() {
        return (
            <div className={'App-Menu-Bar'}>

                {/*<Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>*/}

                <Logo />
                <div className="App-Menu">
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={[]}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={this.state.collapsed}
                    >
                        {
                            this.renderChild(menuConfig)
                        }
                    </Menu>
                </div>
            </div>
        );
    }
}