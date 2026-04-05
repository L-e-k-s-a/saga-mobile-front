import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';


const GRAPHQL_URL = 'http://localhost:3000/graphql';

const httpLink = new HttpLink({  // 👈 используем new HttpLink()
  uri: GRAPHQL_URL,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});