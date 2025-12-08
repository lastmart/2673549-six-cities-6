import { createAction } from '@reduxjs/toolkit';
import { City } from 'types/offer-types/сity';
import { Offer } from 'types/offer-types/offer';

export const setCity = createAction<{ city: City }>('main/changeCity');
export const setOffers = createAction<{ offers: Offer[] }>('main/loadOffers');
