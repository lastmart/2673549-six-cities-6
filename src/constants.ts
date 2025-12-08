import { City } from 'types/offer-types/сity';

export const MAX_RATING: number = 5;
export const MAX_COMMENT_SIZE: number = 2000;
export const MAX_REVIEWS_COUNT_PER_PAGE: number = 10;
export const MAX_NEAR_PLACE_COUNT: number = 3;

export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_CURRENT = '/img/pin-active.svg';

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

export enum CityNames {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export const CITIES: City[] = [
  {
    name: CityNames.Paris,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 10
    },
  },
  {
    name: CityNames.Cologne,
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 10
    },
  },
  {
    name: CityNames.Brussels,
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 10
    },
  },
  {
    name: CityNames.Amsterdam,
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 10
    },
  },
  {
    name: CityNames.Hamburg,
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 10
    }
  },
  {
    name: CityNames.Dusseldorf,
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 10
    }
  },
];

export enum PlaceCardFeature {
  FavouritesCard = 'FavouritesCard'
}
