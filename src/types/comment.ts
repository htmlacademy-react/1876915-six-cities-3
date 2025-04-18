import { User } from './user';

export type PlaceComment = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

export type CreatePlaceComment = {
  comment: string;
  rating: number;
}
