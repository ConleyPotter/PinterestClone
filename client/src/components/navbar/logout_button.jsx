import React from 'react';

// eslint-disable-next-line arrow-body-style
const LogoutButton = (client, history) => {
  return (
    <button
      type="button"
      onClick={async (e) => {
        e.preventDefault();
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-token');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserId');
        await client.clearStore();
        client.writeData({
          data: {
            isLoggedIn: false,
            currentUser: '',
            currentUserId: '',
          },
        });
        history.push('/');
      }}
      className="session-button"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
