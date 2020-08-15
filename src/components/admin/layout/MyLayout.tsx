import * as React from 'react';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import {makeStyles, Theme, ThemeProvider} from '@material-ui/core/styles';
//@ts-ignore
import {Notification} from 'react-admin';
import {Button, Divider, Grid, Tab, Tabs, Toolbar, Typography} from "@material-ui/core";
import {useAuth0} from "../../../contexts/auth0-context";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    color: 'transparent'
  },
  title: {
    flexGrow: 1,
  },
  tab: {
    minWidth: '10%',
    textTransform: 'none'
  }
}));

const tabs = [
  {index: 0, label: "Overview", key: "/"},
  {index: 1, label: "Map", key: "/map"},
  {index: 2, label: "Properties", key: "/properties"},
  {index: 3, label: "People", key: "/members"},
  {index: 4, label: "Organizations", key: "/organizations"}
]

const MyLayout = ({children, theme, title}: any) => {

  const history = useHistory();
  const classes = useStyles();
  const {logout} = useAuth0();
  const [value, setValue] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    history.push(tabs[newValue].key);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>

        <Grid container justify="center" spacing={2}>

          <Grid item md={10} xs={12}>
            <Toolbar>
              <Typography className={classes.title}>{title}</Typography>
              <Button variant="outlined" color="inherit" onClick={() => logout({})}>Logout</Button>
            </Toolbar>
          </Grid>

          <Grid item xs={10}>
            <Tabs
              centered
              variant="fullWidth"
              value={value}
              onChange={handleTabChange}>
              {tabs.map(t => (<Tab className={classes.tab} {...t}/>))}
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
  theme: PropTypes.object,
  title: PropTypes.string
};

export default MyLayout;