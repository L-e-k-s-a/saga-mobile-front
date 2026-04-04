import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Замените этот URL на ваш реальный адрес сервера
// Для локальной разработки используйте IP вашего компьютера, например: http://192.168.1.100:4000/graphql
const GRAPHQL_URL = 'https://your-graphql-server.com/graphql';

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});