import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { withStore } from '../../utils/test/with-store-component';
import Map from './map';
import { generatePlace } from '../../utils/test/mocks';
import { SliceNameSpace } from '../../const';

describe('Component: Map', () => {
  const mockMarkers = [generatePlace(), generatePlace()].map((place) => place.location);
  const initialState = {
    [SliceNameSpace.Marker]: {
      activeMarker: mockMarkers[0]
    }
  };

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <Map markers={mockMarkers} className="" />,
      initialState
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    const { withStoreComponent } = withStore(
      <Map markers={mockMarkers} className="custom-class" />,
      initialState
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('map')).toHaveClass('custom-class');
  });
});
