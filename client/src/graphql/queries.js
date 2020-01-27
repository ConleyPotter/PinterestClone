/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const FETCH_POSTS = gql`
  query FetchPosts {
    posts {
      id
      title
      body
      date
      imageUrl
      author {
        id
        name
        email
        username
        date
      }
    }
  }
`;

export const FETCH_POST = gql`
  query FetchPost($id: ID!) {
    post(id: $id) {
      id
      title
      body
      date
      imageUrl
      author {
        id
        email
        username
        date
      }
    }
  }
`;
