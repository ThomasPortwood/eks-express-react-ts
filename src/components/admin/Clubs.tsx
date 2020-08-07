import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Create, Datagrid, DateField, Edit, EditButton, Filter, List, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TabbedForm, FormTab, TextField, TextInput} from 'react-admin';

export const ClubList = (props: any) => (
  <List {...props}>
    <Datagrid>
      <TextField source="name"/>
      <TextField source="description"/>
    </Datagrid>
  </List>
);

export const ClubCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="name"/>
      <TextInput source="description"/>
      <TextInput source="attributes" initialValue="{}"/>
    </SimpleForm>
  </Create>
);