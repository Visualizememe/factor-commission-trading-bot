import { AppBar, Hidden, IconButton, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputIcon from "@material-ui/icons/Input";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import React, { MouseEventHandler } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import history from "../../../../src/util/history";
import { WhiteTheme } from "../../../util/material/themes/white";


const useStyles = makeStyles((theme: WhiteTheme) => ({
    root: {
        boxShadow: "none",
        backgroundColor: theme.palette.primary.main
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
        textDecoration: "none"
    }
}));

export declare type Props = {
    className?: string;
    onSidebarOpen: MouseEventHandler;
    [key: string]: unknown;
}

const Topbar = (props: Props) => {
    const { className, onSidebarOpen, ...rest } = props;
    const classes = useStyles();
    const [sessionCookie, setSessionCookie, removeSessionCookie] = useCookies();
    const snackbar = useSnackbar();

    const handleSignOut = () => {
        removeSessionCookie("session");
        snackbar.enqueueSnackbar(
            "You're now logged out",
            {
                variant: "success"
            }
        );
        history.push("/");
    };

    return (
        <AppBar
            { ...rest }
            className={ clsx(classes.root, className) }
        >
            <Toolbar>
                <Link to="/" className={ classes.logoLink }>
                    <Typography
                        variant="h4"
                        display="inline"
                        className={ classes.title }
                    >
                        RoEssentials
                    </Typography>
                </Link>
                <div className={ classes.flexGrow }/>
                <Hidden mdDown>
                    <IconButton
                        className={ classes.signOutButton }
                        color="inherit"
                        onClick={ handleSignOut }
                    >
                        <InputIcon/>
                    </IconButton>
                </Hidden>
                <Hidden lgUp>
                    <IconButton
                        color="inherit"
                        onClick={ onSidebarOpen }
                    >
                        <MenuIcon/>
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
