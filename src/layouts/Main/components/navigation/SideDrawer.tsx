import { Box, Drawer, IconButton, Toolbar, Typography, withStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";


const styles = {
    toolbar: {
        minWidth: 240
    }
};

export interface Props {
    open: React.ComponentState;
}


const SideDrawer = (props: Props) => {
    const { open } = props;

    return (
        <Drawer anchor="left" variant="temporary" open={ open }>
            <Toolbar disableGutters>
                <Box
                    pl={ 3 }
                    pr={ 3 }
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                    alignItems="center"
                >
                    <Typography variant="h6">
                        A Sidedrawer
                    </Typography>
                    <IconButton color="primary" aria-label="Close Sidedrawer">
                        <CloseIcon/>
                    </IconButton>
                </Box>
            </Toolbar>
        </Drawer>
    );
};

export default withStyles(styles)(SideDrawer);
