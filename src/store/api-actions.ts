import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from 'types/state';
import { OfferId, Offers } from 'types/offer-types/offer';
import { Review, Reviews } from 'types/offer-types/review';
import { DetailedOffer } from 'types/offer-types/detailed-offer';
import { AuthData } from 'types/auth-types/auth-data';
import { UserData } from 'types/auth-types/user-data';
import {
  loadNearbyOffers,
  loadOfferReviews,
  loadOffers,
  redirectToRoute,
  requireAuthorization,
  selectOffer,
  setError,
  setNearbyOffersDataLoadingStatus,
  setOffersDataLoadingStatus,
  setReviewDataPostingStatus,
  setReviewsDataLoadingStatus,
  setUserData
} from './action';
import { store } from './';
import { dropToken, saveToken } from 'services/token';
import ApiRouteBuilder from 'services/api-route-builder';
import { AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '@constants';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<Offers>(ApiRouteBuilder.Offers());
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const fetchOfferAction = createAsyncThunk<void, OfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchDetailedOffer',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    try {
      const { data } = await api.get<DetailedOffer>(ApiRouteBuilder.Offer(offerId));
      dispatch(selectOffer(data));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    } finally {
      dispatch(setOffersDataLoadingStatus(false));
    }
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, OfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setNearbyOffersDataLoadingStatus(true));
    const { data } = await api.get<Offers>(ApiRouteBuilder.OffersNearby(offerId));
    dispatch(setNearbyOffersDataLoadingStatus(false));
    dispatch(loadNearbyOffers(data));
  },
);

export const fetchOfferReviewsAction = createAsyncThunk<void, OfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferReviews',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setReviewsDataLoadingStatus(true));
    const { data } = await api.get<Reviews>(ApiRouteBuilder.Reviews(offerId));
    dispatch(setReviewsDataLoadingStatus(false));
    dispatch(loadOfferReviews(data));
  },
);

export const sendOfferReviewAction = createAsyncThunk<
  void,
  {
    offerId: string;
    rating: number;
    comment: string;
  }, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/sendOfferReview',
    async ({ offerId, rating, comment }, { dispatch, extra: api }) => {
      dispatch(setReviewDataPostingStatus(true));
      await api.post<Review>(ApiRouteBuilder.SendReview(offerId), { rating, comment });
      dispatch(setReviewDataPostingStatus(false));
    },
  );

export const clearErrorAction = createAsyncThunk(
  'main/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserData>(ApiRouteBuilder.Login());
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserData(data));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(ApiRouteBuilder.Login(), { email, password });
    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserData(data));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(ApiRouteBuilder.Logout());
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
