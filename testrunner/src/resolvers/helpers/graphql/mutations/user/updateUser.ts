import { gql } from "@apollo/client/core";

export const UPDATE_USER = gql`
  mutation UpdateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id
      email
      username
      firstname
      lastname
    }
  }
`;
