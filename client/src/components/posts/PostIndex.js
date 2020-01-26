import React from 'react';
import { Query } from 'react-apollo';

import gql from 'graphql-tag';

const FETCH_POST = gql`
  query FetchPosts {
    posts {
      id
      title
      author {
        name
      }
      body
    }
  }
`;

const PostIndex = () => {
  return (
    <Query query={FETCH_POST}>
      {({ loading, data, error }) => {
        if (loading) return <h1>Loading...</h1>
        if (error) return <h1>{error}</h1>
        console.log(data);
        return <h1>Post Index</h1>
      }}
    </Query>
  )
}

export default PostIndex;