import {Link} from 'react-router-dom';
import FavouriteCard from './сards/FavouriteCard';
import {Offer} from 'types/offerTypes/Offer';
import {AppRoute} from "@constants";

type FavouriteLocationItemsProps = {
  city: string;
  offers: Offer[];
}

function FavouriteLocationItems({city, offers}: FavouriteLocationItemsProps) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Main}>
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <FavouriteCard offer={offer}/>
        ))}
      </div>
    </li>
  )
}

export default FavouriteLocationItems;
