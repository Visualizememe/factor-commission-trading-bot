import { TextField, Typography } from "@material-ui/core";
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
        paddingBottom: 50
    },
    baseMargin: {
        marginTop: 25
    },
    settingsTitle: {
        marginTop: 25,
        marginBottom: 20
    },
    list: {},
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
    selectedUnverifiedRole: DiscordGuildRole | null;
    selectedVerifiedRole: DiscordGuildRole | null;
    selectedVerifyChannel: DiscordGuildChannel | null;
    selectedAutoVerify: OtherListItem | null;
    selectedGroupMembersOnly: OtherListItem | null;
    inputUnverifiedRole: string;
    inputVerifiedRole: string;
    inputVerifyChannel: string;
    inputAutoVerify: string;
    inputRobloxGroupId: string;
    inputNicknameTemplate: string;
    inputGroupMembersOnly: string;
    inputRequiredAge: string;
}

interface Props {
    server: DiscordServer;
}

export default function Verification (props: Props) {
    const classes = useStyles();
    const verificationData = props.server.data.verificationSettings;
    const [state, setState] = useState({
        selectedUnverifiedRole: verificationData.unverifiedRole ? props.server.roles.find(r => r.id === verificationData.unverifiedRole) : null,
        selectedVerifiedRole: verificationData.verifyRole ? props.server.roles.find(r => r.id === verificationData.verifyRole) : null,
        selectedVerifyChannel: verificationData.verifyChannel ? props.server.channels.find(c => c.id === verificationData.verifyChannel) : null,
        selectedAutoVerify: verificationData.autoVerification ? yesOrNoList.find(l => l.value === 1) : null,
        inputUnverifiedRole: "",
        inputVerifiedRole: "",
        inputVerifyChannel: "",
        inputAutoVerify: "",
        inputRobloxGroupId: props.server.data.robloxGroupId || "",
        inputNicknameTemplate: verificationData.nicknameTemplate || "",
        inputRequiredAge: String(props.server.data.verificationSettings.requiredAge || "").toString()
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
                Verification Settings
            </Typography>
            <ServerPicker
                roles={ props.server.roles }
                inputProps={ {
                    className: classes.baseMargin,
                    helperText: "The role unverified members will get",
                    label: "Select Unverified Role"
                } }
                value={ state.selectedUnverifiedRole }
                inputValue={ state.inputUnverifiedRole }
                onChange={
                    handleSelect(
                        "selectedUnverifiedRole",
                        "verificationSettings",
                        data => {
                            return {
                                unverifiedRole: (data as null | DiscordGuildRole)?.id ?? null
                            } as DiscordServerData["verificationSettings"];
                        },
                        success => {
                            snackbar.enqueueSnackbar(
                                `${ success ? "Successfully updated " : "Failed to update " } the unverified role`,
                                {
                                    variant: success ? "success" : "error"
                                }
                            );
                        }
                    )
                }
                onInputChange={ handleSelectInput("inputUnverifiedRole") }
            />
            <ServerPicker
                inputProps={ {
                    helperText: "The role verified members will get",
                    className: classes.baseMargin,
                    label: "Select Verified Role"
                } }
                roles={ props.server.roles }
                value={ state.selectedVerifiedRole }
                inputValue={ state.inputVerifiedRole }
                onChange={ handleSelect(
                    "selectedVerifiedRole",
                    "verificationSettings",
                    data => {
                        return {
                            verifyRole: (data as null | DiscordGuildRole)?.id ?? null
                        } as DiscordServerData["verificationSettings"];
                    },
                    success => {
                        snackbar.enqueueSnackbar(
                            `${ success ? "Successfully updated " : "Failed to update " } the verified role`,
                            {
                                variant: success ? "success" : "error"
                            }
                        );
                    }
                ) }
                onInputChange={ handleSelectInput("inputVerifiedRole") }
            />
            <ServerPicker
                inputProps={ {
                    helperText: "The channel new members can verify in",
                    className: classes.baseMargin,
                    label: "Verify Channel"
                } }
                channels={ props.server.channels }
                value={ state.selectedVerifyChannel }
                inputValue={ state.inputVerifyChannel }
                onChange={ handleSelect(
                    "selectedVerifyChannel",
                    "verificationSettings",
                    data => {
                        return {
                            verifyChannel: (data as null | DiscordGuildChannel)?.id ?? null
                        } as DiscordServerData["verificationSettings"];
                    },
                    success => {
                        snackbar.enqueueSnackbar(
                            `${ success ? "Successfully updated " : "Failed to update " } the verify channel`,
                            {
                                variant: success ? "success" : "error"
                            }
                        );
                    }
                ) }
                onInputChange={ handleSelectInput("inputVerifyChannel") }
            />
            <ServerPicker
                inputProps={ {
                    helperText: "Let members be verified when they join without the verify command",
                    className: classes.baseMargin,
                    label: "Auto-verify"
                } }
                otherList={ yesOrNoList }
                value={ state.selectedAutoVerify }
                inputValue={ state.inputAutoVerify }
                onChange={ handleSelect(
                    "selectedAutoVerify",
                    "verificationSettings",
                    data => {
                        return {
                            autoVerification: (data as null | OtherListItem)?.value === 1
                        } as DiscordServerData["verificationSettings"];
                    },
                    success => {
                        snackbar.enqueueSnackbar(
                            `${ success ? "Successfully updated " : "Failed to update " } the auto-verify setting`,
                            {
                                variant: success ? "success" : "error"
                            }
                        );
                    }
                ) }
                onInputChange={ handleSelectInput("inputAutoVerify") }
            />
            <ServerPicker
                inputProps={ {
                    helperText: "Kicks users that aren't in the group when they are verified",
                    className: classes.baseMargin,
                    label: "Must be a group member"
                } }
                otherList={ yesOrNoList }
                value={ state.selectedGroupMembersOnly }
                inputValue={ state.inputGroupMembersOnly }
                onChange={ handleSelect(
                    "selectedGroupMembersOnly",
                    "verificationSettings",
                    data => {
                        return {
                            groupMembersOnly: (data as null | OtherListItem)?.value === 1
                        } as DiscordServerData["verificationSettings"];
                    },
                    success => {
                        snackbar.enqueueSnackbar(
                            `${ success ? "Successfully updated " : "Failed to update " } the group members only setting`,
                            {
                                variant: success ? "success" : "error"
                            }
                        );
                    }
                ) }
                onInputChange={ handleSelectInput("inputAutoVerify") }
            />
            <TextField
                fullWidth
                size="small"
                variant="outlined"
                helperText="The minimum account age required to be in the server (in days)"
                type="number"
                placeholder="Ex: 30"
                className={ classes.baseMargin }
                value={ state.inputRequiredAge }
                onChange={ handleTextInput("inputRequiredAge") }
                onBlur={ () => {
                    updateServerData(props.server.id, "verificationSettings", {
                        requiredAge: !isNaN(parseInt(state.inputRequiredAge)) && parseInt(state.inputRequiredAge) !== 0 ? parseInt(state.inputRequiredAge) : null
                    } as DiscordServerData["verificationSettings"])
                        .then(success => {
                            snackbar.enqueueSnackbar(
                                `${ success ? "Successfully updated " : "Failed to update " } the required age`,
                                {
                                    variant: success ? "success" : "error"
                                }
                            );
                        });
                } }
            />
            <TextField
                fullWidth
                size="small"
                variant="outlined"
                helperText="The Roblox group id you want to connect to"
                type="number"
                placeholder="Ex: 51235123"
                className={ classes.baseMargin }
                value={ state.inputRobloxGroupId }
                onChange={ handleTextInput("inputRobloxGroupId") }
                onBlur={ () => {
                    updateServerData(props.server.id, "robloxGroupId", !isNaN(parseInt(state.inputRobloxGroupId)) ? parseInt(state.inputRobloxGroupId) : null)
                        .then(success => {
                            snackbar.enqueueSnackbar(
                                `${ success ? "Successfully updated " : "Failed to update " } the Roblox group id`,
                                {
                                    variant: success ? "success" : "error"
                                }
                            );
                        });
                } }
            />
            <Typography
                variant="h5"
                className={ classes.baseMargin }
            >
                Nickname Template
            </Typography>
            <TextField
                fullWidth
                size="small"
                variant="outlined"
                helperText="The nickname template for a verified user. NOTE: Discord has a limit of 32 characters in a nickname."
                placeholder="Ex: {{ username }} | {{robloxusername}}"
                className={ classes.baseMargin }
                value={ state.inputNicknameTemplate }
                onChange={ handleTextInput("inputNicknameTemplate") }
                onBlur={ () => {
                    updateServerData(props.server.id, "verificationSettings", {
                        nicknameTemplate: state.inputNicknameTemplate
                    } as DiscordServerData["verificationSettings"])
                        .then(success => {
                            snackbar.enqueueSnackbar(
                                `${ success ? "Successfully updated " : "Failed to update " } the nickname template`,
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
        </FadeIn>
    );
}
