import {useState} from 'react';
import PlaceCard from './сards/PlaceCard.tsx';
import {Offer} from 'types/offerTypes/Offer.ts';

type OffersListProps = {
  offers: Offer[];
};

export default function OffersList({offers}: OffersListProps): JSX.Element {
  const [, setActiveOfferId] = useState<string | null>(null);

  const handleCursorEnter = (offerId: string) => {
    setActiveOfferId(offerId);
  };

  const handleCursorLeave = () => {
    setActiveOfferId(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => handleCursorEnter(offer.id)}
          onMouseLeave={handleCursorLeave}
        />))}
    </div>
  );
}
