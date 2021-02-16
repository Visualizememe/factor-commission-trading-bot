import { Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import FadeIn from "react-fade-in";


const useStyles = makeStyles((theme) => ({
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
    cardCommand: {}
}));

interface State {
    currentCategory: string;
}

export default () => {
    const classes = useStyles();
    const [state, setState] = useState({
        currentCategory: ""
    } as State);
    const [commandsList, setCommandsList] = useState([] as CommandType[]);
    const snackbar = useSnackbar();

    const handleCommandCategorySelect = (event: React.ChangeEvent<{}>, newValue: unknown) => {
        const chosen = newValue as { props?: { value?: string; children?: unknown } };

        setState(prevState => ({
            ...prevState,
            currentCategory: chosen?.props?.value ?? ""
        }));
    };

    useEffect(() => {
        fetch("/api/commands?extended=1", {
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
        <Container>
            <FadeIn delay={ 20 } className={ classes.root }>
                <Typography
                    variant="h2"
                    align="center"
                >
                    Commands
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
                                            <MenuItem
                                                value={ commandItem.category.toLowerCase() }>{ commandItem.category }</MenuItem>
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
                                            title={ command.usage! || command.command }
                                            category={ command.category }
                                            description={ command.description }
                                            onActivated={ () => null }
                                            activated={ true }
                                            disableToggle={ true }
                                        />
                                    ))
                                )
                            }
                        </Grid>
                    </Grid>
                </div>
            </FadeIn>
        </Container>
    );
}
