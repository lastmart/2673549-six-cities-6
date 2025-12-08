import { Offer } from 'types/offer-types/offer';
import { SortDirection } from 'types/sort-direction';

const sortDirectionToComparer = new Map<SortDirection, (a: Offer, b: Offer) => number>([
  ['Popular', () => 0],
  ['PriceAscending', (a: Offer, b: Offer) => a.price - b.price],
  ['PriceDescending', (a: Offer, b: Offer) => b.price - a.price],
  ['TopRated', (a: Offer, b: Offer) => b.rating - a.rating]
]);

export function getSorted(offers: Offer[], sortDirection: SortDirection): Offer[] {
  return [...offers].sort(sortDirectionToComparer.get(sortDirection));
}
