import { Offer } from 'types/offer-types/offer';
import Map from 'components/base/map';
import OffersList from 'components/main-page/offer-list';
import { useState } from 'react';
import { OfferPreview } from 'types/offer-types/offer-preview';

type CityProps = {
  offers: Offer[];
}

export function Cities({ offers }: CityProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<OfferPreview['id'] | null>(null);
  const activeOffer = offers.find((offer) => offer.id === activeOfferId);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in Amsterdam</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
              Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li className="places__option places__option--active" tabIndex={0}>Popular</li>
              <li className="places__option" tabIndex={0}>Price: low to high</li>
              <li className="places__option" tabIndex={0}>Price: high to low</li>
              <li className="places__option" tabIndex={0}>Top rated first</li>
            </ul>
          </form>
          <OffersList offers={offers} onOfferHover={setActiveOfferId} />
        </section>
        <div className="cities__right-section">
          <Map city={activeOffer?.city || offers[0].city} offers={offers} selectedOffer={activeOffer}/>
        </div>
      </div>
    </div>
  );
}
