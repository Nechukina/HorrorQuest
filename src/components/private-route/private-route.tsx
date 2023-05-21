import {Navigate, useLocation} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import Loader from '../loader/loader';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const {children} = props;
  const location = useLocation();

  if (authStatus === AuthorizationStatus.Unknown) {
    return <Loader/>;
  }

  return (
    authStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} state={location} />
  );
}

export default PrivateRoute;
