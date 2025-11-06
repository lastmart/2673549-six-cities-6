import { MaxRating } from '@constants';
import getPercentage from 'lib/number-utils';

type CardRating = {
  rating: number;
}

export function CardRatingPart({rating}: CardRating) {
  return (
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
        <span style={{width: `${getPercentage(rating, MaxRating)}%`}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}
