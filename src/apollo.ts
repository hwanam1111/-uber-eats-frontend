import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

const token = localStorage.getItem(
  process.env.REACT_APP_LOCAL_STORAGE_TOKEN as string,
);

export const isLoggedInVar = makeVar(Boolean(token));
export const authToken = makeVar(token);

export default new ApolloClient({
  uri: 'http://127.0.0.1:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authToken();
            },
          },
        },
      },
    },
  }),
});
