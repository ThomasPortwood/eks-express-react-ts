import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Datagrid, DateField, List, TextField} from 'react-admin';

export const MemberList = (props: any) => (
  <List {...props}>
    <Datagrid>
      <DateField source="createdAt" label="Created" showTime/>
      <TextField source="name"/>
      <TextField source="email"/>
      <TextField source="provider"/>
    </Datagrid>
  </List>
);
