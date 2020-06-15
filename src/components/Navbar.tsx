// src/components/Navbar.js

import React from "react";
import {Link} from "react-router-dom";
import {useAuth0} from '../contexts/auth0-context';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Navbar() {

    const {isAuthenticated, isLoading, loginWithRedirect, logout} = useAuth0();

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (isLoading) return (<div>commencing micromanagement ...</div>);

    return (
        <AppBar position="static">
            {!isAuthenticated && loginWithRedirect({})}
            {isAuthenticated && (
                <Toolbar>
                    <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit"
                                aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem component={Link} to="/profile" onClick={handleClose}>My Profile</MenuItem>
                        <MenuItem component={Link} to="/voyager" onClick={handleClose}>Database Schema</MenuItem>
                        <MenuItem component={Link} to="/graphiql" onClick={handleClose}>Database Request</MenuItem>
                        <MenuItem component={Link} to="/mapbox" onClick={handleClose}>Mapbox</MenuItem>
                    </Menu>
                    <Typography variant="h6" className={classes.title}>
                        My Club Abode
                    </Typography>
                    <Button onClick={() => logout({})} color="inherit">Logout</Button>
                </Toolbar>
            )}
        </AppBar>
    );
}

export default Navbar;