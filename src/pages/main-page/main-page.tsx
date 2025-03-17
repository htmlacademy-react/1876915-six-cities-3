import { useState } from 'react';
import { CITY_NAMES, DEFAULT_CITY_NAME } from '../../const';
import { PlacePreview } from '../../types';
import PlaceList from '../../components/place-list/place-list';
import LocationTabs from '../../components/location-tabs/location-tabs';
import clsx from 'clsx';
import PlaceListEmpty from '../../components/place-list/place-list-empty';

type MainPageProps = {
  previewList: PlacePreview[];
}

export default function MainPage({ previewList }: MainPageProps) {

  const [activeTab, setActiveTab] = useState(DEFAULT_CITY_NAME);
  const filteredPreviews = previewList.filter((item) => item.city.name === activeTab);

  return (
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
        <div className={clsx('cities__places-container', 'container', !filteredPreviews.length && 'cities__places-container--empty')}>
          {filteredPreviews.length ? <PlaceList previewList={filteredPreviews} cityName={activeTab} /> : <PlaceListEmpty />}
        </div>
      </div>
    </main>
  );
}

