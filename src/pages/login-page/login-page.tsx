import { Helmet } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';
import { useAuthStatusSelector, useLoginStatusSelector } from '../../store/user-process/selectors';
import { useActionCreators } from '../../hooks';
import { userProcessActions } from '../../store/user-process/user-process';
import { FormEventHandler, useRef } from 'react';
import { testEmailExpr, testPasswordExpr } from '../../utils';
import { RequestStatus } from '../../types';

export default function LoginPage() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const status = useAuthStatusSelector();
  const loginStatus = useLoginStatusSelector();
  const isAuthorized = (status === AuthorizationStatus.Auth);

  const { loginAction } = useActionCreators(userProcessActions);

  const formSubmitHandler: FormEventHandler = (evt) => {
    evt.preventDefault();
    if (!(emailRef.current && passwordRef.current)) {
      return;
    }

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (testEmailExpr(email) && testPasswordExpr(password)) {
      loginAction({ email, password });
    }
  };

  const isSubmitButtonDisabled = (loginStatus === RequestStatus.Pending);

  return (
    (isAuthorized) ?
      <Navigate to={AppRoute.Main} /> :
      <main className="page__main page__main--login">
        <Helmet>
          <title>6 Cities.Login</title>
        </Helmet>
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={formSubmitHandler}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={emailRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit" disabled={isSubmitButtonDisabled}>
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>


  );
}
