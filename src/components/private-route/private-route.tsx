import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { PropsWithChildren } from 'react';
import { getAuthorizationStatus } from '../../mocks/utils';

export default function PrivateRoute({ children }: PropsWithChildren) {
  return (getAuthorizationStatus() === AuthorizationStatus.Auth) ? children : <Navigate to={AppRoute.Login} />;
}
