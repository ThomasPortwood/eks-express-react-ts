import React, {cloneElement} from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {AutocompleteInput, Button, Create, Datagrid, DeleteButton, Edit, EditButton, ExportButton, Filter, List, ReferenceField, ReferenceInput, ReferenceManyField, SimpleForm, TabbedForm, FormTab, sanitizeListRestProps, TextField, TextInput, TopToolbar, useListContext} from 'react-admin';

import {Link, useHistory} from "react-router-dom";
import IconAdd from "@material-ui/icons/Add";

const PropertyListActions = (props: any) => {

  const history = useHistory();

  const {
    className,
    exporter,
    filters,
    maxResults,
    ...rest
  } = props;

  const {
    currentSort,
    resource,
    displayedFilters,
    filterValues,
    showFilter,
    total,
  } = useListContext();

  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters && cloneElement(filters, {
        resource,
        showFilter,
        displayedFilters,
        filterValues,
        context: 'button',
      })}
      <Button
        onClick={() => history.push('properties/create') }
        label="Create"
      >
        <IconAdd />
      </Button>
      <ExportButton
        disabled={total === 0}
        resource={resource}
        sort={currentSort}
        filterValues={filterValues}
        maxResults={maxResults}
      />
    </TopToolbar>
  );
};

export const PropertyList = (props: any) => (
  <List actions={<PropertyListActions/>} filters={<PropertyFilter/>} {...props}>
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
          <TextInput source="address" fullWidth/>
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
    label="Add Fixture"
  />
);

const AddDocumentButton = ({ classes, record }: any) => (
  <Button
    variant="contained"
    component={Link}
    to={`/documents/create?propertyId=${record.id}`}
    label="Add Document"
  />
);