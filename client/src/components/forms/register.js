import React from 'react'
import { Mutation } from 'react-apollo';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', email: '', password: '' };
  }
  updateCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn, data.register.loggedIn },
    });
  }

  render() {
    return (
      <Mutation
        mutation={register_USER}
        onCompleted={data => {
          const { token } = data.register;
          localStorage.setItem('auth-token', token);
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {register => (
          <div className='session-form-container'>
            <form
              onSubmit={e => {
                e.preventDefault();
                registerUser({
                  variables: {
                    email: this.state.email,
                    password: this.state.password
                  }
                });
              }}
            >
              <p>Sign Up</p>
              <input
                value={this.state.username}
                onChange={this.update('username')}
                placeholder='Enter your username'
              />
              <input
                value={this.state.email}
                onChange={this.update('email')}
                placeholder='Enter your email'
              />
              <input
                value={this.state.password}
                onChange={this.update('password')}
                placeholder='Enter your password'
              />
              <button type='submit' className='session-button'>
                Sign Up
              </button>
            </form>
          </div>
        )}
      </Mutation>
    )
  }
}