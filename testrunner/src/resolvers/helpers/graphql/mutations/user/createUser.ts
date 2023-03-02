import { gql } from "@apollo/client/core";

export const CREATE_USER = gql`
  mutation CreateUser($password: String!, $email: String!) {
    createUser(password: $password, email: $email) {
      token
      userFromDB {
        email
      }
    }
  }
`;
