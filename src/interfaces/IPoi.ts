import { POIType } from "../entities/pointOfInterest";
import { Point } from "geojson";

export interface IPoi {
  id: number;
  name: string;
  address: string;
  postal: string;
  type: POIType;
  coordinates: Point;
  creationDate: Date;
  pictureUrl: string;
  websiteURL: string;
  description: string;
}
