import PlaceList from '../../components/place-list/place-list';
import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import Map from '../../components/map/map';

type MainProps = {
  cardsCount: number;
}

export default function MainScreen({ cardsCount }: MainProps) {
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Tabs />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <PlaceList cardsCount={cardsCount} />
            <div className="cities__right-section">
              <Map />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
