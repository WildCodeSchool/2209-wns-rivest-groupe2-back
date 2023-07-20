import {
  Arg,
  Authorized,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { City } from "../entities/city";
import dataSource from "../utils/datasource";
import { ApolloError } from "apollo-server";
import { Point } from "geojson";

@InputType()
class CityType {
  @Field()
  name: string;

  @Field(() => [Number])
  coordinates: Point;

  @Field({ nullable: true })
  user?: number;
}

@InputType({ description: "update city data" })
class UpdatedCityType extends CityType {
  @Field()
  id: number;
}

@Resolver(City)
export class CityResolver {
  @Query(() => [City])
  async getAllCities(): Promise<City[]> {
    return await dataSource.manager.find(City, {
      relations: ["users"],
    });
  }

  @Authorized()
  @Mutation(() => City)
  async createCity(@Arg("data") data: CityType): Promise<City | ApolloError> {
    const newCity = new City();
    newCity.name = data.name;
    newCity.coordinates = data.coordinates;

    try {
      const cityFromDB = await dataSource.manager.save(City, newCity);
      return cityFromDB;
    } catch (err: any) {
      throw new ApolloError(err.message);
    }
  }

  @Authorized()
  @Mutation(() => City)
  async updateCity(
    @Arg("data") data: UpdatedCityType
  ): Promise<City | ApolloError> {
    const { id, name, coordinates } = data;
    try {
      const cityToUpdate = await dataSource.manager.findOneByOrFail(City, {
        id,
      });
      name !== null && name !== undefined && (cityToUpdate.name = name);
      coordinates !== null &&
        coordinates !== undefined &&
        (cityToUpdate.coordinates = coordinates);

      await dataSource.manager.save(City, cityToUpdate);
      return cityToUpdate;
    } catch (error: any) {
      throw new ApolloError(error.message);
    }
  }

  @Authorized()
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
