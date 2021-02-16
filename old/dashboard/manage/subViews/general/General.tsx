import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import React from "react";
import FadeIn from "react-fade-in";
import { DiscordServer } from "../../../../../util/interfaces/types";
import { WhiteTheme } from "../../../../../util/material/themes/white";
import BotSettings from "./BotSettings";
import SendMessage from "./SendMessage";


const useStyles = makeStyles((theme: WhiteTheme) => ({
    root: {
        marginTop: 25,
        minHeight: "100vh",
        height: "auto",
        paddingBottom: 50
    },
    baseMargin: {
        marginTop: 25
    },
    rootTitle: {},
    rootDiv: {
        marginTop: 25
    },
    settingsTitle: {
        marginTop: 25,
        marginBottom: 20
    }
}));

interface State {
    nickname: string;
    prefix: string;
}

export interface Props {
    server: DiscordServer;
}

export default function General (props: Props) {
    const classes = useStyles();
    const snackbar = useSnackbar();

    return (
        <FadeIn delay={ 20 } className={ classes.root }>
            <Typography
                variant="h2"
                align="center"
                className={ classes.rootTitle }
            >
                General Settings
            </Typography>

            <div className={ classes.rootDiv }>
                <Grid
                    container
                    spacing={ 4 }
                    className={ classes.baseMargin }
                    justify="space-evenly"
                >
                    { /* Bot settings */ }
                    <BotSettings
                        { ...props }
                    />
                    <Grid
                        item
                        lg={ 8 }
                        md={ 8 }
                        sm={ 10 }
                        xs={ 12 }
                    >
                        { /* Send Message */ }
                        <SendMessage
                            { ...props }
                        />
                    </Grid>
                </Grid>
            </div>
        </FadeIn>
    );
}
