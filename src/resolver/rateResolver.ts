import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Rate, rateNumbers } from "../entities/rate";
import dataSource from "../utils/datasource";
import { ApolloError } from "apollo-server";

@InputType()
class RateType {
  @Field()
  rate: rateNumbers;
}

/* @InputType({ description: "Update Rate data" })
class UpdateRateInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  rate: rateNumbers;

  @Field({ nullable: true })
  updateDate: Date;
} */

@Resolver(Rate)
export class RateResolver {
  @Query(() => [Rate])
  async getRate(): Promise<Rate[]> {
    return await dataSource.manager.find(Rate);
  }

  @Mutation(() => Rate)
  async ratePOI(@Arg("data") data: RateType): Promise<Rate | ApolloError> {
    const newRate = new Rate();
    newRate.rate = data.rate;
    newRate.createDate = new Date();

    try {
      const rateFromDB = await dataSource.manager.save(Rate, newRate);
      console.log(rateFromDB);
      return rateFromDB;
    } catch (err: any) {
      throw new ApolloError(err.message);
    }
  }

  @Mutation(() => String)
  async deleteRate(@Arg("id") id: number): Promise<String> {
    try {
      await dataSource.manager.delete(Rate, { id });
      return "rate deleted";
    } catch (err: any) {
      throw new ApolloError(err.message);
    }
  }
}
