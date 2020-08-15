// https://reactjs.org/docs/hooks-intro.html
import React, {useEffect, useState} from 'react';
import { Route } from 'react-router-dom';
// https://auth0.com/docs/quickstart/spa/react
import {useAuth0} from "../../contexts/auth0-context";
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Admin, Resource} from 'react-admin';
// mine
import {PropertyCreate, PropertyEdit, PropertyList} from "./resources/Properties";
import Overview from "./overview/Overview";
import createReactAdminHalDataProvider from "../../util/ReactAdminHalDataProvider";
import {MemberList} from "./resources/Members";
import {ClubCreate, ClubEdit, ClubList} from "./resources/Clubs";
import {ClubMemberCreate} from "./resources/ClubMembers";
import {DocumentCreate, DocumentEdit} from "./resources/Documents";
import {FixtureCreate, FixtureEdit} from "./resources/Fixtures";
import MyLayout from "./layout/MyLayout";
import {OrganizationCreate, OrganizationEdit, OrganizationList} from "./resources/Organizations";
import {OrganizationMemberCreate} from "./resources/OrganizationMembers";
import {createMuiTheme} from "@material-ui/core/styles";
import MyMapbox from "./map/MyMapbox";

// https://material-ui.com/customization/typography/
// https://material-ui.com/customization/breakpoints/
const myTheme = createMuiTheme();
myTheme.typography.h4 = {
  fontSize: '1.0rem',
  [myTheme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
  },
  [myTheme.breakpoints.up('lg')]: {
    fontSize: '2.0rem',
  }
};

export const ReactAdminHal = () => {

  const {getIdTokenClaims, getTokenSilently, isAuthenticated, isLoading, loginWithRedirect, logout} = useAuth0();
  const [reactAdminAuthProvider, setReactAdminAuthProvider] = useState<any>(null);
  const [reactAdminDataProvider, setReactAdminDataProvider] = useState<any>(null);

  useEffect(() => {

    /**
     * Effect to create react-admin auth provider when authorization dependencies are available
     *
     * https://marmelab.com/react-admin/Authentication.html
     */

    const authProvider = {
      login: () => loginWithRedirect(),
      logout: () => logout(),
      checkAuth: () => isAuthenticated ? Promise.resolve() : Promise.reject(),
      getPermissions: () => {
        // https://auth0.com/docs/extensions/authorization-extension/v2/rules
        const claims = getIdTokenClaims();
        return claims ? Promise.resolve(claims) : Promise.reject();
      }
    };

    setReactAdminAuthProvider(authProvider);

  }, [loginWithRedirect, logout, isAuthenticated, getIdTokenClaims]);

  useEffect(() => {

    /**
     * Effect to react-admin data provider when authenticated
     *
     * https://github.com/marmelab/react-admin/issues/3340#issuecomment-530236739
     */

    if (!isAuthenticated) return;

    const createApolloClientAndReactAdminDataProvider = async () => {
      const token = await getTokenSilently();
      const dataProvider = await createReactAdminHalDataProvider(token);
      setReactAdminDataProvider(dataProvider);
    };

    createApolloClientAndReactAdminDataProvider();

  }, [isAuthenticated, getTokenSilently]);

  if (isLoading) return (<div>commencing micromanagement ...</div>);

  return (
    <div>
      {!isAuthenticated && loginWithRedirect({})}
      {reactAdminAuthProvider && reactAdminDataProvider && (
        <Admin
          authProvider={reactAdminAuthProvider}
          dashboard={Overview}
          dataProvider={reactAdminDataProvider}
          layout={MyLayout}
          theme={myTheme}
          title="Club Abode"
          customRoutes={[
            <Route key="map" path="/map" component={MyMapbox}/>
          ]}
        >
          <Resource name="clubs" list={ClubList} create={ClubCreate} edit={ClubEdit}/>
          <Resource name="clubMembers" create={ClubMemberCreate}/>
          <Resource name="documents" create={DocumentCreate} edit={DocumentEdit}/>
          <Resource name="fixtures" create={FixtureCreate} edit={FixtureEdit}/>
          <Resource name="members" list={MemberList}/>
          <Resource name="organizations" list={OrganizationList} create={OrganizationCreate} edit={OrganizationEdit}/>
          <Resource name="organizationMembers" create={OrganizationMemberCreate}/>
          <Resource name="properties" list={PropertyList} create={PropertyCreate} edit={PropertyEdit}/>
        </Admin>
      )}
    </div>
  )
};