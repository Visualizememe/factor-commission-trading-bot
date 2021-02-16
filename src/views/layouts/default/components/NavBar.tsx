import React, { MouseEventHandler, useEffect, useState } from "react";
import clsx from "clsx";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import InputIcon from "@material-ui/icons/Input";
import { makeStyles } from "@material-ui/core/styles";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";
import history from "../../../../util/history";
import { useStore } from "react-redux";


export declare type Props = {
    className?: string;
    onSidebarOpen: MouseEventHandler;
    [key: string]: unknown;
}


const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: "none",
        backgroundColor: "#322d2d"
    },
    flexGrow: {
        flexGrow: 1
    },
    signOutButton: {
        marginLeft: theme.spacing(2)
    },
    title: {
        color: "white",
        textDecoration: "none"
    },
    logoLink: {
        textDecoration: "none",
        paddingLeft: "auto",
        paddingRight: "auto"
    },
    toolbar: {
        alignContent: "center",
        textAlign: "center"
    }
}));

export default function NavBar (props: Props) {
    const store = useStore();
    const { className, onSidebarOpen, ...rest } = props;
    const classes = useStyles();
    const [ sessionCookie, setSessionCookie, removeSessionCookie ] = useCookies();
    const snackbar = useSnackbar();
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    
    useEffect(() => {
        const state = store.getState();
        console.log(state);
        
        if (state.session.authToken) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);
    
    const handleSignOut = () => {
        removeSessionCookie("session");
        snackbar.enqueueSnackbar(
            "You're now logged out",
            {
                variant: "success",
                anchorOrigin: {
                    horizontal: "center",
                    vertical: "bottom"
                }
            }
        );
        history.push("/");
    };
    
    return (
        <AppBar
            { ...rest }
            className={ clsx(classes.root, className) }
        >
            <Toolbar className={ classes.toolbar }>
                <Link to="/" className={ classes.logoLink }>
                    <Typography
                        variant="h4"
                        display="inline"
                        align="center"
                        className={ classes.title }
                    >
                        TradingJEDI
                    </Typography>
                </Link>
                <div className={ classes.flexGrow }/>
                {
                    isLoggedIn ? (
                        <IconButton
                            className={ classes.signOutButton }
                            color="inherit"
                            onClick={ handleSignOut }
                        >
                            <InputIcon/>
                        </IconButton>
                    ) : null
                }
            </Toolbar>
        </AppBar>
    );
};
