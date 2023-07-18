import { gql } from "@apollo/client/core";

export const GET_TOKEN = gql`
  query Query($password: String!, $email: String!) {
    getToken(password: $password, email: $email) {
      token
      userFromDB {
        id
        email
        username
        firstname
        lastname
        profilePicture
        type
        isVerified
      }
    }
  }
`;
