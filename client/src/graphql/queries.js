/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
    currentUser @client
    currentUserId @client
    admin @client
  }
`;

export const FETCH_POSTS = gql`
  query FetchPosts {
    posts {
      id
      title
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

export const FETCH_POST = gql`
  query FetchPost($id: ID!) {
    post(id: $id) {
      id
      title
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
