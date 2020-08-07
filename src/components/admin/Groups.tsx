import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Datagrid, List, TextField} from 'react-admin';

export const GroupList = (props: any) => (
  <List {...props}>
    <Datagrid>
      <TextField source="name"/>
      <TextField source="description"/>
    </Datagrid>
  </List>
);
