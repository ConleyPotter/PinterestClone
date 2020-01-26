/* eslint-disable no-console */
import React from 'react';
import { Query } from 'react-apollo';

import { FETCH_POSTS } from '../../graphql/queries';

const PostIndex = () => (
  <Query query={FETCH_POSTS}>
    {({ loading, data, error }) => {
      if (loading) return <h1>Loading...</h1>;
      if (error) return <h1>{error}</h1>;
      console.log(data);
      return <h1>Post Index</h1>;
    }}
  </Query>
);

export default PostIndex;
