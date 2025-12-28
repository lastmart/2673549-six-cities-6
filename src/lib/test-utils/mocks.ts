import { image, internet } from 'faker';
import { DetailedOffer } from 'types/offer-types/detailed-offer';
import { Offer, OfferId, Offers } from 'types/offer-types/offer';
import { Review, Reviews } from 'types/offer-types/review';
import { UserData } from 'types/auth-types/user-data';
import { AuthData } from 'types/auth-types/auth-data';
import { User } from 'types/user';
import { City } from 'types/city';
import { getRandomCityName, getRandomLocation } from './city-utils';
import { getRandomGoods } from './offer-utils';
import { capitalize, getRandomString } from 'lib/string-utils';
import { getRandomNumber } from 'lib/number-utils';
import { getRandomBoolean } from 'lib/boolean-utils';
import { getRandomArray } from 'lib/array-utils';
import { getRandomDateISO } from 'lib/date-utils';
import { MAX_COMMENT_SIZE, MAX_RATING, MIN_COMMENT_SIZE } from '@constants';

export const makeFakeCity = (): City => ({
  name: getRandomCityName(),
  location: getRandomLocation()
} as City);

export const makeFakeUser = (): User => ({
  avatarUrl: image.avatar(),
  isPro: getRandomBoolean(),
  name: getRandomString(20)
});

export const makeFakeOffer = (): Offer => ({
  id: getRandomString(10),
  city: makeFakeCity(),
  goods: getRandomGoods(getRandomNumber(0, 10)),
  isFavorite: getRandomBoolean(),
  isPremium: getRandomBoolean(),
  location: getRandomLocation(),
  previewImage: image.imageUrl(),
  price: getRandomNumber(1, 10000),
  rating: getRandomNumber(1, MAX_RATING),
  title: getRandomString(50),
  type: capitalize(getRandomString(10)),
});

export const makeFakeFavoriteOffer = (isFavorite: boolean = true): Offer => ({
  ...makeFakeOffer(),
  isFavorite: isFavorite,
});

export const makeFakeDetailedOffer = (): DetailedOffer => ({
  ...makeFakeOffer(),
  bedrooms: getRandomNumber(1, 10),
  description: getRandomString(120),
  host: makeFakeUser(),
  images: getRandomArray(6, () => image.imageUrl()),
  maxAdults: getRandomNumber(1, 10),
});

export const makeFakeOffers = (count: number): Offers => getRandomArray(count, () => makeFakeOffer());

export const makeFakeAuthToken = (): string => getRandomString(30);

export const makeFakeUserData = (): UserData => ({
  name: getRandomString(15),
  avatarUrl: image.avatar(),
  isPro: getRandomBoolean(),
  email: internet.email(),
  token: makeFakeAuthToken(),
});

export const makeFakeAuthData = (): AuthData => ({
  login: internet.email(),
  password: internet.password()
});

export const makeFakeFavoriteOffers = (count: number): Offers => getRandomArray(count, () => makeFakeFavoriteOffer());

export const makeFakeReview = (offerId: OfferId): Review => ({
  id: getRandomString(20),
  offerId: offerId,
  user: makeFakeUserData(),
  date: getRandomDateISO(),
  rating: getRandomNumber(1, MAX_RATING),
  comment: getRandomString(getRandomNumber(MIN_COMMENT_SIZE, MAX_COMMENT_SIZE)),
});

export const makeFakeReviews = (offerId: OfferId, count: number): Reviews => getRandomArray(count, () => makeFakeReview(offerId));
