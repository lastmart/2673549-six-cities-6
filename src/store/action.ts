import { createAction } from '@reduxjs/toolkit';
import { City } from 'types/offer-types/сity';
import { Offers } from 'types/offer-types/offer';
import { AuthorizationStatus } from '@constants';
import { UserData } from 'types/auth-types/user-data';
import { DetailedOffer } from 'types/offer-types/detailed-offer';
import { Reviews } from 'types/offer-types/review';

export const setCity = createAction<{ city: City }>('main/changeCity');
export const loadOffers = createAction<Offers>('main/loadOffers');
export const selectOffer = createAction<DetailedOffer | null>('offer/selectOffer');
export const loadNearbyOffers = createAction<Offers>('offer/loadNearbyOffers');
export const loadOfferReviews = createAction<Reviews>('offer/loadOfferReviews');
export const appendOfferReviews = createAction<Reviews>('offer/loadOfferReviews');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const setNearbyOffersDataLoadingStatus = createAction<boolean>('data/setNearbyOffersDataLoadingStatus');
export const setReviewsDataLoadingStatus = createAction<boolean>('data/setReviewsDataLoadingStatus');
export const setReviewDataPostingStatus = createAction<boolean>('data/setReviewDataPostingStatus');

export const setError = createAction<string | null>('main/setError');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setUserData = createAction<UserData | null>('user/setUserData');
