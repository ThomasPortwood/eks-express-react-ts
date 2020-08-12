import React from "react";
//@ts-ignore
import {Logout} from 'react-admin';
import {useAuth0} from "../../contexts/auth0-context";
import {Button} from "@material-ui/core";


export const MyLogoutButton = () => {
  const {logout} = useAuth0();
  return (<Button onClick={() => logout({})}>Logout</Button>)
};
