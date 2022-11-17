import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Rate } from "../entities/rate";
import dataSource from "../utils";
import { ApolloError } from "apollo-server";
import { rateNumbers } from "../entities/rate";

@InputType()
class RateType {
  @Field()
  rate: rateNumbers;
}

@InputType({ description: "Update Rate data" })
class UpdateRateInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  rate: rateNumbers;

  @Field({ nullable: true })
  updateDate: Date;
}

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
    newRate.creationDate = new Date();

    try {
      const rateFromDB = await dataSource.manager.save(Rate, newRate);
      console.log(rateFromDB);
      return rateFromDB;
    } catch (err) {
      throw new ApolloError(err.message);
    }
  }

  // @Mutation(() => Rate)
  // async updateRate(
  //   @Arg("data") data: UpdateRateInput
  // ): Promise<Rate | ApolloError> {
  //   const {
  //     id,
  //     ratename,
  //     email,
  //     firstname,
  //     lastname,
  //     password,
  //     profilePicture,
  //   } = data;
  //   try {
  //     const rateToUpdate = await dataSource.manager.findOneByOrFail(Rate, {
  //       id,
  //     });
  //     ratename ? (rateToUpdate.ratename = ratename) : rateToUpdate.ratename;
  //     email ? (rateToUpdate.email = email) : rateToUpdate.email;
  //     firstname ? (rateToUpdate.firstname = firstname) : rateToUpdate.firstname;
  //     lastname ? (rateToUpdate.lastname = lastname) : rateToUpdate.lastname;
  //     password
  //       ? (rateToUpdate.hashedPassword = await argon2.hash(password))
  //       : rateToUpdate.hashedPassword;
  //     profilePicture
  //       ? (rateToUpdate.profilePicture = profilePicture)
  //       : rateToUpdate.profilePicture;
  //     await dataSource.manager.save(Rate, rateToUpdate);
  //     return rateToUpdate;
  //   } catch (err) {
  //     throw new ApolloError(err.message);
  //   }
  // }

  @Mutation(() => String)
  async deleteRate(@Arg("id") id: number): Promise<String> {
    try {
      await dataSource.manager.delete(Rate, { id });
      return "rate deleted";
    } catch (err) {
      throw new ApolloError(err.message);
    }
  }
}
