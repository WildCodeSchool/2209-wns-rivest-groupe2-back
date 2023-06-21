/* eslint-disable @typescript-eslint/restrict-template-expressions */
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  ObjectType,
} from "type-graphql";
import { User } from "../entities/user";
import dataSource from "../utils/datasource";
import { ApolloError } from "apollo-server";
import { Regex } from "../utils/userRegex";
import { PointOfInterest } from "../entities/pointOfInterest";
import { Favorite } from "../entities/favorite";
import { Email, sendMail } from "../nodemailer/transporter";
import { v4 as uuidv4 } from 'uuid';

const envUrl = process.env.NODE_ENV === "prod" ? `https://rivest2.wns.wilders.dev/` : process.env.NODE_ENV === "staging" ? `https://staging.rivest2.wns.wilders.dev/` : `http://localhost:3000/`

@ObjectType()
class LoginResponse {
  @Field()
  token: string;

  @Field(() => User)
  userFromDB: User;
}

@ObjectType()
class RegisterResponse {
  @Field()
  token: string;

  @Field(() => User)
  userFromDB: User;
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
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await dataSource.manager.find(User);
  }

  @Query(() => User)
  async getUserById(@Arg("id") id: number): Promise<User> {
    try {
      const userById = await dataSource.manager.findOneByOrFail(User, { id });
      return userById;
    } catch (err: any) {
      throw new ApolloError(err.message);
    }
  }

  @Query(() => LoginResponse)
  async getToken(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<LoginResponse> {
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
        return { token, userFromDB };
      } else {
        throw new Error();
      }
    } catch {
      throw new Error("Invalid Auth");
    }
  }

  @Mutation(() => RegisterResponse)
  async createUser(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<RegisterResponse> {
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

      // uuid (email confirmation logic)
      const uuid = uuidv4();
      newUser.uuid = uuid;

      try {
         
        const confirmUrl = envUrl + `confirmation-email/${newUser.uuid}`; 
        await sendMail(Email.CONFIRMATION_EMAIL, email, {
          confirmUrl
        });
  
      } catch (err) {
        throw new Error('Une erreur est survenue')
      }

      const userFromDB = await dataSource.manager.save(User, newUser);

      const token = jwt.sign(
        { email: userFromDB.email },
        process.env.JWT_SECRET_KEY
      );
      return { token, userFromDB };

     
    } catch (error) {
      throw new Error("Error try again with an other email or pseudo");
    }
  }

  @Mutation(() => User)
  async confirmUser(@Arg("uuid") uuid: string): Promise<User> {
    const user = await  dataSource.manager.findOne(User, { where: { uuid } });
    if (user === null) {
      throw new Error("Invalid confirmation link");
    }
    user.isVerified = true;
    user.uuid = undefined;
    await dataSource.manager.save(User, user);
    return user;
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
      username !== null && username !== undefined && (userToUpdate.username = username);
      email !== null && email !== undefined && (userToUpdate.email = email);
      firstname !== null && firstname !== undefined && (userToUpdate.firstname = firstname);
      lastname !== null && lastname !== undefined && (userToUpdate.lastname = lastname);
      password !== null && password !== undefined &&
        (userToUpdate.hashedPassword = await argon2.hash(password));
      profilePicture !== null && (userToUpdate.profilePicture = profilePicture);
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

  @Query(() => [PointOfInterest])
  async getUserFavoritePOI(@Arg("id") id: number): Promise<PointOfInterest[]> {
    try {
      // Find the PointOfInterest entities that are favorites for the given user ID
      const favoritePOIs = await dataSource.manager
        .createQueryBuilder(PointOfInterest, "pointOfInterest")
        .innerJoin("pointOfInterest.favorites", "favorites")
        .where("favorite.userId = :id", { id })
        .getMany();

      return favoritePOIs;
    } catch (error) {
      console.error("Error fetching user favorite POIs:", error);
      return [];
    }
  }

  @Query(() => [Favorite])
  async getUserFavorites(@Arg("userId") userId: number): Promise<Favorite[]> {
    try {
      const favorites = await dataSource.manager.find(Favorite, {
        where: { user: { id: userId } },
        relations: ["user", "pointOfInterest"],
      });
      return favorites;
    } catch (error) {
      console.error("Error fetching user favorites:", error);
      return [];
    }
  }
}