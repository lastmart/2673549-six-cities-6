import MainOfferInformation from './MainOfferInformation';
import {City} from './City';

export type Offer = {
  city: City;
  insideList: string[];
} & MainOfferInformation;
