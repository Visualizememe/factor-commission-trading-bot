import { Button, Container, Grid, Typography } from "@material-ui/core";
import { lime } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import Particles, { IParticlesParams } from "react-particles-js";
import { useStore } from "react-redux";
import { useCookies } from "react-cookie";
import { sessionLogin } from "../../../util/actions";
import { useSnackbar } from "notistack";
import { STRIPE_PUBLIC_KEY } from "../../../util/constants";


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(0),
        minHeight: "100vh",
        backgroundColor: "#1f1d1d",
        padding: theme.spacing(8, 0, 6),
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        color: "#ffffff",
        marginRight: theme.spacing(2)
    },
    heroButtons: {
        marginTop: theme.spacing(4)
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    cardMedia: {
        paddingTop: "56.25%" // 16:9
    },
    cardContent: {
        flexGrow: 1
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6)
    },
    primaryCTAButton: {
        backgroundColor: theme.palette.info.main,
        color: "#ffffff",
        "&:hover": {
            backgroundColor: theme.palette.info.dark
        },
        "&:active": {
            backgroundColor: theme.palette.info.dark
        }
    },
    secondaryCTAButton: {
        backgroundColor: "inherit",
        outlineColor: lime["500"],
        outlineWidth: 5,
        "&:hover": {
            backgroundColor: lime["600"],
            color: theme.palette.info.contrastText
        }
    },
    particles: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
        height: "100%",
        width: "99%"
    },
    featuresSection: {
        marginTop: 30,
        zIndex: 1
    },
    viewFab: {
        marginTop: 15,
        width: 40,
        bottom: 0
    },
    pricingCardHeader: {
        backgroundColor: "#4f4f4f",
        color: "#bfbfbf"
    },
    pricingCard: {
        display: "flex",
        justifyContent: "center",
        alignItems: "baseline",
        marginBottom: theme.spacing(2)
    },
    pricingTierList: {
        listStyle: "none",
        textAlign: "left"
    },
    tierItem: {
        textAlign: "left",
        marginBottom: 12
    },
    title: {
        color: "#f3f3f3",
        fontSize: "46px",
        letterSpacing: "2px",
        fontWeight: "bolder"
    },
    description: {
        fontSize: "20px",
        color: "#a4a4a4"
    }
}));

const particlesConfig = {
    particles: {
        number: {
            value: 40,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: [ "#29b1fc" ]
        },
        shape: {
            type: "circle",
            stroke: {
                width: 1,
                color: "#000000"
            },
            polygon: {
                nb_sides: 5
            },
            image: {
                src: "",
                width: 100,
                height: 100
            }
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 5,
            random: true,
            anim: {
                enable: false,
                speed: 20,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 120,
            color: "#62a7fd",
            opacity: 0.2,
            width: 1.6
        },
        move: {
            enable: true,
            speed: 2,
            // @ts-ignore
            direction: "top",
            random: false,
            straight: false,
            // @ts-ignore
            out_mode: "out",
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        // @ts-ignore
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "bubble"
            },
            onclick: {
                enable: true
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 2,
                duration: 2,
                opacity: 8
            },
            repulse: {
                distance: 20,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
} as IParticlesParams;


export default function () {
    // @ts-ignore
    const stripe = new Stripe(STRIPE_PUBLIC_KEY);
    const snackbar = useSnackbar();
    const [ sessionCookie, setSessionCookie, removeSessionCookie ] = useCookies([ "auth" ]);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ hasSubscription, setHasSubscription ] = useState(false);
    const [ hasSubscriptionCancelled, setHasSubscriptionCancelled ] = useState(false);
    const [ btnDisabled, setBtnDisabled ] = useState(true);
    const store = useStore();
    const classes = useStyles();
    
    const sendMessage = (message: string, status: "info" | "success" | "error") => {
        snackbar.enqueueSnackbar(
            message,
            {
                variant: status,
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center"
                }
            }
        );
    };
    
    const doAction = () => {
        if (isLoggedIn) {
            if (hasSubscription) {
                const wanted = window.confirm("Are you sure you want to cancel your subscription?");
                
                if (wanted) {
                    sendMessage("Unsubscribing..", "info");
                    
                    if (hasSubscriptionCancelled) {
                        sendMessage("Already pending cancellation!", "error");
                        return;
                    }
                    
                    fetch("/api/payment/cancel-subscription", {
                        method: "POST",
                        credentials: "include"
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                sendMessage("Unsubscribed!", "success");
                                setTimeout(() => {
                                    window.location.reload();
                                }, 1500);
                            } else {
                                throw new Error("Returned with no success");
                            }
                        })
                        .catch(e => {
                            console.warn(e);
                            
                            sendMessage("Failed to unsubscribe!", "error");
                        });
                }
            } else {
                sendMessage("Sending you to Stripe..", "info");
                setTimeout(() => {
                    fetch("/api/payment/create-checkout-session", {
                        method: "POST"
                    })
                        .then(res => res.json())
                        .then((body: any) => {
                            stripe
                                .redirectToCheckout({
                                    sessionId: body.data.sessionId
                                });
                        })
                        .catch(e => {
                            console.warn(e);
                            sendMessage(`An error occurred while creating checkout session!`, "error");
                            return;
                        });
                }, 2000);
            }
        } else {
            // Subscribe
            window.location.replace("/auth/redirect");
        }
    };
    
    const finishPreps = () => {
        setBtnDisabled(false);
    };
    
    useEffect(() => {
        if (sessionCookie && sessionCookie.auth) {
            console.log("logged in!");
            sessionLogin(sessionCookie.auth);
            setIsLoggedIn(true);
            
            fetch("/api/payment/get-subscription-status", {
                method: "POST",
                credentials: "include"
            })
                .then(r => r.json())
                .then((body: any) => {
                    if (body && body.success) {
                        setHasSubscription((body.data as any).hasSubscription as boolean);
                        setHasSubscriptionCancelled((body.data as any).isCancelled as boolean);
                        finishPreps();
    
                        if (hasSubscriptionCancelled || body.data.isCancelled) {
                            sendMessage(`Note: Your subscription is pending cancellation!`, "info");
                        }
                    } else {
                        alert("Failed to retrieve subscription status!");
                    }
                });
        } else {
            finishPreps();
        }
    }, []);
    
    
    return (
        <>
            <div className={ classes.root }>
                <Particles className={ classes.particles } params={ particlesConfig }/>
                <Container maxWidth="sm" style={ { zIndex: 1 } }>
                    <Typography
                        component="h2"
                        variant="h2"
                        align="center"
                        className={ classes.title }
                        style={ { zIndex: 1 } }
                        gutterBottom
                    >
                        Stock Alerts
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        className={ classes.description }
                        gutterBottom
                    >
                        Alerts sent by experienced traders. We send alerts on when to buy and sell.
                        Additionally, we provide our watchlist daily.
                    </Typography>
                    <div className={ classes.heroButtons }>
                        <Grid container spacing={ 2 } justify="center">
                            <Grid item>
                                <Button
                                    variant="contained"
                                    className={ classes.primaryCTAButton }
                                    disabled={ btnDisabled }
                                    size="large"
                                    style={ {
                                        backgroundColor: isLoggedIn ? hasSubscription ? "#d63434" : "#1ad485" : "#3b8cf1"
                                    } }
                                    autoFocus={ true }
                                    focusRipple={ false }
                                    disableRipple={ false }
                                    disableTouchRipple={ false }
                                    onClick={ () => doAction() }
                                >
                                    {
                                        isLoggedIn ? (
                                            hasSubscription ? (
                                                <>
                                                    <i className={ classes.icon + " fas fa-unlink fa-lg" }/>
                                                    Unsubscribe
                                                </>
                                            ) : (
                                                <>
                                                    <i className={ classes.icon + " fas fa-satellite-dish fa-lg" }/>
                                                    Subscribe
                                                </>
                                            )
                                        ) : (
                                            <>
                                                <i className={ classes.icon + " fab fa-discord fa-lg" }/>
                                                Get Started
                                            </>
                                        )
                                    }
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
        </>
    );
    
}
