import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import config from "../../../src/config";
import { WhiteTheme } from "../../../util/material/themes/white";
import ServerCard, { Props } from "./ServerCard";


const useStyles = makeStyles(((theme: WhiteTheme) => ({
    root: {
        padding: theme.spacing(4)
    },
    serverListCardGrid: {
        marginTop: 25,
        listStyleType: "none"
    },
    gridItem: {
        backgroundColor: "grey"
    },
    buttonAddBot: {
        backgroundColor: "#5ca0f3",
        color: "#ffffff",
        "&:hover": {
            backgroundColor: "#396ba9"
        }
    }
})));

const Dashboard = () => {
    const classes = useStyles();
    const [servers, setServers] = useState([1, 2, 3, 4, 5, 6, 7, 8].map(() => ({
        isLoading: true
    })) as Props[]);
    const snackbar = useSnackbar();

    useEffect(() => {
        fetch("/api/servers", {
            credentials: "include"
        }).then(r => r.json())
            .then(data => {
                if (!data || !data.success) {
                    throw new Error("Failed to load servers");
                }

                const guilds = data.guilds;
                setServers(guilds.map((guild: any) => ({
                    title: guild.name,
                    image: `https://cdn.discordapp.com/icons/${ guild.id }/${ guild.icon }.png`,
                    link: guild.bot ? `/dashboard/manage/${ guild.id }` : `${config.host}/redirects/invite/${guild.id}`,
                    buttonText: guild.bot ? "Manage" : "Add Bot",
                    buttonClass: guild.bot ? undefined : classes.buttonAddBot
                })));
            })
            .catch((error) => {
                snackbar.enqueueSnackbar("Failed to load servers!", {
                    variant: "error"
                });

                console.warn(error);
            });
    }, []);

    console.log(servers);
    return (
        <Container className={ classes.root }>
            <Typography
                variant="h2"
                align="center"
            >
                Manage Servers
            </Typography>

            <Grid
                container
                spacing={ 2 }
                justify="space-evenly"
                className={ classes.serverListCardGrid }
            >
                {
                    servers.map(server => (
                        <ServerCard
                            {
                                ...server
                            }
                        />
                    ))
                }
            </Grid>
        </Container>
    );
};

export default Dashboard;
