import {InMemoryCache} from '@apollo/client/cache';
import {ApolloClient} from '@apollo/client/core';
 const client = new ApolloClient({
    uri: 'https://graphql.wearnow.ai/v1/graphql',
    cache: new InMemoryCache(),
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': 'sau1XI9_2o0',
    },
  });
  export default client;