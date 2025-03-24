import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { PropsWithChildren } from 'react';
import { useAuthStatusSelector } from '../../store/user-process/selectors';

export default function PrivateRoute({ children }: PropsWithChildren) {
  return (useAuthStatusSelector() === AuthorizationStatus.Auth) ? children : <Navigate to={AppRoute.Login} />;
}
