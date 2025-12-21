import { AuthorizationStatus } from '@constants';
import { useAppSelector } from 'hooks/index';

type PrivateComponentProps = {
  restrictedFor: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateComponent({ restrictedFor, children }: PrivateComponentProps): JSX.Element | null {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  return restrictedFor === authorizationStatus ? null : children;
}

export default PrivateComponent;
