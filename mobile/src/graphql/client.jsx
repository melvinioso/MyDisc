import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import Constants from 'expo-constants';
import { get, includes } from 'lodash';

const API_HOST = `${Constants.manifest.extra.apiHost}/graphql`;

export const createClient = ({ token, logout = () => {} }) => {
  const cache = new InMemoryCache({});

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError, response }) => {
    console.log('HIT AN ERROR');
    console.log({
      graphQLErrors,
      networkError,
    });
    const codes = graphQLErrors.map((e) => get(e, 'extensions.code'));

    if (includes(codes, 'UNAUTHENTICATED')) {
      logout();
      return;
    }
  });

  const httpLink = createUploadLink({
    uri: API_HOST,
  });

  const client = new ApolloClient({
    link: from([authLink, errorLink, httpLink]),
    cache,
  });

  return client;
};
