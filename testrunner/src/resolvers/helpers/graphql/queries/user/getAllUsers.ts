import { gql } from "@apollo/client/core";

export const GET_ALL_USERS = gql`
  query Query {
    getAllUsers
  }
`;
