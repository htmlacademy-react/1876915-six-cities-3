import PlaceCardImage from './place-card-image';
import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { AppRoute, ImageDefault } from '../../const';
import { faker } from '@faker-js/faker';

describe('Component: PlaceCardImage', () => {

  it('should render correctly', () => {

    const mockProps = {
      id: faker.string.uuid(),
      url: faker.image.url(),
      className: faker.word.sample(),
      width: faker.number.int({ min: 200, max: 300 }),
      height: faker.number.int({ min: 150, max: 250 })
    };

    const preparedComponent = withHistory(<PlaceCardImage {...mockProps} />);

    render(preparedComponent);

    expect(screen.getByTestId('place-card-wrapper')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', `${AppRoute.PlaceWithoutId}/${mockProps.id}`);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProps.url);
    expect(image).toHaveAttribute('width', mockProps.width.toString());
    expect(image).toHaveAttribute('height', mockProps.height.toString());
  });

  it('should use default width and height if not provided', () => {

    const mockProps = {
      id: faker.string.uuid(),
      url: faker.image.url(),
      className: faker.word.sample(),
    };

    const preparedComponent = withHistory(<PlaceCardImage {...mockProps} />);

    render(preparedComponent);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('width', ImageDefault.DefaultWidth.toString());
    expect(image).toHaveAttribute('height', ImageDefault.DefaultHeight.toString());
  });
});
