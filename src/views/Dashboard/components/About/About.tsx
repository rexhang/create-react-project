import * as React from "react";

import './About.less';

import {RouteInterface} from "../../../../assets/interface";

import {Route, Switch} from "react-router-dom";

import {Wraps} from "../Wraps";

export class About extends React.Component<any, any>{
    render(): React.ReactNode {
        const { routes } = this.props;
        console.warn(routes);
        return (
            <div className='App-Dashboard-About'>
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
        )
    }
}