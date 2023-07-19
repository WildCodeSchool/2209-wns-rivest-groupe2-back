/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { DeepPartial } from "typeorm";
import { City } from "../../entities/city";
import { Point } from "geojson";

const getCities = (): Array<DeepPartial<City>> => {
  // @ts-ignore
  const parisCoordinates: Point = [48.88, 2.33];

  // @ts-ignore
  const lyonCoordinates: Point = [45.75, 4.85];

  return [
    {
      name: "Paris",
      coordinates: parisCoordinates,
    },
    {
      name: "Lyon",
      coordinates: lyonCoordinates,
    },
  ];
};

export default getCities;
