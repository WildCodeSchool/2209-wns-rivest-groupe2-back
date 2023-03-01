import { ApolloError } from "apollo-server";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Rate, rateNumbers } from "../entities/rate";
import { PointOfInterest } from "../entities/pointOfInterest";
import { User } from "../entities/user";
import dataSource from "../utils/datasource";

@Resolver(Rate)
export class RateResolver {
  @Query(() => Rate, { nullable: true })
  async getUserRateForPOI(
    @Arg("poiId", () => Number) poiId: number,
    @Arg("userId", () => Number) userId: number,
  ): Promise<Rate | null> {
    const poi = await dataSource.manager.findOne(PointOfInterest, { where: { id: poiId } });
    const user = await dataSource.manager.findOne(User, { where: { id: userId } });

    if (poi == null) {
      throw new ApolloError(`PointID of interest not found`);
    }

    if (user == null) {
      throw new ApolloError(`UserID not found`);
    }

    const userRate = await dataSource.manager.findOne(Rate, {
      where: {
        user: { id: user.id },
        pointOfInterest: { id: poi.id },
      },
    });

    return userRate ?? null;
  }


  @Mutation(() => Rate)
  async ratePOI(
    @Arg("poiId", () => Number) poiId: number,
    @Arg("userId", () => Number) userId: number,
    @Arg("rate") rateInput: rateNumbers
  ): Promise<Rate | ApolloError> {
    const poi = await dataSource.manager.findOne(PointOfInterest, { where: { id: poiId } });
    const user = await dataSource.manager.findOne(User, { where: { id: userId } });
    if (poi == null) {
      throw new ApolloError(`PointID of interest not found`);
    }

    if (user == null) {
      throw new ApolloError(`UserID not found`);
    }

    const rate = new Rate();
    rate.rate = rateInput;
    rate.user = user;
    rate.pointOfInterest = poi;
    rate.createDate = new Date();

    try {
      const savedRate = await dataSource.manager.save(rate);
      return savedRate;
    } catch (error: any) {
      throw new ApolloError(error.message);
    }
  }

  @Mutation(() => Rate)
  async updatePOIRate(
    @Arg("poiId", () => Number) poiId: number,
    @Arg("userId", () => Number) userId: number,
    @Arg("rate") rateInput: rateNumbers
  ): Promise<Rate | ApolloError> {
    const poi = await dataSource.manager.findOne(PointOfInterest, { where: { id: poiId } });
    const user = await dataSource.manager.findOne(User, { where: { id: userId } });
    if (poi == null) {
      throw new ApolloError(`PointID of interest not found`);
    }

    if (user == null) {
      throw new ApolloError(`UserID not found`);
    }

    const rate = await dataSource.manager.findOne(Rate, {
      where: {
        user: { id: user.id },
        pointOfInterest: { id: poi.id },
      },
    });

    if (rate == null) {
      throw new ApolloError(`Rate not found for the user and POI`);
    }

    rate.rate = rateInput;

    try {
      const updatedRate = await dataSource.manager.save(rate);
      return updatedRate;
    } catch (error: any) {
      throw new ApolloError(error.message);
    }
  }

}
