import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import FadeIn from "react-fade-in";
import { DiscordGuildRole, DiscordServer, DiscordServerData } from "../../../../../util/interfaces/types";
import { WhiteTheme } from "../../../../../util/material/themes/white";
import { DataString, updateServerData } from "../../../../../util/webAPI/api";
import ServerPicker from "../general/components/ServerChannelPicker/ServerPicker";


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
    }
}));


interface Props {
    server: DiscordServer;
}

interface State {
    selectedUpdaterRole: DiscordGuildRole | null;
    selectedBypassRole: DiscordGuildRole | null;
    selectedSupportRole: DiscordGuildRole | null;
    selectedDJRole: DiscordGuildRole | null;
    selectedAdminRole: DiscordGuildRole | null;
    selectedModeratorRole: DiscordGuildRole | null;
    inputUpdaterRole: string;
    inputBypassRole: string;
    inputSupportRole: string;
    inputDJRole: string;
    inputAdminRole: string;
    inputModeratorRole: string;
}

export default function Roles (props: Props) {
    const classes = useStyles();
    const rolesData = props.server.data.roleConfigurationSettings;
    const [state, setState] = useState({
        selectedUpdaterRole: rolesData.updaterRole ? props.server.roles.find(r => r.id === rolesData.updaterRole) : null,
        selectedBypassRole: rolesData.bypassRole ? props.server.roles.find(r => r.id === rolesData.bypassRole) : null,
        selectedSupportRole: rolesData.supportRole ? props.server.roles.find(r => r.id === rolesData.supportRole) : null,
        selectedDJRole: rolesData.supportRole ? props.server.roles.find(r => r.id === rolesData.djRole) : null,
        selectedAdminRole: rolesData.adminRole ? props.server.roles.find(r => r.id === rolesData.adminRole) : null,
        selectedModeratorRole: rolesData.moderatorRole ? props.server.roles.find(r => r.id === rolesData.moderatorRole) : null,
        inputUpdaterRole: "",
        inputBypassRole: "",
        inputSupportRole: "",
        inputDJRole: "",
        inputAdminRole: "",
        inputModeratorRole: ""
    } as State);
    const snackbar = useSnackbar();

    const handleSelectedUpdate = (target: keyof typeof state) => (event: React.ChangeEvent<{}>, newData: unknown) => {
        setState(prevState => ({
            ...prevState,
            [target]: newData as DiscordGuildRole
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
                Role Configurations
            </Typography>
            <ServerPicker
                roles={ props.server.roles }
                inputProps={ {
                    label: "Updater Role",
                    helperText: "Able to use updateroles commands",
                    className: classes.baseMargin
                } }
                value={ state.selectedUpdaterRole }
                inputValue={ state.inputUpdaterRole }
                onChange={
                    handleSelect(
                        "selectedUpdaterRole",
                        "roleConfigurationSettings",
                        data => {
                            return {
                                updaterRole: (data as null | DiscordGuildRole)?.id ?? null
                            } as DiscordServerData["roleConfigurationSettings"];
                        },
                        success => {
                            snackbar.enqueueSnackbar(
                                `${ success ? "Successfully updated " : "Failed to update " } the updater role`,
                                {
                                    variant: success ? "success" : "error"
                                }
                            );
                        }
                    )
                }
                onInputChange={ handleSelectInput("inputUpdaterRole") }
            />
            <ServerPicker
                roles={ props.server.roles }
                inputProps={ {
                    label: "Bypass Role",
                    helperText: "Won't be updated",
                    className: classes.baseMargin
                } }
                value={ state.selectedBypassRole }
                inputValue={ state.inputBypassRole }
                onChange={
                    handleSelect(
                        "selectedBypassRole",
                        "roleConfigurationSettings",
                        data => {
                            return {
                                bypassRole: (data as null | DiscordGuildRole)?.id ?? null
                            } as DiscordServerData["roleConfigurationSettings"];
                        },
                        success => {
                            snackbar.enqueueSnackbar(
                                `${ success ? "Successfully updated " : "Failed to update " } the bypass role`,
                                {
                                    variant: success ? "success" : "error"
                                }
                            );
                        }
                    )
                }
                onInputChange={ handleSelectInput("inputBypassRole") }
            />
            <ServerPicker
                roles={ props.server.roles }
                inputProps={ {
                    label: "Support Role",
                    helperText: "Support agent role",
                    className: classes.baseMargin
                } }
                value={ state.selectedSupportRole }
                inputValue={ state.inputSupportRole }
                onChange={
                    handleSelect(
                        "selectedSupportRole",
                        "roleConfigurationSettings",
                        data => {
                            return {
                                supportRole: (data as null | DiscordGuildRole)?.id ?? null
                            } as DiscordServerData["roleConfigurationSettings"];
                        },
                        success => {
                            snackbar.enqueueSnackbar(
                                `${ success ? "Successfully updated " : "Failed to update " } the support role`,
                                {
                                    variant: success ? "success" : "error"
                                }
                            );
                        }
                    )
                }
                onInputChange={ handleSelectInput("inputSupportRole") }
            />
            <ServerPicker
                roles={ props.server.roles }
                inputProps={ {
                    label: "DJ Role",
                    helperText: "Able to use music commands",
                    className: classes.baseMargin
                } }
                value={ state.selectedDJRole }
                inputValue={ state.inputDJRole }
                onChange={
                    handleSelect(
                        "selectedDJRole",
                        "roleConfigurationSettings",
                        data => {
                            return {
                                djRole: (data as null | DiscordGuildRole)?.id ?? null
                            } as DiscordServerData["roleConfigurationSettings"];
                        },
                        success => {
                            snackbar.enqueueSnackbar(
                                `${ success ? "Successfully updated " : "Failed to update " } the DJ role`,
                                {
                                    variant: success ? "success" : "error"
                                }
                            );
                        }
                    )
                }
                onInputChange={ handleSelectInput("inputDJRole") }
            />
            <ServerPicker
                roles={ props.server.roles }
                inputProps={ {
                    label: "Admin Role",
                    helperText: "Able to use admin commands",
                    className: classes.baseMargin
                } }
                value={ state.selectedAdminRole }
                inputValue={ state.inputAdminRole }
                onChange={
                    handleSelect(
                        "selectedAdminRole",
                        "roleConfigurationSettings",
                        data => {
                            return {
                                adminRole: (data as null | DiscordGuildRole)?.id ?? null
                            } as DiscordServerData["roleConfigurationSettings"];
                        },
                        success => {
                            snackbar.enqueueSnackbar(
                                `${ success ? "Successfully updated " : "Failed to update " } the admin role`,
                                {
                                    variant: success ? "success" : "error"
                                }
                            );
                        }
                    )
                }
                onInputChange={ handleSelectInput("inputAdminRole") }
            />
            <ServerPicker
                roles={ props.server.roles }
                inputProps={ {
                    label: "Moderator Role",
                    helperText: "Able to use moderator commands",
                    className: classes.baseMargin
                } }
                value={ state.selectedModeratorRole }
                inputValue={ state.inputModeratorRole }
                onChange={
                    handleSelect(
                        "selectedModeratorRole",
                        "roleConfigurationSettings",
                        data => {
                            return {
                                moderatorRole: (data as null | DiscordGuildRole)?.id ?? null
                            } as DiscordServerData["roleConfigurationSettings"];
                        },
                        success => {
                            snackbar.enqueueSnackbar(
                                `${ success ? "Successfully updated " : "Failed to update " } the moderator role`,
                                {
                                    variant: success ? "success" : "error"
                                }
                            );
                        }
                    )
                }
                onInputChange={ handleSelectInput("inputModeratorRole") }
            />
        </FadeIn>
    );
}
