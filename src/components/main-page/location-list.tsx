import { CityNames } from '@constants';

type LocationListProps = {
  activeCity: CityNames;
  onCityChange: (city: CityNames) => void;
}

export function LocationList({ activeCity, onCityChange }: LocationListProps) {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          Object.values(CityNames).map((city) => (
            <li className="locations__item" key={city}>
              <a
                className={`locations__item-link tabs__item ${activeCity === city && 'tabs__item--active'}`}
                onClick={() => onCityChange(city)}
              >
                <span>{city}</span>
              </a>
            </li>
          ))
        }
      </ul>
    </section>
  );
}
