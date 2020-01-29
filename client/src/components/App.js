import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PostIndex from './posts/PostIndex';

import './app.scss';

const App = () => (
  <div className="main-container">
    <h1>Pinterest Clone</h1>
    <Switch>
      <Route exact path="/" component={PostIndex} />
      <Route exact path="/posts" component={PostIndex} />
    </Switch>
  </div>
);

export default App;
