import { Query, Resolver } from "type-graphql";
import { Role } from "../entities/role";
import dataSource from "../utils/datasource";
import { ApolloError } from "apollo-server";

@Resolver(Role)
export class RoleResolver {
  @Query(() => [Role])
  async getAllRoles(): Promise<Role[]> {
    try {
      const roles = await dataSource.manager.find(Role);
      return roles;
    } catch (err: any) {
      throw new ApolloError(err.message);
    }
  }
}
