import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavBar from './navbar/navbar';
import PostIndex from './posts/PostIndex';

import './app.scss';

const App = () => (
  <div className="main-container">
    <Route path="/" component={NavBar} />
    <Switch>
      <Route exact path="/" component={PostIndex} />
      <Route exact path="/posts" component={PostIndex} />
    </Switch>
  </div>
);

export default App;
