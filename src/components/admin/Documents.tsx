import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Create, Datagrid, DateField, Edit, EditButton, Filter, List, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextField, TextInput, ImageInput, ImageField} from 'react-admin';
import { Typography } from '@material-ui/core';

const DocumentTitle = ({record}: any) => {
  return <span>Document {record ? `"${record.name}"` : ''}</span>;
};

export const DocumentList = (props: any) => (
  <List filters={<DocumentFilter/>} {...props}>
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

export const DocumentCreate = (props: any) => {


  console.log(props);

  return (
    <Create {...props}>
      <SimpleForm initialValues={{property_id: 1}}>
        <ReferenceInput label="Property" source="property.id" reference="properties">
          <SelectInput optionText="name"/>
        </ReferenceInput>
        <TextInput source="name"/>
        <TextInput source="description"/>
        <ImageInput source="picture" label="Picture" accept="image/*" multiple={false}>
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Create>
  );
};

const Aside = () => (
  <div style={{ width: 200, margin: '1em' }}>
    <Typography variant="h6">Document details</Typography>
    <Typography variant="body2">
      Some important information about documents can be displayed in this aside.
    </Typography>
  </div>
);

export const DocumentEdit = (props: any) => (
  <Edit aside={<Aside />} title={<DocumentTitle/>} {...props}>
    <SimpleForm>
      <ReferenceInput label="Property" source="propertyId" reference="properties">
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <TextInput source="name"/>
      <TextInput source="attributes"/>
      <ImageField source="url" />
      {/*<ImageInput source="pictures" label="Related pictures" accept="image/*">*/}
      {/*  <ImageField source="src" title="title" />*/}
      {/*</ImageInput>*/}
    </SimpleForm>
  </Edit>
);

const DocumentFilter = (props: any) => (
  <Filter {...props}>
    <TextInput source="name" alwaysOn/>
    {/*<ReferenceInput label="Property" source="property.id" reference="Property" allowEmpty>*/}
    {/*    <SelectInput optionText="name"/>*/}
    {/*</ReferenceInput>*/}
  </Filter>
);

