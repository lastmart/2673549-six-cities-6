import { UserData } from 'types/auth-types/user-data';

export type Reviews = Review[];

export type Review = {
  id: string;
  offerId: string;
  date: string;
  user: UserData;
  rating: number;
  comment: string;
}
