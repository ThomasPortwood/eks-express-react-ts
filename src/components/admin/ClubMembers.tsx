import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Create, Datagrid, List, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextField} from 'react-admin';

export const ClubMemberList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <ReferenceField label="Club" source="clubId" reference="clubs">
        <TextField source="name"/>
      </ReferenceField>
      <ReferenceField label="Member" source="memberId" reference="members">
        <TextField source="name"/>
      </ReferenceField>
      <TextField label="Permission"/>
    </Datagrid>
  </List>
);

export const ClubMemberCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <ReferenceInput label="Club" source="clubId" reference="clubs">
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <ReferenceInput label="Member" source="memberId" reference="members">
        <SelectInput optionText="name"/>
      </ReferenceInput>
    </SimpleForm>
  </Create>
);