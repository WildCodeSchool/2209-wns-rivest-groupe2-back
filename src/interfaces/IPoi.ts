import {POIType,priceRange} from "../entities/pointOfInterest";
import { Point } from "geojson";
import { IDay } from "./IDay";

export interface IPoi {
  name: string;
  address: string;
  postal: string;
  type: POIType;
  coordinates: Point;
  creationDate: Date;
  pictureUrl: string;
  websiteURL: string;
  description: string;
  days: IDay[];
  priceRange: priceRange;
}