import { ApolloConsumer } from 'react-apollo';
import React from 'react';

// eslint-disable-next-line arrow-body-style
const LogoutButton = () => {
  return (
    <ApolloConsumer>
      {(client) => (
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem('auth-token');
            client.writeData({
              data: {
                isLoggedIn: false,
              },
            });
          }}
        >
          Logout
        </button>
      )}
    </ApolloConsumer>
  );
};

export default LogoutButton;
