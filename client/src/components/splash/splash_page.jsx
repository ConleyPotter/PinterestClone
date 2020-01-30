import React from 'react';
import { withRouter } from 'react-router-dom';

import './splash_page.scss';

const SplashPage = () => {
  return (
    <div className="splash-page-main-conatiner">
      <div className="splash-page-hero-image">
        <img src="" alt="Hero Splash" />
      </div>
      <div className="auth-modal"></div>
    </div>
  )
}

export default SplashPage;
