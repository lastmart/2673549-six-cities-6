type CardPremiumProps = {
  isPremium: boolean;
}

export function CardPremiumPart({ isPremium }: CardPremiumProps) {
  return (
    isPremium && (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    )
  );
}
