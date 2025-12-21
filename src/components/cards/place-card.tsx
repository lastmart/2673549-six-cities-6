import { Link } from 'react-router-dom';
import { CardFavouritePart } from './card-favourite-part';
import { AppRoute, MAX_RATING, PlaceCardFeature } from '@constants';
import { Offer } from 'types/offer-types/offer';
import { getPercentage } from 'lib/number-utils';

function getPlaceCardInfoClassName(feature?: PlaceCardFeature): string {
  switch (feature) {
    case PlaceCardFeature.FavouritesCard:
      return 'favorites__card-info place-card__info';
    default:
      return 'place-card__info';
  }
}

type PlaceCardProps = {
  offer: Offer;
  blockName: string;
  feature?: PlaceCardFeature;
  imageWidth?: number;
  imageHeight?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function PlaceCard({
  offer,
  blockName,
  feature,
  imageWidth,
  imageHeight,
  onMouseEnter,
  onMouseLeave }: PlaceCardProps
): JSX.Element {
  return (
    <article className={`${blockName}__card place-card`}
      {...(onMouseEnter && { onMouseEnter: onMouseEnter })}
      {...(onMouseLeave && { onMouseLeave: onMouseLeave })}
    >
      {
        offer.isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
      }
      <div className={`${blockName}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width={imageWidth} height={imageHeight} alt="Place image" />
        </Link>
      </div>
      <div className={getPlaceCardInfoClassName(feature)}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <CardFavouritePart isFavourite={offer.isFavourite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${getPercentage(offer.rating, MAX_RATING)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </ article>
  );
}
