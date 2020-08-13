import * as React from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
//@ts-ignore
import {makeStyles, Theme, ThemeProvider} from '@material-ui/core/styles';
//@ts-ignore
import {Notification,} from 'react-admin';
import {Button, Divider, Grid, Tab, Tabs, Toolbar, Typography} from "@material-ui/core";
import {useAuth0} from "../../../contexts/auth0-context";

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    marginBottom: 30
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const MyLayout = ({children, theme}: any) => {

  const history = useHistory();
  const classes = useStyles();
  const {logout} = useAuth0();

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    history.push(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>

        <Grid container justify="center" spacing={2}>

          <Grid item xs={10}>
            <Toolbar>
              <Typography className={classes.title}>Club Abode</Typography>
              <Button variant="outlined" color="inherit" onClick={() => logout({})}>Logout</Button>
            </Toolbar>
          </Grid>

          <Grid item xs={10}>
            <Tabs
              centered
              value={history.location.pathname}
              onChange={handleTabChange}
              className={classes.title}>
              <Tab label="Overview" value="/"/>
              <Tab label="Properties" value="/properties"/>
              <Tab label="People" value="/members"/>
              <Tab label="Organizations" value="/organizations"/>
            </Tabs>
            <Divider light={true}/>
          </Grid>

          <Grid item xs={10}>
            {children}
          </Grid>

        </Grid>

        <Notification/>
      </div>
    </ThemeProvider>
  );
};

MyLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  theme: PropTypes.object
};

export default MyLayout;