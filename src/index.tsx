// https://www.apollographql.com/docs/react/get-started/
// https://www.apollographql.com/docs/react/networking/authentication/
// https://auth0.com/blog/modern-full-stack-development-with-nestjs-react-typescript-and-mongodb-part-2

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Auth0Provider, useAuth0} from './contexts/auth0-context';
import * as serviceWorker from "./serviceWorker";

import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from "apollo-link-http";
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from "apollo-cache-inmemory";

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
});

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
            <App/>
        </ApolloProvider>
    </Auth0Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
