import {POIType,priceRange} from "../entities/pointOfInterest";
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
  priceRange: priceRange;
  hourOpenMonday : string;
  hourOpenThuesday : string;
  hourOpenWenesday : string;
  hourOpenThursday : string;
  hourOpenFriday : string;
  hourOpenSaturday : string;
  hourOpenSunday : string;
  hourCloseMonday : string;
  hourCloseThuesday : string;
  hourCloseWenesday : string;
  hourCloseThursday : string;
  hourCloseFriday : string;
  hourCloseSaturday : string;
  hourCloseSunday : string;
}