import * as React from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
//@ts-ignore
import {createMuiTheme, makeStyles, Theme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
//@ts-ignore
import {ComponentPropType, Notification,} from 'react-admin';
import {AppBar, Button, Divider, Grid, Tab, Tabs, Toolbar, Typography} from "@material-ui/core";
import {useAuth0} from "../../../contexts/auth0-context";

const baseTheme = createMuiTheme();

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    marginBottom: 15
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const MyLayout = ({children}: any) => {

  const history = useHistory();
  const classes = useStyles();
  const {logout} = useAuth0();

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    history.push(newValue);
  };

  return (
    <ThemeProvider theme={baseTheme}>
      <div className={classes.root}>

        <Toolbar>
          <Typography className={classes.title}>Club Abode</Typography>
          <Button color="inherit" onClick={() => logout({})}>Logout</Button>
        </Toolbar>

        <Grid container justify="center" spacing={2}>
          <Grid item lg={8}>

            <AppBar color="transparent" position="static" elevation={0}>

              <Toolbar>
                <Tabs value={history.location.pathname} onChange={handleTabChange} className={classes.title}>
                  <Tab label="Overview" value="/"/>
                  <Tab label="Organizations" value="/organizations"/>
                  <Tab label="Access Control" value="/clubs"/>
                </Tabs>
              </Toolbar>

            </AppBar>

          </Grid>
        </Grid>

        <Divider light={true} className={classes.divider}/>

        <Grid container spacing={2} justify="center">
          {children}
        </Grid>

        <Notification/>
      </div>
    </ThemeProvider>
  );
};

MyLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  dashboard: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  logout: ComponentPropType,
  title: PropTypes.string.isRequired,
};

export default MyLayout;