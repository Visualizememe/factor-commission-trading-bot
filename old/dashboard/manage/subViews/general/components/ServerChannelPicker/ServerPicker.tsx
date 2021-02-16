import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextFieldProps } from "@material-ui/core/TextField/TextField";
import { Autocomplete, AutocompleteRenderInputParams } from "@material-ui/lab";
import React from "react";
import { DiscordServer } from "../../../../../../../util/interfaces/types";
import { WhiteTheme } from "../../../../../../../util/material/themes/white";


const useStyles = makeStyles((theme: WhiteTheme) => ({
    root: {}
}));
const renderInput = (props: TextFieldProps) => (params: AutocompleteRenderInputParams) => (
    <TextField
        { ...params }
        label="Select a channel"
        variant="outlined"
        size="small"
        { ...props }
    />
);

export declare type OtherListItem = {
    label: string;
    value: string | number | object;
};

interface Props {
    channels?: DiscordServer["channels"];
    roles?: DiscordServer["roles"];
    inputProps?: TextFieldProps;
    otherList?: OtherListItem[];
    value: unknown;
    inputValue: unknown;
    onChange: (event: React.ChangeEvent<{ value?: unknown | undefined }>, ...args: unknown[]) => void;
    onInputChange: (event: React.ChangeEvent<{ value?: unknown | undefined }>, ...args: unknown[]) => void;

    [key: string]: unknown;
}

export default function ServerPicker (props: Props) {
    const classes = useStyles();


    if (props.channels) {
        return (
            <Autocomplete
                options={ props.channels! }
                renderInput={ renderInput({
                    label: "Select a channel",
                    ...props.inputProps
                }) }
                getOptionLabel={ (option: DiscordServer["channels"][0]) => (
                    `${ option.category ? option.category + " →" : "" } ${ option.name } (${ option.id })`
                ) }
                value={ props.value as DiscordServer["channels"][0] | null }
                onChange={ props.onChange }
                inputValue={ props.inputValue as string }
                onInputChange={ props.onInputChange }
            />
        );
    } else if (props.roles) {
        return (
            <Autocomplete
                options={ props.roles! }
                renderInput={ renderInput({
                    label: "Select a role",
                    ...props.inputProps
                }) }
                getOptionLabel={
                    (option: DiscordServer["roles"][0]) => (
                        `${ option.name } (${ option.id })`
                    )
                }
                value={ props.value as DiscordServer["roles"][0] | null }
                onChange={ props.onChange }
                inputValue={ props.inputValue as string }
                onInputChange={ props.onInputChange }
            />
        );
    } else {
        return (
            <Autocomplete
                options={ props.otherList! }
                renderInput={ renderInput({
                    label: "Choose option",
                    ...props.inputProps
                }) }
                getOptionLabel={
                    (option: OtherListItem) => option.label as string
                }
                value={ props.value as unknown as OtherListItem | null }
                onChange={ props.onChange }
                inputValue={ props.inputValue as string }
                onInputChange={ props.onInputChange }
            />
        );
    }
}
