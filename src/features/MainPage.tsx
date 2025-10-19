import PlaceCard from 'components/PlaceCard';
import PlaceCardType from 'types/PlaceCardType';
import StayDuration from 'types/StayDuration';
import Page from 'components/Page';

const placeCards = [
  {
    id: 1,
    isPremium: true,
    image: 'markup/img/apartment-01.jpg',
    price: 120,
    stayDuration: StayDuration.Night,
    isBookmarked: false,
    stars: 4,
    title: 'Beautiful & luxurious apartment at great location',
    type: PlaceCardType.Apartment
  },
  {
    id: 2,
    isPremium: false,
    image: 'markup/img/room.jpg',
    price: 80,
    stayDuration: StayDuration.Night,
    isBookmarked: true,
    stars: 4,
    title: 'Wood and stone place',
    type: PlaceCardType.Room
  },
  {
    id: 3,
    isPremium: false,
    image: 'markup/img/apartment-02.jpg',
    price: 132,
    stayDuration: StayDuration.Night,
    isBookmarked: false,
    stars: 4,
    title: 'Canal View Prinsengracht',
    type: PlaceCardType.Apartment
  },
  {
    id: 4,
    isPremium: true,
    image: 'markup/img/apartment-03.jpg',
    price: 180,
    stayDuration: StayDuration.Night,
    isBookmarked: false,
    stars: 5,
    title: 'Nice, cozy, warm big bed apartment',
    type: PlaceCardType.Apartment
  },
  {
    id: 5,
    isPremium: false,
    image: 'markup/img/room.jpg',
    price: 80,
    stayDuration: StayDuration.Night,
    isBookmarked: true,
    stars: 4,
    title: 'Wood and stone place',
    type: PlaceCardType.Room
  }
];

type MainPageProps = {
  placeOffersCount: number;
}

function MainPage({placeOffersCount}: MainPageProps): JSX.Element {
  return (
    <Page>
      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">3</span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <ul className="locations__list tabs__list">
                <li className="locations__item">
                  <a className="locations__item-link tabs__item" href="#">
                    <span>Paris</span>
                  </a>
                </li>
                <li className="locations__item">
                  <a className="locations__item-link tabs__item" href="#">
                    <span>Cologne</span>
                  </a>
                </li>
                <li className="locations__item">
                  <a className="locations__item-link tabs__item" href="#">
                    <span>Brussels</span>
                  </a>
                </li>
                <li className="locations__item">
                  <a className="locations__item-link tabs__item tabs__item--active">
                    <span>Amsterdam</span>
                  </a>
                </li>
                <li className="locations__item">
                  <a className="locations__item-link tabs__item" href="#">
                    <span>Hamburg</span>
                  </a>
                </li>
                <li className="locations__item">
                  <a className="locations__item-link tabs__item" href="#">
                    <span>Dusseldorf</span>
                  </a>
                </li>
              </ul>
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{placeOffersCount} places to stay in Amsterdam</b>
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
                <div className="cities__places-list places__list tabs__content">
                  {placeCards.map((placeCard) => (
                    <PlaceCard {...placeCard} key={placeCard.id}/>
                  ))}
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map"></section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Page>
  );
}

export default MainPage;
