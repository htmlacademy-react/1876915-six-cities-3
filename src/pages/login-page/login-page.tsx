import { Helmet } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus, LoginMessages, USER_PASSWORD_MAX_LENGTH, USER_PASSWORD_MIN_LENGTH } from '../../const';
import { Link, Navigate } from 'react-router-dom';
import { useAuthStatusSelector, useLoginStatusSelector, userActions } from '../../store';
import { useActionCreators } from '../../hooks';
import { FormEventHandler, useMemo, useRef } from 'react';
import { getRandomCityName, testEmailExpr, testPasswordExpr } from '../../utils';
import { RequestStatus } from '../../types';

//Disclaimer: manual form validation example

const handleValidity = (formElement: HTMLInputElement, validator: (value: string) => boolean, message: string) => {
  formElement.setCustomValidity(validator(formElement.value) ? '' : message);
  formElement.reportValidity();
};

export default function LoginPage() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const loginStatus = useLoginStatusSelector(); //useFormStatus in React v19
  const isFormDisabled = (loginStatus === RequestStatus.Pending);

  const authStatus = useAuthStatusSelector();
  const isAuthorized = (authStatus === AuthorizationStatus.Auth);

  const { loginAction } = useActionCreators(userActions);

  const formSubmitHandler: FormEventHandler = (evt) => {
    evt.preventDefault();
    if (!formRef.current) {
      return;
    }

    const email = formRef.current.email as HTMLInputElement;
    const password = formRef.current.password as HTMLInputElement;

    if (email.validity.valid && password.validity.valid) {
      loginAction({ email: email.value, password: password.value }); // redirect after dispatch in asyncThunk
    }
  };

  const cityName = useMemo(() => getRandomCityName(), []);

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
            <form ref={formRef} className="login__form form" action="#" method="post" onSubmit={formSubmitHandler}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  onChange={(evt) => handleValidity(evt.currentTarget, testEmailExpr, LoginMessages.InvalidEmail)}
                  placeholder="Email"
                  required
                  disabled={isFormDisabled}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  onChange={(evt) => handleValidity(evt.currentTarget, testPasswordExpr, LoginMessages.invalidPassword)}
                  placeholder="password"
                  minLength={USER_PASSWORD_MIN_LENGTH}
                  maxLength={USER_PASSWORD_MAX_LENGTH}
                  required
                  disabled={isFormDisabled}
                />
              </div>
              <button name='button' className="login__submit form__submit button" type="submit" disabled={isFormDisabled}>
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={`${AppRoute.Main}?city=${cityName}`}>
                <span>{cityName}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>


  );
}
