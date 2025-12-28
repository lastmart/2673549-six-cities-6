import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingScreen from 'pages/loading-screen/loading-screen';
import NotFoundPage from 'pages/not-found-page/not-found-page';
import PageHeader from 'components/base/page-header';
import Page from 'components/base/page';
import OfferSection from 'components/offer-page/offer-section';
import NearbyPlacesList from 'components/offer-page/nearby-places-list';
import { useAppDispatch, useAppSelector } from 'hooks/index';
import { OfferId } from 'types/offer-types/offer';
import { fetchNearbyOffersAction, fetchOfferAction } from 'store/api-actions';
import { clearOfferData } from 'store/selected-offer-data/selected-offer-data';
import {
  getNearbyOffers,
  getNearbyOffersLoadingStatus,
  getOfferDataLoadingStatus,
  getSelectedOffer
} from 'store/selected-offer-data/selectors';
import { MAX_NEARBY_OFFERS_COUNT } from '@constants';

function OfferPage(): JSX.Element {
  const { offerId } = useParams<{ offerId: OfferId }>();
  const dispatch = useAppDispatch();

  const offer = useAppSelector(getSelectedOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers).slice(0, MAX_NEARBY_OFFERS_COUNT);

  const isOffersDataLoading = useAppSelector(getOfferDataLoadingStatus);
  const isNearbyOffersDataLoading = useAppSelector(getNearbyOffersLoadingStatus);

  useEffect(() => {
    if (offerId) {
      dispatch(fetchOfferAction(offerId));
      dispatch(fetchNearbyOffersAction(offerId));

      return () => {
        dispatch(clearOfferData());
      };
    }
  }, [dispatch, offerId]);

  if (isOffersDataLoading || isNearbyOffersDataLoading) {
    return <LoadingScreen />;
  }

  if (!offer) {
    return <NotFoundPage />;
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
