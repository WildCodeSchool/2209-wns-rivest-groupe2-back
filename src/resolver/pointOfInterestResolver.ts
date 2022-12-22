import { Arg, Mutation, Query, Resolver } from "type-graphql";
import dataSource from "../utils/datasource";
import { ApolloError } from "apollo-server";
import { PointOfInterest } from "../entities/pointOfInterest";
import { CreatePoiInput } from "./inputsPoi/createPoiInput";
import { UpdatePoiInput } from "./inputsPoi/updatePoiInput";

@Resolver(PointOfInterest)
export class PointOfInterestResolver {
  @Query(() => [PointOfInterest])
  async getAllPoi(): Promise<PointOfInterest[]> {
    return await dataSource.manager.find(PointOfInterest);
  }

  @Mutation(() => PointOfInterest)
  async createPoi(@Arg("data") data: CreatePoiInput): Promise<PointOfInterest> {
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
    newPoi.hourOpenMonday = data.hourOpenMonday; 
    newPoi.hourOpenThuesday = data.hourOpenThuesday; 
    newPoi.hourOpenWenesday = data.hourOpenWenesday; 
    newPoi.hourOpenThursday = data.hourOpenThursday; 
    newPoi.hourOpenFriday = data.hourOpenFriday; 
    newPoi.hourOpenSaturday = data.hourOpenSaturday; 
    newPoi.hourOpenSunday = data.hourOpenSunday; 
    newPoi.hourCloseMonday = data.hourCloseMonday; 
    newPoi.hourCloseThuesday= data.hourCloseThuesday; 
    newPoi.hourCloseWenesday = data.hourCloseWenesday; 
    newPoi.hourCloseThursday = data.hourCloseThursday; 
    newPoi.hourCloseFriday = data.hourCloseFriday; 
    newPoi.hourCloseSaturday = data.hourCloseSaturday; 
    newPoi.hourCloseSunday = data.hourCloseSunday; 
    const poiFromDB = await dataSource.manager.save(PointOfInterest, newPoi);
    return poiFromDB;
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
      creationDate,
      pictureUrl,
      websiteURL,
      description,
      priceRange,
      hourOpenMonday,
      hourOpenThuesday,
      hourOpenWenesday,
      hourOpenThursday,
      hourOpenFriday,
      hourOpenSaturday,
      hourOpenSunday,
      hourCloseMonday,
      hourCloseThuesday,
      hourCloseWenesday,
      hourCloseThursday,
      hourCloseFriday,
      hourCloseSaturday,
      hourCloseSunday,
    } = data;
    try {
      const pointOfInterestToUpdate = await dataSource.manager.findOneByOrFail(PointOfInterest, {
        id,
      });
      name != null && (pointOfInterestToUpdate.name = name);
      address != null && (pointOfInterestToUpdate.address = address);
      postal != null && (pointOfInterestToUpdate.postal = postal);
      type != null && (pointOfInterestToUpdate.type = type);
      coordinates != null && (pointOfInterestToUpdate.coordinates = coordinates);
      creationDate != null && (pointOfInterestToUpdate.creationDate = creationDate);
      pictureUrl != null && (pointOfInterestToUpdate.pictureUrl = pictureUrl);
      websiteURL != null && (pointOfInterestToUpdate.websiteURL = websiteURL);
      description != null && (pointOfInterestToUpdate.description = description);
      priceRange != null && (pointOfInterestToUpdate.priceRange = priceRange);
      hourOpenMonday != null && (pointOfInterestToUpdate.hourOpenMonday = hourOpenMonday);
      hourOpenThuesday != null && (pointOfInterestToUpdate.hourOpenThuesday = hourOpenThuesday );
      hourOpenWenesday != null && (pointOfInterestToUpdate.hourOpenWenesday = hourOpenWenesday);
      hourOpenThursday != null && (pointOfInterestToUpdate.hourOpenThursday = hourOpenThursday);
      hourOpenFriday != null && (pointOfInterestToUpdate.hourOpenFriday = hourOpenFriday);
      hourOpenSaturday != null && (pointOfInterestToUpdate.hourOpenSaturday = hourOpenSaturday);
      hourOpenSunday != null && (pointOfInterestToUpdate.hourOpenSunday = hourOpenSunday);
      hourCloseMonday != null && (pointOfInterestToUpdate.hourCloseMonday= hourCloseMonday);
      hourCloseThuesday != null && (pointOfInterestToUpdate.hourCloseThuesday = hourCloseThuesday);
      hourCloseWenesday != null && (pointOfInterestToUpdate.hourCloseWenesday = hourCloseWenesday);
      hourCloseThursday != null && (pointOfInterestToUpdate.hourCloseThursday = hourCloseThursday);
      hourCloseFriday != null && (pointOfInterestToUpdate.hourCloseFriday = hourCloseFriday);
      hourCloseSaturday != null && (pointOfInterestToUpdate.hourCloseSaturday = hourCloseSaturday);
      hourCloseSunday != null && (pointOfInterestToUpdate.hourCloseSunday = hourCloseSunday);
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
