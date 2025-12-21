import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingScreen from 'features/loading-screen';
import PageHeader from 'components/base/page-header';
import Page from 'components/base/page';
import OfferSection from 'components/offer-page/offer-section';
import NearbyPlacesList from 'components/offer-page/nearby-places-list';
import { useAppDispatch, useAppSelector } from 'hooks/index';
import { OfferId } from 'types/offer-types/offer';
import { fetchNearbyOffersAction, fetchOfferAction } from 'store/api-actions';
import { MAX_NEARBY_OFFERS_COUNT } from '@constants';

function OfferPage(): JSX.Element {
  const { offerId } = useParams<{ offerId: OfferId }>();
  const dispatch = useAppDispatch();

  const offer = useAppSelector((state) => state.selectedOffer);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers.slice(0, MAX_NEARBY_OFFERS_COUNT));

  const isOffersDataLoading = useAppSelector((status) => status.isOffersDataLoading);
  const isNearbyOffersDataLoading = useAppSelector((status) => status.isNearbyOffersDataLoading);

  useEffect(() => {
    if (offerId && offerId !== offer?.id) {
      dispatch(fetchOfferAction(offerId));
      dispatch(fetchNearbyOffersAction(offerId));
    }
  }, [dispatch, offerId, offer?.id]);

  if (!offer || isOffersDataLoading || isNearbyOffersDataLoading) {
    return <LoadingScreen />;
  }

  return (
    <Page>
      <div className="page">
        <PageHeader />
        <main className="page__main page__main--offer">
          <OfferSection offer={offer} nearbyOffers={nearbyOffers} />
          <NearbyPlacesList offers={nearbyOffers} />
        </main>
      </div>
    </Page>
  );
}

export default OfferPage;
