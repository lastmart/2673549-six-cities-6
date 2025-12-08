import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '@constants';
import PrivateRoute from 'components/base/private-route';
import MainPage from './main-page';
import LoginPage from './login-page';
import FavouritesPage from './favourites-page';
import OfferPage from './offer-page';
import NotFoundPage from './not-found-page';
import { Offer } from 'types/offer-types/offer';
import { Review } from 'types/offer-types/review';

type AppProps = {
  offers: Offer[];
  reviews: Review[];
}

function App({offers, reviews }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage/>}
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
            path={AppRoute.Favourites}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Login}
              >
                <FavouritesPage offers={offers} />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:offerId`}
            element={<OfferPage offers={offers} reviews={reviews} />}
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
