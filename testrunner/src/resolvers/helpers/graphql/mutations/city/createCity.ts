import { gql } from "@apollo/client/core";

export const CREATE_CITY_MUTATION = gql`
  mutation CreateCity($data: CityType!) {
    createCity(data: $data) {
      id
      name
      coordinates
    }
  }
`;
