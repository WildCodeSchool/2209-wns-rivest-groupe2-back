import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/user";
import dataSource from "../utils/datasource";

@InputType()
class UserType {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  hashedPassword: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await dataSource.manager.find(User);
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: UserType): Promise<User> {
    const newUser = new User();
    newUser.username = data.username;
    newUser.email = data.email;
    newUser.firstname = data.firstname;
    newUser.lastname = data.lastname;
    newUser.hashedPassword = data.hashedPassword;

    const userFromDB = await dataSource.manager.save(User, newUser);
    console.log(userFromDB);
    return userFromDB;
  }
}
