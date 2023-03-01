import client from "./helpers/getClient";
import clearDB from "./helpers/clearDB";
import { CREATE_USER } from "./helpers/graphql/mutations/user/createUser";
import { GET_TOKEN } from "./helpers/graphql/queries/user/getToken";
/* import { GET_MY_USER_DATA } from "./helpers/graphql/queries/user/getAllUsers";
 */
/* import { GET_USER_BY_ID } from "./helpers/graphql/queries/user/getUserById";
 */
describe("User resolver", () => {
  afterAll(async () => {
    await clearDB();
  });

  it("create user", async () => {
    const res = await client.mutate({
      mutation: CREATE_USER,
      variables: {
        email: "test123@test.com",
        password: "testTest123!",
      },
      fetchPolicy: "no-cache",
    });

    expect(res.data?.createUser.userFromDB).toEqual({
      __typename: "User",
      email: "test123@test.com",
    });
  });

  /* let token: string; */
  /* let userId: number; */

  it("gets token if user is valid", async () => {
    const res = await client.query({
      query: GET_TOKEN,
      variables: { password: "testTest123!", email: "test123@test.com" },
      fetchPolicy: "no-cache",
    });
    expect(res.data?.getToken.token).toMatch(/^[\w-]*\.[\w-]*\.[\w-]*$/);
    /*     token = res.data?.getToken.token; */
    /* userId = res.data.getToken.userFromDB.id; */
  });

  /*   it("query the user by ID", async () => {
    const res = await client.query({
      query: GET_USER_BY_ID,
      variables: { userId },
      fetchPolicy: "no-cache",
    });
    expect(res.data?.getUserById).toEqual({
      email: "test123@test.com",
    });
  }); */
});
