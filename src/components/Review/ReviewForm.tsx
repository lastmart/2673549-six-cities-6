import {useState} from 'react';
import {getRange} from 'lib/GetRange.ts';
import RatingInput from "./RatingInput.tsx";

function ReviewForm() {
  const [_, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          getRange(1, 5).map((rating) => (
            <RatingInput rating={rating} setRating={setRating}/>
          ))
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="reviSew"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={() => setReview(review)}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
