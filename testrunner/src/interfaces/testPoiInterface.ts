import { Point } from "geojson";

enum POIType {
  RESTAURANT = "restaurant",
  FASTFOOD = "fast-food",
  BAR = "bar",
  PLACEOFRELIGION = "lieu de culte",
  HOSTEL = "hotel",
  MUSEUM = "musee",
}

enum priceRange {
  LOW = "$",
  MEDIUM = "$$",
  HIGH = "$$$",
}

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
  priceRange: priceRange;
  city: string;
  daysOpen: string;
  hoursOpen: string;
  hoursClose: string;
}
