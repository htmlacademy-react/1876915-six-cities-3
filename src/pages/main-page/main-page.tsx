import CityTabs from '../../components/city-tabs/city-tabs';
import Cities from '../../components/cities/cities';
import { usePreviewsSelector } from '../../store/place-data/selectors';

export default function MainPage() {

  const previews = usePreviewsSelector();


  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <CityTabs previews={previews} />
      </div>
      <div className="cities">
        <Cities previews={previews} />
      </div>
    </main >
  );
}

