import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    TextField,
    Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { DiscordGuildChannel } from "../../../../../util/interfaces/types";
import { WhiteTheme } from "../../../../../util/material/themes/white";
import { sendMessage } from "../../../../../util/webAPI/api";
import ServerPicker, { OtherListItem } from "./components/ServerChannelPicker/ServerPicker";
import { Props } from "./General";


const useStyles = makeStyles((theme: WhiteTheme) => ({
    settingsTitle: {
        marginTop: 25,
        marginBottom: 20
    },
    form: {
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        width: "100%"
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120
    },
    buttonSendMessage: {
        backgroundColor: "#0d9ee5",
        marginTop: 20,
        color: "#ffffff",
        "&:hover": {
            backgroundColor: "#007cbe"
        }
    },
    baseMargin: {
        marginTop: 25
    }
}));

interface State {
    dialogOpen: boolean;
    inputMessageChannel: string;
    inputMessageType: string;
    inputMessage: string;
    selectedMessageChannel: DiscordGuildChannel | null;
    selectedMessageType: OtherListItem | null;
    processing: boolean;
}


export default (props: Props) => {
    const classes = useStyles();
    const [state, setState] = useState({
        dialogOpen: false,
        inputMessageChannel: "",
        inputMessageType: "",
        selectedMessageChannel: null,
        selectedMessageType: null,
        inputMessage: "",
        processing: false
    } as State);
    const snackbar = useSnackbar();

    const handleDialog = (set?: boolean) => () => {
        setState(prevState => ({
            ...prevState,
            dialogOpen: typeof set !== "undefined" ? set : !prevState.dialogOpen
        }));
    };
    const handleTextInput = (target: keyof typeof state) => (event: React.ChangeEvent<{ value: unknown }>) => {
        event.persist();

        setState(prevState => ({
            ...prevState,
            [target]: event.target.value as string
        }));
    };
    const handleSendMessage = async (event: React.ChangeEvent<{}>): Promise<any> => {
        event.persist();

        const chosenChannel = state.selectedMessageChannel;
        const chosenMessageType = state.selectedMessageType;
        const message = state.inputMessage;

        if (!chosenChannel || !chosenMessageType) {
            return snackbar.enqueueSnackbar(
                "Must set channel and message type before sending message!",
                {
                    variant: "warning"
                }
            );
        }

        if (message.length === 0 || message.length > 1900) {
            return snackbar.enqueueSnackbar(
                "Message must be between 1 and 1900 characters",
                {
                    variant: "warning"
                }
            );
        }


        console.log("SENDING MESSAGE");
        return sendMessage(
            props.server.id,
            chosenChannel.id,
            chosenMessageType.value as string,
            state.inputMessage
        ).then((d: any) => {
            if (!d) {
                return snackbar.enqueueSnackbar(
                    `Failed to send message: ${ d.error }`
                );
            }

            return snackbar.enqueueSnackbar(
                "Sent message!",
                {
                    variant: "success"
                }
            );
        }).catch(() => snackbar.enqueueSnackbar("Failed to update", { variant: "error" }));
    };


    return (
        <>
            <Typography
                variant="h5"
                align="center"
                className={ classes.settingsTitle }
            >
                Send Message
            </Typography>
            <div style={ {
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            } }>
                <Button
                    variant="outlined"
                    onClick={ handleDialog() }
                >
                    <i className="far fa-envelope"/>
                    &nbsp;
                    Click to send a message
                </Button>
            </div>

            <Dialog
                maxWidth="md"
                open={ state.dialogOpen }
                onClose={ handleDialog(false) }
            >
                <DialogTitle>
                    Send Message
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can send a message as the bot in the selected channel.
                    </DialogContentText>
                    <form
                        className={ classes.form }
                        noValidate
                    >
                        <FormControl className={ classes.formControl }>
                            <ServerPicker
                                channels={ props.server.channels }
                                inputProps={ {
                                    label: "Select channel",
                                    fullWidth: true
                                } }
                                value={ state.selectedMessageChannel }
                                onChange={
                                    (event, arg1: unknown) => {
                                        const chosen = arg1 as unknown as DiscordGuildChannel | null;

                                        setState(prevState => ({
                                            ...prevState,
                                            selectedMessageChannel: chosen
                                        }));
                                    }
                                }
                                inputValue={ state.inputMessageChannel }
                                onInputChange={
                                    (event, arg1: unknown) => {
                                        const af = arg1 as string;

                                        setState(prevState => ({
                                            ...prevState,
                                            inputMessageChannel: af
                                        }));
                                    }
                                }
                            />
                            <ServerPicker
                                otherList={ [
                                    {
                                        label: "Message",
                                        value: 1
                                    },
                                    {
                                        label: "Message Embed (Premium Only)",
                                        value: 2
                                    }
                                ] }
                                inputProps={ {
                                    label: "Message type",
                                    fullWidth: true,
                                    className: classes.baseMargin
                                } }
                                value={ state.selectedMessageType }
                                onChange={
                                    (event, arg1) => {
                                        const chosen = arg1 as OtherListItem | null;

                                        setState(prevState => ({
                                            ...prevState,
                                            selectedMessageType: chosen
                                        }));
                                    }
                                }
                                inputValue={ state.inputMessageType }
                                onInputChange={
                                    (event, arg1) => {
                                        const af = arg1 as string;

                                        setState(prevState => ({
                                            ...prevState,
                                            inputMessageType: af
                                        }));
                                    }
                                }
                            />
                            <TextField
                                multiline
                                label="Message Content"
                                rows={ 4 }
                                rowsMax={ 12 }
                                variant="outlined"
                                className={ classes.baseMargin }
                                value={ state.inputMessage }
                                onChange={ handleTextInput("inputMessage") }
                            />
                            <Button
                                className={ classes.buttonSendMessage }
                                variant="contained"
                                fullWidth
                                disabled={ ((state.inputMessage.length === 0 || !state.selectedMessageType || !state.selectedMessageChannel) || state.processing) as boolean }
                                onClick={ handleSendMessage }
                            >
                                Send Message
                                &nbsp;
                                <i className="fas fa-arrow-right"/>
                            </Button>
                        </FormControl>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );

}
