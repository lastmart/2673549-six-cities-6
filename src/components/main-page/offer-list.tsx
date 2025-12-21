import { PlaceCard } from 'components/cards/place-card';
import { Offer, OfferId } from 'types/offer-types/offer';

type OffersListProps = {
  offers: Offer[];
  onOfferHover: (offerId: OfferId | null) => void;
};

export default function OffersList({ offers, onOfferHover }: OffersListProps): JSX.Element {
  function handleCursorEnter(offerId: string) {
    onOfferHover(offerId);
  }

  function handleCursorLeave() {
    onOfferHover(null);
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          blockName='cities'
          imageWidth={260}
          imageHeight={200}
          onMouseEnter={() => handleCursorEnter(offer.id)}
          onMouseLeave={handleCursorLeave}
        />))}
    </div>
  );
}
