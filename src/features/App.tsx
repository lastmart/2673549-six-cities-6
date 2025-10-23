import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute, AuthorizationStatus} from '@constants';
import PrivateRoute from 'components/PrivateRoute';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import FavouritesPage from './FavouritesPage';
import OfferPage from './OfferPage';
import NotFoundPage from './NotFoundPage';
import {Offer} from 'types/offerTypes/Offer';
import {Review} from 'types/offerTypes/Review';

type AppProps = {
  placesCount: number;
  offers: Offer[],
  reviews: Review[]
}

function App({placesCount, offers, reviews}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage placeOffersCount={placesCount} offers={offers}/>}
          />
          <Route
            path={AppRoute.Login}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.Auth}
                redirectTo={AppRoute.Main}
              >
                <LoginPage/>
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
                <FavouritesPage offers={offers}/>
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:offerId`}
            element={<OfferPage offers={offers} reviews={reviews}/>}
          />
          <Route
            path="*"
            element={<NotFoundPage/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
