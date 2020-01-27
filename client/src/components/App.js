import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PostIndex from './posts/PostIndex';
import PostDetail from './posts/PostDetail';

const App = () => (
  <div className="main-container">
    <h1>Pinterest Clone</h1>
    <Switch>
      <Route exact path="/" component={PostIndex} />
      <Route exact path="/posts" component={PostIndex} />
      <Route exact path="posts/:postId" component={PostDetail} />
    </Switch>
  </div>
);

export default App;
