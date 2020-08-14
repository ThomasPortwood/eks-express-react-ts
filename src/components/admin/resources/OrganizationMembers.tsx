import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {AutocompleteInput, Create, ReferenceInput, SimpleForm, TextInput} from 'react-admin';
import {parse} from 'query-string';

// https://marmelab.com/react-admin/AdvancedTutorials.html
export const OrganizationMemberCreate = (props: any) => {
  const {organizationId} = parse(props.location.search);
  const redirect = organizationId ? `/organizations/${organizationId}` : false;
  return (
    <Create {...props}>
      <SimpleForm redirect={redirect}>
        <TextInput source="organizationId" initialValue={organizationId} disabled/>
        <ReferenceInput
          label="Member"
          source="memberId"
          reference="members">
          <AutocompleteInput optionText="name"/>
        </ReferenceInput>
      </SimpleForm>
    </Create>
  )
};