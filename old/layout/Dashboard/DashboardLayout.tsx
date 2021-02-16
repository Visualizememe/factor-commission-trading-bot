import { useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useStore } from "react-redux";
import { MatchedRoute, renderRoutes, RouteConfig } from "react-router-config";
import history from "../../../src/util/history";
import { UserData } from "../../util/interfaces/types";
import Topbar from "./components/Topbar";


const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 56,
        height: "100%",
        [theme.breakpoints.up("sm")]: {
            paddingTop: 64
        }
    }
}));
export declare type Props = {
    route: MatchedRoute<any>["route"] & {
        routes: RouteConfig[];
    };
};

declare type UserDataState = UserData | null;

const DashboardLayout = (props: Props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [openSidebar, setOpenSidebar] = useState(false);
    const [userData, setUserData] = useState({} as {
        userData: UserDataState;
    });
    const store = useStore();
    const [cookies, setCookie] = useCookies();
    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
        defaultMatches: true
    });
    const shouldOpenSidebar = isDesktop ? true : openSidebar;

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };
    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    useEffect(() => {
        if (!cookies.session) {
            return history.push("/auth");
        }
    }, []);

    /*.
    const storeState = store.getState();
    console.log(storeState);

    if (!storeState.session || !storeState.session.loggedIn) {
        return (
            <Redirect to="/auth"/>
        )
    }*/

    return (
        <div
            className={ classes.root }
        >
            <Topbar onSidebarOpen={ handleSidebarOpen }/>
            <main>
                {
                    renderRoutes(props.route.routes)
                }
            </main>
        </div>
    );
};

export default DashboardLayout;
