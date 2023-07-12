import client from "./helpers/getClient";
import clearDB from "./helpers/clearDB";
import { CREATE_USER } from "./helpers/graphql/mutations/user/createUser";
import { GET_TOKEN } from "./helpers/graphql/queries/user/getToken";
import { UPDATE_USER } from "./helpers/graphql/mutations/user/updateUser";
import { GET_USER_BY_ID } from "./helpers/graphql/queries/user/getUserById";

describe("User resolver", () => {
  afterAll(async () => {
    await clearDB();
  });

  it("create a new user", async () => {
    const res = await client.mutate({
      mutation: CREATE_USER,
      variables: {
        email: "test123@test.com",
        password: "testTest123!",
        username: "test123",
      },
      fetchPolicy: "no-cache",
    });

    expect(res.data?.createUserTestRunner.userFromDB.email).toEqual(
      "test123@test.com"
    );
    expect(res.data?.createUserTestRunner.userFromDB.firstname).toEqual(null);
    expect(res.data?.createUserTestRunner.userFromDB.lastname).toEqual(null);
    expect(res.data?.createUserTestRunner.userFromDB.type).toEqual("freeUser");
    expect(res.data?.createUserTestRunner.userFromDB.username).toEqual(
      "test123"
    );
  });

  let userId: number;

  it("get token if the user is valid", async () => {
    const res = await client.query({
      query: GET_TOKEN,
      variables: { email: "test123@test.com", password: "testTest123!" },
      fetchPolicy: "no-cache",
    });
    expect(res.data?.getToken.token).toMatch(/^[\w-]*\.[\w-]*\.[\w-]*$/);
    userId = res.data.getToken.userFromDB.id;
  });

  it("update the user informations", async () => {
    const res = await client.mutate({
      mutation: UPDATE_USER,
      variables: {
        data: {
          firstname: "toto",
          id: userId,
          lastname: "tata",
          username: "supertoto",
        },
      },
      fetchPolicy: "no-cache",
    });
    expect(res.data?.updateUser).toEqual({
      __typename: "User",
      email: "test123@test.com",
      firstname: "toto",
      id: userId,
      lastname: "tata",
      type: "freeUser",
      username: "supertoto",
    });
  });

  it("get the user informations by it's ID", async () => {
    const res = await client.query({
      query: GET_USER_BY_ID,
      variables: { getUserByIdId: userId },
      fetchPolicy: "no-cache",
    });
    expect(res.data?.getUserById).toEqual({
      __typename: "User",
      email: "test123@test.com",
      firstname: "toto",
      id: userId,
      lastname: "tata",
      type: "freeUser",
      username: "supertoto",
    });
  });
});
