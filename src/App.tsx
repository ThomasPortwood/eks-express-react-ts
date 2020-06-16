import React, {useEffect, useState} from 'react';
import './App.css';

// https://auth0.com/docs/quickstart/spa/react
import {useAuth0} from "./contexts/auth0-context";

// https://www.apollographql.com/docs/react/get-started/
// https://www.apollographql.com/docs/react/networking/authentication/
// @ts-ignore
import {createHttpLink} from "apollo-link-http";
import {setContext} from "apollo-link-context";
import {ApolloClient} from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloProvider} from "@apollo/react-hooks";

// https://github.com/marmelab/react-admin/tree/master/packages/ra-data-graphql-simple
// @ts-ignore
import buildGraphQLProvider from 'ra-data-graphql-simple';

// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {Admin, Resource} from 'react-admin';

// mine
import {PropertyCreate, PropertyList} from "./components/Properties";
import {FixtureCreate, FixtureEdit, FixtureList} from "./components/Fixtures";
import Dashboard from "./components/Dashboard";

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
});

// const authLink = setContext((_, {headers}) => {
//     // const {getTokenSilently} = useAuth0();
//     // const token = getTokenSilently();
//     return {
//         headers: {
//             ...headers,
//             authorization: token ? `Bearer ${token}` : "",
//         }
//     }
// });

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

function App() {

    const {getTokenSilently, isAuthenticated, isLoading, loginWithRedirect, logout} = useAuth0();

    const [dataProvider, setDataProvider] = useState(null);

    useEffect(() => {

        console.log(isAuthenticated);

        if (!isAuthenticated) return;

        getTokenSilently().then((t: string) => {

            const link = createHttpLink({
                uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
                headers: { Authorization: `Bearer ${t}`}
            });

            const cache = new InMemoryCache();

            const client = new ApolloClient({cache, link});

            buildGraphQLProvider({client}).then((dataProvider: any) => {
                // https://github.com/marmelab/react-admin/issues/3340#issuecomment-530236739
                setDataProvider(() => dataProvider);
            });

        });

    }, [isAuthenticated]);

    if (isLoading || !dataProvider) return (<div>commencing micromanagement ...</div>);

    return (
        <div>
            {!isAuthenticated && loginWithRedirect({})}
            {isAuthenticated && dataProvider && (
                // <ApolloProvider client={client}>
                    <Admin dashboard={Dashboard} dataProvider={dataProvider}>
                        <Resource name="Property" list={PropertyList} create={PropertyCreate}/>
                    </Admin>
                // </ApolloProvider>
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
