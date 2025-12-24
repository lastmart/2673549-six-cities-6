import { FavoriteLocationItems } from 'components/favorites-page/favorite-location-items';
import { Offers } from 'types/offer-types/offer';

type FavoritesListProps = {
  offersByCities: Record<string, Offers>;
}

export function FavoritesList({ offersByCities }: FavoritesListProps) {
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites" >
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {
              Object.entries(offersByCities).map(([city, cityOffers]) => (
                <FavoriteLocationItems key={city} city={city} offers={cityOffers} />
              ))
            }
          </ul>
        </section>
      </div>
    </main >
  );
}
