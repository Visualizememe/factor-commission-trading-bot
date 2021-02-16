import { Container, isWidthUp, Paper, Tab, Tabs, Typography, useTheme, withWidth } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import querystring from "querystring";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { DiscordServer } from "../../../util/interfaces/types";
import { WhiteTheme } from "../../../util/material/themes/white";
import { getServerData } from "../../../util/webAPI/session";
import loadingAnimation from "./loading.json";
import Commands from "./subViews/commands";
import General from "./subViews/general/General";
import Moderation from "./subViews/moderation";
import Roles from "./subViews/roles";
import Verification from "./subViews/verification";
import Welcome from "./subViews/welcome";


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};


const useStyles = makeStyles((theme: WhiteTheme) => ({
    root: {},
    rootTitle: {
        marginTop: 25
    },
    primaryTabs: {},
    swipeableViews: {
        minHeight: "50vh"
    }
}));

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

const CustomTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={ value !== index }
            id={ `tabpanel-${ index }` }
            aria-labelledby={ `tabpanel-button-${ index }` }
            { ...other }
        >
            {
                value === index && (
                    children
                )
            }
        </div>
    );
};


interface Props {
    width: unknown;
    location: Location;
    [key: string]: any;
}

const DashboardManage = (props: Props) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [serverData, setServerData] = useState(null as null | DiscordServer);
    const theme = useTheme();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    useEffect(() => {
        const serverId = props.match.params.serverId as string;

        getServerData(serverId).then(serverData => {
            setServerData(serverData);
        });
    }, []);

    return serverData ? (
        <Paper className={ classes.root }>
            <Tabs
                value={ value }
                onChange={ handleChange }
                variant={ isWidthUp("lg", props.width as Breakpoint) ? "fullWidth" : "scrollable" }
                centered
            >
                <Tab
                    label="General"
                    id={ `tabpanel-button-${ 0 }` }
                    aria-controls={ `tabpanel-${ 0 }` }
                />
                <Tab
                    label="Moderation"
                    id={ `tabpanel-button-${ 1 }` }
                    aria-controls={ `tabpanel-${ 1 }` }
                />
                <Tab
                    label="Commands"
                    id={ `tabpanel-button-${ 2 }` }
                    aria-controls={ `tabpanel-${ 2 }` }
                />
                <Tab
                    label="Welcome"
                    id={ `tabpanel-button-${ 2 }` }
                    aria-controls={ `tabpanel-${ 2 }` }
                />
                <Tab
                    label="Verification"
                    id={ `tabpanel-button-${ 2 }` }
                    aria-controls={ `tabpanel-${ 2 }` }
                />
                <Tab
                    label="Roles"
                    id={ `tabpanel-button-${ 2 }` }
                    aria-controls={ `tabpanel-${ 2 }` }
                />
            </Tabs>
            <CustomTabPanel value={ value } index={ 0 } dir={ theme.direction }>
                {/* General */ }
                <Container>
                    <General
                        server={ serverData! }
                    />
                </Container>
            </CustomTabPanel>
            <CustomTabPanel value={ value } index={ 1 } dir={ theme.direction }>
                {/* Moderation */ }
                <Container>
                    <Moderation
                        server={ serverData! }
                    />
                </Container>
            </CustomTabPanel>
            <CustomTabPanel value={ value } index={ 2 } dir={ theme.direction }>
                {/* Commands */ }
                <Container>
                    <Commands
                        server={ serverData! }
                    />
                </Container>
            </CustomTabPanel>
            <CustomTabPanel value={ value } index={ 3 } dir={ theme.direction }>
                {/* Commands */ }
                <Container>
                    <Welcome
                        server={ serverData! }
                    />
                </Container>
            </CustomTabPanel>
            <CustomTabPanel value={ value } index={ 4 } dir={ theme.direction }>
                {/* Commands */ }
                <Container>
                    <Verification
                        server={ serverData! }
                    />
                </Container>
            </CustomTabPanel>
            <CustomTabPanel value={ value } index={ 5 } dir={ theme.direction }>
                {/* Commands */ }
                <Container>
                    <Roles
                        server={ serverData! }
                    />
                </Container>
            </CustomTabPanel>

        </Paper>
    ) : (
        <>
            <Typography
                align="center"
                variant="h2"
                className={ classes.rootTitle }
            >
                Fetching data...
            </Typography>
            <Lottie
                options={ defaultOptions }
                height={ 400 }
                width={ 400 }
                isStopped={ false }
                isClickToPauseDisabled={ true }
            />
        </>
    );
};

export default withWidth()(DashboardManage);
