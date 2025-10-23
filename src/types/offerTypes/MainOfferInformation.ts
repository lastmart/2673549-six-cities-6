import StayDuration from 'types/StayDuration';
import OfferFeatures from './OfferFeatures';

type MainOfferInformation = {
  id: string,
  isPremium: boolean;
  image: string;
  price: number;
  stayDuration: StayDuration;
  isBookmarked: boolean;
  rating: number;
  title: string;
  features: OfferFeatures;
}

export default MainOfferInformation;
