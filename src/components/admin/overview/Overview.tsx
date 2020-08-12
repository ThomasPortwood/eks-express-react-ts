import * as React from "react";
import {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';
import {Button, createStyles, Grid, Theme} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
//@ts-ignore
import {Error, useDataProvider} from 'react-admin';
import {PropertyCard} from "./PropertyCard";
import {OverviewProfile} from "./OverviewProfile";

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
  const history = useHistory();
  const [properties, setProperties] = useState<any []>([]);
  const [error, setError] = useState();

  const debugBorder = 1;

  useEffect(() => {

    dataProvider.getList('properties', {filter: {}, sort: {field: "updatedAt", order: "desc"}})
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

        <Grid item md={5} xs='auto'>
          <OverviewProfile/>
        </Grid>

        <Grid item xs='auto'>
          <Button
            variant='outlined'
            onClick={() => history.push('/properties/create')}>New Property
          </Button>
        </Grid>

      </Grid>

      <Grid container spacing={2} justify="center">

        <Grid item md={5} xs='auto'>
          <Grid container spacing={2} justify="center">
            {properties.map(p => (
              <Grid key={p.id} item>
                <PropertyCard property={p}/>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs='auto'>
          Recent Activity (coming soon)
        </Grid>

      </Grid>
    </div>
  )
};



