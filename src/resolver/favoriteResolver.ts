import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Favorite } from "../entities/favorite";
import dataSource from "../utils/datasource";
import { ApolloError } from "apollo-server";
import { PointOfInterest } from "../entities/pointOfInterest";
import { User } from "../entities/user";

@Resolver(Favorite)
export class FavoriteResolver {
  @Query(() => [Favorite])
  async getAllFavorite(): Promise<Favorite[]> {
    try {
      const favorites = await dataSource.manager.find(Favorite, {
        relations: ['user', 'pointOfInterest'],
      });
      return favorites;
    } catch (error) {
      console.error("Error fetching all favorites:", error);
      return [];
    }
  }

  @Mutation(() => Favorite)
  async deleteAllFavorite(): Promise<String> {
    try{
      await dataSource.manager.remove(Favorite);
    }catch(err: any){
      throw new ApolloError(err.message)
    }
    return 'All favorite have been removed'
  }


    @Query(() => Favorite, { nullable: true })
    async getFavorite(
      @Arg("poiId") poiId: number,
      @Arg("userId") userId: number,
    ): Promise<Favorite | null> {
      const favorite = await dataSource.manager.findOne(Favorite, {
        where: {
         user: { id: userId },
         pointOfInterest : { id: poiId}
        },
        relations: ["user", "pointOfInterest"],
      });
    
      return favorite ?? null;
    }


    
    @Mutation(() => Favorite)
    async addFavorite(
      @Arg("poiId") poiId: number,
      @Arg("userId") userId: number
    ): Promise<Favorite | ApolloError> {
      const poi = await dataSource.manager.findOne(PointOfInterest, { where: { id: poiId } });
      const user = await dataSource.manager.findOne(User, { where: { id: userId } });
      if (poi == null) {
        throw new ApolloError(`PointID of interest not found`);
      }
      if (user == null) {
        throw new ApolloError(`UserID not found`);
      }
    
      const existingFavorite = await dataSource.manager.findOne(Favorite, {
        where: {
          user: { id: userId},
          pointOfInterest: { id: poiId}
        },
      });

      if (existingFavorite != null){
        throw new ApolloError(`This favorite already exists`)
      }
    
      const favorite = new Favorite();
      favorite.user = user; 
      favorite.pointOfInterest = poi;
      
      try {
        const savedFavorite = await dataSource.manager.save(favorite);
        return savedFavorite;
      } catch (error: any) {
        throw new ApolloError(error.message);
      }
    }
    

    @Mutation(() => Boolean)
    async removeFavorite(
      @Arg("favoriteId") favoriteId: number
    ): Promise<boolean | ApolloError> {
  const favorite = await dataSource.manager.findOne(Favorite, { where: { id: favoriteId } });

  if (favorite == null) {
    throw new ApolloError(`Favorite not found`);
  }
  
  
  try {
    await dataSource.manager.remove(favorite);
    return true;
  } catch (error: any) {
    throw new ApolloError(error.message);
  }
}

}