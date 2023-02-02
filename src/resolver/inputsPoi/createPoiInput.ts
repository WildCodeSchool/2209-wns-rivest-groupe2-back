import { InputType, Field } from "type-graphql";
import { POIType, priceRange } from "../../entities/pointOfInterest";
import { Point } from "geojson";

@InputType({ description: "Create Poi data" })
export class CreatePoiInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  postal: string;

  @Field({ nullable: true })
  type: POIType;

  @Field(() => [Number], { nullable: true })
  coordinates: Point;

  @Field(() => [String], { nullable: true })
  pictureUrl: string;

  @Field({ nullable: true })
  websiteURL: string;

  @Field({ nullable: true })
  isClosed: number;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  priceRange: priceRange;

  @Field({ nullable: true })
  city: string;

  @Field(() => [String], { nullable: true })
  daysOpen: string;

  @Field(() => [String], { nullable: true })
  hoursOpen: string;

  @Field(() => [String], { nullable: true })
  hoursClose: string;
}
