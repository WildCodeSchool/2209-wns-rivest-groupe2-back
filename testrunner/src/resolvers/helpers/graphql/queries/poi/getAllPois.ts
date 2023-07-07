import { gql } from "@apollo/client/core";

export const GET_ALL_POIS = gql`
  query GetAllPoi {
    getAllPoi {
      id
      name
      address
      postal
      type
      coordinates
      creationDate
      averageRate
      pictureUrl
      websiteURL
      description
      city
      daysOpen
      hoursOpen
      hoursClose
    }
  }
`;
