import { Navigate, RouteProps } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from './const';
import { useAppSelector } from './hooks';
import { getAuthorizationStatus } from './store/user-process/selectors';

type PrivateRouteProps = RouteProps & {
  children: JSX.Element;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const {children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn} />
  );
}
