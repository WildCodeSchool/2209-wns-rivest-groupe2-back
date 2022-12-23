import { InputType, Field } from "type-graphql";
import { POIType, priceRange } from "../../entities/pointOfInterest";
import { Point } from "geojson";
import { CreatePoiInput } from "./createPoiInput";

@InputType({ description: "Update Poi data" })
export class UpdatePoiInput extends CreatePoiInput{
  @Field()
  id: number;
}