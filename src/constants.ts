export const PlacesCount: number = 8;

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favourites = '/favourites',
  Offer = '/offer'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const PAGE_CONFIG = {
  BASE_TITLE: 'Шесть городов',
  DEFAULT_TITLE: 'Шесть городов' as string
} as const;
