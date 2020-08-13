import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Create, Datagrid, DateField, Edit, EditButton, Filter, List, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextField, TextInput} from 'react-admin';


const VerificationTitle = ({record}: any) => {
  return <span>Verification {record ? `"${record.name}"` : ''}</span>;
};

export const VerificationList = (props: any) => (
  <List filters={<VerificationFilter/>} {...props}>
    <Datagrid rowClick="edit">
      <DateField source="createdAt" label="Created" showTime/>
      <ReferenceField label="Property" source="propertyId" reference="properties">
        <TextField source="address"/>
      </ReferenceField>
      <TextField source="name"/>
      <TextField source="attributes"/>
      <EditButton/>
    </Datagrid>
  </List>
);

export const VerificationCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <ReferenceInput label="Property" source="property.id" reference="properties">
        <SelectInput optionText="address"/>
      </ReferenceInput>
      <TextInput source="name"/>
      <TextInput source="attributes" initialValue="{}"/>
    </SimpleForm>
  </Create>
)

export const VerificationEdit = (props: any) => (
  <Edit title={<VerificationTitle/>} {...props}>
    <SimpleForm>
      <ReferenceInput label="Property" source="propertyId" reference="properties">
        <SelectInput optionText="address"/>
      </ReferenceInput>
      <TextInput source="name"/>
      <TextInput source="attributes"/>
    </SimpleForm>
  </Edit>
);

const VerificationFilter = (props: any) => (
  <Filter {...props}>
    <TextInput source="name" alwaysOn/>
    {/*<ReferenceInput label="Property" source="property.id" reference="Property" allowEmpty>*/}
    {/*    <SelectInput optionText="name"/>*/}
    {/*</ReferenceInput>*/}
  </Filter>
);