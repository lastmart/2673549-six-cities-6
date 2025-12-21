import { City } from './сity';
import { Location } from './location';

export type Offers = Offer[];

export type OfferId = Offer['id'];

export type Offer = {
    id: string;
    city: City;
    goods: string[];
    isFavourite: boolean;
    isPremium: boolean;
    location: Location;
    previewImage: string;
    price: number;
    rating: number;
    title: string;
    type: string;
}

