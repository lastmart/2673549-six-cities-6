import { ChangeEvent, useState } from 'react';
import RatingInput from './rating-input';
import { MaxCommentSize } from '@constants';

const ratingMap = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terrible',
};

function ReviewForm() {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setReview(event.target.value);
  }

  function getRating(): number {
    return rating;
  }

  function CanSubmitReview() {
    return review.length > 0 && review.length < MaxCommentSize;
  }

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          Object.entries(ratingMap)
            .reverse()
            .map(([rate, title]) => (
              <RatingInput key={rate} rating={Number(rate)} title={title} setRating={setRating} getRating={getRating} />
            ))
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={handleTextAreaChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!CanSubmitReview()}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
