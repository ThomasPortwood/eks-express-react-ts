import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Create, Datagrid, DateField, Edit, EditButton, Filter, List, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TabbedForm, FormTab, TextField, TextInput} from 'react-admin';


import MyMapbox from "./MyMapbox";

const PropertyTitle = ({record}: any) => {
  return <span>Property {record ? `"${record.name}"` : ''}</span>;
};

export const PropertyList = (props: any) => {
  return (
    <List filters={<PropertyFilter/>} {...props}>
      <Datagrid rowClick="edit">
        <TextField source="name"/>
        <TextField source="address"/>
        <ReferenceField label="Owner" source="ownerId" reference="members">
          <TextField source="name"/>
        </ReferenceField>
        <ReferenceField label="Club" source="clubId" reference="clubs">
          <TextField source="name"/>
        </ReferenceField>
        <DateField source="createdAt" label="Created" showTime/>
        <EditButton/>
      </Datagrid>
    </List>
  )
};

export const PropertyCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput label="Club" source="clubId" reference="clubs">
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <TextInput source="name"/>
      <TextInput source="address"/>
      <TextInput source="attributes" initialValue="{}"/>
    </SimpleForm>
  </Create>
);

export const PropertyEdit = (props: any) => {
  return (
    <Edit title={<PropertyTitle/>} {...props}>
      <TabbedForm>
        <FormTab label="Address">
          <TextInput source="address"/>
          <MyMapbox/>
        </FormTab>
        <FormTab label="Fixtures">
        </FormTab>
        <FormTab label="Settings">
          <ReferenceInput label="Owner" source="ownerId" reference="members">
            <TextField source="name"/>
          </ReferenceInput>
          <ReferenceInput label="Club" source="clubId" reference="clubs">
            <SelectInput optionText="name"/>
          </ReferenceInput>
          <TextInput source="name"/>
        </FormTab>
        <FormTab label="Misc">
          <TextInput source="attributes"/>
        </FormTab>
      </TabbedForm>
    </Edit>
  )
};

const PropertyFilter = (props: any) => (
  <Filter {...props}>
    <TextInput source="name" alwaysOn/>
    {/*<ReferenceInput label="Property" source="property.id" reference="Property" allowEmpty>*/}
    {/*    <SelectInput optionText="name"/>*/}
    {/*</ReferenceInput>*/}
  </Filter>
);