import client from "./helpers/getClient";
import clearDB from "./helpers/clearDB";
import { ApolloError } from "@apollo/client";
import { ITestUser } from "../interfaces/testUserInterface";
import { generateTestUser } from "./helpers/generate/user/generateTestUser";
import { getTokenForUser } from "./helpers/generate/user/getTokenForUser";
import { generateTestPoi } from "./helpers/generate/poi/generateTestPoi";
import { GET_ALL_POIS } from "./helpers/graphql/queries/poi/getAllPois";
import { CREATE_POI } from "./helpers/graphql/mutations/poi/createPoi";
import { UPDATE_POI } from "./helpers/graphql/mutations/poi/updatePoi";
import { IPoi } from "../interfaces/testPoiInterface";

describe("Point Of Interest resolver", () => {
  let user: ITestUser;
  let userToken: string;
  let poiTest: IPoi;

  beforeAll(async () => {
    user = await generateTestUser();
    userToken = await getTokenForUser(user.email, "testTest123!");
    poiTest = await generateTestPoi(userToken);
  });

  afterAll(async () => {
    await clearDB();
  });

  it("get all point of interest", async () => {
    const res = await client.query({
      query: GET_ALL_POIS,
      fetchPolicy: "no-cache",
    });
    expect(res.data?.getAllPoi.length).toEqual(1);
  });

  it("create a new point of interest if a user is connected", async () => {
    const res = await client.mutate({
      mutation: CREATE_POI,
      variables: {
        data: {
          name: "test Poi 2",
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
    expect(res.data.createPoi.name).toEqual("test Poi 2");
    expect(res.data.createPoi.address).toEqual("1 rue du test");
    expect(res.data.createPoi.postal).toEqual("01000");
    expect(res.data.createPoi.type).toEqual("restaurant");
    expect(res.data.createPoi.coordinates).toEqual([35, 2]);
    expect(res.data.createPoi.websiteURL).toEqual("http://test.com");
    expect(res.data.createPoi.description).toEqual("Je suis une description");
    expect(res.data.createPoi.priceRange).toEqual("$");
    expect(res.data.createPoi.daysOpen).toEqual([
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ]);
    expect(res.data.createPoi.hoursOpen).toEqual(["11:30"]);
    expect(res.data.createPoi.hoursClose).toEqual(["14:00"]);
    expect(res.data.createPoi.city).toEqual("Paris");
  });

  it("disallow creation of a new point of interest if no user is connected", async () => {
    let apolloError;
    try {
      await client.mutate({
        mutation: CREATE_POI,
        variables: {
          data: {
            name: "test Poi 3",
            address: "1 rue du test",
            postal: "01000",
            type: "restaurant",
            coordinates: [35, 2],
            websiteURL: "http://test.com",
            description: "Je suis une description",
            priceRange: "$",
            daysOpen: [
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
            ],
            hoursOpen: ["11:30"],
            hoursClose: ["14:00"],
            city: "Paris",
          },
        },
        fetchPolicy: "no-cache",
      });
    } catch (error) {
      apolloError = error;
    }

    expect(apolloError).not.toBeUndefined();
    expect(apolloError instanceof ApolloError).toBeTruthy();
  });

  it("update the point of interest if a user is connected", async () => {
    const res = await client.mutate({
      mutation: UPDATE_POI,
      variables: {
        data: {
          id: poiTest.id,
          name: "new test Poi 1",
        },
      },
      fetchPolicy: "no-cache",
      context: {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      },
    });
    expect(res.data.updatePoi.id).toEqual(poiTest.id);
    expect(res.data.updatePoi.name).toEqual("new test Poi 1");
  });

  it("disallow update of the point of interest if no user is connected", async () => {
    let apolloError;
    try {
      await client.mutate({
        mutation: UPDATE_POI,
        variables: {
          data: {
            id: poiTest.id,
            name: "new test Poi 1",
          },
        },
        fetchPolicy: "no-cache",
      });
    } catch (error) {
      apolloError = error;
    }

    expect(apolloError).not.toBeUndefined();
    expect(apolloError instanceof ApolloError).toBeTruthy();
  });
});
