import { useState } from 'react';
import { SortDirection, SortDirections } from 'types/sort-direction';

const sortDirectionToVisableName = new Map<SortDirection, string>([
  ['Popular', 'Popular'],
  ['PriceAscending', 'Price: low to high'],
  ['PriceDescending', 'Price: high to low'],
  ['TopRated', 'Top rated first']
]);

type SortDropDownProps = {
  activeSortDirection: SortDirection;
  onSortDirectionChenge: (sortDirection: SortDirection) => void;
};

export function SortDropDown({ activeSortDirection, onSortDirectionChenge }: SortDropDownProps) {
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);

  const handleSortDropDownClick = () => {
    setDropDownIsOpen((currentIsOpen) => !currentIsOpen);
  };

  const handleSortDirectionClick = (sortDirection: SortDirection) => {
    onSortDirectionChenge(sortDirection);
    setDropDownIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleSortDropDownClick}
      >
        {sortDirectionToVisableName.get(activeSortDirection)}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${dropDownIsOpen && 'places__options--opened'}`}>
        {
          Object.values(SortDirections)
            .map((sortDirection) => (
              <li
                className={`places__option ${sortDirection === activeSortDirection && 'places__option--active'}`}
                tabIndex={0}
                key={sortDirection}
                onClick={() => handleSortDirectionClick(sortDirection)}
              >
                {sortDirectionToVisableName.get(sortDirection)}
              </li>
            ))
        }
      </ul>
    </form>
  );
}
