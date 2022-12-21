import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { PointOfInterest } from "../entities/pointOfInterest";
import dataSource from "../utils/datasource";
import { Point } from "geojson";
import { POIType, priceRange } from "../entities/pointOfInterest";
import { Day } from "../entities/day";

@InputType()
class PoiType {
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

  @Field({ nullable: true })
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

  @Field(() => [String], { nullable: true })
  days: Day[];
}

@Resolver(PointOfInterest)
export class PointOfInterestResolver {
  @Query(() => [PointOfInterest])
  async getAllPois(): Promise<PointOfInterest[]> {
    return await dataSource.manager.find(PointOfInterest, {
      relations: {
        days: true,
        },
    });
  }

  @Mutation(() => PointOfInterest)
  async createPoi(@Arg("data") data: PoiType): Promise<PointOfInterest> {
    const newPoi = new PointOfInterest();
    newPoi.name = data.name;
    newPoi.address = data.address;
    newPoi.postal = data.postal;
    newPoi.type = data.type;
    newPoi.coordinates = data.coordinates;
    newPoi.creationDate = new Date();
    newPoi.pictureUrl = data.pictureUrl;
    newPoi.websiteURL = data.websiteURL;
    newPoi.description = data.description;
    newPoi.priceRange = data.priceRange;
    newPoi.days = data.days;
    const poiFromDB = await dataSource.manager.save(PointOfInterest, newPoi);
    return poiFromDB;
  }
}
