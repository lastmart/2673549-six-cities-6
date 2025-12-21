import { Review } from 'types/offer-types/review';
import { getMonthWithYear } from 'lib/date-utils';
import { getPercentage } from 'lib/number-utils';
import { MAX_RATING } from '@constants';

type ReviewItemProps = {
  review: Review;
}

function ReviewItem({ review }: ReviewItemProps) {
  const reviewDate = new Date(review.date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${getPercentage(review.rating, MAX_RATING)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={reviewDate.toISOString()}>
          {getMonthWithYear(reviewDate)}
        </time>
      </div>
    </li>
  );
}

export default ReviewItem;
