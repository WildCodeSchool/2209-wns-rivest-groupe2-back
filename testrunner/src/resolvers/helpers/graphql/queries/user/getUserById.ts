import { gql } from "@apollo/client/core";

export const GET_USER_BY_ID = gql`
  query GetUserById($getUserByIdId: Float!) {
    getUserById(id: $getUserByIdId) {
      id
      email
      username
      firstname
      lastname
    }
  }
`;
