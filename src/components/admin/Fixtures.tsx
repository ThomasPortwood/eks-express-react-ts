import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Create, DateField, Datagrid, Edit, EditButton, Filter, List, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextField, TextInput} from 'react-admin';

const FixtureTitle = ({record}: any) => {
  return <span>Fixture {record ? `"${record.name}"` : ''}</span>;
};

export const FixtureList = (props: any) => (
  <List filters={<FixtureFilter/>} {...props}>
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

export const FixtureCreate = (props: any) => (
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

export const FixtureEdit = (props: any) => (
  <Edit title={<FixtureTitle/>} {...props}>
    <SimpleForm>
      <ReferenceInput label="Property" source="propertyId" reference="properties">
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <TextInput source="name"/>
      <TextInput source="attributes"/>
    </SimpleForm>
  </Edit>
);

const FixtureFilter = (props: any) => (
  <Filter {...props}>
    <TextInput source="name" alwaysOn/>
    {/*<ReferenceInput label="Property" source="property.id" reference="Property" allowEmpty>*/}
    {/*    <SelectInput optionText="name"/>*/}
    {/*</ReferenceInput>*/}
  </Filter>
);

