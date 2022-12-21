import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Comment } from "../entities/comment";
import dataSource from "../utils";
import { ApolloError } from "apollo-server";

@InputType()
class CommentType {
  @Field()
  userId: number;

  @Field()
  pointOfInterestId: number;

  @Field()
  text: string;
}

@InputType({ description: "Update User data" })
class UpdateCommentInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  userId: number;

  @Field({})
  pointOfInterestId: number;

  @Field({ nullable: true })
  updateDate: Date;

  @Field({ nullable: true })
  text: string;
}

@Resolver(Comment)
export class CommentResolver {
  @Query(() => [Comment])
  async getAllComments(): Promise<Comment[]> {
    return await dataSource.manager.find(Comment);
  }

  @Mutation(() => Comment)
  async createComment(
    @Arg("data") data: CommentType
  ): Promise<Comment | ApolloError> {
    const newComment = new Comment();
    newComment.userId = data.userId;
    newComment.pointOfInterestId = data.pointOfInterestId;
    newComment.createDate = new Date();
    newComment.text = data.text;

    try {
      const commentFromDB = await dataSource.manager.save(Comment, newComment);
      console.log(commentFromDB);
      return commentFromDB;
    } catch (err: any) {
      throw new ApolloError(err.message);
    }
  }

  @Mutation(() => Comment)
  async updateComment(
    @Arg("data") data: UpdateCommentInput
  ): Promise<Comment | ApolloError> {
    const { id, userId, pointOfInterestId, updateDate, text } = data;
    try {
      const commentToUpdate = await dataSource.manager.findOneByOrFail(
        Comment,
        {
          id,
        }
      );
      userId !== 0 && (commentToUpdate.userId = userId);
      pointOfInterestId !== 0 &&
        (commentToUpdate.pointOfInterestId = pointOfInterestId);
      updateDate !== null && (commentToUpdate.updateDate = updateDate);
      text !== null && (commentToUpdate.text = text);
      await dataSource.manager.save(Comment, commentToUpdate);
      return commentToUpdate;
    } catch (err: any) {
      throw new ApolloError(err.message);
    }
  }

  @Mutation(() => String)
  async deleteComment(@Arg("id") id: number): Promise<String> {
    try {
      await dataSource.manager.delete(Comment, { id });
      return "comment deleted";
    } catch (err: any) {
      throw new ApolloError(err.message);
    }
  }
}
