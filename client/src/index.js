import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ApolloClient from "apollo-boost";

import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { HashRouter } from 'react-router-dom';

// const cache = new InMemoryCache({
//   dataIdFromObject: object => {
//     switch (object.__typename) {
//       case "User":
//         return object.username;
//       default:
//         return defaultDataIdFromObject(object);
//     }
//   }
// });

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

const Root = () => (
  <ApolloProvider client={client}>
    <HashRouter>
      <App />
    </HashRouter>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById("root"));