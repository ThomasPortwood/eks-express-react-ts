// https://reactjs.org/docs/hooks-intro.html
import React, {useEffect, useState} from 'react';
// https://auth0.com/docs/quickstart/spa/react
import {useAuth0} from "../contexts/auth0-context";
// https://www.apollographql.com/docs/react/get-started/
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Admin, Resource} from 'react-admin';
// mine
import {PropertyCreate, PropertyEdit, PropertyList} from "./admin/Properties";
import Dashboard from "./admin/Overview";
import {MyLogoutButton} from "./admin/MyLogoutButton";
import createReactAdminHalDataProvider from "../util/ReactAdminHalDataProvider";
import {MemberList} from "./admin/Members";
import {ClubCreate, ClubList} from "./admin/Clubs";


export const ReactAdminHal = () => {

  const {getIdTokenClaims, getTokenSilently, isAuthenticated, isLoading, loginWithRedirect, logout} = useAuth0();
  const [reactAdminAuthProvider, setReactAdminAuthProvider] = useState<any>(null);
  const [reactAdminDataProvider, setReactAdminDataProvider] = useState<any>(null);

  useEffect(() => {

    /**
     * Effect to create apollo client and react-admin data provider when authenticated
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

  if (isLoading) return (<div>commencing micromanagement ...</div>);

  return (
    <div>
      {!isAuthenticated && loginWithRedirect({})}
      {isAuthenticated && reactAdminAuthProvider && reactAdminDataProvider && (
        <Admin
          authProvider={reactAdminAuthProvider}
          logOutButton={MyLogoutButton}
          dashboard={Dashboard}
          dataProvider={reactAdminDataProvider}
        >
          <Resource name="members" list={MemberList}/>
          <Resource name="clubs" list={ClubList} create={ClubCreate}/>
          <Resource name="properties" list={PropertyList} create={PropertyCreate} edit={PropertyEdit}/>
          {/*<Resource name="fixtures" list={FixtureList} create={FixtureCreate} edit={FixtureEdit}/>*/}
          {/*<Resource name="items" list={ItemList} create={ItemCreate} edit={ItemEdit}/>*/}
          {/*<Resource name="documents" list={DocumentList} create={DocumentCreate} edit={DocumentEdit}/>*/}
        </Admin>
      )}
    </div>
  )
};