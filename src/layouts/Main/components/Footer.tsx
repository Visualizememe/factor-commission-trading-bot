import { Container, Grid, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: "calc(1%)",
        bottom: 0,
        backgroundColor: theme.palette.primary.main
    },
    footerList: {
        listStyle: "none",
        margin: 0,
        padding: 0
    },
    footerTitle: {
        color: "#dedede"
    },
    footerListItem: {
        color: "#c1c1c1"
    }
}));
const footers = [
    {
        title: "Links",
        description: [
            {
                content: "Home",
                link: "/"
            },
            {
                content: "Invite Bot",
                link: "/invite/bot"
            },
            {
                content: "Support Server",
                link: "/invite/server"
            },
            {
                content: "Get Premium",
                link: "/invite/premium"
            },
            {
                content: "FAQ",
                link: "/faq"
            }
        ]
    },
    {
        title: "Social Media",
        description: [
            {
                content: <i className="fab fa-twitter"/>,
                link: "#"
            }
        ]
    }
] as {
    title: string;
    description: {
        content: string;
        link: string;
    }[];
}[];

const Footer = () => {
    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <Container maxWidth="md" component="footer" className={ classes.root }>
                <Grid container spacing={ 4 } justify="space-evenly">
                    {
                        footers.map(footer => (
                            <Grid item
                                  xs={ 6 }
                                  sm={ 3 }
                                  key={ footer.title }
                            >
                                <Typography
                                    variant="h3"
                                    className={ classes.footerTitle }
                                    gutterBottom
                                >
                                    { footer.title }
                                </Typography>
                                {/*/ List of items */ }
                                <ul className={ classes.footerList }>
                                    {
                                        footer.description.map(item => (
                                            <li key={ `${ footer.title }${ item.content }` }>
                                                <Link
                                                    href="#"
                                                    variant="subtitle1"
                                                    className={ classes.footerListItem }
                                                >
                                                    { item.content }
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </div>
    );
};

export default Footer;
