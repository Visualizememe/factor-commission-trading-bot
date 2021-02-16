import { makeStyles } from "@material-ui/core/styles";
import React from "react";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        minHeight: "100vh",
        zIndex: 10000
    }
}));

const MainLoader = () => {
    const classes = useStyles();
    
    return <div className={ classes.root }/>;
};

export default MainLoader;
