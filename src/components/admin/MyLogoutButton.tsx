import {useAuth0} from "../../contexts/auth0-context";
import {Button} from "@material-ui/core";
import React from "react";

export const MyLogoutButton = () => {
  const {logout} = useAuth0();
  return (<Button onClick={() => logout({})} color="inherit">Logout</Button>)
};