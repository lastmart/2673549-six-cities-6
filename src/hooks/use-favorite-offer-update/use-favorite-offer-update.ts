import { useAppDispatch, useAppSelector } from 'hooks/index';
import { updateFavoriteOfferStatus } from 'store/api-actions';
import { getAuthorizationStatus } from 'store/user-process/selectors';
import { AppRoute, AuthorizationStatus } from '@constants';
import { useNavigate } from 'react-router-dom';

export function useFavoriteOfferUpdate() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  return function (offerId: string, setIsFavorite: boolean) {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(updateFavoriteOfferStatus({ offerId, setIsFavorite }));
  };
}
