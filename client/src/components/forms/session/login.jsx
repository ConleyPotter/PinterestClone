import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { LOGIN_USER } from '../../../graphql/mutations';

class LoginForm extends React.Component {
  static updateCache(client, { data }) {
    const {
      loggedIn, username, id, admin,
    } = data.login;
    client.writeData({
      data: {
        isLoggedIn: loggedIn,
        currentUser: username,
        currentUserId: id,
        admin,
      },
    });
  }

  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  handleSubmit(e, login) {
    e.preventDefault();

    const { email, password } = this.state;
    const { closeModal } = this.props;

    login({
      variables: {
        email,
        password,
      },
    }).then(() => closeModal());
  }

  update(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  render() {
    const { email, password } = this.state;
    const { history } = this.props;
    return (
      <Mutation
        mutation={LOGIN_USER}
        onCompleted={(data) => {
          const { token, username, id } = data.login;
          localStorage.setItem('auth-token', token);
          localStorage.setItem('currentUser', username);
          localStorage.setItem('currentUserId', id);
          history.push('/');
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {(login) => (
          <div className="session-form-container">
            <form onSubmit={(e) => this.handleSubmit(e, login)}>
              <p>Login</p>
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
                Login
              </button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

LoginForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(LoginForm);
