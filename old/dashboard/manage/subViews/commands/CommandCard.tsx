import { Card, CardActions, CardContent, Grid, Switch, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { WhiteTheme } from "../../../../../util/material/themes/white";


export declare type Props = {
    title: string;
    description: string;
    activated: boolean;
    category: string;
    onActivated: (set: boolean) => void;
    disableToggle?: boolean;
};

const useStyles = makeStyles((theme: WhiteTheme) => ({
    root: {},
    card: {},
    categoryTitle: {
        fontSize: 14,
        color: "#8a8a8a"
    },
    title: {
        color: "#ececec"
    },
    description: {
        color: "#bababa"
    },
    switch: {
        zIndex: 1000
    },
    cardContent: {
        backgroundColor: "#212121"
    }
}));

export default function CommandCard (props: Props) {
    const classes = useStyles();
    const [activated, setActivated] = useState(typeof props.activated !== "undefined" ? props.activated : true);
    const [hovered, setHovered] = useState(false);

    const handleActivated = (set?: boolean) => () => {
        let previousActivated;
        setActivated(prevState => {
            previousActivated = prevState;
            return typeof set !== "undefined" ? set : !previousActivated;
        });
        // State hasn't been updated yet, unfortunately
        props.onActivated(typeof set !== "undefined" ? set : !previousActivated);
    };
    const handleHovered = (set: boolean) => () => {
        setHovered(set);
    };

    return (
        <Grid item
              xs={ 10 }
              lg={ 4 }
              className={ classes.root }
              onMouseOver={ handleHovered(true) }
              onMouseOut={ handleHovered(false) }
        >
            <Card className={ classes.card } elevation={ hovered ? 4 : 2 }>
                <CardContent
                    className={ classes.cardContent }
                >
                    <Typography
                        className={ classes.categoryTitle }
                        gutterBottom
                    >
                        Category: { props.category }
                    </Typography>
                    <Typography
                        className={ classes.title }
                        variant="h5"
                        component="h2"
                        gutterBottom
                    >
                        { props.title }
                    </Typography>
                    <Typography
                        variant="body2"
                        component="p"
                        className={ classes.description }
                    >
                        { props.description }
                    </Typography>
                </CardContent>
                {
                    !props.disableToggle && (
                        <CardActions>
                            <Switch
                                checked={ activated }
                                onChange={ handleActivated() }
                                name={ `commands-switch-${ props.title }` }
                                color="primary"
                                className={ classes.switch }
                            />
                        </CardActions>
                    )
                }
            </Card>
        </Grid>
    );
}
