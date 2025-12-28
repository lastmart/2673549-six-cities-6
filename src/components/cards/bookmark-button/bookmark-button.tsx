type BookmarkButtonProps = {
  blockName: 'place-card' | 'offer';
  isActive: boolean;
  width: number;
  height: number;
  onClick: () => void;
}

export function BookmarkButton({blockName, isActive, width, height, onClick }: BookmarkButtonProps) {
  return (
    isActive ?
      <button
        className={`${blockName}__bookmark-button ${blockName}__bookmark-button--active button`}
        onClick={onClick}
        data-testid="bookmark-button"
      >
        <svg className={`${blockName}__bookmark-icon`} width={width} height={height} data-testid="bookmark-icon">
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden" data-testid="bookmark-text">In bookmarks</span>
      </button>
      :
      <button
        className={`${blockName}__bookmark-button button`}
        type="button"
        onClick={onClick}
        data-testid="bookmark-button"
      >
        <svg className={`${blockName}__bookmark-icon`} width={width} height={height} data-testid="bookmark-icon">
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden" data-testid="bookmark-text">To bookmarks</span>
      </button>
  );
}
