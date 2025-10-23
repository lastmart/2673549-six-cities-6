import React from "react";

type RatingInputProps = {
  rating: number,
  setRating: (rating: number) => void
}

function RatingInput({rating, setRating}: RatingInputProps) {
  return (
    <React.Fragment>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={rating}
        id={`${rating}-stars`}
        type="radio"
        onChange={() => setRating(rating)}
      />
      <label htmlFor={`${rating}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </React.Fragment>
  );
}

export default RatingInput;
