import { DeepPartial } from "typeorm";
import { pointsOfInterestList } from "./poiList";
import { PointOfInterest } from "../../entities/pointOfInterest";

const getPois = async (): Promise<Array<DeepPartial<PointOfInterest>>> => {
  return pointsOfInterestList;
};

export default getPois;
