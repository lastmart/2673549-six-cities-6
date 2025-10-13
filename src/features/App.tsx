import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AppRoute} from '../constants.ts';
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
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage placeOffersCount={placesCount}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Favourites}
          element={<FavouritesPage />}
        />
        <Route
          path={`${AppRoute.Offer}/:offerId`}
          element={<OfferPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
