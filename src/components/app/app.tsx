import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainPage from 'pages/main-page/main-page';
import LoginPage from 'pages/login-page/login-page';
import FavoritesPage from 'pages/favourite-page/favorites-page';
import OfferPage from 'pages/offer-page/offer-page';
import NotFoundPage from 'pages/not-found-page/not-found-page';
import LoadingScreen from 'pages/loading-screen/loading-screen';
import PrivateRoute from 'components/base/private-route';
import { useAppSelector } from 'hooks';
import { getAuthorizationStatus } from 'store/user-process/selectors';
import { getOfferDataLoadingStatus } from 'store/selected-offer-data/selectors';
import { getFavoriteOffersDataLoadingStatus } from 'store/favorite-offers-data/selectors';
import { AppRoute, AuthorizationStatus } from '@constants';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getOfferDataLoadingStatus);
  const isFavoritesLoading = useAppSelector(getFavoriteOffersDataLoadingStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown ||
    (authorizationStatus === AuthorizationStatus.Auth && isFavoritesLoading) ||
    isOffersDataLoading
  ) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage />}
          />
          <Route
            path={AppRoute.Login}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.Auth}
                redirectTo={AppRoute.Main}
              >
                <LoginPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Login}
              >
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:offerId`}
            element={<OfferPage />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
