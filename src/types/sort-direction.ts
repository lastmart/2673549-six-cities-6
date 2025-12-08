export const SortDirections = [
  'Popular',
  'PriceAscending',
  'PriceDescending',
  'TopRated',
] as const;

export type SortDirection = (typeof SortDirections)[number];
