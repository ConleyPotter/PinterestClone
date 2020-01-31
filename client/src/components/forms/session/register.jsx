import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { REGISTER_USER } from '../../../graphql/mutations';
import './session_forms.scss';

class Register extends React.Component {
  static updateCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn },
    });
  }

  constructor(props) {
    super(props);
    this.state = { username: '', email: '', password: '' };
  }

  handleSubmti(e, register) {
    e.preventDefault();
    const { email, username, password } = this.state;
    const { closeModal } = this.props;
    register({
      variables: {
        email,
        username,
        password,
      },
    }).then(() => closeModal());
  }

  update(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  render() {
    const { username, email, password } = this.state;
    return (
      <Mutation
        mutation={REGISTER_USER}
        onCompleted={(data) => {
          const { token } = data.register;
          localStorage.setItem('auth-token', token);
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {(register) => (
          <div className="session-form-container">
            <form
              onSubmit={(e) => { this.handleSubmit(e, register); }}
            >
              <p>Sign Up</p>
              <input
                value={username}
                onChange={this.update('username')}
                placeholder="Enter your username"
              />
              <input
                value={email}
                onChange={this.update('email')}
                placeholder="Enter your email"
              />
              <input
                value={password}
                onChange={this.update('password')}
                placeholder="Enter your password"
              />
              <button type="submit" className="session-button">
                Sign Up
              </button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

Register.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default withRouter(Register);
