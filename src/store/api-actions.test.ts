import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import thunk from 'redux-thunk';
import { AuthData } from 'types/auth-types/auth-data';
import { State } from 'types/state';
import {
  checkAuthAction,
  clearErrorAction,
  fetchFavoriteOffersAction,
  fetchNearbyOffersAction,
  fetchOfferAction,
  fetchOfferReviewsAction,
  fetchOffersAction,
  loginAction,
  logoutAction,
  sendOfferReviewAction,
  updateFavoriteOfferStatus
} from 'store/api-actions';
import { createAPI } from 'services/api';
import * as tokenStorage from 'services/token';
import { ApiRouteBuilder } from 'services/api-route-builder';
import { AppThunkDispatch, extractActionsTypes } from 'lib/test-utils/store-utils';
import {
  makeFakeAuthData,
  makeFakeDetailedOffer,
  makeFakeFavoriteOffers,
  makeFakeOffers,
  makeFakeReview,
  makeFakeReviews
} from 'lib/test-utils/mocks';
import { TIMEOUT_SHOW_ERROR } from '@constants';
import { setError } from './service-data/service-data';
import { StatusCodes } from 'http-status-codes';
import { redirectToRoute } from './middlewares/action';

vi.mock('services/process-error-handle', () => ({
  processErrorHandle: vi.fn(),
}));

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ OFFERS: { offers: [] } });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(ApiRouteBuilder.Login()).reply(StatusCodes.OK);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRouteBuilder.Login()).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "fetchOffersAction.pending", "fetchFavoriteOffersAction.pending", "loginAction.fulfilled" when server response 200', async () => {
      const fakeUser: AuthData = makeFakeAuthData();
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(ApiRouteBuilder.Login()).reply(StatusCodes.OK, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        fetchOffersAction.pending.type,
        fetchFavoriteOffersAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = makeFakeAuthData();
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(ApiRouteBuilder.Login()).reply(StatusCodes.OK, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toHaveBeenCalledTimes(1);
      expect(mockSaveToken).toHaveBeenCalledWith(fakeServerReplay.token);
    });

    it('should dispatch "loginAction.pending", "loginAction.rejected" when server response 400', async () => {
      const fakeError = {
        errorType: 'VALIDATION_ERROR',
        message: 'Validation error: /six-cities/login',
      };
      const fakeUser: AuthData = makeFakeAuthData();
      mockAxiosAdapter.onPost(ApiRouteBuilder.Login()).reply(StatusCodes.BAD_REQUEST, fakeError);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type,
      ]);
    });

    it('should not call "saveToken" when not receive token', async () => {
      const fakeError = {
        errorType: 'VALIDATION_ERROR',
        message: 'Validation error: /six-cities/login',
      };
      const fakeUser: AuthData = makeFakeAuthData();
      mockAxiosAdapter.onPost(ApiRouteBuilder.Login()).reply(StatusCodes.BAD_REQUEST, fakeError);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toHaveBeenCalledTimes(0);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(ApiRouteBuilder.Logout()).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(ApiRouteBuilder.Logout()).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toHaveBeenCalledTimes(1);
    });
  });

  describe('clearError', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    it('should dispatch "clearErrorAction.pending", "clearErrorAction.fulfilled", "SERVICE/setError" after show error timeout', async () => {
      await store.dispatch(clearErrorAction());
      vi.advanceTimersByTime(TIMEOUT_SHOW_ERROR);

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        clearErrorAction.pending.type,
        clearErrorAction.fulfilled.type,
        setError.type,
      ]);
    });

    afterEach(() => {
      vi.useRealTimers();
    });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled", when server response 200', async () => {
      const mockOffers = makeFakeOffers(100);
      mockAxiosAdapter.onGet(ApiRouteBuilder.Offers()).reply(StatusCodes.OK, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload).toEqual(mockOffers);
    });
  });

  describe('fetchOfferAction', () => {
    it('should dispatch "fetchOfferAction.pending", "fetchOfferAction.fulfilled" when server response 200', async () => {
      const mockOffer = makeFakeDetailedOffer();
      mockAxiosAdapter.onGet(ApiRouteBuilder.Offer(mockOffer.id)).reply(StatusCodes.OK, mockOffer);

      await store.dispatch(fetchOfferAction(mockOffer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);

      expect(fetchOfferActionFulfilled.payload).toEqual(mockOffer);
    });

    it('should dispatch "fetchOfferAction.pending", "redirectToRoute", "fetchOfferAction.fulfilled" when server response 404', async () => {
      const fakeOfferId = '6af6f711-c28d-4121-82cd-e0b462a27f00';
      const fakeError = {
        errorType: 'COMMON_ERROR',
        message: 'Offer with id 6af6f711-c28d-4121-82cd-e0b462a27f00 not found.'
      };
      mockAxiosAdapter.onGet(ApiRouteBuilder.Offer(fakeOfferId)).reply(StatusCodes.NOT_FOUND, fakeError);

      await store.dispatch(fetchOfferAction(fakeOfferId));

      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        redirectToRoute.type,
        fetchOfferAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchNearbyOffersAction', () => {
    it('should dispatch "fetchNearbyOffersAction.pending", "fetchNearbyOffersAction.fulfilled" when server response 200', async () => {
      const fakeOfferId = '6af6f711-c28d-4121-82cd-e0b462a27f00';
      const fakeNearbyOffers = makeFakeOffers(10);
      mockAxiosAdapter.onGet(ApiRouteBuilder.OffersNearby(fakeOfferId)).reply(StatusCodes.OK, fakeNearbyOffers);

      await store.dispatch(fetchNearbyOffersAction(fakeOfferId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchNearbyOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearbyOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchNearbyOffersAction.pending.type,
        fetchNearbyOffersAction.fulfilled.type,
      ]);

      expect(fetchNearbyOffersActionFulfilled.payload).toEqual(fakeNearbyOffers);
    });

    it('should dispatch "fetchNearbyOffersAction.pending", "fetchNearbyOffersAction.rejected" when server response 404', async () => {
      const fakeOfferId = '6af6f711-c28d-4121-82cd-e0b462a27f00';
      const fakeError = {
        errorType: 'COMMON_ERROR',
        message: 'Offer with id 6af6f711-c28d-4121-82cd-e0b462a27f00 not found.'
      };
      mockAxiosAdapter.onGet(ApiRouteBuilder.OffersNearby(fakeOfferId)).reply(StatusCodes.NOT_FOUND, fakeError);

      await store.dispatch(fetchNearbyOffersAction(fakeOfferId));

      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        fetchNearbyOffersAction.pending.type,
        fetchNearbyOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchOfferReviewsAction', () => {
    it('should dispatch "fetchOfferReviewsAction.pending", "fetchOfferReviewsAction.fulfilled" when server response 200', async () => {
      const fakeOfferId = '6af6f711-c28d-4121-82cd-e0b462a27f00';
      const fakeReviews = makeFakeReviews(fakeOfferId, 17);
      mockAxiosAdapter.onGet(ApiRouteBuilder.Reviews(fakeOfferId)).reply(StatusCodes.OK, fakeReviews);

      await store.dispatch(fetchOfferReviewsAction(fakeOfferId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferReviewsAction.pending.type,
        fetchOfferReviewsAction.fulfilled.type,
      ]);

      expect(fetchOfferReviewsActionFulfilled.payload).toEqual(fakeReviews);
    });

    it('should dispatch "fetchOfferReviewsAction.pending", "fetchOfferReviewsAction.rejected" when server response 404', async () => {
      const fakeOfferId = '6af6f711-c28d-4121-82cd-e0b462a27f00';
      const fakeError = {
        errorType: 'COMMON_ERROR',
        message: 'Offer with id 6af6f711-c28d-4121-82cd-e0b462a27f00 not found.'
      };
      mockAxiosAdapter.onGet(ApiRouteBuilder.Reviews(fakeOfferId)).reply(StatusCodes.NOT_FOUND, fakeError);

      await store.dispatch(fetchOfferReviewsAction(fakeOfferId));

      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        fetchOfferReviewsAction.pending.type,
        fetchOfferReviewsAction.rejected.type,
      ]);
    });
  });

  describe('sendOfferReviewAction', () => {
    it('should dispatch "sendOfferReviewAction.pending", "sendOfferReviewAction.fulfilled" when server response 200', async () => {
      const fakeOfferId = '6af6f711-c28d-4121-82cd-e0b462a27f00';
      const fakeReview = makeFakeReview(fakeOfferId);
      mockAxiosAdapter.onPost(ApiRouteBuilder.SendReview(fakeOfferId)).reply(StatusCodes.OK, fakeReview);

      await store.dispatch(sendOfferReviewAction(fakeReview));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const sendOfferReviewActionFulfilled = emittedActions.at(1) as ReturnType<typeof sendOfferReviewAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        sendOfferReviewAction.pending.type,
        sendOfferReviewAction.fulfilled.type,
      ]);

      expect(sendOfferReviewActionFulfilled.payload).toEqual(fakeReview);
    });

    it('should dispatch "sendOfferReviewAction.pending", "sendOfferReviewAction.rejected" when server response 400', async () => {
      const fakeOfferId = '6af6f711-c28d-4121-82cd-e0b462a27f00';
      const fakeReview = makeFakeReview(fakeOfferId);
      const fakeError = {
        errorType: 'VALIDATION_ERROR',
        message: 'Validation error: /six-cities/comments/3254b559-0a4f-4c20-a514-0dc38173ea09',
        details: [
          {
            property: 'rating',
            value: 'a',
            messages: [
              'rating must be a number conforming to the specified constraints'
            ]
          }
        ]
      };
      mockAxiosAdapter.onPost(ApiRouteBuilder.Reviews(fakeOfferId)).reply(StatusCodes.BAD_REQUEST, fakeError);

      await store.dispatch(sendOfferReviewAction(fakeReview));

      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        sendOfferReviewAction.pending.type,
        sendOfferReviewAction.rejected.type,
      ]);
    });

    it('should dispatch "sendOfferReviewAction.pending", "sendOfferReviewAction.rejected" when server response 401', async () => {
      const fakeOfferId = '6af6f711-c28d-4121-82cd-e0b462a27f00';
      const fakeReview = makeFakeReview(fakeOfferId);
      const fakeError = {
        errorType: 'COMMON_ERROR',
        message: 'Access deny.'
      };
      mockAxiosAdapter.onPost(ApiRouteBuilder.Reviews(fakeOfferId)).reply(StatusCodes.UNAUTHORIZED, fakeError);

      await store.dispatch(sendOfferReviewAction(fakeReview));

      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        sendOfferReviewAction.pending.type,
        sendOfferReviewAction.rejected.type,
      ]);
    });

    it('should dispatch "sendOfferReviewAction.pending", "sendOfferReviewAction.rejected" when server response 404', async () => {
      const fakeOfferId = '6af6f711-c28d-4121-82cd-e0b462a27f00';
      const fakeReview = makeFakeReview(fakeOfferId);
      const fakeError = {
        errorType: 'COMMON_ERROR',
        message: 'Offer with id 6af6f711-c28d-4121-82cd-e0b462a27f00 not found.'
      };
      mockAxiosAdapter.onPost(ApiRouteBuilder.Reviews(fakeOfferId)).reply(StatusCodes.NOT_FOUND, fakeError);

      await store.dispatch(sendOfferReviewAction(fakeReview));

      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        sendOfferReviewAction.pending.type,
        sendOfferReviewAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavoriteOffersAction', () => {
    it('should dispatch "fetchFavoriteOffersAction.pending", "fetchFavoriteOffersAction.fulfilled" when server response 200', async () => {
      const fakeFavouriteOffers = makeFakeFavoriteOffers(17);
      mockAxiosAdapter.onGet(ApiRouteBuilder.FavoriteOffers()).reply(StatusCodes.OK, fakeFavouriteOffers);

      await store.dispatch(fetchFavoriteOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoriteOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoriteOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.fulfilled.type,
      ]);

      expect(fetchFavoriteOffersActionFulfilled.payload).toEqual(fakeFavouriteOffers);
    });

    it('should dispatch "fetchOfferAction.pending", "redirectToRoute", "fetchOfferAction.fulfilled" when server response 404', async () => {
      const fakeError = {
        errorType: 'COMMON_ERROR',
        message: 'Header Token is not correct.'
      };
      mockAxiosAdapter.onGet(ApiRouteBuilder.FavoriteOffers()).reply(StatusCodes.UNAUTHORIZED, fakeError);

      await store.dispatch(fetchFavoriteOffersAction());

      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.rejected.type,
      ]);
    });
  });

  describe('updateFavoriteOfferStatus', () => {
    it('should dispatch "updateFavoriteOfferStatus.pending", "updateFavoriteOfferStatus.fulfilled" when server response 200', async () => {
      const fakeOffer = makeFakeDetailedOffer();
      mockAxiosAdapter.onPost(ApiRouteBuilder.ChangeFavoriteOfferStatus(fakeOffer.id, fakeOffer.isFavorite)).reply(StatusCodes.OK, fakeOffer);

      await store.dispatch(updateFavoriteOfferStatus({ offerId: fakeOffer.id, setIsFavorite: fakeOffer.isFavorite }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const updateFavoriteOfferStatusFulfilled = emittedActions.at(1) as ReturnType<typeof updateFavoriteOfferStatus.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        updateFavoriteOfferStatus.pending.type,
        updateFavoriteOfferStatus.fulfilled.type,
      ]);

      expect(updateFavoriteOfferStatusFulfilled.payload).toEqual(fakeOffer);
    });

    it('should dispatch "updateFavoriteOfferStatus.pending", "updateFavoriteOfferStatus.fulfilled" when server response 201', async () => {
      const fakeOffer = makeFakeDetailedOffer();
      mockAxiosAdapter.onPost(ApiRouteBuilder.ChangeFavoriteOfferStatus(fakeOffer.id, fakeOffer.isFavorite)).reply(StatusCodes.CREATED, fakeOffer);

      await store.dispatch(updateFavoriteOfferStatus({ offerId: fakeOffer.id, setIsFavorite: fakeOffer.isFavorite }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const updateFavoriteOfferStatusFulfilled = emittedActions.at(1) as ReturnType<typeof updateFavoriteOfferStatus.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        updateFavoriteOfferStatus.pending.type,
        updateFavoriteOfferStatus.fulfilled.type,
      ]);

      expect(updateFavoriteOfferStatusFulfilled.payload).toEqual(fakeOffer);
    });

    it('should dispatch "updateFavoriteOfferStatus.pending", "updateFavoriteOfferStatus.rejected" when server response 400', async () => {
      const fakeOffer = makeFakeDetailedOffer();
      const fakeError = {
        errorType: 'COMMON_ERROR',
        message: 'Wrong status to add offer in favorite: 2.'
      };
      mockAxiosAdapter.onPost(ApiRouteBuilder.ChangeFavoriteOfferStatus(fakeOffer.id, fakeOffer.isFavorite)).reply(StatusCodes.BAD_REQUEST, fakeError);

      // In action interface not possible to specify incorrrect arguments, in the case valid arguments
      await store.dispatch(updateFavoriteOfferStatus({ offerId: fakeOffer.id, setIsFavorite: fakeOffer.isFavorite }));

      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        updateFavoriteOfferStatus.pending.type,
        updateFavoriteOfferStatus.rejected.type,
      ]);
    });

    it('should dispatch "updateFavoriteOfferStatus.pending", "updateFavoriteOfferStatus.rejected" when server response 401', async () => {
      const fakeOffer = makeFakeDetailedOffer();
      const fakeError = {
        errorType: 'COMMON_ERROR',
        message: 'Access deny.'
      };
      mockAxiosAdapter.onPost(ApiRouteBuilder.ChangeFavoriteOfferStatus(fakeOffer.id, fakeOffer.isFavorite)).reply(StatusCodes.BAD_REQUEST, fakeError);

      await store.dispatch(updateFavoriteOfferStatus({ offerId: fakeOffer.id, setIsFavorite: fakeOffer.isFavorite }));

      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        updateFavoriteOfferStatus.pending.type,
        updateFavoriteOfferStatus.rejected.type,
      ]);
    });

    it('should dispatch "sendOfferReviewAction.pending", "sendOfferReviewAction.rejected" when server response 404', async () => {
      const fakeOfferId = '6af6f711-c28d-4121-82cd-e0b462a27f00';
      const fakeError = {
        errorType: 'COMMON_ERROR',
        message: 'Offer with id 6af6f711-c28d-4121-82cd-e0b462a27f00 not found.'
      };
      mockAxiosAdapter.onPost(ApiRouteBuilder.ChangeFavoriteOfferStatus(fakeOfferId, true)).reply(StatusCodes.NOT_FOUND, fakeError);

      await store.dispatch(updateFavoriteOfferStatus({ offerId: fakeOfferId, setIsFavorite: true }));

      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        updateFavoriteOfferStatus.pending.type,
        updateFavoriteOfferStatus.rejected.type,
      ]);
    });
  });
});
