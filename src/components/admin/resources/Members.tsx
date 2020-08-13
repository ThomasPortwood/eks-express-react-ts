import React, {Fragment} from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Button, Datagrid, DateField, Filter, List, TextField, TextInput} from 'react-admin';
import {Link} from "react-router-dom";

const SomethingButton = ({ classes, record }: any) => (
  <Button
    component={Link}
    to={`/members`}
    label="Add to club"
  />
);

const PostBulkActionButtons = (props: any) => (
  <Fragment>
    <SomethingButton label="Something" {...props} />
    {/* default bulk delete action */}
    {/*<BulkDeleteButton {...props} />*/}
  </Fragment>
);

export const MemberList = (props: any) => (
  <List {...props} filters={<MemberFilter/>} bulkActionButtons={<PostBulkActionButtons />}>
    <Datagrid>
      <TextField source="name"/>
      <TextField source="email"/>
      <TextField source="provider"/>
      <DateField label="Member Since" source="createdAt" showTime/>
    </Datagrid>
  </List>
);

const MemberFilter = (props: any) => (
  <Filter {...props}>
    <TextInput source="name" alwaysOn/>
  </Filter>
);
