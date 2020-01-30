/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';

import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { HashRouter } from 'react-router-dom';
import App from './components/App';
import VERIFY_USER from './graphql/mutations';

const cache = new InMemoryCache({
  dataIdFromObject: (object) => {
    // eslint-disable-next-line no-underscore-dangle
    switch (object.__typename) {
      case 'User':
        return object.username;
      default:
        return defaultDataIdFromObject(object);
    }
  },
  data: {
    isLoggedIn: !!(localStorage.getItem('auth-token')),
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
  header: {
    authorization: localStorage.getItem('auth-token'),
  },
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
});

const token = localStorage.getItem('auth-token');

cache.writeData({
  data: {
    isLoggedIn: false,
  },
});

if (token) {
  client
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn
        },
      });
    });
}

const Root = () => (
  <ApolloProvider client={client}>
    <HashRouter>
      <App />
    </HashRouter>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
