import * as React from 'react';
import { HashRouter, Switch, Link } from 'react-router-dom';
import routes from './router';
import { RouteWithSubRoutes } from './assets/common';
import { RouteInterface } from './assets/interface';
import {hot} from 'react-hot-loader/root';
import './Application.styl';

const Application: React.FC = () => {
    return (
        <HashRouter>
            <div className="App">
                <Switch>
                    {
                        routes.map((route: RouteInterface, i: number) => {
                            return RouteWithSubRoutes(route, i);
                        })
                    }
                </Switch>
            </div>
        </HashRouter>
    );
}

export default hot(Application);