import { ApolloError } from "apollo-server";
import { Arg, /* Authorized, */ Mutation, Query, Resolver } from "type-graphql";
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
        relations: {
          user: true,
          pointOfInterest: true,
        },
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
    @Arg("userId", () => Number) userId: number
  ): Promise<Comment | null> {
    const poi = await dataSource.manager.findOne(PointOfInterest, {
      where: { id: poiId },
    });
    const user = await dataSource.manager.findOne(User, {
      where: { id: userId },
    });

    if (poi === null) {
      throw new ApolloError(`PointID of interest not found`);
    }

    if (user === null) {
      throw new ApolloError(`UserID not found`);
    }

    const userComment = await dataSource.manager.findOne(Comment, {
      where: {
        user: { id: user.id },
        pointOfInterest: { id: poi.id },
      },
      relations: {
        user: true,
      },
    });

    return userComment ?? null;
  }

  @Query(() => Number)
  async getNumberOfCommentsPerPOI(
    @Arg("poiId", () => Number) poiId: number
  ): Promise<number> {
    try {
      const poiComment = await dataSource.manager.find(Comment, {
        relations: { pointOfInterest: true },
        where: { pointOfInterest: { id: poiId } },
      });
      return poiComment.length;
    } catch (err) {
      console.log(err);
      throw new Error("Could not retreive number of comments for this poi");
    }
  }

  @Mutation(() => Comment)
  async commentPOI(
    @Arg("poiId", () => Number) poiId: number,
    @Arg("userId", () => Number) userId: number,
    @Arg("comment") commentInput: string,
    @Arg("rate") rateInput: number
  ): Promise<Comment | ApolloError> {
    try {
      const poi = await dataSource.manager.findOne(PointOfInterest, {
        where: { id: poiId },
      });
      const user = await dataSource.manager.findOne(User, {
        where: { id: userId },
      });

      if (poi === null) {
        throw new ApolloError(`PointID of interest not found`);
      }

      if (user === null) {
        throw new ApolloError(`UserID not found`);
      }

      let comment = await dataSource.manager.findOne(Comment, {
        where: {
          user: { id: user.id },
          pointOfInterest: { id: poi.id },
        },
      });

      if (comment !== null) {
        comment.text = commentInput;
        comment.rate = rateInput;
        comment.updateDate = new Date();
      } else {
        comment = new Comment();
        comment.text = commentInput;
        comment.rate = rateInput;
        comment.user = user;
        comment.pointOfInterest = poi;
        comment.createDate = new Date();
      }
      const savedComment = await dataSource.manager.save(Comment, comment);
      return savedComment;
    } catch (error: any) {
      throw new ApolloError(error.message);
    }
  }

  /*   @Authorized() */
  @Mutation(() => String)
  async deleteCommentPOI(
    @Arg("userId", () => Number) userId: number,
    @Arg("commentId", () => Number) commentId: number
  ): Promise<string | ApolloError> {
    try {
      const commentFromDB = await dataSource.manager.findOneOrFail(Comment, {
        where: { id: commentId },
        relations: {
          user: true,
        },
      });

      if (commentFromDB === undefined) {
        throw new Error("Aucun commentaire trouvé à cet id !");
      }

      if (commentFromDB.user.id !== userId) {
        throw new Error("Vous n'êtes pas autorisé à supprimer ce commentaire");
      }
      const commentToDelete = await dataSource
        .getRepository(Comment)
        .delete({ id: commentId });

      if (commentToDelete.affected === 0) {
        throw new Error("Impossible de supprimer ce commentaire");
      }

      return "Commentaire supprimé";
    } catch (error: any) {
      throw new ApolloError(error.message);
    }
  }
}
