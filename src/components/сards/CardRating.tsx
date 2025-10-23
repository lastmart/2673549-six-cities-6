type CardRating = {
  rating: number
}

function CardRating({rating}: CardRating) {
  return (
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
        <span style={{width: `${rating}%`}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}

export default CardRating;
