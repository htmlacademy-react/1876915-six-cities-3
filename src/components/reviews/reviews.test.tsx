import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/test/with-store-component';
import { withHistory } from '../../utils/test/with-history-component';
import Reviews from './reviews';
import { generatePlaceComment } from '../../utils/test/mocks';
import { AuthorizationStatus, SliceNameSpace } from '../../const';
import { RequestStatus } from '../../types';
import { vi } from 'vitest';
import { faker } from '@faker-js/faker';

vi.mock('../place-card/place-rating', () => ({
  default: () => <div data-testid="place-rating">Place Rating</div>
}));

vi.mock('./review-form', () => ({
  default: () => <div data-testid="review-form">Review Form</div>
}));

describe('Component: Reviews', () => {

  const placeId = faker.string.uuid();
  const mockReviews = [generatePlaceComment(), generatePlaceComment()];
  const initialState = {
    [SliceNameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      loginStatus: RequestStatus.Fulfilled
    }
  };

  beforeEach(() => {
    vi.spyOn(Array.prototype, 'toSorted').mockImplementation(function <T>(this: T[], compareFn?: (a: T, b: T) => number) {
      return [...this].sort(compareFn);
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with reviews', () => {

    const { withStoreComponent } = withStore(
      <Reviews reviews={mockReviews} placeId={placeId} />,
      initialState
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('reviews')).toBeInTheDocument();
    expect(screen.getByTestId('reviews-amount')).toHaveTextContent(mockReviews.length.toString());
    expect(screen.getAllByTestId('review-item')).toHaveLength(mockReviews.length);
    expect(screen.getByTestId('review-form')).toBeInTheDocument();
  });


  it('should not render review form for unauthorized users', () => {
    const mockState = {
      [SliceNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        loginStatus: RequestStatus.Fulfilled
      }
    };

    const { withStoreComponent } = withStore(
      <Reviews reviews={mockReviews} placeId={placeId} />,
      mockState
    );

    render(withHistory(withStoreComponent));

    expect(screen.queryByTestId('review-form')).not.toBeInTheDocument();
  });
});
