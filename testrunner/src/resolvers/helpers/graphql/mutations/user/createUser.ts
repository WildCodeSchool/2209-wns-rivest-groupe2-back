import { gql } from "@apollo/client/core";

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      token
      userFromDB {
        email
      }
    }
  }
`;
