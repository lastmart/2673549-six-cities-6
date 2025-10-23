import {Link} from "react-router-dom";
import CardPremium from './CardPremium.tsx';
import CardBookmark from './CardBookmark';
import CardRating from './CardRating';
import {Offer} from 'types/offerTypes/Offer';
import {AppRoute} from "@constants";

type FavouriteCardProps = {
  offer: Offer
};

function FavouriteCard({offer}: FavouriteCardProps) {
  return (
    <article className="favorites__card place-card">
      <CardPremium isPremium={offer.isPremium}/>
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img className="place-card__image" src={offer.image} width="150" height="110"
               alt="Place image"/>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
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

export default FavouriteCard;
