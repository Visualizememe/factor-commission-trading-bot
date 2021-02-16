import { Divider, Grid, LinearProgress, Typography, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import config from "../../../src/config";
import { sessionLogin } from "../../../src/util/actions";
import history from "../../../src/util/history";
import { WhiteTheme } from "../../../../util/material/themes/white";
import "./styles.css";


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


const Authentication = () => {
    const classes = useStyles();
    const [pageInfo, setPageInfo] = useState({
        title: "We are signing you in...",
        subTitle: "Please remain patient as we're attempting to sign you in.",
        processing: false,
        done: false
    });
    const theme = useTheme() as WhiteTheme;
    const store = useStore();
    const snackbar = useSnackbar();
    const dispatch = useDispatch();


    useEffect(() => {
        window.addEventListener("message", async message => {
            if (!message.isTrusted || !message.origin.includes(config.hostname)) {
                return;
            }

            const data = message.data as { toAuth?: boolean; code: string; state: string; [key: string]: unknown; };

            if (!data || !data.toAuth || !data.code) {
                return;
            }

            setPageInfo({
                ...pageInfo,
                title: "Processing your token...",
                subTitle: "We have received Discord's access token, we're now verifying it...",
                processing: true
            });

            const verifyAuthCode = await fetch("/api/auth/verify", {
                method: "POST",
                body: JSON.stringify({
                    code: data.code,
                    state: data.state
                }),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            }).then(response =>{
                if (response.status !== 200) {
                    throw new Error("Invalid status code");
                }

                return response.json()
            })
                .catch(() => null);

            if (!verifyAuthCode) {
                snackbar.enqueueSnackbar(`Failed to verify Discord code, please retry.`, {
                    variant: "error",
                    autoHideDuration: 2000
                });

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {

                setPageInfo({
                    ...pageInfo,
                    title: "Successfully authenticated",
                    subTitle: "We're redirecting you to the dashboard.",
                    done: true
                });

                setTimeout(() => {
                    history.push("/dashboard");
                }, 1000);
            }
        }, false);

        setTimeout(() => {
            window.open(
                config.oauthUrl,
                "Authenticate With Discord",
                "scrollbars,status,resizable,innerWidth=500,innerHeight=800"
            );
        }, 50);
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
                                Meet the next-generation all-in-one bot, controllable from all convenient locations.
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

export default Authentication;
