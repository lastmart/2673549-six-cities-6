import { Offer as Offer } from './offer';
import { User } from 'types/user';

export type DetailedOffer = Offer & {
  bedrooms: number;
  description: string;
  host: User;
  images: string[];
  maxAdults: number;
};
