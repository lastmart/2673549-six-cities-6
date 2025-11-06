import React from 'react';

type RatingInputProps = {
  rating: number;
  title: string;
  setRating: (rating: number) => void;
  getRating: () => number;
}

function RatingInput({rating, title, setRating, getRating}: RatingInputProps) {
  return (
    <React.Fragment>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={rating}
        id={`${rating}-stars`}
        type="radio"
        checked={rating === getRating()}
        onChange={() => setRating(rating)}
      />
      <label htmlFor={`${rating}-stars`} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </React.Fragment>
  );
}

export default RatingInput;
