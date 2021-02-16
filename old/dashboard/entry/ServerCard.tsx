import { Avatar, Button, Grid, ListItem, ListItemSecondaryAction, ListItemText, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import initials from "initials";
import React from "react";
import history from "../../../src/util/history";
import { WhiteTheme } from "../../../util/material/themes/white";


export declare type Props = {
    title?: string;
    image?: string;
    isLoading?: boolean;
    link?: string;
    buttonText?: string;
    buttonClass?: any;
};

const useStyles = makeStyles((theme: WhiteTheme) => ({
    root: {},
    serverCardListItem: {
        height: "65px",
        display: "flex",
        alignItems: "center",
        listStyleType: "none"
    },
    serverCardAvatar: {
        left: 0,
        marginRight: 15
    },
    serverCardTitle: {},
    serverCardManageButton: {
        backgroundColor: green["400"],
        color: "#ffffff",
        marginBottom: "auto",
        "&:hover": {
            backgroundColor: green["600"]
        }
    }
}));
const animation: "pulse" | "wave" = "pulse";

export default function ServerCard (props: Props) {
    const classes = useStyles();

    const onClick = (toUrl?: string) => () => {
        if (toUrl) {
            setTimeout(() => {
                if (toUrl.includes("http")) {
                    window.open(toUrl, "_blank");
                } else {
                    history.push(toUrl);
                }
            }, 200);
        }
    };
    console.log(props);

    return (
        <Grid item
              lg={ 7 }
              md={ 8 }
              xs={ 12 }
              className={ classes.root }
        >
            <ListItem
                button
                className={ classes.serverCardListItem }
                disabled={ props.isLoading }
                onClick={ onClick(props.link) }
            >
                { props.isLoading ? (
                    <Skeleton
                        variant="circle"
                        animation={ animation }
                        height={ 40 }
                        width={ 40 }
                        className={ classes.serverCardAvatar }
                    />
                ) : (
                    <Avatar
                        alt={ props.title }
                        src={ props.image }
                        className={ classes.serverCardAvatar }
                    >
                        { initials(props.title as string) }
                    </Avatar>
                )
                }
                <ListItemText>
                    {
                        props.isLoading ? (
                            <Skeleton
                                animation={ animation }
                                height={ 35 }
                                width="100%"
                                className={ classes.serverCardTitle }
                            />
                        ) : (
                            <Typography
                                variant="h5"
                                className={ classes.serverCardTitle }
                            >
                                { props.title }
                            </Typography>
                        )
                    }
                </ListItemText>
                {
                    props.isLoading ? null : (
                        <ListItemSecondaryAction>
                            <Button
                                variant="contained"
                                className={ props.buttonClass || classes.serverCardManageButton }
                                size="small"
                                autoCapitalize={ "false" }
                                onClick={ onClick(props.link) }
                            >
                                { props.buttonText || "Manage" }
                            </Button>
                        </ListItemSecondaryAction>
                    )
                }
            </ListItem>
        </Grid>
    );
};
