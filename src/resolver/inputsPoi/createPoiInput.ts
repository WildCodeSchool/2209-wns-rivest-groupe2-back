import { InputType, Field } from "type-graphql";
import { POIType, priceRange } from "../../entities/pointOfInterest";
import { Point } from "geojson";

@InputType()
export class OpeningHoursInput {
  @Field()
  dayOpen: string;

  @Field(() => [String])
  hoursOpen: string;

  @Field(() => [String])
  hoursClose: string;
}

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

  @Field(() => [OpeningHoursInput], { nullable: true })
  openingHours: OpeningHoursInput[];
}
