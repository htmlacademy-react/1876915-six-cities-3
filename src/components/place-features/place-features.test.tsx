import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { withStore } from '../../utils/test/with-store-component';
import PlaceFeatures from './place-features';
import { generatePlace } from '../../utils/test/mocks';
import { capitalizeFirstLetter } from '../../utils';

describe('Component: PlaceFeatures', () => {
  const mockPlace = generatePlace();
  const initialState = {};

  it('should render correctly with place features', () => {
    const { withStoreComponent } = withStore(
      <PlaceFeatures place={mockPlace} />,
      initialState
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('place-features')).toBeInTheDocument();
    expect(screen.getByTestId('place-type')).toHaveTextContent(capitalizeFirstLetter(mockPlace.type));
    expect(screen.getByTestId('place-bedrooms')).toHaveTextContent(`${mockPlace.bedrooms} Bedrooms`);
    expect(screen.getByTestId('place-max-adults')).toHaveTextContent(`Max ${mockPlace.maxAdults} adults`);
    expect(screen.getByTestId('place-price')).toHaveTextContent(`€${mockPlace.price}`);
    expect(screen.getByTestId('place-goods')).toBeInTheDocument();
    expect(screen.getAllByTestId('place-good')).toHaveLength(mockPlace.goods.length);
    expect(screen.getByTestId('place-host')).toBeInTheDocument();
    expect(screen.getByTestId('place-host-name')).toHaveTextContent(mockPlace.host.name);
    expect(screen.getByTestId('place-host-avatar')).toHaveAttribute('src', mockPlace.host.avatarUrl);
    expect(screen.getByTestId('place-description')).toHaveTextContent(mockPlace.description);
  });

  it('should render pro host status when host is pro', () => {
    const proPlace = {
      ...mockPlace,
      host: {
        ...mockPlace.host,
        isPro: true
      }
    };

    const { withStoreComponent } = withStore(
      <PlaceFeatures place={proPlace} />,
      initialState
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('place-host-pro')).toBeInTheDocument();
  });

  it('should not render pro host status when host is not pro', () => {
    const nonProPlace = {
      ...mockPlace,
      host: {
        ...mockPlace.host,
        isPro: false
      }
    };

    const { withStoreComponent } = withStore(
      <PlaceFeatures place={nonProPlace} />,
      initialState
    );

    render(withHistory(withStoreComponent));

    expect(screen.queryByTestId('place-host-pro')).not.toBeInTheDocument();
  });
});
