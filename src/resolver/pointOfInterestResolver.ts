import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import dataSource from "../utils/datasource";
import { ApolloError } from "apollo-server";
import { PointOfInterest } from "../entities/pointOfInterest";
import { CreatePoiInput } from "./inputsPoi/createPoiInput";
import { UpdatePoiInput } from "./inputsPoi/updatePoiInput";
import { Rate } from "../entities/rate";


@Resolver(PointOfInterest)
export class PointOfInterestResolver {
  @FieldResolver(() => [Rate])
  async getRates(@Root() poi: PointOfInterest): Promise<Rate[]> {
    const poiWithRates = await dataSource.manager.findOne(PointOfInterest, {
      where: { id: poi.id },
      relations: ["rates"],
    });

    if (poiWithRates == null) {
      return [];
    }

    return poiWithRates?.rates ?? [];
  }




  @Query(() => PointOfInterest)
  async getPOIbyId(
    @Arg("id") id: number,
  ): Promise<PointOfInterest | null> {
    const poi = await dataSource.manager.findOne(PointOfInterest, {
      where: { id },
      relations: ["rates"],
    });

    if (poi == null) {
      throw new ApolloError(`PointID of interest not found`);
    }

    return poi;
  }


  @Query(() => [PointOfInterest])
  async getAllPoi(): Promise<PointOfInterest[]> {
    const allPois = await dataSource.manager.find(PointOfInterest);
    return allPois;
  }

  @Mutation(() => PointOfInterest)
  async createPoi(
    @Arg("data") data: CreatePoiInput
  ): Promise<PointOfInterest | ApolloError> {
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
    newPoi.daysOpen = data.daysOpen;
    newPoi.hoursOpen = data.hoursOpen;
    newPoi.hoursClose = data.hoursClose;
    newPoi.city = data.city;
    const savedPoi = await dataSource.manager.save(PointOfInterest, newPoi);
    return savedPoi;
  }

  @Mutation(() => PointOfInterest)
  async updatePoi(
    @Arg("data") data: UpdatePoiInput
  ): Promise<PointOfInterest | ApolloError> {
    const {
      id,
      name,
      address,
      postal,
      type,
      coordinates,
      pictureUrl,
      websiteURL,
      description,
      priceRange,
      city,
      daysOpen,
      hoursOpen,
      hoursClose,
    } = data;
    try {
      const pointOfInterestToUpdate = await dataSource.manager.findOneByOrFail(
        PointOfInterest,
        {
          id,
        }
      );
      name != null && (pointOfInterestToUpdate.name = name);
      address != null && (pointOfInterestToUpdate.address = address);
      postal != null && (pointOfInterestToUpdate.postal = postal);
      type != null && (pointOfInterestToUpdate.type = type);
      coordinates != null &&
        (pointOfInterestToUpdate.coordinates = coordinates);
      pictureUrl != null && (pointOfInterestToUpdate.pictureUrl = pictureUrl);
      websiteURL != null && (pointOfInterestToUpdate.websiteURL = websiteURL);
      description != null &&
        (pointOfInterestToUpdate.description = description);
      priceRange != null && (pointOfInterestToUpdate.priceRange = priceRange);
      city != null && (pointOfInterestToUpdate.city = city);
      daysOpen != null && (pointOfInterestToUpdate.daysOpen = daysOpen);
      hoursOpen != null && (pointOfInterestToUpdate.hoursOpen = hoursOpen);
      hoursClose != null && (pointOfInterestToUpdate.hoursClose = hoursClose);
      await dataSource.manager.save(PointOfInterest, pointOfInterestToUpdate);
      return pointOfInterestToUpdate;
    } catch (err: any) {
      throw new ApolloError(err.message);
    }
  }

  @Mutation(() => String)
  async deletePoi(@Arg("id") id: number): Promise<String> {
    try {
      await dataSource.manager.delete(PointOfInterest, { id });
      return "Poi deleted";
    } catch (err: any) {
      throw new ApolloError(err.message);
    }
  }
}
