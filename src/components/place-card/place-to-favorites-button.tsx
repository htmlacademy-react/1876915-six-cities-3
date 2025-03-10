import clsx from 'clsx';
import { PlaceCardDefault as D } from '../../const';

type PlaceToFavoritesButtonProps = {
  isFavorite: boolean | undefined;
  onClick?: () => unknown;
  width?: number;
  height?: number;
}

export default function PlaceToFavoritesButton({ isFavorite, onClick, width = D.BOOKMARK_ICON_WIDTH, height = D.BOOKMARK_ICON_HEIGHT }: PlaceToFavoritesButtonProps) {
  return (
    <button
      className={clsx('place-card__bookmark-button button', isFavorite && 'place-card__bookmark-button--active')}
      type="button"
      onClick={onClick}
    >
      <svg
        className="place-card__bookmark-icon"
        width={width}
        height={height}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button >
  );
}
