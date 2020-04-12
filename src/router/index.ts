import { Home } from "../views/Home";

import { Login } from '../views/Login';

import { Dashboard } from '../views/Dashboard';
import { Case } from "../views/Dashboard/components/Case";
import { DataCenter } from "../views/Dashboard/components/DataCenter";
import { Result404 } from "../views/Dashboard/components/Result404";

import { About } from '../views/Dashboard/components/About';
import { Author } from "../views/Dashboard/components/About/components/Author";
import { Project } from "../views/Dashboard/components/About/components/Project";

const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/login',
        exact: false,
        component: Login
    },
    {
        path: '/dashboard',
        exact: false,
        component: Dashboard,
        routes: [
            {
                path: '/dashboard/case',
                exact: true,
                component: Case
            },
            {
                path: '/dashboard/data-center',
                exact: true,
                component: DataCenter
            },
            {
                path: '/dashboard/404',
                exact: true,
                component: Result404
            },
            {
                path: '/dashboard/about',
                exact: false,
                component: About,
                routes: [
                    {
                        path: '/dashboard/about/author',
                        exact: true,
                        component: Author
                    },
                    {
                        path: '/dashboard/about/project',
                        exact: true,
                        component: Project
                    }
                ]
            },
        ]
    }
];

export default routes;