import {useAuth0} from "../../../contexts/auth0-context";
import {Grid, Typography} from "@material-ui/core";
import * as React from "react";

export const OverviewProfile = () => {

  const {user} = useAuth0();

  return (
    <Grid container spacing={2}>
      <Grid item lg='auto' xs={12}>
        <img src={user.picture} alt="Profile" width={75}/>
      </Grid>
      <Grid item xs='auto'>
        <Typography variant="h4">{user.name}</Typography>
        <Typography>{user.email}</Typography>
      </Grid>
    </Grid>
  );
};