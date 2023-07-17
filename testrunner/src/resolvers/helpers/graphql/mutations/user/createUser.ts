import { gql } from "@apollo/client/core";

export const CREATE_USER = gql`
  mutation Mutation($email: String!, $username: String!, $password: String!) {
    createUserTestRunner(
      email: $email
      username: $username
      password: $password
    ) {
      token
      userFromDB {
        id
        email
        username
        firstname
        lastname
        profilePicture
        type
      }
    }
  }
`;
