import { NameSpace } from 'store/constants';
import { State } from 'types/state';
import { Offers } from 'types/offer-types/offer';

export const getFavoriteOffers = (state: State): Offers => state[NameSpace.FavoriteOffers].offers;

export const getFavoriteOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.FavoriteOffers].isOffersDataLoading;

export const getFavoriteOfferUpdatingStatus = (state: State): boolean => state[NameSpace.FavoriteOffers].isOfferStatusUpdating;
