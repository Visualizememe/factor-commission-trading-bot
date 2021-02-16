import { Hidden, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh"
    }
}));

const Loader = (props: { duration?: number }) => {
    const classes = useStyles();
    const [ show, setShow ] = useState(false);
    useEffect(() => {
        setTimeout(() => setShow(true), props.duration || 1000);
    });
    
    return <div className={ classes.root }>
        {
            show && <Hidden implementation="js">
                <LinearProgress style={ { height: 4, color: "#cf1717", backgroundColor: "#008eff" } }/>
            </Hidden>
        }
    </div>;
};

export default Loader;
