import { gql } from "@apollo/client/core";

export const CREATE_POI = gql`
  mutation CreatePoi($data: CreatePoiInput!) {
    createPoi(data: $data) {
      id
      name
      address
      postal
      type
      coordinates
      creationDate
      pictureUrl
      websiteURL
      description
      city {
        id
        name
      }
      openingHours {
        value
        name
        hoursOpen
        hoursClose
      }
    }
  }
`;
