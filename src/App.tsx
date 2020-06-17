import React, {useEffect, useState} from 'react';
import './App.css';
// https://auth0.com/docs/quickstart/spa/react
import {useAuth0} from "./contexts/auth0-context";
// https://www.apollographql.com/docs/react/get-started/
// https://www.apollographql.com/docs/react/networking/authentication/
import {createHttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloClient} from "apollo-client";
import {ApolloProvider} from '@apollo/react-hooks';
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Admin, Resource} from 'react-admin';
// https://github.com/marmelab/react-admin/tree/master/packages/ra-data-graphql-simple
// @ts-ignore
import buildGraphQLProvider from 'ra-data-graphql-simple';
// mine
import {PropertyCreate, PropertyEdit, PropertyList} from "./components/Properties";
import {FixtureCreate, FixtureEdit, FixtureList} from "./components/Fixtures";
import Dashboard from "./components/Dashboard";
import {Button} from "@material-ui/core";

const uri = process.env.REACT_APP_GRAPHQL_ENDPOINT;

const MyLogoutButton = () => {
    const {logout} = useAuth0();
    return (<Button onClick={() => logout({})} color="inherit">Logout</Button>)
};

function App() {

    const {getIdTokenClaims, getTokenSilently, isAuthenticated, isLoading, loginWithRedirect, logout} = useAuth0();
    const [reactAdminAuthProvider, setReactAdminAuthProvider] = useState<any>(null);
    const [apolloClient, setApolloClient] = useState<any>(null);
    const [reactAdminDataProvider, setReactAdminDataProvider] = useState<any>(null);

    // create apollo client and react-admin data provider when auth0 dependencies are available
    useEffect(() => {

        if (!isAuthenticated) return;

        const createClientAndProvider = async () => {

            const t = await getTokenSilently();

            const link = createHttpLink({uri, headers: {Authorization: `Bearer ${t}`}});
            const cache = new InMemoryCache();
            const client = new ApolloClient({cache, link});
            setApolloClient(client);

            // https://github.com/marmelab/react-admin/issues/3340#issuecomment-530236739
            const dataProvider = await buildGraphQLProvider({client});
            setReactAdminDataProvider(() => dataProvider);
        };

        createClientAndProvider();

    }, [isAuthenticated, getTokenSilently]);

    // create react-admin auth provider when auth0 dependencies are available
    useEffect(() => {

        // https://marmelab.com/react-admin/Authentication.html
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
                        <Resource name="Fixture" list={FixtureList} create={FixtureCreate} edit={FixtureEdit}/>
                    </Admin>
                </ApolloProvider>
            )}
        </div>

        // <BrowserRouter>
        //     <Navbar/>
        //     <Switch>
        //         <Route path="/" exact/>
        //         <PrivateRoute path="/profile" component={Profile}/>
        //         <PrivateRoute path="/mapbox" component={MyMapbox}/>
        //         <PrivateRoute path="/voyager" component={MyVoyager}/>
        //         {/*<PrivateRoute path="/graphiql" component={MyGraphiql}/>*/}
        //     </Switch>
        // </BrowserRouter>
    );
}

export default App;
