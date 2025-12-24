import { Link } from 'react-router-dom';
import { Offers } from 'types/offer-types/offer';
import PlaceCard from 'components/cards/place-card';
import { AppRoute, PlaceCardFeature } from '@constants';

type FavoriteLocationItemsProps = {
  city: string;
  offers: Offers;
}

export function FavoriteLocationItems({ city, offers }: FavoriteLocationItemsProps) {
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
          <PlaceCard
            key={offer.id}
            offer={offer}
            blockName='favorites'
            feature={PlaceCardFeature.FavoritesCard}
            imageWidth={150}
            imageHeight={110}
          />
        ))}
      </div>
    </li>
  );
}
