/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Arg, Mutation, Query, Resolver, Authorized } from "type-graphql";
import dataSource from "../utils/datasource";
import { ApolloError } from "apollo-server";
import { PointOfInterest } from "../entities/pointOfInterest";
import { CreatePoiInput } from "./inputsPoi/createPoiInput";
import { UpdatePoiInput } from "./inputsPoi/updatePoiInput";
import { OpeningHours } from "../entities/openingHours";

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
    const sortedPois = allPois.sort((a, b) => a.id - b.id);
    return sortedPois;
  }

  @Query(() => PointOfInterest)
  async getPOIbyId(
    @Arg("id") id: number,
  ): Promise<PointOfInterest> {
    const poi = await dataSource.manager.findOne(PointOfInterest, { where: { id }, relations: ["comments", "comments.user"] });

    if (poi == null) {
      throw new Error("POI not found");
    }

    return poi;
  }

  @Authorized()
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
      newPoi.city = data.city;

      let savedOpeningHours: OpeningHours[] = [];
      if (data.openingHours && data.openingHours.length > 0) {
        const openingHours = data.openingHours.map((hourInput) => {
          const newHours = new OpeningHours();
          newHours.value = hourInput.value;
          newHours.name = hourInput.name;
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
    try {
      const poiFromDb = await dataSource.manager.findOneOrFail(
        PointOfInterest,
        {
          where: {
            id: data.id,
          },
          relations: {
            openingHours: true,
          },
        }
      );

      if (data.name !== null) poiFromDb.name = data.name;
      if (data.address !== null) poiFromDb.address = data.address;
      if (data.postal !== null) poiFromDb.postal = data.postal;
      if (data.type !== null) poiFromDb.type = data.type;
      if (data.coordinates !== null) poiFromDb.coordinates = data.coordinates;
      if (data.pictureUrl !== null) poiFromDb.pictureUrl = data.pictureUrl;
      if (data.websiteURL !== null) poiFromDb.websiteURL = data.websiteURL;
      if (data.description !== null) poiFromDb.description = data.description;
      if (data.city !== null) poiFromDb.city = data.city;

      let savedOpeningHours: OpeningHours[] = [];
      if (data.openingHours && data.openingHours.length > 0) {
        if (poiFromDb?.openingHours.length > 0) {
          poiFromDb.openingHours.map(async (hourInput) => {
            const deletedOpeningHours = await dataSource
              .getRepository(OpeningHours)
              .delete({ id: hourInput.id });

            if (deletedOpeningHours.affected === 0) {
              throw new Error("Could not delete the opening hours.");
            }
            console.log(`Opening Hours with id: ${hourInput.id} deleted`);
          });
        }

        const newOpeningHours = data.openingHours.map((hourInput) => {
          const newHours = new OpeningHours();
          newHours.value = hourInput.value;
          newHours.name = hourInput.name;
          newHours.hoursOpen = hourInput.hoursOpen;
          newHours.hoursClose = hourInput.hoursClose;
          return newHours;
        });

        savedOpeningHours = await dataSource.manager.save(
          OpeningHours,
          newOpeningHours
        );
      }

      if (data.openingHours && data.openingHours.length > 0)
        poiFromDb.openingHours = savedOpeningHours;

      await dataSource.manager.save(PointOfInterest, poiFromDb);

      const updatedPoi = await dataSource.manager.findOneOrFail(
        PointOfInterest,
        {
          where: {
            id: data.id,
          },
          relations: {
            openingHours: true,
          },
        }
      );
      return updatedPoi;
    } catch (err: any) {
      throw new ApolloError(err.message);
    }
  }

  @Authorized()
  @Mutation(() => String)
  async deletePoi(@Arg("id") id: number): Promise<String> {
    try {
      const poiFromDb = await dataSource.manager.find(PointOfInterest, {
        where: {
          id,
        },
        relations: {
          comments: true,
          favorites: true,
        },
      });

      if (poiFromDb === undefined || poiFromDb[0] === undefined) {
        throw new Error("No point of interest found with this id");
      }

      const deletedPoi = await dataSource
        .getRepository(PointOfInterest)
        .delete({ id });

      if (deletedPoi.affected === 0) {
        throw new Error("Could not delete the point of interest.");
      }
      return "Poi deleted";
    } catch (err: any) {
      throw new ApolloError(err.message);
    }
  }
}
