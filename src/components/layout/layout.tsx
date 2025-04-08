import clsx from 'clsx';
import { useActionCreators, useLayoutConfig } from '../../hooks';
import { Link, Outlet } from 'react-router-dom';
import { AppRoute } from '../../const';
import { MouseEventHandler } from 'react';
import { userProcessActions } from '../../store/user-process/user-process';
import { getUserData } from '../../services/token';
import { useFavoritesSelector } from '../../store/place-data/selectors';

export default function Layout() {
  const { pageClassName, shouldUserInfoRender, isLogoActive } = useLayoutConfig();
  const { logoutAction } = useActionCreators(userProcessActions);

  const favorites = useFavoritesSelector();
  const user = getUserData();

  const logoClickHandler: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    if (isLogoActive) {
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
    <div className={`page ${pageClassName}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className={clsx('header__logo-link', isLogoActive && 'header__logo-link--active')} to={AppRoute.Main} onClick={logoClickHandler}>
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
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        {user && <img src={user.avatarUrl}></img>}
                      </div>
                      {user ?
                        <>
                          <span className="header__user-name user__name">{user.email}</span>
                          <span className="header__favorite-count">{favorites.length}</span>
                        </> : <span className="header__login">Sign in</span>}
                    </Link>
                  </li>
                  {user &&
                    <li className="header__nav-item">
                      <Link className="header__nav-link" to={AppRoute.Login} onClick={logoutHandler}>
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>}
                </ul>
              </nav>}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
