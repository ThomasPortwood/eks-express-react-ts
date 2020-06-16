import React from 'react';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Create, Datagrid, Edit, List, ReferenceInput, SelectInput, SimpleForm, TextField, TextInput} from 'react-admin';

const PropertyTitle = ({p}: any) => {
    return <span>Property {p ? `"${p.name}"` : ''}</span>;
};

export const PropertyList = (props: any) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="name"/>
            {/*<EmailField source="email"/>*/}
            {/*<TextField source="phone"/>*/}
            {/*<UrlField source="website"/>*/}
            {/*<TextField source="company.name"/>*/}
        </Datagrid>
    </List>
);

export const PropertyCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            {/*<ReferenceInput source="propertyId" reference="Property"><SelectInput optionText="name"/></ReferenceInput>*/}
            <TextInput source="name"/>
            {/*<TextInput multiline source="properties"/>*/}
        </SimpleForm>
    </Create>
)

export const PropertyEdit = (props: any) => (
    <Edit title={<PropertyTitle/>} {...props}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            {/*<ReferenceInput source="propertyId" reference="properties"><SelectInput optionText="name"/></ReferenceInput>*/}
            <TextInput source="name"/>
            {/*<TextInput multiline source="properties"/>*/}
        </SimpleForm>
    </Edit>
);