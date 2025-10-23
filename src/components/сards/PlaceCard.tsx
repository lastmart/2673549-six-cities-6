import {Link} from "react-router-dom";
import CardPremium from "./CardPremium.tsx";
import MainOfferInformation from "types/offerTypes/MainOfferInformation";
import CardBookmark from "./CardBookmark.tsx";
import CardRating from "./CardRating.tsx";
import {AppRoute} from "@constants";

type PlaceCardProps = {
  offer: MainOfferInformation,
  onMouseEnter: () => void,
  onMouseLeave: () => void
}

function PlaceCard({offer, onMouseEnter, onMouseLeave}: PlaceCardProps): JSX.Element {
  return (
    <article className="cities__card place-card"
             onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave}
    >
      <CardPremium isPremium={offer.isPremium}/>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img className="place-card__image" src={offer.image} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;{offer.stayDuration}</span>
          </div>
          <CardBookmark isBookmarked={offer.isBookmarked}/>
        </div>
        <CardRating rating={offer.rating}/>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.features.houseType}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
