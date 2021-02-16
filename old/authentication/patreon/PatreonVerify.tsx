import { Divider, Grid, LinearProgress, Typography, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import querystring from "querystring";
import React, { useEffect, useState } from "react";
import history from "../../../src/util/history";
import { WhiteTheme } from "../../../../util/material/themes/white";


const useStyles = makeStyles(((theme: WhiteTheme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: "100vh"
    },
    grid: {
        height: "100%"
    },
    quoteContainer: {
        [theme.breakpoints.down("md")]: {
            display: "none"
        }
    },
    quote: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/images/auth.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    },
    quoteInner: {
        textAlign: "center",
        flexBasis: "600px"
    },
    quoteText: {
        color: theme.palette.white,
        fontWeight: 300
    },
    name: {
        marginTop: theme.spacing(3),
        color: theme.palette.white
    },
    bio: {
        color: theme.palette.white
    },
    contentContainer: {},
    content: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    contentHeader: {
        display: "flex",
        alignItems: "center",
        paddingTop: theme.spacing(5),
        paddingBototm: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    logoImage: {
        marginLeft: theme.spacing(4)
    },
    contentBody: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down("md")]: {
            justifyContent: "center"
        }
    },
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down("sm")]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    title: {
        marginTop: theme.spacing(3),
        color: theme.palette.white
    },
    subTitle: {
        marginTop: theme.spacing(1),
        color: theme.palette.grey.A100
    },
    socialButtons: {
        marginTop: theme.spacing(3)
    },
    socialIcon: {
        marginRight: theme.spacing(1)
    }
})));


const PatreonVerify = (props: { location: Location; }) => {
    const params = querystring.parse(props.location.search.slice(1));
    const classes = useStyles();
    const [pageInfo, setPageInfo] = useState({
        title: "We are validating the Patreon request...",
        subTitle: "Please remain patient as we're processing the Patreon link request.",
        processing: false,
        done: false
    });
    const theme = useTheme() as WhiteTheme;
    const snackbar = useSnackbar();


    useEffect(() => {
        (async () => {
            const data = params as { code: string; state: string };

            if (!data || !data.code || !data.state) {
                snackbar.enqueueSnackbar(
                    `Invalid response from Patreon, missing code / state. Please try again.`,
                    {
                        variant: "error"
                    }
                );

                setPageInfo({
                    title: "Invalid Patreon response",
                    subTitle: "Please review the notification for information",
                    processing: false,
                    done: false
                });

                return;
            }

            setPageInfo({
                ...pageInfo,
                title: "Processing your token...",
                subTitle: "We have received the Patreon response, we're now processing it...",
                processing: true
            });

            const verifyAuthCode = await fetch("/api/auth/patreon", {
                method: "POST",
                body: JSON.stringify({
                    code: data.code,
                    state: data.state
                }),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            }).then(response => response.json())
                .catch(() => null);

            if (!verifyAuthCode || !verifyAuthCode.success) {
                snackbar.enqueueSnackbar(`Failed to verify Patreon pledge: ${(verifyAuthCode && verifyAuthCode.message) || "N/A"}`, {
                    variant: "error"
                });

                setTimeout(() => {
                    history.push("/");
                }, 2000);
            } else {

                setPageInfo({
                    ...pageInfo,
                    title: "Successfully verified Patreon pledge",
                    subTitle: "We're redirecting you to the dashboard. You've linked your Patreon account!",
                    done: true
                });

                snackbar.enqueueSnackbar(
                    `Successfully redeemed your Patreon pledge!`,
                    {
                        variant: "success"
                    }
                );

                setTimeout(() => {
                    history.push("/dashboard");
                }, 5000);
            }
        })();
    }, []);

    return (
        <div className={ classes.root }>
            <Grid
                className={ classes.grid }
                container
            >
                <Grid
                    className={ classes.quoteContainer }
                    item
                    lg={ 5 }
                >
                    <div className={ classes.quote }>
                        <div className={ classes.quoteInner }>
                            <Typography
                                className={ classes.quoteText }
                                variant="h1"
                            >
                                Premium grants you more features for the bot and gives you more control over it.
                            </Typography>
                        </div>
                    </div>
                </Grid>
                <Grid
                    className={ classes.content }
                    item
                    lg={ 7 }
                    xs={ 12 }
                >
                    <div className={ classes.content }>
                        <div className={ classes.contentHeader }/>
                        <div className={ classes.contentBody }>
                            <form
                                className={ classes.form }
                                onSubmit={ () => alert("sign in") }
                            >
                                <Typography
                                    className={ classes.title }
                                    variant="h2"
                                >
                                    { pageInfo.title }
                                </Typography>
                                <Typography
                                    className={ classes.subTitle }
                                    gutterBottom
                                >
                                    { pageInfo.subTitle }
                                </Typography>
                                <Divider/>
                                <LinearProgress
                                    style={ {
                                        backgroundColor: pageInfo.done ? theme.palette.success.main : pageInfo.processing ? theme.palette.info.main : ""
                                    } }
                                />
                                <Grid
                                    className={ classes.socialButtons }
                                    container
                                    spacing={ 2 }
                                >
                                </Grid>
                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default PatreonVerify;
