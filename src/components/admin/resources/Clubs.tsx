import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Button, Create, Datagrid, DeleteButton, Edit, EditButton, List, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TabbedForm, FormTab, ReferenceManyField, TextField, TextInput} from 'react-admin';
import { Link } from 'react-router-dom';

const ClubTitle = ({record}: any) => {
  return <span>Club {record ? `"${record.name}"` : ''}</span>;
};

export const ClubList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="name"/>
      <TextField source="description"/>
      <ReferenceField label="Owner" source="ownerId" reference="members">
        <TextField source="name"/>
      </ReferenceField>
      <EditButton/>
    </Datagrid>
  </List>
);

export const ClubCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name"/>
      <TextInput source="description"/>
      <TextInput source="attributes" initialValue="{}"/>
    </SimpleForm>
  </Create>
);

export const ClubEdit = (props: any) => {
  const deleteRedirect = props.id ? `/clubs/${props.id}` : "/clubs";
  return (
    <Edit title={<ClubTitle/>} {...props}>
      <TabbedForm redirect={false}>
        <FormTab label="Members">
          <ReferenceManyField reference="clubMembers" target={`${props.basePath}/${props.id}/clubMembers`} >
            <Datagrid>
              <ReferenceField source="memberId" reference="members">
                <TextField source="name"/>
              </ReferenceField>
              <TextField label="Permission"/>
              <DeleteButton label="Remove" redirect={deleteRedirect}/>
            </Datagrid>
          </ReferenceManyField>
          <AddClubMemberButton/>
        </FormTab>
        <FormTab label="Properties">
          <ReferenceManyField reference="properties" target={`${props.basePath}/${props.id}/properties`} >
            <Datagrid rowClick="edit">
              <ReferenceField label="Owner" source="ownerId" reference="members">
                <TextField source="name"/>
              </ReferenceField>
              <TextField source="name"/>
              <TextField source="address"/>
              <EditButton/>
              <DeleteButton redirect={deleteRedirect}/>
            </Datagrid>
          </ReferenceManyField>
          <AddPropertyButton />
        </FormTab>
        <FormTab label="Settings">
          <ReferenceInput label="Owner" source="ownerId" reference="members">
            <SelectInput optionText="name"/>
          </ReferenceInput>
          <TextInput source="name"/>
          <TextInput source="description"/>
        </FormTab>
      </TabbedForm>
    </Edit>
  )
};

const AddClubMemberButton = ({ classes, record }: any) => {
  return (
    <Button
      variant="contained"
      component={Link}
      to={`/clubMembers/create?clubId=${record.id}`}
      label="Add"
    />
  )
};

const AddPropertyButton = ({ classes, record }: any) => (
  <Button
    variant="contained"
    component={Link}
    to={`/properties/create?clubId=${record.id}`}
    label="Add"
  />
);