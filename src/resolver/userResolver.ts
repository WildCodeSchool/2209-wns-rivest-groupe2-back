import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/user";
import dataSource from "../utils";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await dataSource.manager.find(User);
  }

  //   @Mutation(() => User)
  //   async createWilder(@Arg("name") name: string): Promise<User> {
  //     const newWilder = new User();
  //     newWilder.name = name;
  //     const wilderFromDB = await dataSource.manager.save(User, newWilder);
  //     console.log(wilderFromDB);
  //     return wilderFromDB;
  //   }
}
