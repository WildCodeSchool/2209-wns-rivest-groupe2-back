import { ApolloError } from "apollo-server";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Comment } from "../entities/comment";
import { PointOfInterest } from "../entities/pointOfInterest";
import { User } from "../entities/user";
import dataSource from "../utils/datasource";

@Resolver(Comment)
export class CommentResolver {

  @Query(() => [Comment])
  async getAllComments(): Promise<Comment[]> {
    try {
      const comments = await dataSource.manager.find(Comment, {
        relations: ['user', 'pointOfInterest'],
      });
      return comments;
    } catch (error) {
      console.error("Error fetching all comments:", error);
      return [];
    }
  }



  @Query(() => Comment, { nullable: true })
  async getUserCommentForPOI(
    @Arg("poiId", () => Number) poiId: number,
    @Arg("userId", () => Number) userId: number,
  ): Promise<Comment | null> {
    const poi = await dataSource.manager.findOne(PointOfInterest, { where: { id: poiId } });
    const user = await dataSource.manager.findOne(User, { where: { id: userId } });

    if (poi == null) {
      throw new ApolloError(`PointID of interest not found`);
    }

    if (user == null) {
      throw new ApolloError(`UserID not found`);
    }

    const userComment = await dataSource.manager.findOne(Comment, {
      where: {
        user: { id: user.id },
        pointOfInterest: { id: poi.id },
      },
    });

    return userComment ?? null;
  }


  @Mutation(() => Comment)
  async commentPOI(
    @Arg("poiId", () => Number) poiId: number,
    @Arg("userId", () => Number) userId: number,
    @Arg("comment") commentInput: string
  ): Promise<Comment | ApolloError> {
    const poi = await dataSource.manager.findOne(PointOfInterest, { where: { id: poiId } });
    const user = await dataSource.manager.findOne(User, { where: { id: userId } });
  
    if (poi == null) {
      throw new ApolloError(`PointID of interest not found`);
    }
  
    if (user == null) {
      throw new ApolloError(`UserID not found`);
    }
  
    let comment = await dataSource.manager.findOne(Comment, {
      where: {
        user: { id: user.id },
        pointOfInterest: { id: poi.id },
      },
    });
  
    if (comment != null) {
      comment.text = commentInput;
    } else {
      comment = new Comment();
      comment.text = commentInput;
      comment.user = user;
      comment.pointOfInterest = poi;
      comment.createDate = new Date();
    }
  
    try {
      const savedComment = await dataSource.manager.save(comment);
      return savedComment;
    } catch (error: any) {
      throw new ApolloError(error.message);
    }
  }
  

}
