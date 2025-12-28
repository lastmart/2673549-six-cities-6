import { Offers } from 'types/offer-types/offer';
import { useAppSelector } from '..';
import { getFavoriteOffers } from 'store/favorite-offers-data/selectors';
import { useMemo } from 'react';

function getOfferGroupsByCity(favoriteOffers: Offers): Record<string, Offers> {
  return favoriteOffers.reduce<Record<string, Offers>>((acc, offer) => {
    const cityName = offer.city.name;

    if (!acc[cityName]) {
      acc[cityName] = [];
    }

    acc[cityName].push(offer);
    return acc;
  }, {});
}

export function useFavoriteOffersByCity(): Record<string, Offers> {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  return useMemo(
    () => getOfferGroupsByCity(favoriteOffers),
    [favoriteOffers]
  );
}
