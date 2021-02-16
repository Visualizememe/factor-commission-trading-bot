import React, { lazy } from "react";
import { RouteConfig } from "react-router-config";
import { Redirect } from "react-router-dom";
import DefaultLayout from "../views/layouts/default/DefaultLayout";


const routes = [
    {
        path: "/",
        component: DefaultLayout,
        routes: [
            {
                path: "/",
                exact: true,
                component: lazy(() => import("../views/pages/default/index"))
            },
            {
                path: "*",
                component: () => <Redirect to="/"/>
            }
        ] as unknown as RouteConfig[]
    }
] as unknown as RouteConfig[];

export default routes;
