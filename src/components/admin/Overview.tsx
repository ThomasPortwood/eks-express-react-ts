import * as React from "react";
import {Card, CardContent, CardHeader} from '@material-ui/core';

export default () => (
  <Card>
    <CardHeader title="Welcome to Club Abode administrator dashboard."/>
    <CardContent>This dashboard is a tool for direct manipulation of data by administrators only.</CardContent>
  </Card>
);