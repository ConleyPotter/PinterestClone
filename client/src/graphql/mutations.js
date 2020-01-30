import gql from 'graphql-tag';

const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      email
      token
      loggedIn
    }
  }
`;

const VERIFY_USER = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      loggedIn
    }
  }
`;

export default { REGISTER_USER, VERIFY_USER };
