import { Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import FadeIn from "react-fade-in";
import { DiscordGuildChannel, DiscordServer, DiscordServerData } from "../../../../../util/interfaces/types";
import { WhiteTheme } from "../../../../../util/material/themes/white";
import { DataString, updateServerData } from "../../../../../util/webAPI/api";
import ServerPicker, { OtherListItem } from "../general/components/ServerChannelPicker/ServerPicker";


const useStyles = makeStyles((theme: WhiteTheme) => ({
    root: {
        minHeight: "100vh",
        height: "auto",
        paddingBottom: 50
    },
    baseMargin: {
        marginTop: 25
    },
    settingsTitle: {
        marginTop: 25,
        marginBottom: 20
    },
    items: {
        marginTop: 25
    },
    list: {}
}));
const yesOrNoList = [
    {
        label: "yes",
        value: 1
    },
    {
        label: "no",
        value: 0
    }
];

interface State {
    selectedWelcomeEnabled: OtherListItem | null;
    // If we should put welcome logs for users
    selectedEnableWelcomeLogs: OtherListItem | null;
    // The channel to put welcome logs in
    selectedWelcomeLogChannel: OtherListItem | null;
    selectedWelcomeSendDMs: OtherListItem | null;

    inputWelcomeEnabled: string;
    inputEnableWelcomeLogs: string;
    inputWelcomeLogChannel: string;
    inputWelcomeSendDMs: string;
    inputWelcomeMessage: string;
}

interface Props {
    server: DiscordServer;
}

export default function Verification (props: Props) {
    const classes = useStyles();
    const welcomeData = props.server.data.welcomeSettings;
    const [state, setState] = useState({
        selectedWelcomeEnabled: props.server.data.welcomeEnabled ? yesOrNoList.find(l => l.value === 1) : null,
        selectedEnableWelcomeLogs: welcomeData.membersLog ? yesOrNoList.find(l => l.value === 1) : null,
        selectedWelcomeLogChannel: welcomeData.memberLogChannel ? props.server.channels.find(c => c.id === welcomeData.memberLogChannel) : null,
        selectedWelcomeSendDMs: welcomeData.sendDM ? yesOrNoList.find(l => l.value === 1) : null,
        inputWelcomeEnabled: "",
        inputEnableWelcomeLogs: "",
        inputWelcomeLogChannel: "",
        inputWelcomeSendDMs: "",
        inputWelcomeMessage: welcomeData.message
    } as State);
    const snackbar = useSnackbar();

    const handleTextInput = (target: keyof typeof state) => (event: React.ChangeEvent<{ value: unknown }>) => {
        event.persist();

        setState(prevState => ({
            ...prevState,
            [target]: event.target.value as string
        }));
    };

    const handleSelect = (target: keyof typeof state, updateName?: DataString, callback?: (data: unknown) => unknown, finishedCallback?: (success: boolean) => unknown) => (event: React.ChangeEvent<{}>, newData: unknown) => {
        setState(prevState => ({
            ...prevState,
            [target]: newData
        }));

        if (updateName && callback && finishedCallback) {
            // Update settings
            const data = callback(newData);
            updateServerData(props.server.id, updateName, data as DiscordServerData[typeof updateName])
                .then(success => {
                    console.log("Success:", success);
                    finishedCallback(success);
                });
        }
    };
    const handleSelectInput = (target: keyof typeof state) => (event: React.ChangeEvent<{}>, newData: unknown) => {
        setState(prevState => ({
            ...prevState,
            [target]: newData as string
        }));
    };

    return (
        <FadeIn delay={ 20 } className={ classes.root }>
            <Typography
                variant="h2"
                align="center"
                className={ classes.settingsTitle }
            >
                Welcome Settings
            </Typography>
            <Grid
                container
                spacing={ 4 }
                justify="center"
                className={ classes.items }
            >
                { /* Enable welcome-related messages */ }
                <Grid
                    item
                    xs={ 12 }
                    md={ 3 }
                    lg={ 3 }
                >
                    <ServerPicker
                        otherList={ yesOrNoList }
                        inputProps={ {
                            helperText: "Enable welcome-related messages",
                            label: "Welcome Enabled"
                        } }
                        value={ state.selectedWelcomeEnabled }
                        inputValue={ state.inputWelcomeEnabled }
                        onChange={
                            handleSelect(
                                "selectedWelcomeEnabled",
                                "welcomeEnabled",
                                data => (data as null | OtherListItem)?.value === 1,
                                success => {
                                    snackbar.enqueueSnackbar(
                                        `${ success ? "Successfully updated " : "Failed to update " } the welcome enable setting`,
                                        {
                                            variant: success ? "success" : "error"
                                        }
                                    );
                                }
                            )
                        }
                        onInputChange={ handleSelectInput("inputWelcomeEnabled") }
                    />
                </Grid>
                { /* Enable members join log */ }
                <Grid
                    item
                    xs={ 12 }
                    md={ 3 }
                    lg={ 3 }
                >
                    <ServerPicker
                        otherList={ yesOrNoList }
                        inputProps={ {
                            helperText: "Enable members join log",
                            label: "Members Join Log"
                        } }
                        value={ state.selectedEnableWelcomeLogs }
                        inputValue={ state.inputEnableWelcomeLogs }
                        onChange={
                            handleSelect(
                                "selectedEnableWelcomeLogs",
                                "welcomeSettings",
                                data => ({
                                    membersLog: (data as OtherListItem | null)?.value === 1
                                }) as DiscordServerData["welcomeSettings"],
                                success => {
                                    snackbar.enqueueSnackbar(
                                        `${ success ? "Successfully updated " : "Failed to update " } the enable welcome logs setting`,
                                        {
                                            variant: success ? "success" : "error"
                                        }
                                    );
                                }
                            )
                        }
                        onInputChange={ handleSelectInput("inputEnableWelcomeLogs") }
                    />
                </Grid>
                { /* Send DMs with welcome messages */ }
                <Grid
                    item
                    xs={ 12 }
                    md={ 3 }
                    lg={ 3 }
                >
                    <ServerPicker
                        otherList={ yesOrNoList }
                        inputProps={ {
                            helperText: "Send DMs with welcome message",
                            label: "DM Welcome Message"
                        } }
                        value={ state.selectedWelcomeSendDMs }
                        inputValue={ state.inputWelcomeSendDMs }
                        onChange={
                            handleSelect(
                                "selectedWelcomeSendDMs",
                                "welcomeSettings",
                                data => ({
                                    sendDM: (data as null | OtherListItem)?.value === 1
                                }) as DiscordServerData["welcomeSettings"],
                                success => {
                                    snackbar.enqueueSnackbar(
                                        `${ success ? "Successfully updated " : "Failed to update " } the welcome send dms setting`,
                                        {
                                            variant: success ? "success" : "error"
                                        }
                                    );
                                }
                            )
                        }
                        onInputChange={ handleSelectInput("inputWelcomeSendDMs") }
                    />
                </Grid>
                { /* Channel id for member logs */ }
                <Grid
                    item
                    xs={ 12 }
                    md={ 9 }
                    lg={ 8 }
                >
                    <ServerPicker
                        channels={ props.server.channels }
                        inputProps={ {
                            className: classes.baseMargin,
                            helperText: "Sets the welcome channel for welcome messages",
                            label: "Welcome Channel"
                        } }
                        value={ state.selectedWelcomeLogChannel }
                        inputValue={ state.inputWelcomeLogChannel }
                        onChange={ handleSelect(
                            "selectedWelcomeLogChannel",
                            "welcomeSettings",
                            data => ({
                                memberLogChannel: (data as null | DiscordGuildChannel)?.id ?? null
                            }) as DiscordServerData["welcomeSettings"],
                            success => {
                                snackbar.enqueueSnackbar(
                                    `${ success ? "Successfully updated " : "Failed to update " } the welcome log channel setting`,
                                    {
                                        variant: success ? "success" : "error"
                                    }
                                );
                            }
                        ) }
                        onInputChange={ handleSelectInput("inputWelcomeLogChannel") }
                    />
                </Grid>
                <Grid
                    item
                    xs={ 12 }
                    md={ 9 }
                    lg={ 8 }
                >
                    <TextField
                        multiline
                        fullWidth
                        className={ classes.baseMargin }
                        value={ state.inputWelcomeMessage }
                        onChange={ handleTextInput("inputWelcomeMessage") }
                        variant="outlined"
                        helperText="The welcome message for new members"
                        label="Welcome Message"
                        rows={ 4 }
                        rowsMax={ 16 }
                        onBlur={ () => {
                            updateServerData(props.server.id, "welcomeSettings", {
                                message: state.inputWelcomeMessage
                            } as DiscordServerData["welcomeSettings"])
                                .then(success => {
                                    snackbar.enqueueSnackbar(
                                        `${ success ? "Successfully updated " : "Failed to update " } the welcome message`,
                                        {
                                            variant: success ? "success" : "error"
                                        }
                                    );
                                });
                        } }
                    />
                    <ul className={ classes.list }>
                        <li>{ `{username} - Replaces with Discord username` }</li>
                        <li>{ `{roblox_username} - Replaces with Roblox username` }</li>
                        <li>{ `{roblox_userid} - Replaces with their Roblox user id` }</li>
                        <li>{ `{roblox_group_id} - Replaces with the Roblox group id` }</li>
                        <li>{ `{roblox_group_name} - Replaces with the Roblox group name` }</li>
                        <li>{ `{roblox_group_rank} - Replaces with the Roblox group rank` }</li>
                        <li>{ `{roblox_group_role} - Replaces with the Roblox group role name` }</li>
                        <li>{ `Leave blank - Don't update the nickname` }</li>
                    </ul>
                </Grid>
            </Grid>
        </FadeIn>
    );
}
