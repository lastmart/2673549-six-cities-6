import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute, AuthorizationStatus} from '@constants';
import PrivateRoute from 'components/PrivateRoute';
import MainPage from './MainPage.tsx';
import LoginPage from './LoginPage.tsx';
import FavouritesPage from './FavouritesPage.tsx';
import OfferPage from './OfferPage.tsx';
import NotFoundPage from './NotFoundPage.tsx';

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
            element={<LoginPage/>}
          />
          <Route
            path={AppRoute.Favourites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
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
