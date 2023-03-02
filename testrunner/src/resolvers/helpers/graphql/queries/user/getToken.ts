import { gql } from "@apollo/client/core";

export const GET_TOKEN = gql`
  query Query($email: String!, $password: String!) {
    getToken(email: $email, password: $password) {
      token
      userFromDB {
        id
        email
      }
    }
  }
`;
