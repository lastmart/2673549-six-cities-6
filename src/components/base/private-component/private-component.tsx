import { useAppSelector } from 'hooks/index';
import { getAuthorizationStatus } from 'store/user-process/selectors';
import { AuthorizationStatus } from '@constants';

type PrivateComponentProps = {
  restrictedFor: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateComponent({ restrictedFor, children }: PrivateComponentProps): JSX.Element | null {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return restrictedFor === authorizationStatus ? null : children;
}

export default PrivateComponent;
