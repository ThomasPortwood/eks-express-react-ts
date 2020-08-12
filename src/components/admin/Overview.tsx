import * as React from "react";
import {useEffect, useState} from "react";
import {createStyles, Grid, Paper, Theme} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
//@ts-ignore
import {Error, useDataProvider} from 'react-admin';
import {PropertyCard} from "./PropertyCard";
import {Profile} from "./OverviewProfile";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
  }),
);

export default () => {

  const classes = useStyles();
  const dataProvider = useDataProvider();
  const [properties, setProperties] = useState<any []>([]);
  const [error, setError] = useState();

  useEffect(() => {

    dataProvider.getList('properties', {filter: {}})
      .then(({data}: any) => {
        setProperties(data);
      })
      .catch((error: any) => {
        setError(error);
      });

  }, []);

  if (error) return <Error/>;
  if (!properties) return null;

  return (
    <div>

      <Grid container spacing={2} justify="center">

        <Grid item xs={5}>
          <Grid container spacing={2}>
            <Grid item xs={5} spacing={2}>
              <Profile/>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <Grid container spacing={2} justify="center">
            <Grid item xs={5}>
              <Paper elevation={5}>
                Add Something
              </Paper>
            </Grid>
          </Grid>
        </Grid>

      </Grid>

      <Grid container className={classes.root} spacing={2} justify="center">

        <Grid item xs={5}>

          <Grid container spacing={2} justify="center">

            {properties.map(p => (
              <Grid key={p.id} item>
                <PropertyCard property={p}/>
              </Grid>
            ))}

          </Grid>

        </Grid>

        <Grid item xs={3}>
          <Paper elevation={0}>
            Recent Activity (coming soon)
          </Paper>
        </Grid>

      </Grid>
    </div>
  )
};

interface ProfileProps {
  user: any
}

