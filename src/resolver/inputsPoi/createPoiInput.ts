import { InputType, Field } from "type-graphql";
import { POIType } from "../../entities/pointOfInterest";
import { Point } from "geojson";

@InputType()
export class CreateOpeningHoursInput {
  @Field()
  value: string;

  @Field()
  name: string;

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
  city: string;

  @Field(() => [CreateOpeningHoursInput], { nullable: true })
  openingHours: CreateOpeningHoursInput[];
}
