import { FavouriteLocationItems } from 'components/favourite-location-items';
import Page from 'components/page';
import { Offer } from 'types/offer-types/offer';
import { Link } from 'react-router-dom';
import { AppRoute } from '@constants';

type FavoritesPageProps = {
  offers: Offer[];
};

function getFavouritesByCity(offers: Offer[]) {
  return offers.reduce<Record<string, Offer[]>>((acc, offer) => {
    const cityName = offer.city.name;

    if (!acc[cityName]) {
      acc[cityName] = [];
    }

    acc[cityName].push(offer);
    return acc;
  }, {});
}

function FavouritesPage({ offers }: FavoritesPageProps): JSX.Element {
  const favouriteOffers = offers.filter((offer) => offer.isFavourite);
  const offersByCities = getFavouritesByCity(favouriteOffers);

  return (
    <Page>
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link" to={AppRoute.Main}>
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">{favouriteOffers.length}</span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {
                  Object.entries(offersByCities).map(([city, cityOffers]) => (
                    <FavouriteLocationItems key={city} city={city} offers={cityOffers} />
                  ))
                }
              </ul>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <Link className="footer__logo-link" to={AppRoute.Main}>
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </Link>
        </footer>
      </div>
    </Page>
  );
}

export default FavouritesPage;
