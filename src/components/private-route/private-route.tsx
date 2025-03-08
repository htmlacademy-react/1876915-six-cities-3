import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { PropsWithChildren } from 'react';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
};

export default function PrivateRoute({ authorizationStatus, children }: PropsWithChildren<PrivateRouteProps>) {
  return (authorizationStatus === AuthorizationStatus.Auth) ? children : <Navigate to={AppRoute.Login} />;
}
