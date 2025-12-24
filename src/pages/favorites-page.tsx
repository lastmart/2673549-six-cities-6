import LoadingScreen from 'pages/login-page';
import PageHeader from 'components/base/page-header';
import Page from 'components/base/page';
import Footer from 'components/base/footer';
import { FavoritesList } from 'components/favorites-page/favorites-list';
import { EmptyFavoritesList } from 'components/favorites-page/empty-favourites-list';
import { useAppSelector } from 'hooks/index';
import { useFavoriteOffersByCity } from 'hooks/use-favorite-offers-by-city';
import { getFavoriteOffersDataLoadingStatus } from 'store/favorite-offers-data/selectors';

function FavoritesPage(): JSX.Element {
  const isFavoriteOffersDataLoading = useAppSelector(getFavoriteOffersDataLoadingStatus);
  const offersByCities = useFavoriteOffersByCity();
  const hasAnyFavourites = Object.keys(offersByCities).length > 0;

  if (isFavoriteOffersDataLoading) {
    return <LoadingScreen />;
  }

  return (
    <Page>
      <div className="page">
        <PageHeader />
        {
          hasAnyFavourites
            ? <FavoritesList offersByCities={offersByCities} />
            : <EmptyFavoritesList />
        }
        <Footer />
      </div>
    </Page>
  );
}

export default FavoritesPage;
