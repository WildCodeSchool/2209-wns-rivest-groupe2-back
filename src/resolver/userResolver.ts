import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/user";
import dataSource from "../utils";
import { ApolloError } from "apollo-server";

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
  password: string;
}

@InputType({ description: "Update User data" })
class UpdateUserInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  profilePicture?: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  async getToken(
    @Arg("username") username: string,
    @Arg("password") password: string
  ): Promise<string> {
    try {
      const userFromDB = await dataSource.manager.findOneByOrFail(User, {
        username,
      });
      if (process.env.JWT_SECRET_KEY === undefined) {
        throw new Error();
      }

      if (await argon2.verify(userFromDB.hashedPassword, password)) {
        const token = jwt.sign(
          { username: userFromDB.username },
          process.env.JWT_SECRET_KEY
        );
        return token;
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      throw new Error("Invalid Authentication");
    }
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await dataSource.manager.find(User);
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: UserType): Promise<User | ApolloError> {
    const newUser = new User();
    newUser.username = data.username;
    newUser.email = data.email;
    newUser.firstname = data.firstname;
    newUser.lastname = data.lastname;
    newUser.hashedPassword = await argon2.hash(data.password);

    const userFromDB = await dataSource.manager.save(User, newUser);
    console.log(userFromDB);
    return userFromDB;
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("data") data: UpdateUserInput
  ): Promise<User | ApolloError> {
    const {
      id,
      username,
      email,
      firstname,
      lastname,
      password,
      profilePicture,
    } = data;
    try {
      const userToUpdate = await dataSource.manager.findOneByOrFail(User, {
        id,
      });
      username ? (userToUpdate.username = username) : userToUpdate.username;
      email ? (userToUpdate.email = email) : userToUpdate.email;
      firstname ? (userToUpdate.firstname = firstname) : userToUpdate.firstname;
      lastname ? (userToUpdate.lastname = lastname) : userToUpdate.lastname;
      password
        ? (userToUpdate.hashedPassword = await argon2.hash(password))
        : userToUpdate.hashedPassword;
      profilePicture
        ? (userToUpdate.profilePicture = profilePicture)
        : userToUpdate.profilePicture;
      await dataSource.manager.save(User, userToUpdate);
      return userToUpdate;
    } catch (err) {
      throw new ApolloError(err.message);
    }
  }

  @Mutation(() => String)
  async deleteUser(@Arg("id") id: number): Promise<String> {
    try {
      await dataSource.manager.delete(User, { id });
      return "user deleted";
    } catch (err) {
      throw new ApolloError(err.message);
    }
  }
}
