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
  
  creationDate: Date;

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
  hourOpenMonday : string;

  @Field({ nullable: true })
  hourOpenThuesday : string;

  @Field({ nullable: true })
  hourOpenWenesday : string;

  @Field({ nullable: true })
  hourOpenThursday : string;

  @Field({ nullable: true })
  hourOpenFriday : string;

  @Field({ nullable: true })
  hourOpenSaturday : string;

  @Field({ nullable: true })
  hourOpenSunday : string;

  @Field({ nullable: true })
  hourCloseMonday : string;

  @Field({ nullable: true })
  hourCloseThuesday : string;

  @Field({ nullable: true })
  hourCloseWenesday : string;

  @Field({ nullable: true })
  hourCloseThursday : string;

  @Field({ nullable: true })
  hourCloseFriday : string;

  @Field({ nullable: true })
  hourCloseSaturday : string;

  @Field({ nullable: true })
  hourCloseSunday : string;
}