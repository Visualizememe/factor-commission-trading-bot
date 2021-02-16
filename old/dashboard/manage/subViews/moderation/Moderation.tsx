import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import FadeIn from "react-fade-in";
import {
    DiscordGuildChannel,
    DiscordGuildRole,
    DiscordServer,
    DiscordServerData
} from "../../../../../util/interfaces/types";
import { WhiteTheme } from "../../../../../util/material/themes/white";
import { DataString, updateServerData } from "../../../../../util/webAPI/api";
import ServerPicker, { OtherListItem } from "../general/components/ServerChannelPicker/ServerPicker";


const useStyles = makeStyles((theme: WhiteTheme) => ({
    root: {
        minHeight: "100vh",
        height: "auto",
        marginTop: 25,
        paddingBottom: 50
    },
    settingsTitle: {
        marginTop: 25,
        marginBottom: 20
    },
    items: {
        marginTop: 25
    }
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
    inputModerationLogsChannel: string;
    selectedModerationLogsChannel: DiscordGuildChannel | null;
    inputFilterDiscordInvites: string;
    selectedFilterDiscordInvites: OtherListItem | null;
    inputFilterMassMentions: string;
    selectedFilterMassMentions: OtherListItem | null;
    inputFilterSwearWords: string;
    selectedFilterSwearWords: OtherListItem | null;
}

interface Props {
    server: DiscordServer;
}

export default function ModerationSubView (props: Props) {
    const classes = useStyles();
    const moderationData = props.server.data.moderationSettings;
    console.log(props.server);
    const [state, setState] = useState({
        inputFilterDiscordInvites: "",
        inputFilterMassMentions: "",
        inputFilterSwearWords: "",
        inputModerationLogsChannel: "",
        selectedModerationLogsChannel: moderationData.logsChannel ? props.server.channels.find(c => c.id === moderationData.logsChannel) : null,
        selectedFilterSwearWords: moderationData.removeBadWords ? yesOrNoList.find(l => l.value === 1) : null,
        selectedFilterMassMentions: moderationData.removeMassMentions ? yesOrNoList.find(l => l.value === 1) : null,
        selectedFilterDiscordInvites: moderationData.removeDiscordInvites ? yesOrNoList.find(l => l.value === 1) : null
    } as State);
    const snackbar = useSnackbar();

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
                })
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
                Moderation Settings
            </Typography>

            <Grid
                container
                spacing={ 4 }
                justify="center"
                className={ classes.items }
            >
                <Grid
                    item
                    xs={ 12 }
                    md={ 10 }
                    lg={ 9 }
                >
                    <ServerPicker
                        channels={ props.server.channels }
                        inputProps={ {
                            helperText: "Moderation logs channel",
                            label: "Logs Channel"
                        } }
                        value={ state.selectedModerationLogsChannel }
                        inputValue={ state.inputModerationLogsChannel }
                        onChange={
                            handleSelect(
                                "selectedModerationLogsChannel",
                                "moderationSettings",
                                data => ({
                                    logsChannel: (data as null | DiscordGuildRole)?.id ?? null
                                }) as DiscordServerData["moderationSettings"],
                                success => {
                                    snackbar.enqueueSnackbar(
                                        `${success ? "Successfully updated" : "Failed to update"} the moderation logs channel`,
                                        {
                                            variant: success ? "success" : "error"
                                        }
                                    )
                                }
                            )
                        }
                        onInputChange={ handleSelectInput("inputModerationLogsChannel") }
                    />
                </Grid>
                <Grid item xs={ 12 }/>
                <Grid
                    item
                    xs={ 12 }
                    md={ 3 }
                    lg={ 3 }
                >
                    <ServerPicker
                        otherList={ yesOrNoList }
                        inputProps={ {
                            helperText: "Filters discord invites",
                            label: "Filter Invites"
                        } }
                        value={ state.selectedFilterDiscordInvites }
                        inputValue={ state.inputFilterDiscordInvites }
                        onChange={ handleSelect(
                            "selectedFilterDiscordInvites",
                            "moderationSettings",
                            data => ({
                                removeDiscordInvites: (data as null | OtherListItem)?.value === 1 ?? false
                            }) as DiscordServerData["moderationSettings"],
                            success => {
                                snackbar.enqueueSnackbar(
                                    `${success ? "Successfully updated" : "Failed to update"} the filter discord invites setting`,
                                    {
                                        variant: success ? "success" : "error"
                                    }
                                )
                            }
                        ) }
                        onInputChange={ handleSelectInput("inputFilterDiscordInvites") }
                    />
                </Grid>
                <Grid
                    item
                    xs={ 12 }
                    md={ 3 }
                    lg={ 3 }
                >
                    <ServerPicker
                        otherList={ yesOrNoList }
                        inputProps={ {
                            helperText: "Removes mass mentions",
                            label: "Filter mass mentions"
                        } }
                        value={ state.selectedFilterMassMentions }
                        inputValue={ state.inputFilterMassMentions }
                        onChange={ handleSelect(
                            "selectedFilterMassMentions",
                            "moderationSettings",
                            data => ({
                                removeMassMentions: (data as null | OtherListItem)?.value === 1 ?? false
                            }) as DiscordServerData["moderationSettings"],
                            success => {
                                snackbar.enqueueSnackbar(
                                    `${success ? "Successfully updated" : "Failed to update"} the mass mention setting`,
                                    {
                                        variant: success ? "success" : "error"
                                    }
                                )
                            }
                        ) }
                        onInputChange={ handleSelectInput("inputFilterMassMentions") }
                    />
                </Grid>
                <Grid
                    item
                    xs={ 12 }
                    md={ 3 }
                    lg={ 3 }
                >
                    <ServerPicker
                        otherList={ yesOrNoList }
                        inputProps={ {
                            helperText: "Filters swear words",
                            label: "Filter swear words"
                        } }
                        value={ state.selectedFilterSwearWords }
                        inputValue={ state.inputFilterSwearWords }
                        onChange={ handleSelect(
                            "selectedFilterSwearWords",
                            "moderationSettings",
                            data => ({
                                removeBadWords: (data as null | OtherListItem)?.value === 1 ?? false
                            }) as DiscordServerData["moderationSettings"],
                            success => {
                                snackbar.enqueueSnackbar(
                                    `${success ? "Successfully updated" : "Failed to update"} the swear words setting`,
                                    {
                                        variant: success ? "success" : "error"
                                    }
                                )
                            }
                        ) }
                        onInputChange={ handleSelectInput("inputFilterSwearWords") }
                    />
                </Grid>
            </Grid>
        </FadeIn>
    );
}
