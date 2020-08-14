import React, {Fragment} from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Button, DateField, Datagrid, Filter, List, SimpleList, TextField, TextInput} from 'react-admin';
import {Link} from "react-router-dom";
import {Theme, useMediaQuery} from "@material-ui/core";

const SomethingButton = ({classes, record}: any) => (
  <Button
    component={Link}
    to={`/members`}
    label="Add to club"
  />
);

const PostBulkActionButtons = (props: any) => (
  <Fragment>
    {/*<SomethingButton label="Something" {...props} />*/}
    {/* default bulk delete action */}
    {/*<BulkDeleteButton {...props} />*/}
  </Fragment>
);

export const MemberList = (props: any) => {

  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

  return (
    <List {...props} filters={<MemberFilter/>} bulkActionButtons={<PostBulkActionButtons/>}>
      {isSmall ? (
        <SimpleList
          primaryText={(record: any) => record.name}
          secondaryText={(record: any) => `Member since ${record.createdAt}`}
          linkType={false}/>
      ) : (
        <Datagrid>
          <TextField source="name"/>
          <DateField label="Member Since" source="createdAt" showTime/>
        </Datagrid>
      )}
    </List>
  )
};

const MemberFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label="Name/Email" source="name" alwaysOn/>
  </Filter>
);
