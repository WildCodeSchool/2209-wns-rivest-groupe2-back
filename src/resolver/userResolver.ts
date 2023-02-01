import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/user";
import dataSource from "../utils/datasource";
import { ApolloError } from "apollo-server";
import { Regex } from "../utils/userRegex";

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
  
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await dataSource.manager.find(User, {
      relations: { rates: true },
    });
  }

  @Query(() => String)
  async getToken(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string> {
    try {
      const userFromDB = await dataSource.manager.findOneByOrFail(User, {
        email,
      });
      if (process.env.JWT_SECRET_KEY === undefined) {
        throw new Error();
      }

      if (await argon2.verify(userFromDB.hashedPassword, password)) {
        const token = jwt.sign(
          { email: userFromDB.email },
          process.env.JWT_SECRET_KEY
        );
        return token;
      } else {
        throw new Error();
      }
    } catch {
      throw new Error("Invalid Auth");
    }
  }



  @Query(() => User)
  async getUserById(@Arg("id") id: number): Promise<User> {
    try {
      return await dataSource.manager.findOneByOrFail(User, {id});
    } catch (err: any) {
      throw new ApolloError(err.message);
    }
  } 
  
  @Mutation(() => String)
  async createUser(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string> {
    try {
      if (!Regex.email(email) || !Regex.password(password)) {
        throw Error("Invalid email, password or pseudo");
      }
      if (process.env.JWT_SECRET_KEY === undefined) {
        throw new Error();
      }

      const newUser = new User();
      newUser.email = email;
      newUser.hashedPassword = await argon2.hash(password);

      const userFromDB = await dataSource.manager.save(User, newUser);

      const token = jwt.sign(
        { email: userFromDB.email },
        process.env.JWT_SECRET_KEY
      );
      return token;
    } catch (error) {
      throw new Error("Error try again with an other email or pseudo");
    }
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
      username != null && (userToUpdate.username = username);
      email != null && (userToUpdate.email = email);
      firstname != null && (userToUpdate.firstname = firstname);
      lastname != null && (userToUpdate.lastname = lastname);
      password != null &&
        (userToUpdate.hashedPassword = await argon2.hash(password));
      profilePicture != null && (userToUpdate.profilePicture = profilePicture);
      await dataSource.manager.save(User, userToUpdate);
      return userToUpdate;
    } catch (err: any) {
      throw new ApolloError(err.message);
    }
  }

  @Mutation(() => String)
  async deleteUser(@Arg("id") id: number): Promise<String | ApolloError> {
    try {
      await dataSource.manager.delete(User, { id });
      return "user deleted";
    } catch (err: any) {
      throw new ApolloError(err.message);
    }
  }
}

// @InputType()
// class CreateUserInput {
//   @Field({ nullable: true })
//   username: string;

//   @Field({ nullable: true })
//   email: string;

//   @Field({ nullable: true })
//   firstname: string;

//   @Field
//   lastname: string;

//   @Field()
//   password: string;
// }

// @Mutation(() => User)
// async createUser(
//   @Arg("data") data: CreateUserInput
// ): Promise<User | ApolloError> {
//   const newUser = new User();
//   newUser.username = data.username;
//   newUser.email = data.email;
//   newUser.firstname = data.firstname;
//   newUser.lastname = data.lastname;
//   newUser.hashedPassword = await argon2.hash(data.password);

//   try {
//     const userFromDB = await dataSource.manager.save(User, newUser);
//     console.log(userFromDB);
//     return userFromDB;
//   } catch (err: any) {
//     throw new ApolloError(err.message);
//   }
// }
