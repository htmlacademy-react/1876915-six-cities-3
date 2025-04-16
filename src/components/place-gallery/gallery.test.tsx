import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { withStore } from '../../utils/test/with-store-component';
import Gallery from './gallery';
import { faker } from '@faker-js/faker';

describe('Component: Gallery', () => {
  const mockImageUrls = Array.from({ length: 6 }, () => faker.image.url());
  const initialState = {};

  it('should render correctly with images', () => {
    const { withStoreComponent } = withStore(
      <Gallery imageUrls={mockImageUrls} />,
      initialState
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('gallery')).toBeInTheDocument();
    expect(screen.getAllByTestId('gallery-image-wrapper')).toHaveLength(mockImageUrls.length);
    expect(screen.getAllByTestId('gallery-image')).toHaveLength(mockImageUrls.length);

    const images = screen.getAllByTestId('gallery-image');
    images.forEach((img, index) => {
      expect(img).toHaveAttribute('src', mockImageUrls[index]);
      expect(img).toHaveAttribute('alt', `Offer photo #${index}}`);
    });
  });

  it('should render correctly with empty images', () => {
    const { withStoreComponent } = withStore(
      <Gallery imageUrls={[]} />,
      initialState
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('gallery')).toBeInTheDocument();
    expect(screen.queryAllByTestId('gallery-image-wrapper')).toHaveLength(0);
    expect(screen.queryAllByTestId('gallery-image')).toHaveLength(0);
  });
});
