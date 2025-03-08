import PlaceList from '../../components/place-list/place-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import LocationTabs from '../../components/location-tabs/location-tabs';
import { useState } from 'react';
import { CITY_NAMES } from '../../const';

type MainPageProps = {
  cardsCount: number;
}

export default function MainPage({ cardsCount }: MainPageProps) {

  const [activeTab, setActiveTab] = useState(CITY_NAMES[0]);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationTabs
            cityNames={CITY_NAMES}
            activeTabName={activeTab}
            tabChangeHandler={(tabName) => setActiveTab(tabName)}
          />
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
