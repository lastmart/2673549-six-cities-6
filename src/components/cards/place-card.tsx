import { Link } from 'react-router-dom';
import { Offer } from 'types/offer-types/offer';
import { BookmarkButton } from './bookmark-button';
import { getPercentage } from 'lib/number-utils';
import { useFavoriteOfferUpdate } from 'hooks/use-favorite-offer-update';
import { AppRoute, MAX_RATING, PlaceCardFeature } from '@constants';
import React from 'react';

function getPlaceCardInfoClassName(feature?: PlaceCardFeature): string {
  switch (feature) {
    case PlaceCardFeature.FavoritesCard:
      return 'favorites__card-info place-card__info';
    default:
      return 'place-card__info';
  }
}

type PlaceCardProps = {
  offer: Offer;
  blockName: 'cities' | 'near-places' | 'favorites';
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
  onMouseLeave,
}: PlaceCardProps
): JSX.Element {
  const onFavoriteClick = useFavoriteOfferUpdate();

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
          <BookmarkButton
            blockName='place-card'
            isActive={offer.isFavorite}
            width={18}
            height={19}
            onClick={() => onFavoriteClick(offer.id, !offer.isFavorite)}
          />
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

export default React.memo(PlaceCard);
