import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Create, Datagrid, DateField, Edit, EditButton, Filter, List, SimpleForm, TextField, TextInput} from 'react-admin';

const PropertyTitle = ({record}: any) => {
  return <span>Property {record ? `"${record.name}"` : ''}</span>;
};

export const PropertyList = (props: any) => (
  <List filters={<PropertyFilter/>} {...props}>
    <Datagrid rowClick="edit">
      <DateField source="createdAt" label="Created" showTime/>
      <TextField source="name"/>
      <TextField source="address"/>
      <TextField source="attributes"/>
      <EditButton/>
    </Datagrid>
  </List>
);

export const PropertyCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="name"/>
      <TextInput source="address"/>
      <TextInput source="attributes" initialValue="{}"/>
    </SimpleForm>
  </Create>
)

export const PropertyEdit = (props: any) => (
  <Edit title={<PropertyTitle/>} {...props}>
    <SimpleForm>
      <TextInput source="name"/>
      <TextInput source="address" disabled/>
      <TextInput source="attributes"/>
    </SimpleForm>
  </Edit>
);

const PropertyFilter = (props: any) => (
  <Filter {...props}>
    <TextInput source="name" alwaysOn/>
    {/*<ReferenceInput label="Property" source="property.id" reference="Property" allowEmpty>*/}
    {/*    <SelectInput optionText="name"/>*/}
    {/*</ReferenceInput>*/}
  </Filter>
);