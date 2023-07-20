/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { DeepPartial } from "typeorm";
import { City } from "../../entities/city";
import { Point } from "geojson";

const getCities = (): Array<DeepPartial<City>> => {
  // @ts-ignore
  const parisCoordinates: Point = [48.88, 2.33];
  // @ts-ignore
  const lyonCoordinates: Point = [45.75, 4.85];
  // @ts-ignore
  const lilleCoordinates: Point = [50.633333, 3.066667];
  // @ts-ignore
  const marseilleCoordinates: Point = [43.3, 5.4];
  // @ts-ignore
  const bordeauxCoordinates: Point = [44.833328, -0.56667];
  // @ts-ignore
  const toulouseCoordinates: Point = [43.6, 1.433333];

  return [
    {
      name: "Paris",
      coordinates: parisCoordinates,
    },
    {
      name: "Lyon",
      coordinates: lyonCoordinates,
    },
    {
      name: "Lille",
      coordinates: lilleCoordinates,
    },
    {
      name: "Marseille",
      coordinates: marseilleCoordinates,
    },
    {
      name: "Bordeaux",
      coordinates: bordeauxCoordinates,
    },
    {
      name: "Toulouse",
      coordinates: toulouseCoordinates,
    },
  ];
};

export default getCities;
