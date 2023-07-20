import { Resolver, Mutation } from "type-graphql";
import { City } from "../entities/city";
import { Comment } from "../entities/comment";
import { PointOfInterest } from "../entities/pointOfInterest";
import { User } from "../entities/user";
import dataSource from "../utils/datasource";
import { Favorite } from "../entities/favorite";
/* import { USER_ROLES } from "../utils/userRoles"; */

@Resolver()
export class DeleteAllEntitiesResolver {
  @Mutation(() => String)
  async deleteAllEntities(): Promise<string> {
    if (process.env.NODE_ENV !== "test") {
      throw new Error("This resolver is only allowed in test environments");
    }

    // Delete all entities in the database
    await dataSource.manager.delete(City, {});
    await dataSource.manager.delete(Comment, {});
    await dataSource.manager.delete(Favorite, {});
    await dataSource.manager.delete(PointOfInterest, {});
    await dataSource.manager.delete(User, {});

    return "All entities deleted successfully";
  }

  /* @Mutation(() => String)
  async upgradeUserToAdmin(@Arg("email") email: string) {
    if (process.env.NODE_ENV !== "test") {
      throw new Error("This resolver is only allowed in test environments");
    }

    await dataSource
      .getRepository(User)
      .update({ email }, { role: USER_ROLES.ADMIN });

    return `The user with the email ${email} has been upgraded to ADMIN.`;
  } */
}
