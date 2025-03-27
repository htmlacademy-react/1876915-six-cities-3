import CityTabs from '../../components/city-tabs/city-tabs';
import Cities from '../../components/cities/cities';

export default function MainPage() {
  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <CityTabs />
      </div>
      <div className="cities">
        <Cities />
      </div>
    </main>
  );
}

