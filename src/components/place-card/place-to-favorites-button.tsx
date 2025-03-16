import clsx from 'clsx';
import { ImageDefault as D } from '../../const';

type PlaceToFavoritesButtonProps = {
  className: string;
  isFavorite: boolean | undefined;
  width?: number;
  height?: number;
  onClick?: () => unknown;
}

export default function PlaceToFavoritesButton({ className, isFavorite, onClick, width = D.CardBookmarkIconWidth, height = D.CardBookmarkIconHeight }: PlaceToFavoritesButtonProps) {
  return (
    <button
      className={clsx('button', `${className}__bookmark-button`, isFavorite && `${className}__bookmark-button--active`)}
      type="button"
      onClick={onClick}
    >
      <svg
        className={`${className}__bookmark-icon`}
        width={width}
        height={height}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button >
  );
}
