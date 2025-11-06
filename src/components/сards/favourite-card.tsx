import { Link } from 'react-router-dom';
import { CardPremiumPart } from './card-premium-part';
import { CardFavouritePart } from './card-favourite-part';
import { CardRatingPart } from './card-rating-part';
import { Offer } from 'types/offer-types/offer';
import { AppRoute } from '@constants';

type FavouriteCardProps = {
  offer: Offer;
};

export function FavouriteCard({ offer }: FavouriteCardProps) {
  return (
    <article className="favorites__card place-card">
      <CardPremiumPart isPremium={offer.isPremium} />
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="150" height="110"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <CardFavouritePart isFavourite={offer.isFavourite} />
        </div>
        <CardRatingPart rating={offer.rating} />
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
