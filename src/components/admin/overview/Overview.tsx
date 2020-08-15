import * as React from "react";
import {useState} from "react";
import {useHistory} from 'react-router-dom';
import {Button, Grid} from '@material-ui/core';
//@ts-ignore
import {Error, Loading, useQueryWithStore} from 'react-admin';
import {OverviewProfile} from "./OverviewProfile";
import {PropertyCard} from "./PropertyCard";

export default () => {

  const history = useHistory();
  const [properties, setProperties] = useState<any []>([]);

  const {loaded, error} = useQueryWithStore(
    {
      type: 'getList',
      resource: 'properties',
      payload: {filter: {}, sort: {field: "updatedAt", order: "desc"}}
    },
    {
      onSuccess: ({data}: any) => {
        setProperties(data);
      }
    }
  );

  if (!loaded) { return <Loading />; }
  if (error) { return <Error />; }

  return (

    <Grid container spacing={2} justify="center">

      <Grid container spacing={2} justify="center" item xs={12}>

        <Grid item xs={6}>
          <OverviewProfile/>
        </Grid>

        <Grid item xs='auto'>
          <Button
            variant='outlined'
            onClick={() => history.push('/properties/create')}>New Property
          </Button>
        </Grid>

      </Grid>

      <Grid container spacing={2} justify="center" item xs={12}>

        <Grid item lg={8} xs='auto'>
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

    </Grid>

  )
};



