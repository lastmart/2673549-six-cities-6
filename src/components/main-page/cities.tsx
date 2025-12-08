import { Offer } from 'types/offer-types/offer';
import Map from 'components/base/map';
import OffersList from 'components/main-page/offer-list';
import { SortDropDown } from 'components/main-page/sort-drop-down';
import { useState } from 'react';
import { OfferPreview } from 'types/offer-types/offer-preview';
import { City } from 'types/offer-types/сity';
import { SortDirection } from 'types/sort-direction';
import { getSorted } from 'lib/sort-utils';

type CityProps = {
  activeCity: City;
  offers: Offer[];
}

export function Cities({ activeCity, offers }: CityProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<OfferPreview['id'] | null>(null);
  const [activeSortDirection, setActiveSortDirection] = useState<SortDirection>('Popular');
  const activeOffer = offers.find((offer) => offer.id === activeOfferId);
  const sortedOffers = getSorted(offers, activeSortDirection);

  const handleSortDirectionChange = (sortDirection: SortDirection) => {
    setActiveSortDirection(sortDirection);
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{sortedOffers.length} places to stay in {activeCity.name}</b>
          <SortDropDown activeSortDirection={activeSortDirection} onSortDirectionChenge={handleSortDirectionChange}/>
          <OffersList offers={sortedOffers} onOfferHover={setActiveOfferId} />
        </section>
        <div className="cities__right-section">
          <Map
            className='offer__map map'
            city={activeCity}
            offers={sortedOffers}
            selectedOffer={activeOffer}
          />
        </div>
      </div>
    </div>
  );
}
