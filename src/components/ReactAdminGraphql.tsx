// https://reactjs.org/docs/hooks-intro.html
import React, {useEffect, useState} from 'react';
// https://auth0.com/docs/quickstart/spa/react
import {useAuth0} from "../contexts/auth0-context";
// https://www.apollographql.com/docs/react/get-started/
import {ApolloProvider} from '@apollo/react-hooks';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Admin, Resource} from 'react-admin';
// mine
import {buildApolloClient} from "../util/ApolloUtil";
import {createReactAdminGraphqlDataProvider} from "../util/ReactAdminGraphqlDataProvider";
import {PropertyCreate, PropertyEdit, PropertyList} from "./Properties";
import {FixtureCreate, FixtureEdit, FixtureList} from "./Fixtures";
import Dashboard from "../components/Overview";
import {VerificationCreate, VerificationEdit, VerificationList} from "./Verifications";
import {MyLogoutButton} from "./MyLogoutButton";
import {DocumentCreate, DocumentEdit, DocumentList} from "./Documents";


export const ReactAdminGraphql = () => {

  const {getIdTokenClaims, getTokenSilently, isAuthenticated, isLoading, loginWithRedirect, logout} = useAuth0();
  const [reactAdminAuthProvider, setReactAdminAuthProvider] = useState<any>(null);
  const [apolloClient, setApolloClient] = useState<any>(null);
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
      const apolloClient = buildApolloClient(token);
      const dataProvider = await createReactAdminGraphqlDataProvider(apolloClient, token);
      setApolloClient(apolloClient);
      setReactAdminDataProvider(() => dataProvider);
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
      {isAuthenticated && apolloClient && reactAdminAuthProvider && reactAdminDataProvider && (
        <ApolloProvider client={apolloClient}>
          <Admin
            authProvider={reactAdminAuthProvider}
            logOutButton={MyLogoutButton}
            dashboard={Dashboard}
            dataProvider={reactAdminDataProvider}
          >
            <Resource name="Property" list={PropertyList} create={PropertyCreate} edit={PropertyEdit}/>
            <Resource name="Verification" list={VerificationList} create={VerificationCreate} edit={VerificationEdit}/>
            <Resource name="Fixture" list={FixtureList} create={FixtureCreate} edit={FixtureEdit}/>
            <Resource name="Document" list={DocumentList} create={DocumentCreate} edit={DocumentEdit}/>
          </Admin>
        </ApolloProvider>
      )}
    </div>
  )
};