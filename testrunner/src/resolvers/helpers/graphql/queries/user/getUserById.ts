import { gql } from "@apollo/client/core";

export const GET_USER_BY_ID = gql`
  query GetUserById($userId: Float!) {
    getUserById(userId: $userId) {
      id
      email
      username
      type
    }
  }
`;
