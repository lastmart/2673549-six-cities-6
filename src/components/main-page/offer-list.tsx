import { useCallback, useMemo } from 'react';
import PlaceCard from 'components/cards/place-card';
import { Offer, OfferId } from 'types/offer-types/offer';

type OffersListProps = {
  offers: Offer[];
  onOfferHover: (offerId: OfferId | null) => void;
};

export default function OffersList({ offers, onOfferHover }: OffersListProps): JSX.Element {
  const hoverEventHandlers = useMemo(
    () => {
      const map = new Map<string, () => void>();

      for (const offer of offers) {
        map.set(offer.id, () => onOfferHover(offer.id));
      }

      return map;
    },
    [offers, onOfferHover]
  );

  const handleCursorLeave = useCallback(
    () => onOfferHover(null),
    [onOfferHover]
  );

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          blockName='cities'
          imageWidth={260}
          imageHeight={200}
          onMouseEnter={hoverEventHandlers.get(offer.id)}
          onMouseLeave={handleCursorLeave}
        />))}
    </div>
  );
}
