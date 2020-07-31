// https://www.apollographql.com/docs/react/get-started/
// https://www.apollographql.com/docs/react/networking/authentication/
// https://www.apollographql.com/docs/react/data/error-handling/
import {onError} from "apollo-link-error";
import {ApolloLink} from "apollo-link";
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloClient} from "apollo-client";
// https://marmelab.com/react-admin/Tutorial.html
// https://github.com/marmelab/react-admin/issues/4505
// @ts-ignore
import {HttpError} from 'react-admin';

export const buildApolloClient = (token: string) => {

  /**
   * compose apollo links to handle errors and http requests
   *
   * https://www.apollographql.com/docs/react/data/error-handling/
   * https://www.apollographql.com/docs/link/composition/
   */

  const errorLink = onError(({graphQLErrors, networkError, response}) => {

    if (graphQLErrors) {

      graphQLErrors.map(({message, locations, path}) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
      );

      const errors = graphQLErrors.map(({message}) => new HttpError('status text', 200, "json"));

      console.log(errors);
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);

    // @ts-ignore
    response.errors = null;

  });

  const uri = process.env.REACT_APP_GRAPHQL_ENDPOINT;

  const link = ApolloLink.from([
    errorLink,
    new HttpLink({uri, headers: {Authorization: `Bearer ${token}`}})
  ]);

  const cache = new InMemoryCache();
  return new ApolloClient({
    cache,
    link,
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'ignore', // https://www.apollographql.com/docs/react/data/error-handling/#error-policies
      },
    },
  });
};