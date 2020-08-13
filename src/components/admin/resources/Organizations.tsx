import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Button, Create, Datagrid, DeleteButton, Edit, EditButton, List, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TabbedForm, FormTab, ReferenceManyField, TextField, TextInput} from 'react-admin';
import { Link } from 'react-router-dom';

const OrganizationTitle = ({record}: any) => {
  return <span>Organization {record ? `"${record.name}"` : ''}</span>;
};

export const OrganizationList = (props: any) => (
  <List {...props}>
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
          <ReferenceManyField reference="organizationMembers" target={`${props.basePath}/${props.id}/organizationMembers`} >
            <Datagrid>
              <ReferenceField source="memberId" reference="members">
                <TextField source="name"/>
              </ReferenceField>
              <TextField label="Permission"/>
              <DeleteButton label="Remove" redirect={deleteRedirect}/>
            </Datagrid>
          </ReferenceManyField>
          <AddOrganizationMemberButton/>
        </FormTab>
        <FormTab label="Settings">
          <ReferenceInput label="Owner" source="ownerId" reference="members">
            <SelectInput optionText="name"/>
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
      label="Add"
    />
  )
};