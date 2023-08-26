import { gql } from "@apollo/client/core";
import client from "../../getClient";

export const getTokenForUser = async (
  email: string,
  password: string
): Promise<string> => {
  const res = await client.query({
    query: gql`
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
            isVerified
          }
        }
      }
    `,
    variables: { password, email },
    fetchPolicy: "no-cache",
  });

  return res.data.getToken.token;
};
