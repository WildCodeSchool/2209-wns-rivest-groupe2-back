import { Comment } from "../entities/comment";
import { Favorite } from "../entities/favorite";

export function averageRate(comments: Comment[]): number | null {
  if (comments === null || comments === undefined || comments.length === 0) {
    return null;
  }

  const sum = comments.reduce(
    (acc: number, comment: Comment) => acc + comment.rate,
    0
  );
  const average = sum / comments.length;

  return Number(average.toFixed(1));
}

export function getUserComment(
  comments: Comment[],
  userId: number
): Comment | undefined {
  return comments.find((comment) => comment.user.id === userId);
}

export function getUserFavorite(
  favorites: Favorite[],
  userId: number
): Favorite | undefined {
  return favorites.find((favorite) => favorite.user.id === userId);
}
