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
                                        title="Welcome to the dashboard"
                                        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                                        extra={
                                            [
                                                <Button type="primary" key="console">
                                                    Go Console
                                                </Button>,
                                                <Button key="buy">Buy Again</Button>
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