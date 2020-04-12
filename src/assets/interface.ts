interface RouteInterface {
    path: string,
    exact: boolean,
    component: any,
    routes?: Array<object>
}

export {
    RouteInterface
};