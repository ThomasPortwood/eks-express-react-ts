import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Create, Datagrid, Edit, List, SimpleForm, TextField, TextInput} from 'react-admin';

const PropertyTitle = ({p}: any) => {
    return <span>Property {p ? `"${p.name}"` : ''}</span>;
};

export const PropertyList = (props: any) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="name"/>
            <TextField source="attributes"/>
            <TextField source="created"/>
        </Datagrid>
    </List>
);

export const PropertyCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name"/>
            <TextInput source="attributes"/>
        </SimpleForm>
    </Create>
)

export const PropertyEdit = (props: any) => (
    <Edit title={<PropertyTitle/>} {...props}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <TextInput source="name"/>
            <TextInput multiline source="attributes"/>
        </SimpleForm>
    </Edit>
);