import App from './components/app';
import ApolloClient from "apollo-boost";

import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case "User":
        return object.username;
      default:
        return defaultDataIdFromObject(object);
    }
  }
});

const client = new ApolloClient({
  uri: 'localhost:5000/graphql',
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
  cache: cache
});

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

render(<Root />, document.getElementById("root"));