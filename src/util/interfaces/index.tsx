import { MatchedRoute, RouteConfig } from "react-router-config";
import React from "react";


export * from "./redux";

export declare type MatchedRouteParams = {
    routes: RouteConfig[];
};
export declare type DefaultProps = {
    history: History;
    location: Location;
    match: MatchedRoute<any>["match"];
    route: MatchedRoute<any>["route"] & {
        routes: RouteConfig[];
    };
    children: React.ReactNode;
};
