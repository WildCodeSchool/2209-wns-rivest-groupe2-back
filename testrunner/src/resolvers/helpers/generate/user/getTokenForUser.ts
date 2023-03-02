import { gql } from "@apollo/client/core";
import client from "../../getClient";

export const getTokenForUser = async (
  email: string,
  password: string
): Promise<string> => {
  const res = await client.query({
    query: gql`
      query Query($email: String!, $password: String!) {
        getToken(email: $email, password: $password) {
          token
          userFromDB {
            id
            email
            firstname
            lastname
          }
        }
      }
    `,
    variables: { email, password },
    fetchPolicy: "no-cache",
  });

  return res.data.getToken.token;
};
