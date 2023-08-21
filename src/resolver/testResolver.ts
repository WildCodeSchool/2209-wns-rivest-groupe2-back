import { Resolver, Mutation } from "type-graphql";
import { City } from "../entities/city";
import { Comment } from "../entities/comment";
import { PointOfInterest } from "../entities/pointOfInterest";
import { User } from "../entities/user";
import dataSource from "../utils/datasource";
import { Favorite } from "../entities/favorite";

@Resolver()
export class DeleteAllEntitiesResolver {
  @Mutation(() => String)
  async deleteAllEntities(): Promise<string> {
    if (process.env.NODE_ENV !== "test") {
      throw new Error("This mutation is only allowed in test environments");
    }

    // Delete all entities in the database
    await dataSource.manager.delete(City, {});
    await dataSource.manager.delete(Comment, {});
    await dataSource.manager.delete(Favorite, {});
    await dataSource.manager.delete(PointOfInterest, {});
    await dataSource.manager.delete(User, {});

    return "All entities deleted successfully";
  }
}
