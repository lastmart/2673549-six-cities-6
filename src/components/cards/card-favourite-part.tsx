type CardFavouriteProps = {
  isFavourite: boolean;
}

export function CardFavouritePart({ isFavourite }: CardFavouriteProps) {
  return (
    isFavourite ?
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
      </button>

  );
}
