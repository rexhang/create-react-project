import * as React from 'react';
import { Route } from 'react-router-dom';
import { RouteInterface } from './interface';

export const RouteWithSubRoutes = (route: RouteInterface, key: number) => {
    return (
        <Route
            key={key}
            path={route.path}
            exact={route.exact}
            render={props => {
                return (
                    <route.component {...props} routes={route.routes?route.routes:[]} />
                )
            }}
        />
    )
};