import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {AutocompleteInput, Button, Create, Datagrid, DeleteButton, Edit, EditButton, Filter, List, ReferenceField, ReferenceInput, ReferenceManyField, SimpleForm, TabbedForm, FormTab, TextField, TextInput} from 'react-admin';

import MyMapbox from "../map/MyMapbox";
import {Link} from "react-router-dom";

export const PropertyList = (props: any) => (
  <List filters={<PropertyFilter/>} {...props}>
    <Datagrid rowClick="edit">
      <TextField source="name"/>
      <ReferenceField label="Owner" source="ownerId" reference="members">
        <TextField source="name"/>
      </ReferenceField>
      <EditButton/>
    </Datagrid>
  </List>
);

export const PropertyCreate = (props: any) => {
  const redirect = `/properties`;
  return (
    <Create {...props}>
      <SimpleForm redirect={redirect}>
        <TextInput source="name"/>
        <TextInput source="address"/>
        <TextInput source="attributes" initialValue="{}"/>
      </SimpleForm>
    </Create>
  )
};

export const PropertyEdit = (props: any) => {
  return (
    <Edit {...props}>
      <TabbedForm redirect={false}>
        <FormTab label="Address">
          <TextInput source="address" fullWidth/>
          <MyMapbox record={props.record}/>
        </FormTab>
        <FormTab label="Fixtures">
          <ReferenceManyField
            reference="fixtures"
            target={`${props.basePath}/${props.id}/fixtures`}>
            <Datagrid rowClick="edit">
              <TextField source="name"/>
              <EditButton/>
              <DeleteButton/>
            </Datagrid>
          </ReferenceManyField>
          <AddFixtureButton/>
        </FormTab>
        <FormTab label="Documents">
          <ReferenceManyField
            reference="documents"
            target={`${props.basePath}/${props.id}/documents`} >
            <Datagrid rowClick="edit">
              <TextField source="name"/>
              <EditButton/>
              <DeleteButton/>
            </Datagrid>
          </ReferenceManyField>
          <AddDocumentButton/>
        </FormTab>
        <FormTab label="Settings">
          <ReferenceInput
            label="Owner"
            source="ownerId"
            reference="members">
            <AutocompleteInput optionText="name"/>
          </ReferenceInput>
          <ReferenceInput
            label="Club"
            source="clubId"
            reference="clubs">
            <AutocompleteInput optionText="name"/>
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
  </Filter>
);

const AddFixtureButton = ({ classes, record }: any) => (
  <Button
    variant="contained"
    component={Link}
    to={`/fixtures/create?propertyId=${record.id}`}
    label="Add"
  />
);

const AddDocumentButton = ({ classes, record }: any) => (
  <Button
    variant="contained"
    component={Link}
    to={`/documents/create?propertyId=${record.id}`}
    label="Add"
  />
);