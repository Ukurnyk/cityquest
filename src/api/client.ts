import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from '@/config/env';

const httpLink = createHttpLink({
  uri: 'http://89.169.55.211:5000/graphql/',
  // uri: ENV.GRAPHQL_ENDPOINT,
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      console.log('GraphQL Errors:', {
        operation: operation.operationName,
        variables: operation.variables,
        errors: graphQLErrors.map((err) => ({
          message: err.message,
          extensions: err.extensions,
          ...(err.path && { path: err.path[0] }),
        })),
      });
    }

    if (networkError) {
      console.log('Network Error Details:', {
        operation: operation.operationName,
        variables: operation.variables,
        error: {
          name: networkError.name,
          message: networkError.message,
          stack: networkError.stack,
          cause: networkError.cause,
          statusCode: (networkError as any).statusCode,
          response: (networkError as any).response,
          request: {
            url: operation.getContext().uri,
            method: operation.getContext().method,
            headers: operation.getContext().headers,
          },
        },
      });
    }
  }
);

const authLink = setContext(async (_, { headers }) => {
  // Получаем токен из хранилища
  const token = await AsyncStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
