import StayDuration from 'types/StayDuration.ts';
import HouseType from 'types/HouseType.ts';
import {Offer} from 'types/offerTypes/Offer.ts';

export const offers: Offer[] = [
  {
    id: '1',
    isPremium: true,
    image: 'markup/img/apartment-01.jpg',
    price: 120,
    stayDuration: StayDuration.Night,
    isBookmarked: false,
    rating: 80,
    title: 'Beautiful & luxurious apartment at great location',
    features: {
      houseType: HouseType.Apartment,
      bedroomsCount: 3,
      maxAdultsCount: 4
    },
    city: {
      name: "Amsterdam"
    },
    insideList: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge'
    ]
  },
  {
    id: '2',
    isPremium: false,
    image: 'markup/img/room.jpg',
    price: 80,
    stayDuration: StayDuration.Night,
    isBookmarked: true,
    rating: 80,
    title: 'Wood and stone place',
    features: {
      houseType: HouseType.Apartment,
      bedroomsCount: 1,
      maxAdultsCount: 2
    },
    city: {
      name: "Amsterdam"
    },
    insideList: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge'
    ]
  },
  {
    id: '3',
    isPremium: false,
    image: 'markup/img/apartment-02.jpg',
    price: 132,
    stayDuration: StayDuration.Night,
    isBookmarked: false,
    rating: 80,
    title: 'Canal View Prinsengracht',
    features: {
      houseType: HouseType.Apartment,
      bedroomsCount: 1,
      maxAdultsCount: 2
    },
    city: {
      name: "Amsterdam"
    },
    insideList: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge'
    ]
  },
  {
    id: '4',
    isPremium: true,
    image: 'markup/img/apartment-03.jpg',
    price: 180,
    stayDuration: StayDuration.Night,
    isBookmarked: true,
    rating: 100,
    title: 'Nice, cozy, warm big bed apartment',
    features: {
      houseType: HouseType.Apartment,
      bedroomsCount: 1,
      maxAdultsCount: 2
    },
    city: {
      name: "Amsterdam"
    },
    insideList: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge'
    ]
  },
  {
    id: '5',
    isPremium: false,
    image: 'markup/img/apartment-small-04.jpg',
    price: 180,
    stayDuration: StayDuration.Night,
    isBookmarked: true,
    rating: 100,
    title: 'White castle',
    features: {
      houseType: HouseType.Apartment,
      bedroomsCount: 1,
      maxAdultsCount: 2
    },
    city: {
      name: "Cologne"
    },
    insideList: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge'
    ]
  }
];
