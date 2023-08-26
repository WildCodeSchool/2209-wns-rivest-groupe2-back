import { ICityData } from "../../../../interfaces/testCityInterface";
import client from "../../getClient";
import { CREATE_CITY_MUTATION } from "../../graphql/mutations/city/createCity";

export const generateTestCity = async (
  userToken: string
): Promise<ICityData> => {
  const res = await client.mutate({
    mutation: CREATE_CITY_MUTATION,
    variables: {
      data: {
        name: "Paris",
        coordinates: [45.75, 4.85],
      },
    },
    fetchPolicy: "no-cache",
    context: {
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    },
  });
  return res.data.createCity;
};
