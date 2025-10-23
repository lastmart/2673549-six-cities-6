import React from "react";

type PremiumProps = {
  isPremium: boolean
}

function CardPremium({isPremium}: PremiumProps) {
  return (
    <React.Fragment>
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
    </React.Fragment>
  );
}

export default CardPremium;
