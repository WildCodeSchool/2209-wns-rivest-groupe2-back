import { ITestUser } from "../../../../interfaces/testUserInterface";
import client from "../../getClient";
import { CREATE_USER } from "../../graphql/mutations/user/createUser";

export const generateTestUser = async (): Promise<ITestUser> => {
  const res = await client.mutate({
    mutation: CREATE_USER,
    variables: {
      email: `test${Math.floor(Math.random() * 1000000)}@test.com`,
      username: `test${Math.floor(Math.random() * 1000000)}`,
      password: "testTest123!",
    },
    fetchPolicy: "no-cache",
  });

  return res.data?.createUserTestRunner.userFromDB;
};
