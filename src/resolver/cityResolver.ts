import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { City } from "../entities/city";
import { Country } from "../entities/country";
import { PointOfInterest } from "../entities/pointOfInterest";
import dataSource from "../utils";

@InputType()
class CityType {
  @Field()
  name: string;

  @Field()
  current_location: string;

  @Field()
  population: number;

 country: Country
 
 pointsOfInterest: PointOfInterest[]
}

@InputType({description: 'update city data'})
class UpdatedCityType {
  @Field()
  name?: string;

  @Field()
  current_location?: string;

  @Field()
  population?: number;

 country?: Country
 
 pointsOfInterest?: PointOfInterest[]
}

@Resolver(City)
export class CityResolver {
  @Query(() => [City])
  async getAllCities(): Promise<City[]> {
    return await dataSource.manager.find(City);
  }

  @Mutation(() => City)
  async createCity(@Arg("data") data: CityType): Promise<City> {
    const newCity = new City();
    newCity.name = data.name;
    newCity.current_location = data.current_location;
    newCity.population = data.population;
    newCity.country = data.country;
    newCity.pointsOfInterest = data.pointsOfInterest;

    const cityFromDB = await dataSource.manager.save(City, newCity);
    console.log(cityFromDB);
    return cityFromDB;
  }

@Mutation(()=>City)
async updateCity(@Arg("data") data: UpdatedCityType):Promise<City> {
    
}

}
