import Page from 'components/base/page';
import PageHeader from 'components/base/page-header';
import { Cities } from 'components/main-page/cities';
import EmptyOffersList from 'components/main-page/empty-offers-list';
import { LocationList } from 'components/main-page/location-list';
import { useAppDispatch, useAppSelector } from 'hooks/index';
import { setCity } from 'store/offers-data/offers-data';
import { getSelectedCityOffers } from 'store/offers-data/selectors';
import { CITIES, CityNames } from '@constants';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const hasAnyCityOffers = useAppSelector(getSelectedCityOffers).length > 0;

  const handleChangeCity = (cityName: CityNames) => {
    const activeCity = CITIES.find((city) => city.name === cityName);

    if (!activeCity) {
      return;
    }

    dispatch(setCity(activeCity));
  };

  return (
    <Page>
      <div className="page page--gray page--main">
        <PageHeader />
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <LocationList onCityChange={handleChangeCity} />
          </div>
          {
            hasAnyCityOffers
              ? <Cities />
              : <EmptyOffersList />
          }
        </main>
      </div>
    </Page>
  );
}

export default MainPage;
