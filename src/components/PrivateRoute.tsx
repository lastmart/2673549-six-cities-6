import {AppRoute, AuthorizationStatus} from '@constants';
import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
}

function PrivateRoute({restrictedFor, redirectTo, children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = AuthorizationStatus.Auth;

  return (
    restrictedFor === authorizationStatus
      ? <Navigate to={redirectTo}/>
      : children
  );
}

export default PrivateRoute;
