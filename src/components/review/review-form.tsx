import { ChangeEvent, useState } from 'react';
import RatingInput from './rating-input';
import { useAppDispatch, useAppSelector } from 'hooks/index';
import { sendOfferReviewAction } from 'store/api-actions';
import { setError } from 'store/action';
import { ERROR, MAX_COMMENT_SIZE, MIN_COMMENT_SIZE } from '@constants';

const ratingMap = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terrible',
};

function ReviewForm() {
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.selectedOffer);
  const isReviewDataPosting = useAppSelector((state) => state.isReviewDataPosting);

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setComment(event.target.value);
  }

  function getRating(): number {
    return rating;
  }

  function canSubmitReview() {
    return !isReviewDataPosting && rating && comment.length > MIN_COMMENT_SIZE && comment.length < MAX_COMMENT_SIZE;
  }

  function submitReview() {
    if (!offer) {
      dispatch(setError(ERROR.UnexpectedError));
      return;
    }

    const sendReview = async () => {
      try {
        await dispatch(sendOfferReviewAction({ offerId: offer.id, rating, comment })).unwrap();
        setRating(0);
        setComment('');
      } catch { /* empty */ }
    };

    sendReview();
  }

  return (
    <form className="reviews__form form">
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
        value={comment}
        onChange={handleTextAreaChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">{MIN_COMMENT_SIZE} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="button"
          disabled={!canSubmitReview()}
          onClick={submitReview}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
