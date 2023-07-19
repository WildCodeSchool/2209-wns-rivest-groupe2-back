import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { City } from "../entities/city";
import dataSource from "../utils/datasource";
import { ApolloError } from "apollo-server";

@InputType()
class CityType {
  @Field()
  name: string;

  @Field({ nullable: true })
  currentLocation?: string;

  @Field({ nullable: true })
  population?: number;

  @Field({ nullable: true })
  user?: number;
}

@InputType({ description: "update city data" })
class UpdatedCityType {
  @Field()
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  currentLocation?: string;

  @Field({ nullable: true })
  population?: number;
}

@Resolver(City)
export class CityResolver {
  @Query(() => [City])
  async getAllCities(): Promise<City[]> {
    return await dataSource.manager.find(City, {
      // relations: { country: true },
      relations: ["country", "user"],
    });
  }

  @Mutation(() => City)
  async createCity(@Arg("data") data: CityType): Promise<City | ApolloError> {
    const newCity = new City();
    newCity.name = data.name;
    newCity.currentLocation = data.currentLocation;
    newCity.population = data.population;

    try {
      const cityFromDB = await dataSource.manager.save(City, newCity);
      return cityFromDB;
    } catch (err: any) {
      throw new ApolloError(err.message);
    }
  }

  @Mutation(() => City)
  async updateCity(
    @Arg("data") data: UpdatedCityType
  ): Promise<City | ApolloError> {
    const { id, name, currentLocation, population } = data;
    try {
      const cityToUpdate = await dataSource.manager.findOneByOrFail(City, {
        id,
      });
      name !== null && name !== undefined && (cityToUpdate.name = name);
      currentLocation !== null &&
        (cityToUpdate.currentLocation = currentLocation);
      population !== null && (cityToUpdate.population = population);

      await dataSource.manager.save(City, cityToUpdate);
      return cityToUpdate;
    } catch (error: any) {
      throw new ApolloError(error.message);
    }
  }

  @Mutation(() => String)
  async deleteCity(@Arg("id") id: number): Promise<String | ApolloError> {
    try {
      await dataSource.manager.delete(City, { id });
      return "city deleted";
    } catch (err: any) {
      throw new ApolloError(err.message);
    }
  }
}
