/* eslint-disable no-else-return */
import React from 'react';
import { Link } from 'react-router-dom';
import { Query, ApolloConsumer } from 'react-apollo';

import { IS_LOGGED_IN } from '../../graphql/queries';
import SessionModal from '../modals/session_modal';
import SearchBar from './search_bar';
import LogoutButton from './logout_button';
import './navbar.scss';

const image = require('../../design/images/200px-Pinterest_Logo.svg.png');


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false, modalType: null };
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ modalOpen: false, modalType: null });
  }

  render() {
    const { modalType, modalOpen } = this.state;
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    return (
      <ApolloConsumer>
        {((client) => (
          <div className="main-navbar-container">
            <div className="navbar-content">
              <div className="navbar-left">
                <Link to="/">
                  <div className="navbar-logo">
                    <img src={image} alt="logo" />
                  </div>
                </Link>
              </div>
              <div className="navbar-mid">
                <SearchBar />
              </div>
              <div className="navbar-right">
                <Query query={IS_LOGGED_IN}>
                  {(data) => {
                    if (data.isLoggedIn) {
                      return (
                        <div className="navbar-user-actions">
                          <Link
                            to={`/users/${data.currentUserId}`}
                            className="navbar-user-info"
                          >
                            <div>
                              {/* todo: replace with user-image once backend is built out for it */}
                              <img
                                src=""
                                alt="user-avar"
                              />
                            </div>
                            {data.currentUser}
                          </Link>
                          <LogoutButton
                            history={history}
                            client={client}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div>
                          <button
                            onClick={() => this.setState({ modalOpen: true, modalType: 'register' })}
                            type="button"
                          >
                            Signup
                          </button>
                          <button
                            onClick={() => this.setState({ modalOpen: true, modalType: 'login' })}
                            type="button"
                          >
                            Login
                          </button>
                        </div>
                      );
                    }
                  }}
                </Query>
              </div>
            </div>
            {modalOpen && <SessionModal type={modalType} closeModal={this.closeModal} />}
          </div>
        )
        )}
      </ApolloConsumer>
    );
  }
}

export default NavBar;
