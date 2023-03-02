import { IPoi } from "../../../../interfaces/testPoiInterface";
import client from "../../getClient";
import { CREATE_POI } from "../../graphql/mutations/poi/createPoi";

export const generateTestPoi = async (userToken: string): Promise<IPoi> => {
  const res = await client.mutate({
    mutation: CREATE_POI,
    variables: {
      data: {
        name: "test Poi 1",
        address: "1 rue du test",
        postal: "01000",
        type: "restaurant",
        coordinates: [35, 2],
        websiteURL: "http://test.com",
        description: "Je suis une description",
        priceRange: "$",
        daysOpen: ["tuesday", "wednesday", "thursday", "friday", "saturday"],
        hoursOpen: ["11:30"],
        hoursClose: ["14:00"],
        city: "Paris",
      },
    },
    fetchPolicy: "no-cache",
    context: {
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    },
  });

  return res.data.createPoi;
};
