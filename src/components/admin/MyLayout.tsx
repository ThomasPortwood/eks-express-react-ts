import * as React from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
//@ts-ignore
import {createMuiTheme, makeStyles, Theme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
//@ts-ignore
import {ComponentPropType, Notification,} from 'react-admin';
import {AppBar, Box, Button, Divider, Paper, Tab, Tabs, Toolbar, Typography} from "@material-ui/core";
import {useAuth0} from "../../contexts/auth0-context";

const baseTheme = createMuiTheme();

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    marginBottom: 10
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const MyLayout = ({children}: any) => {

  const history = useHistory();
  const classes = useStyles();
  const {logout} = useAuth0();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    history.push(newValue);
  };

  return (
    <ThemeProvider theme={baseTheme}>
      <div className={classes.root}>

        <Paper elevation={0}>

          <Toolbar>
            <Typography className={classes.title}>Club Abode</Typography>
            <Button color="inherit" onClick={() => logout({})}>Logout</Button>
          </Toolbar>

        </Paper>

        <AppBar color="transparent" position="static" elevation={0}>

          <Toolbar>
            <Tabs value={history.location.pathname} onChange={handleChange} className={classes.title}>
              <Tab label="Overview" value="/"/>
              <Tab label="Organizations" value="/organizations"/>
            </Tabs>
          </Toolbar>

        </AppBar>

        <Divider light={true} className={classes.divider}/>

        <div>
          {children}
        </div>

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