import { Arg, Mutation, Query, Resolver, Authorized } from "type-graphql";
import dataSource from "../utils/datasource";
import { ApolloError } from "apollo-server";
import { PointOfInterest } from "../entities/pointOfInterest";
import { CreatePoiInput } from "./inputsPoi/createPoiInput";
import { UpdatePoiInput } from "./inputsPoi/updatePoiInput";

@Resolver(PointOfInterest)
export class PointOfInterestResolver {
  @Query(() => [PointOfInterest])
  async getAllPoi(): Promise<PointOfInterest[]> {
    const allPois = await dataSource.manager.find(PointOfInterest, {
      relations: [
        "favorites",
        "comments",
        "rates",
        "rates.user",
        "comments.user",
        "favorites.user",
      ],
    });
    console.log(allPois);
    console.log(allPois[0].comments);
    return allPois;
  }

  // @Query(() => [PointOfInterest])
  //   async getAllPoisAndUser(@Arg("userId") userId: number): Promise<POIWithUser[]>{
  //     const allPois = await dataSource.manager.find(PointOfInterest)

  //     const userRate = await dataSource.manager.findOne(Rate, { where: { userId }})
  //     const userComment  = await dataSource.manager.findOne(Comment, { where: { userId }})
  //     const userFavorite = await dataSource.manager.findOne(Favorite, { where: { userId }})

  //     return {
  //       pois: allPois,
  //       userRate: userRate?.rate,
  //       userComment: userComment?.text,
  //       userFavorite: userFavorite?.id
  //     }
  //   }

  @Authorized()
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

  @Authorized()
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
      name !== null && (pointOfInterestToUpdate.name = name);
      address !== null && (pointOfInterestToUpdate.address = address);
      postal !== null && (pointOfInterestToUpdate.postal = postal);
      type !== null && (pointOfInterestToUpdate.type = type);
      coordinates !== null &&
        (pointOfInterestToUpdate.coordinates = coordinates);
      pictureUrl !== null && (pointOfInterestToUpdate.pictureUrl = pictureUrl);
      websiteURL !== null && (pointOfInterestToUpdate.websiteURL = websiteURL);
      description !== null &&
        (pointOfInterestToUpdate.description = description);
      priceRange !== null && (pointOfInterestToUpdate.priceRange = priceRange);
      city !== null && (pointOfInterestToUpdate.city = city);
      daysOpen !== null && (pointOfInterestToUpdate.daysOpen = daysOpen);
      hoursOpen !== null && (pointOfInterestToUpdate.hoursOpen = hoursOpen);
      hoursClose !== null && (pointOfInterestToUpdate.hoursClose = hoursClose);
      await dataSource.manager.save(PointOfInterest, pointOfInterestToUpdate);
      return pointOfInterestToUpdate;
    } catch (err: any) {
      throw new ApolloError(err.message);
    }
  }

  @Authorized()
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
