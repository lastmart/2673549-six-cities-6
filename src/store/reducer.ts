import { createReducer } from '@reduxjs/toolkit';
import {
  setCity,
  setError,
  loadOffers,
  setOffersDataLoadingStatus,
  setNearbyOffersDataLoadingStatus,
  setReviewsDataLoadingStatus,
  setReviewDataPostingStatus,
  requireAuthorization,
  setUserData,
  selectOffer,
  loadNearbyOffers,
  loadOfferReviews,
} from 'store/action';
import { Offers } from 'types/offer-types/offer';
import { City } from 'types/offer-types/сity';
import { UserData } from 'types/auth-types/user-data';
import { DetailedOffer } from 'types/offer-types/detailed-offer';
import { AuthorizationStatus, DefaultCity } from '@constants';
import { Reviews } from 'types/offer-types/review';

interface State {
  city: City;
  offers: Offers;
  selectedOffer: DetailedOffer | null;
  nearbyOffers: Offers;
  reviews: Reviews;
  isOffersDataLoading: boolean;
  isNearbyOffersDataLoading: boolean;
  isReviewsDataLoading: boolean;
  isReviewDataPosting: boolean;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  error: string | null;
}

const initialState: State = {
  city: DefaultCity,
  offers: [],
  selectedOffer: null,
  nearbyOffers: [],
  reviews: [],
  isOffersDataLoading: false,
  isNearbyOffersDataLoading: false,
  isReviewsDataLoading: false,
  isReviewDataPosting: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(selectOffer, (state, action) => {
      state.selectedOffer = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadOfferReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setNearbyOffersDataLoadingStatus, (state, action) => {
      state.isNearbyOffersDataLoading = action.payload;
    })
    .addCase(setReviewsDataLoadingStatus, (state, action) => {
      state.isReviewsDataLoading = action.payload;
    })
    .addCase(setReviewDataPostingStatus, (state, action) => {
      state.isReviewDataPosting = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;

      if (action.payload === AuthorizationStatus.NoAuth) {
        state.userData = null;
      }
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export default reducer;
