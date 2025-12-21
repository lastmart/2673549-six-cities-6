import { PlaceCard } from 'components/cards/place-card';
import { Offers } from 'types/offer-types/offer';

type NearbyPlacesListProps = {
  offers: Offers;
};

export default function NearbyPlacesList({ offers }: NearbyPlacesListProps): JSX.Element {
  return (
    <div className="container">
      <section className="near-places places" >
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {offers.map((offer) => (
            <PlaceCard
              key={offer.id}
              offer={offer}
              blockName='near-places'
              imageWidth={260}
              imageHeight={200}
            />))}
        </div>
      </section>
    </div>
  );
}
