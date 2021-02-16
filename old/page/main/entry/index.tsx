import { Button, Container, Fab, Grid, Typography } from "@material-ui/core";
import { lime } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Particles, { IParticlesParams } from "react-particles-js";
import config from "../../../../src/config";


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
        minHeight: "60vh",
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
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
        color: theme.palette.success.contrastText,
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
        height: "80%",
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
    const classes = useStyles();
    const openPremium = () => window.open(`${ config.host }/redirects/patreon`);
    
    
    return (
        <>
            <div className={ classes.root }>
                <Particles className={ classes.particles } params={ particlesConfig }/>
                <Container maxWidth="sm" style={ { zIndex: 1 } }>
                    <Typography
                        component="h1"
                        variant="h1"
                        align="center"
                        color="textPrimary"
                        style={ { zIndex: 1 } }
                        gutterBottom
                    >
                        RoEssentials
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="textSecondary"
                        gutterBottom
                    >
                        Reliable and professional Discord bot for managing your Roblox-related community.
                        All the best technologies in one place.
                    </Typography>
                    <div className={ classes.heroButtons }>
                        <Grid container spacing={ 2 } justify="center">
                            <Grid item>
                                <Button
                                    variant="contained"
                                    className={ classes.primaryCTAButton }
                                    size="large"
                                    autoFocus={ true }
                                    focusRipple={ false }
                                    disableRipple={ false }
                                    disableTouchRipple={ false }
                                    onClick={ () => window.open(`${ config.host }/redirects/invite`) }
                                >
                                    <i className={ classes.icon + " fab fa-discord fa-lg" }/>
                                    Add to server
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    className={ classes.secondaryCTAButton }
                                    size="large"
                                    onClick={ openPremium }
                                >
                                    Become Premium
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
            <div style={ { width: "100%", display: "flex", justifyContent: "center" } }>
                <Fab
                    variant="round"
                    size="small"
                    aria-label="add"
                    className={ classes.viewFab }
                >
                    <i className="fas fa-arrow-down"/>
                </Fab>
            </div>
        </>
    );
    
}
