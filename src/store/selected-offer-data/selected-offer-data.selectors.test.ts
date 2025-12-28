import { NameSpace } from 'store/constants';
import {
  getSelectedOffer,
  getNearbyOffers,
  getReviews,
  getOfferDataLoadingStatus,
  getNearbyOffersLoadingStatus,
  getReviewLoadingStatus,
  getReviewSendingStatus,
} from './selectors';
import { makeFakeDetailedOffer, makeFakeOffers, makeFakeReviews } from 'lib/test-utils/mocks';
import { getRandomNumber } from 'lib/number-utils';

describe('SelectedOfferData selectors', () => {
  const fakeSelectedOffer = makeFakeDetailedOffer();

  const state = {
    [NameSpace.SelectedOffer]: {
      selectedOffer: fakeSelectedOffer,
      nearbyOffers: makeFakeOffers(getRandomNumber(1, 10)),
      reviews: makeFakeReviews(fakeSelectedOffer.id, getRandomNumber(0, 20)),
      isOfferDataLoading: false,
      isNearbyOffersDataLoading: false,
      isReviewsDataLoading: false,
      isReviewDataSending: false,
    }
  };

  it('should return selected offer from state', () => {
    const { selectedOffer } = state[NameSpace.SelectedOffer];
    const result = getSelectedOffer(state);
    expect(result).toEqual(selectedOffer);
  });

  it('should return nearby offers from state', () => {
    const { nearbyOffers } = state[NameSpace.SelectedOffer];
    const result = getNearbyOffers(state);
    expect(result).toEqual(nearbyOffers);
  });

  it('should return selected offer reviews from state', () => {
    const { reviews } = state[NameSpace.SelectedOffer];
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });

  it('should return selected offer loading status from state', () => {
    const { isOfferDataLoading } = state[NameSpace.SelectedOffer];
    const result = getOfferDataLoadingStatus(state);
    expect(result).toBe(isOfferDataLoading);
  });

  it('should return nearby offers loading status from state', () => {
    const { isNearbyOffersDataLoading } = state[NameSpace.SelectedOffer];
    const result = getNearbyOffersLoadingStatus(state);
    expect(result).toBe(isNearbyOffersDataLoading);
  });

  it('should return selected offer reviews loading status from state', () => {
    const { isReviewsDataLoading } = state[NameSpace.SelectedOffer];
    const result = getReviewLoadingStatus(state);
    expect(result).toBe(isReviewsDataLoading);
  });

  it('should return selected offer review sending status from state', () => {
    const { isReviewDataSending } = state[NameSpace.SelectedOffer];
    const result = getReviewSendingStatus(state);
    expect(result).toBe(isReviewDataSending);
  });
});
