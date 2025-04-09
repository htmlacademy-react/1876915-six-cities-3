import cn from 'classnames';
import { AppRoute, AuthorizationStatus, ImageDefault as D } from '../../const';
import { MouseEventHandler } from 'react';
import { placeDataActions, useAuthStatusSelector, useChangeFavoritesStatusSelector, useIsFavoriteSelector } from '../../store';
import { useActionCreators } from '../../hooks';
import { RequestStatus } from '../../types';
import { useNavigate } from 'react-router-dom';

type PlaceToFavoritesButtonProps = {
  placeId: string;
  className: string;
  width?: number;
  height?: number;
}

export default function PlaceToFavoritesButton({ className, placeId, width = D.CardBookmarkIconWidth, height = D.CardBookmarkIconHeight }: PlaceToFavoritesButtonProps) {

  const navigate = useNavigate();

  const authStatus = useAuthStatusSelector();
  const status = useChangeFavoritesStatusSelector();
  const isFavorite = useIsFavoriteSelector(placeId);

  const { changeFavoriteStatusAction } = useActionCreators(placeDataActions);
  const isButtonDisabled = (status === RequestStatus.Pending);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    changeFavoriteStatusAction({ status: !isFavorite, placeId });
  };

  return (
    <button
      key={placeId}
      className={cn('button', `${className}__bookmark-button`, isFavorite && `${className}__bookmark-button--active`)}
      type="button"
      onClick={clickHandler}
      disabled={isButtonDisabled}
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
