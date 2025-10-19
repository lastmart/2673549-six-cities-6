import getPercentage from 'lib/GetPercentage';
import PlaceCardType from 'types/PlaceCardType';
import StayDuration from 'types/StayDuration';

const MaxStarsCount: number = 5;

type PlaceCardProps = {
  isPremium: boolean;
  image: string;
  price: number;
  stayDuration: StayDuration;
  isBookmarked: boolean;
  stars: number;
  title: string;
  type: PlaceCardType;
}

function PlaceCard(props: PlaceCardProps): JSX.Element {
  return (
    <article className="cities__card place-card">
      {props.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={props.image} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{props.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;{props.stayDuration}</span>
          </div>
          {props.isBookmarked ?
            <button className="place-card__bookmark-button place-card__bookmark-button--active button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">In bookmarks</span>
            </button>
            :
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>}
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getPercentage(props.stars, MaxStarsCount)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{props.title}</a>
        </h2>
        <p className="place-card__type">{props.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
