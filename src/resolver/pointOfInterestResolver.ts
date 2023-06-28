import { Arg, Mutation, Query, Resolver, Authorized } from "type-graphql";
import dataSource from "../utils/datasource";
import { ApolloError } from "apollo-server";
import { PointOfInterest } from "../entities/pointOfInterest";
import { OpeningHours } from "../entities/openingHours";
import { CreatePoiInput } from "./inputsPoi/createPoiInput";
import { UpdatePoiInput } from "./inputsPoi/updatePoiInput";

@Resolver(PointOfInterest)
export class PointOfInterestResolver {
  @Query(() => [PointOfInterest])
  async getAllPoi(): Promise<PointOfInterest[]> {
    const allPois = await dataSource.manager.find(PointOfInterest, {
      relations: [
        "openingHours",
        "favorites",
        "comments",
        "comments.user",
        "favorites.user",
      ],
    });
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

  /* @Authorized() */
  @Mutation(() => PointOfInterest)
  async createPoi(
    @Arg("data") data: CreatePoiInput
  ): Promise<PointOfInterest | ApolloError> {
    try {
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
      newPoi.city = data.city;

      let savedOpeningHours: OpeningHours[] = [];
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.openingHours && data.openingHours.length > 0) {
        const openingHours = data.openingHours.map((hourInput) => {
          const newHours = new OpeningHours();
          newHours.dayOpen = hourInput.dayOpen;
          newHours.hoursOpen = hourInput.hoursOpen;
          newHours.hoursClose = hourInput.hoursClose;
          return newHours;
        });

        savedOpeningHours = await dataSource.manager.save(
          OpeningHours,
          openingHours
        );
      }

      newPoi.openingHours = savedOpeningHours;

      const savedPoi = await dataSource.manager.save(PointOfInterest, newPoi);
      return savedPoi;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
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
