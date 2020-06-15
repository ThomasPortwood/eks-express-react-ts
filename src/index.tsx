import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Auth0Provider, useAuth0} from './contexts/auth0-context';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from "./serviceWorker";

import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from "apollo-link-http";
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from "apollo-cache-inmemory";

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
});

// https://www.apollographql.com/docs/react/networking/authentication/
const authLink = setContext((_, {headers}) => {
    const {getTokenSilently} = useAuth0();
    const token = getTokenSilently();
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});


ReactDOM.render(
    <Auth0Provider>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ApolloProvider>
    </Auth0Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
