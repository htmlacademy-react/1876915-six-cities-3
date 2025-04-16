import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { withStore } from '../../utils/test/with-store-component';
import PlaceGallery from './place-gallery';
import { SliceNameSpace } from '../../const';
import { RequestStatus } from '../../types';
import { generatePlace } from '../../utils/test/mocks';
import { vi } from 'vitest';

vi.mock('../place-image/place-image', () => ({
  default: () => <div data-testid="place-image">Place Image</div>
}));

describe('Component: PlaceGallery', () => {
  const mockPlace = generatePlace();
  const initialState = {
    [SliceNameSpace.Place]: {
      place: mockPlace,
      placeFetchStatus: RequestStatus.Fulfilled,
      nearbyPreviews: [],
      nearbyFetchStatus: RequestStatus.Fulfilled,
      previews: [],
      previewsFetchStatus: RequestStatus.Fulfilled
    }
  };

  it('should render correctly with images', () => {
    const { withStoreComponent } = withStore(
      <PlaceGallery imageUrls={mockPlace.images} />,
      initialState
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('place-gallery')).toBeInTheDocument();
    expect(screen.getAllByTestId('place-gallery-image-wrapper')).toHaveLength(mockPlace.images.length);
  });

  it('should render correctly with empty images', () => {
    const { withStoreComponent } = withStore(
      <PlaceGallery imageUrls={[]} />,
      initialState
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('place-gallery')).toBeInTheDocument();
    expect(screen.queryAllByTestId('place-gallery-image-wrapper')).toHaveLength(0);
  });
});
