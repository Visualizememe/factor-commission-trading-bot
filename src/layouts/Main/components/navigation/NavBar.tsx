import { AppBar, Box, Hidden, IconButton, Toolbar, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { useStore } from "react-redux";
import history from "../../../../util/history";
import SideDrawer from "./SideDrawer";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },
    grid: {
        height: "100%"
    },

    dashboard: {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.success.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.info.main,
            color: theme.palette.info.contrastText
        }
    },
    button: {
        backgroundColor: "inherit",
        color: "inherit",
        "&:hover": {
            backgroundColor: theme.palette.grey.A700
        },
        marginRight: 10,
        textDecoration: "none"
    },
    logo: {
        backgroundColor: "transparent",
        color: "white"
    }
}));

const NavBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const classes = useStyles();
    const store = useStore();
    const currentState = store.getState();


    return (
        <AppBar color="primary" position="sticky" className={classes.root}>
            <Toolbar>
                <Box display="flex" alignItems="center">
                    <Hidden smUp>
                        <Box mr={ 1 }>
                            <IconButton
                                aria-label="Open Navigation"
                                onClick={ () => history.push("/") }
                                color="primary"
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Box>
                    </Hidden>
                    <Hidden xsDown>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <Typography
                                variant="h4"
                                display="inline"
                                className={ classes.logo }
                            >
                                RoEssentials
                            </Typography>
                        </Link>
                    </Hidden>
                </Box>
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    width="100%"
                >
                    <Button
                        className={ classes.button }
                        color="inherit"
                        onClick={ () => history.push("/commands") }
                    >
                        Commands
                    </Button>
                    <Button
                        className={ classes.dashboard }
                        onClick={ () => history.push("/dashboard") }
                    >
                        Dashboard
                    </Button>
                </Box>
            </Toolbar>
            <SideDrawer open={ drawerOpen }/>
        </AppBar>
    );
};

export default NavBar;
