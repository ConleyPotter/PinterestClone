/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import Register from '../forms/session/register';
import LoginForm from '../forms/session/login';
import './session_modal.scss';

const SessionModal = ({ type, closeModal }) => {
  let form;
  switch (type) {
    case 'register':
      form = <Register closeModal={closeModal} />;
      break;
    case 'login':
      form = <LoginForm closeModal={closeModal} />;
      break;
    default:
      return null;
  }

  const handlClose = (e) => {
    if (e.target.classList[0] === 'modal-container') {
      closeModal();
    }
  };

  return (
    <div className="modal-container" onClick={handlClose} role="button" tabIndex={-1}>
      <div className="modal-content">
        <span className="modal-close" onClick={() => closeModal()} role="button" tabIndex={0}>
          <i className="fas fa-times" />
        </span>
        {form}
      </div>
    </div>
  );
};

SessionModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default SessionModal;
