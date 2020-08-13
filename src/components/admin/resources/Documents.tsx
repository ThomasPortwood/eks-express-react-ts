import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Create, Edit, FileField, FileInput, Filter, ImageField, ReferenceInput, SelectInput, SimpleForm, TextInput} from 'react-admin';
import {Typography} from '@material-ui/core';
import {parse} from "query-string";

const DocumentTitle = ({record}: any) => {
  return <span>Document {record ? `"${record.name}"` : ''}</span>;
};

export const DocumentCreate = (props: any) => {
  const {propertyId} = parse(props.location.search);
  const redirect = propertyId ? `/properties/${propertyId}/2` : false;
  return (
    <Create {...props}>
      <SimpleForm redirect={redirect}>
        <TextInput source="propertyId" initialValue={propertyId} disabled/>
        <TextInput source="name"/>
        <TextInput source="description"/>
        <FileInput source="file" label="File" multiple={false}>
          <FileField source="src" title="title"/>
        </FileInput>
      </SimpleForm>
    </Create>
  );
};

const Aside = () => (
  <div style={{width: 200, margin: '1em'}}>
    <Typography variant="h6">Document details</Typography>
    <Typography variant="body2">
      Some important information about documents can be displayed in this aside.
    </Typography>
  </div>
);

export const DocumentEdit = (props: any) => (
  <Edit aside={<Aside/>} title={<DocumentTitle/>} {...props}>
    <SimpleForm>
      <ReferenceInput label="Property" source="propertyId" reference="properties">
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <TextInput source="name"/>
      <TextInput source="attributes"/>
      <FileField source="url" title="name" />
      {/*<ImageField source="url"/>*/}
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

