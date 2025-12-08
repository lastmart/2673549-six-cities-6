import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffers } from 'store/action';
import { Offer } from 'types/offer-types/offer';
import { City } from 'types/offer-types/сity';
import { offers } from 'mocks/offers';
import { CITIES, CityNames } from '@constants';

interface State {
  city: City;
  offers: Offer[];
}

const initialState: State = {
  city: CITIES.find((city) => city.name === CityNames.Paris)!,
  offers: offers.filter((offer) => offer.city.name === CityNames.Paris)
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload.offers;
    });
});

export default reducer;
