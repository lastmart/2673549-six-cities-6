import { Link } from 'react-router-dom';
import { Offer } from 'types/offer-types/offer';
import { BookmarkButton } from 'components/cards/bookmark-button/bookmark-button';
import { useFavoriteOfferUpdate } from 'hooks/use-favorite-offer-update/use-favorite-offer-update';
import { getPercentage } from 'lib/number-utils';
import { capitalize } from 'lib/string-utils';
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
    <article
      className={`${blockName}__card place-card`}
      {...(onMouseEnter && { onMouseEnter: onMouseEnter })}
      {...(onMouseLeave && { onMouseLeave: onMouseLeave })}
      data-testid="place-card"
    >
      {
        offer.isPremium && (
          <div className="place-card__mark" data-testid="premium-mark">
            <span>Premium</span>
          </div>
        )
      }
      <div className={`${blockName}__image-wrapper place-card__image-wrapper` } data-testid="place-image">
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width={imageWidth} height={imageHeight} alt="Place image" />
        </Link>
      </div>
      <div className={getPlaceCardInfoClassName(feature)}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b
              className="place-card__price-value"
              data-testid="place-price"
            >
              &euro;{offer.price}
            </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton
            blockName='place-card'
            isActive={offer.isFavorite}
            width={18}
            height={19}
            onClick={() => onFavoriteClick(offer.id, !offer.isFavorite)}
            data-testid="place-bookmark"
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{ width: `${getPercentage(Math.round(offer.rating), MAX_RATING)}%` }}
              data-testid="rating-stars"
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name" data-testid="place-title">
          <Link to={`${AppRoute.Offer}/${offer.id}`} data-testid="place-link">{offer.title}</Link>
        </h2>
        <p className="place-card__type" data-testid="place-type">{capitalize(offer.type)}</p>
      </div>
    </ article>
  );
}

export default React.memo(PlaceCard);
