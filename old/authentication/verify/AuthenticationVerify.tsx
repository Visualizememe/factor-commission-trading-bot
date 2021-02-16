import { makeStyles } from "@material-ui/core/styles";
import querystring from "querystring";
import React, { useEffect } from "react";
import Lottie from "react-lottie";
import { Redirect } from "react-router-dom";
import config from "../../../src/config";
import { WhiteTheme } from "../../../../util/material/themes/white";
import successAnimation from "./success.json";


const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

const useStyles = makeStyles((theme: WhiteTheme) => ({
    root: {
        backgroundColor: theme.palette.secondary.main,
        height: "100vh"
    }
}));


const AuthenticationVerify = (props: { location: Location; }) => {
    const targetWindow = window.opener;
    const params = querystring.parse(props.location.search.slice(1));
    const classes = useStyles();

    useEffect(() => {
        if (!targetWindow) return window.close();


        targetWindow.postMessage({
            toAuth: true,
            code: params.code,
            state: params.state
        }, config.host);

        setTimeout(() => {
            window.close();
        }, 1500);
    }, []);

    if (!targetWindow || !params || !params.code) {
        return (
            <Redirect to="/auth/"/>
        );
    }

    return (
        <div className={ classes.root }>
            <Lottie
                options={ defaultOptions }
                height={ 400 }
                width={ 400 }
                isStopped={ false }/>
        </div>
    );
};

export default AuthenticationVerify;
