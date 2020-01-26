import React from 'react';
import { Route } from 'react-router-dom';

import PostIndex from './posts/PostIndex';

const App = () => (
  <div className="main-container">
    <h1>Post Index</h1>
    <Route path="/" component={PostIndex} />
  </div>
);

export default App;
