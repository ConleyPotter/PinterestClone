/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React from 'react';
import { Query } from 'react-apollo';
import PostDetail from './PostDetail';

import { FETCH_POSTS } from '../../graphql/queries';

const PostIndex = () => (
  <Query query={FETCH_POSTS}>
    {({ loading, data, error }) => {
      if (loading) return <h1>Loading...</h1>;
      if (error) return <h1>{error}</h1>;
      console.log(data);
      return (
        <ul className="post-index-container">
          {data.posts.map((post, i) => (
            <PostDetail propPost={post} key={i} />
          ))}
        </ul>
      );
    }}
  </Query>
);

export default PostIndex;
