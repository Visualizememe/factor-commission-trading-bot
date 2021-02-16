import { Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { WhiteTheme } from "../../../../../util/material/themes/white";
import { updateServerData, updateServerNickname } from "../../../../../util/webAPI/api";
import { updateSettings } from "../../misc";
import { Props } from "./General";


const useStyles = makeStyles((theme: WhiteTheme) => ({
    baseMargin: {
        marginTop: 25
    },
    settingsTitle: {
        marginTop: 25,
        marginBottom: 20
    }
}));

// Bot Settings
export default (props: Props) => {
    const [state, setState] = useState({
        inputPrefix: props.server.data.prefix,
        inputNickname: ""
    });
    const classes = useStyles();
    const snackbar = useSnackbar();

    const handleTextInput = (target: keyof typeof state) => (event: React.ChangeEvent<{ value: unknown }>) => {
        event.persist();

        const newValue = event.target.value as string;

        setState(prevState => ({
            ...prevState,
            [target]: newValue
        }));
    };

    return (
        <Grid
            item
            lg={ 8 }
            md={ 8 }
            sm={ 10 }
            xs={ 12 }
        >
            <Typography
                variant="h5"
                align="center"
                className={ classes.settingsTitle }
            >
                Bot Settings
            </Typography>
            <TextField
                fullWidth
                id="input-nickname"
                label="Bot Nickname"
                defaultValue="RoEssentials"
                helperText="Per-server basis only"
                variant="outlined"
                size="small"
                value={ state.inputNickname }
                onChange={ handleTextInput("inputNickname") }
                inputProps={ {
                    maxLength: 32
                } }
                onBlur={ () => {
                    updateServerNickname(props.server.id, state.inputNickname)
                        .then(success => {
                            snackbar.enqueueSnackbar(
                                (success ? `Successfully updated ` : `Failed to update `) + "nickname",
                                {
                                    variant: success ? "success": "error"
                                }
                            )
                        })
                } }
            />
            <TextField
                fullWidth
                id="input-prefix"
                label="Bot Prefix"
                defaultValue="RoEssentials"
                helperText="Per-server basis only"
                variant="outlined"
                size="small"
                className={ classes.baseMargin }
                value={ state.inputPrefix }
                onChange={ handleTextInput("inputPrefix") }
                onBlur={ () => {
                    updateServerData(props.server.id, "prefix", state.inputPrefix)
                        .then(success => {
                            snackbar.enqueueSnackbar(
                                (success ? `Successfully updated ` : `Failed to update `) + "prefix",
                                {
                                    variant: success ? "success": "error"
                                }
                            )
                        })
                } }
            />
        </Grid>
    );
}
