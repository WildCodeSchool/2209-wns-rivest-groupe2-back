import { InputType, Field } from "type-graphql";
import { POIType } from "../../entities/pointOfInterest";
import { Point } from "geojson";
import { City } from "../../entities/city";

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

@InputType()
class CityInput {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  name: string;
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
  description: string;

  @Field(() => [CreateOpeningHoursInput], { nullable: true })
  openingHours: CreateOpeningHoursInput[];

  @Field(() => CityInput, { nullable: true })
  city: City;
}
