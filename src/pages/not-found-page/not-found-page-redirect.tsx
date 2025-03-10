import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function NotFoundPageRedirect() {
  return (
    <Navigate to={AppRoute.NotFound} />
  );
}
