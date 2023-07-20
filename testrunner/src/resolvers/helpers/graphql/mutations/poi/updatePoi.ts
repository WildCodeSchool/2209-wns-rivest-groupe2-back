import { gql } from "@apollo/client/core";

export const UPDATE_POI = gql`
  mutation UpdatePoi($data: UpdatePoiInput!) {
    updatePoi(data: $data) {
      id
      name
      address
      postal
      type
      coordinates
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
