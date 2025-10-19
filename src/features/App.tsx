import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute, AuthorizationStatus} from '@constants';
import PrivateRoute from 'components/PrivateRoute';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import FavouritesPage from './FavouritesPage';
import OfferPage from './OfferPage';
import NotFoundPage from './NotFoundPage';

type AppProps = {
  placesCount: number;
}

function App({placesCount}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage placeOffersCount={placesCount}/>}
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
                <FavouritesPage/>
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:offerId`}
            element={<OfferPage/>}
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
