import * as React from "react";

import { Switch, Route } from 'react-router-dom';

import {RouteInterface} from "../../assets/interface";

import {MenuBar} from "./components/MenuBar";

import {Body} from "./components/Body";

import {Wraps} from "./components/Wraps";

import { Result, Button } from "antd";

import './Dashboard.scss';

export class Dashboard extends React.Component<any, any>{

    render(): React.ReactNode {
        const { routes = [] } = this.props;
        const isIndex = this.props.location.pathname === '/dashboard/' || this.props.location.pathname === '/dashboard';
        return (
            <div className='App-Dashboard'>
                <MenuBar />
                <Body>
                    {
                        isIndex?
                            <div className='home'>
                                <Wraps>
                                    <Result
                                        status="success"
                                        title="欢迎来到仪表盘"
                                        subTitle="Welcome to use react framework development."
                                        extra={
                                            [
                                                <Button type="primary" key="1">确 认</Button>,
                                                <Button key="2">取消</Button>
                                            ]
                                        }
                                        />
                                </Wraps>
                            </div>:
                            <div className="route">
                                <Switch>
                                    {
                                        routes.map((route: RouteInterface, key: number)=>{
                                            return (
                                                <Route
                                                    key={key}
                                                    path={route.path}
                                                    exact={route.exact}
                                                    render={props => {
                                                        return (
                                                            <Wraps>
                                                                <route.component {...props} routes={route.routes?route.routes:[]} />
                                                            </Wraps>
                                                        )
                                                    }}
                                                />
                                            );
                                        })
                                    }
                                </Switch>
                            </div>
                    }
                </Body>
            </div>
        )
    }
}