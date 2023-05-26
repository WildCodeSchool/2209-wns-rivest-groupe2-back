import { Comment } from "../entities/comment";
import { Favorite } from "../entities/favorite";
import { Rate } from "../entities/rate";

export function averageRate(rates: Rate[]): number | null {
  if (rates === null || rates === undefined || rates.length === 0) {
    return null;
  }

  const sum = rates.reduce((acc: number, rate: Rate) => acc + rate.rate, 0);
  const average = sum / rates.length;

  return Number(average.toFixed(1));
}

export function getUserRate(rates: Rate[], userId: number): Rate | undefined {
  return rates.find(rate => rate.user.id === userId);
}

export function getUserComment(comments: Comment[], userId: number): Comment | undefined {
  return comments.find(comment => comment.user.id === userId);
}

export function getUserFavorite(favorites: Favorite[], userId: number): Favorite | undefined {
  return favorites.find(favorite => favorite.user.id === userId);
}
