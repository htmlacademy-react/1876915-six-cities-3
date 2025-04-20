import { memo, MouseEventHandler } from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getUserData } from '../../services/token';
import { useAuthStatusSelector, useFavoritesSelector, userActions } from '../../store';
import { useActionCreators } from '../../hooks';

type HeaderProps = {
  isLogoActive: boolean;
  shouldUserInfoRender: boolean;
};

export default function Header({ isLogoActive, shouldUserInfoRender }: HeaderProps) {

  const { logoutAction } = useActionCreators(userActions);
  const location = useLocation();
  const favorites = useFavoritesSelector();
  const isAuthorized = useAuthStatusSelector();
  const user = isAuthorized ? getUserData() : null;

  const logoClickHandler: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    if (isLogoActive) {
      evt.preventDefault();
    }
  };

  const emailClickHandler: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    if (location.pathname as AppRoute === AppRoute.Favorites) {
      evt.preventDefault();
    }
  };

  const logoutHandler: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    evt.preventDefault();
    if (user) {
      logoutAction();
    }
  };

  return (
    <header className="header" data-testid="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className={cn('header__logo-link', isLogoActive && 'header__logo-link--active')} to={AppRoute.Main} onClick={logoClickHandler}>
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>
          {shouldUserInfoRender &&
            <nav className="header__nav" data-testid="nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites} onClick={emailClickHandler}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      {user && <img src={user.avatarUrl}></img>}
                    </div>
                    {user ?
                      <>
                        <span className="header__user-name user__name" data-testid="user-email">{user.email}</span>
                        <span className="header__favorite-count" data-testid="favorites-count">{favorites.length}</span>
                      </> : <span className="header__login" data-testid="login-link">Sign in</span>}
                  </Link>
                </li>
                {user &&
                  <li className="header__nav-item" data-testid="logout-link">
                    <Link className="header__nav-link" to={AppRoute.Login} onClick={logoutHandler}>
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>}
              </ul>
            </nav>}
        </div>
      </div>
    </header>
  );
}

export const MemoizedHeader = memo(Header);
