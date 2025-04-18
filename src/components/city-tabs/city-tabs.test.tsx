import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { withStore } from '../../utils/test/with-store-component';
import CityTabs from './city-tabs';
import { CITY_NAMES, DEFAULT_CITY } from '../../const';
import { State } from '../../types/state';
import { SliceNameSpace } from '../../const';
import { RequestStatus } from '../../types';

describe('Component: CityTabs', () => {
  const initialState: Partial<State> = {
    [SliceNameSpace.Place]: {
      place: null,
      placeFetchStatus: RequestStatus.Fulfilled,
      nearbyPreviews: [],
      nearbyFetchStatus: RequestStatus.Fulfilled,
      previews: [],
      previewsFetchStatus: RequestStatus.Fulfilled
    },
    [SliceNameSpace.Marker]: {
      activeMarker: DEFAULT_CITY
    }
  };

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <CityTabs />,
      initialState
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('city-tabs-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('city-tab')).toHaveLength(CITY_NAMES.length);
  });

  it('should highlight active city', () => {
    const { withStoreComponent } = withStore(
      <CityTabs />,
      initialState
    );

    render(withHistory(withStoreComponent));

    const activeTab = screen.getByTestId(`city-tab-${CITY_NAMES[0]}`);
    expect(activeTab).toHaveClass('tabs__item--active');
  });

  it('should render all city names', () => {
    const { withStoreComponent } = withStore(
      <CityTabs />,
      initialState
    );

    render(withHistory(withStoreComponent));

    CITY_NAMES.forEach((city) => {
      const tab = screen.getByTestId(`city-tab-${city}`);
      expect(tab).toHaveTextContent(city);
    });
  });
});
