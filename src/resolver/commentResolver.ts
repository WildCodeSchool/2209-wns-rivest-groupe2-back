import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Comment } from "../entities/comment";
import dataSource from "../utils";
import { ApolloError } from "apollo-server";

@InputType()
class CommentType {
  @Field()
  userId: int;

  @Field()
  pointOfInterestId: int;

  @Field()
  createDate: Date;

  @Field()
  updateDate: Date;

  @Field()
  text: string;
}

@InputType({ description: "Update User data" })
class UpdateCommentInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  userId: int;

  @Field({ nullable: true })
  pointOfInterestId: int;

  @Field({ nullable: true })
  createDate: Date;

  @Field({ nullable: true })
  updateDate: Date;

  @Field({ nullable: true })
  text: string;
}

@Resolver(Comment)
export class CommentResolver {
  @Query(() => Comment)
  async getComment(): Promise<Comment> {
    return await dataSource.manager.find(Comment);
      } 
    } 

  @Query(() => [Comment])
  async getAllComments(): Promise<Comment[]> {
    return await dataSource.manager.find(Comment);
  }

  @Mutation(() => Comment)
  async createComment(@Arg("data") data: CommentType): Promise<Comment | ApolloError> {
    const newComment = new Comment();
    newComment.userId = data.userId;
    newComment.pointOfInterestId = data.pointOfInterestId;
    newComment.createDate = data.createDate;
    newComment.updateDate = data.updateDate;
    newComment.text = data.text;
   
    try {
      const commentFromDB = await dataSource.manager.save(Comment, newComment);
      console.log(commentFromDB);
      return commentFromDB;
    } catch (err) {
      throw new ApolloError(err.message);
    }
  }

  @Mutation(() => Comment)
  async updateComment(
    @Arg("data") data: UpdateCommentInput
  ): Promise<Comment | ApolloError> {
    const {
      id,
      userId,
      pointOfInterestId,
      createDate,
      updateDate,
      text,
    } = data;
    try {
      const commentToUpdate = await dataSource.manager.findOneByOrFail(Comment, {
        id,
      });
      userId ? (commentToUpdate.userId = userId) : commentToUpdate.userId;
      pointOfInterestId ? (commentToUpdate.pointOfInterestId = pointOfInterestId) : commentToUpdate.pointOfInterestId;
      createDate ? (commentToUpdate.createDate = createDate) : commentToUpdate.createDate;
      updateDate ? (commentToUpdate.updateDate = updateDate) : commentToUpdate.updateDate;
      text ? (commentToUpdate.updateDate = updateDate) : commentToUpdate.updateDate;
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
