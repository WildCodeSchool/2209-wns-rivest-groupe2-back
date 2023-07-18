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
        openingHours: [
          {
            value: "monday",
            name: "Lundi",
            hoursOpen: ["11:30"],
            hoursClose: ["14:00"],
          },
          {
            value: "tuesday",
            name: "Mardi",
            hoursOpen: ["11:30"],
            hoursClose: ["14:00"],
          },
          {
            value: "wednesday",
            name: "Mercredi",
            hoursOpen: ["11:30"],
            hoursClose: ["14:00"],
          },
          {
            value: "thursday",
            name: "Jeudi",
            hoursOpen: ["11:30"],
            hoursClose: ["14:00"],
          },
          {
            value: "friday",
            name: "Vendredi",
            hoursOpen: ["11:30"],
            hoursClose: ["14:00"],
          },
          {
            value: "saturday",
            name: "Samedi",
            hoursOpen: ["Fermé"],
            hoursClose: [],
          },
          {
            value: "sunday",
            name: "Dimanche",
            hoursOpen: ["Fermé"],
            hoursClose: [],
          },
        ],
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
