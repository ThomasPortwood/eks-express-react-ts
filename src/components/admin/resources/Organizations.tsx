import React, {cloneElement} from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {TopToolbar, sanitizeListRestProps, ExportButton, AutocompleteInput, Button, Create, Datagrid, DeleteButton, Edit, EditButton, Filter, List, ReferenceField, ReferenceInput, SimpleForm, TabbedForm, FormTab, ReferenceManyField, TextField, TextInput, useListContext} from 'react-admin';
import { Link, useHistory } from 'react-router-dom';
import IconAdd from '@material-ui/icons/Add';

const OrganizationTitle = ({record}: any) => {
  return <span>Organization {record ? `"${record.name}"` : ''}</span>;
};

const OrganizationFilter = (props: any) => (
  <Filter {...props}>
    <TextInput source="name" alwaysOn/>
  </Filter>
);

const OrganizationListActions = (props: any) => {

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
        onClick={() => history.push('organizations/create') }
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

export const OrganizationList = (props: any) => (
  <List actions={<OrganizationListActions/>} filters={<OrganizationFilter/>} {...props}>
    <Datagrid rowClick="edit">
      <TextField source="name"/>
      <ReferenceField label="Owner" source="ownerId" reference="members">
        <TextField source="name"/>
      </ReferenceField>
      <EditButton/>
    </Datagrid>
  </List>
);

export const OrganizationCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name"/>
      <TextInput source="attributes" initialValue="{}"/>
    </SimpleForm>
  </Create>
);

export const OrganizationEdit = (props: any) => {
  const deleteRedirect = props.id ? `/organizations/${props.id}` : "/organizations";
  return (
    <Edit title={<OrganizationTitle/>} {...props}>
      <TabbedForm redirect={false}>
        <FormTab label="Members">
          <ReferenceManyField
            reference="organizationMembers"
            target={`${props.basePath}/${props.id}/organizationMembers`} >
            <Datagrid>
              <ReferenceField source="memberId" reference="members">
                <TextField source="name"/>
              </ReferenceField>
              <TextField label="Permission"/>
              <DeleteButton redirect={deleteRedirect}/>
            </Datagrid>
          </ReferenceManyField>
          <AddOrganizationMemberButton/>
        </FormTab>
        <FormTab label="Settings">
          <ReferenceInput
            label="Owner"
            source="ownerId"
            reference="members">
            <AutocompleteInput optionText="name"/>
          </ReferenceInput>
          <TextInput source="name"/>
        </FormTab>
      </TabbedForm>
    </Edit>
  )
};

const AddOrganizationMemberButton = ({ classes, record }: any) => {
  return (
    <Button
      variant="contained"
      component={Link}
      to={`/organizationMembers/create?organizationId=${record.id}`}
      label="Add Member"
    />
  )
};