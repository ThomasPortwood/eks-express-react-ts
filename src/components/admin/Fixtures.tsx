import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Create, Edit, EditButton, Filter, List, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextField, TextInput} from 'react-admin';
import {parse} from "query-string";

const FixtureTitle = ({record}: any) => {
  return <span>Fixture {record ? `"${record.name}"` : ''}</span>;
};

export const FixtureCreate = (props: any) => {
  const { propertyId } = parse(props.location.search);
  const redirect = propertyId ? `/properties/${propertyId}/1` : false;
  return (
    <Create {...props}>
      <SimpleForm redirect={redirect}>
        <TextInput source="propertyId" initialValue={propertyId} disabled/>
        <TextInput source="name"/>
        <TextInput source="attributes" initialValue="{}"/>
      </SimpleForm>
    </Create>
  )
};

export const FixtureEdit = (props: any) => (
  <Edit title={<FixtureTitle/>} {...props}>
    <SimpleForm>
      <ReferenceInput label="Property" source="propertyId" reference="properties">
        <SelectInput optionText="address"/>
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

