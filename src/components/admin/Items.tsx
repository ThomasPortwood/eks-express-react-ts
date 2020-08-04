import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Create, DateField, Datagrid, Edit, EditButton, Filter, List, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextField, TextInput} from 'react-admin';

const ItemTitle = ({record}: any) => {
  return <span>Item {record ? `"${record.name}"` : ''}</span>;
};

export const ItemList = (props: any) => (
  <List filters={<ItemFilter/>} {...props}>
    <Datagrid rowClick="edit">
      <DateField source="createdAt" label="Created" showTime/>
      <ReferenceField label="Property" source="propertyId" reference="properties">
        <TextField source="name"/>
      </ReferenceField>
      <TextField source="name"/>
      <TextField source="attributes"/>
      <EditButton/>
    </Datagrid>
  </List>
);

export const ItemCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput label="Property" source="property.id" reference="properties">
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <TextInput source="name"/>
      <TextInput source="attributes" initialValue="{}"/>
    </SimpleForm>
  </Create>
);

export const ItemEdit = (props: any) => (
  <Edit title={<ItemTitle/>} {...props}>
    <SimpleForm>
      <ReferenceInput label="Property" source="propertyId" reference="properties">
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <TextInput source="name"/>
      <TextInput source="attributes"/>
    </SimpleForm>
  </Edit>
);

const ItemFilter = (props: any) => (
  <Filter {...props}>
    <TextInput source="name" alwaysOn/>
    {/*<ReferenceInput label="Property" source="property.id" reference="Property" allowEmpty>*/}
    {/*    <SelectInput optionText="name"/>*/}
    {/*</ReferenceInput>*/}
  </Filter>
);

