import { Navigate, RouteProps } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from './const';
import { useAppSelector } from './hooks';

type PrivateRouteProps = RouteProps & {
  children: JSX.Element;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus} = useAppSelector((state) => state.user);
  const {children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn} />
  );
}
