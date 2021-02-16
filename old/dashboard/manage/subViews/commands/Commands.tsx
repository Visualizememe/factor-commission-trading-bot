import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import FadeIn from "react-fade-in";
import { DiscordServer } from "../../../../../util/interfaces/types";
import { WhiteTheme } from "../../../../../util/material/themes/white";
import { updateServerData } from "../../../../../util/webAPI/api";
import CommandCard from "./CommandCard";


const useStyles = makeStyles((theme: WhiteTheme) => ({
    root: {
        marginTop: 25,
        minHeight: "100vh",
        height: "auto",
        paddingBottom: 50
    },
    rootTitle: {},
    rootDiv: {
        marginTop: 25
    },
    buttonCategorySelector: {
        display: "block"
    },
    formControlCategorySelector: {
        margin: theme.spacing(1),
        minWidth: 200
    },
    divQueryOptions: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    divCommands: {
        marginTop: 25,
        listStyleType: "none"
    },
    cardCommand: {},
    test: {
        backgroundColor: "black",
        height: 100
    }
}));

export const getUniqueCategories = (commands: CommandType[]) => {
    return commands.filter(((value, index, array) => array.findIndex(v => v.category === value.category) === index));
};

export type CommandType = {
    command: string;
    description: string;
    category: string;
    usage?: string;
}

interface State {
    currentCategory: string;
    disabledCommands: string[];
}

interface Props {
    server: DiscordServer;
}

export default function ModerationSubView (props: Props) {
    const classes = useStyles();
    const [state, setState] = useState({
        currentCategory: "",
        disabledCommands: props.server.data.disabledCommands
    } as State);
    const [commandsList, setCommandsList] = useState([] as Array<CommandType>);
    const snackbar = useSnackbar();

    const handleCommandCategorySelect = (event: React.ChangeEvent<{}>, newValue: unknown) => {
        const chosen = newValue as { props?: { value?: string; children?: unknown } };

        setState(prevState => ({
            ...prevState,
            currentCategory: chosen?.props?.value ?? ""
        }));
    };
    const handleCommandToggle = (commandName: string) => (enable: boolean) => {
        let disabledCommands: State["disabledCommands"] = [];
        console.log(`Setting command "${ commandName }" to ${ enable }`);

        setState(prevState => {
            disabledCommands = [...prevState.disabledCommands];

            const genNewWithout = (c: string): string[] => {
                let l = [];

                for (const disabledCommand of prevState.disabledCommands) {
                    if (disabledCommand === c) {
                        console.log("found c");
                    } else {
                        l.push(disabledCommand);
                    }
                }

                return l;
            };

            if (enable && prevState.disabledCommands.some(c => c === commandName)) {
                console.log("wants to enable, and the command is disabled");
                disabledCommands = genNewWithout(commandName);
            } else if (!enable && !prevState.disabledCommands.some(c => c === commandName)) {
                console.log("wants to disable and it doesn't exist");
                disabledCommands.push(commandName);
            }

            return {
                ...prevState,
                disabledCommands
            };
        });

        updateServerData(props.server.id, "disabledCommands", disabledCommands)
            .then(success => {
                snackbar.enqueueSnackbar(
                    `${ success ? "Successfully updated " : "Failed to update " } the commands. ${ disabledCommands.length } ${ disabledCommands.length === 1 ? "is" : "are" } disabled.`,
                    {
                        variant: success ? "success" : "error"
                    }
                );
            });
    };

    useEffect(() => {
        fetch("/api/commands", {
            credentials: "include"
        }).then(r => r.json())
            .then(data => {
                if (data && data.success && data.commands) {
                    return setCommandsList(data.commands);
                } else {
                    throw new Error("Failed to load commands");
                }
            })
            .catch(e => {
                snackbar.enqueueSnackbar("Failed to load commands", {
                    variant: "error"
                });
            });
    }, []);


    return (
        <FadeIn delay={ 20 } className={ classes.root }>
            <Typography
                variant="h2"
                align="center"
                className={ classes.rootTitle }
            >
                Manage Commands
            </Typography>
            <div className={ classes.rootDiv }>
                <Grid container spacing={ 4 }>
                    { /* Query Options */ }
                    <Grid
                        item
                        xs={ 12 }
                        className={ classes.divQueryOptions }
                    >
                        <FormControl className={ classes.formControlCategorySelector }>
                            <InputLabel id="commands-select-category-label">Category</InputLabel>
                            <Select
                                labelId="commands-select-category-label"
                                id="commands-select-category-select"
                                value={ state.currentCategory }
                                onChange={ handleCommandCategorySelect }
                            >
                                <MenuItem value={ "" }>
                                    All
                                </MenuItem>
                                {
                                    getUniqueCategories(commandsList).map(commandItem => (
                                        <MenuItem value={commandItem.category.toLowerCase()}>{commandItem.category}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid
                        className={ classes.divCommands }
                        container
                        xs={ 12 }
                        spacing={ 4 }
                        justify="center"
                    >
                        {
                            commandsList.length === 0 ? (
                                <h2>Loading</h2>
                            ) : (
                                commandsList.filter(command => {
                                    if (state.currentCategory.length > 0) {
                                        return command.category === state.currentCategory;
                                    } else {
                                        return command;
                                    }
                                }).map(command => (
                                    <CommandCard
                                        title={ command.command }
                                        category={ command.category }
                                        activated={ !state.disabledCommands.find(c => c === command.command) }
                                        description={ command.description }
                                        onActivated={ handleCommandToggle(command.command) }
                                    />
                                ))
                            )
                        }
                    </Grid>

                </Grid>
            </div>
        </FadeIn>
    );
}
