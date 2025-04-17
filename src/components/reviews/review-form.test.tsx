import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/test/with-store-component';
import { withHistory } from '../../utils/test/with-history-component';
import ReviewForm from './review-form';
import { ApiRoute, MAX_PLACE_RATING, MIN_PLACE_RATING, SliceNameSpace } from '../../const';
import { RequestStatus } from '../../types';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';
import { extractActionsTypes } from '../../utils/test/mocks';
import { createCommentAction } from '../../services/api-actions';

vi.mock('./review-stars', () => ({
  default: () => <div data-testid="review-stars">Review Stars</div>
}));

vi.mock('react-hook-form', () => ({
  useForm: () => ({
    register: (name: string) => ({
      onChange: vi.fn(),
      onBlur: vi.fn(),
      name,
      ref: vi.fn()
    }),
    handleSubmit: (fn: (data: { comment: string; rating: number }) => void) => (e: Event) => {
      e.preventDefault();
      fn({ comment: 'test comment', rating: 5 });
    },
    formState: { isValid: true },
    reset: vi.fn(),
    watch: (name: string) => name === 'rating' ? 5 : ''
  })
}));

describe('Component: ReviewForm', () => {
  const placeId = faker.string.uuid();
  const initialState = {
    [SliceNameSpace.Comments]: {
      commentsFetchStatus: RequestStatus.Fulfilled,
      commentsCreateStatus: RequestStatus.Fulfilled,
      comments: []
    }
  };

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <ReviewForm placeId={placeId} />,
      initialState
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByTestId('review-stars')).toBeInTheDocument();
    expect(screen.getByTestId('review-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('review-submit-button')).toBeInTheDocument();
  });

  it('should disable form when submitting', () => {
    const mockState = {
      ...initialState,
      [SliceNameSpace.Comments]: {
        ...initialState[SliceNameSpace.Comments],
        commentsCreateStatus: RequestStatus.Pending
      }
    };

    const { withStoreComponent } = withStore(
      <ReviewForm placeId={placeId} />,
      mockState
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByText('...Submitting')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should handle form submission', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <ReviewForm placeId={placeId} />,
      initialState
    );

    render(withHistory(withStoreComponent));

    const comment = faker.lorem.paragraph();
    const rating = faker.number.int({ min: MIN_PLACE_RATING, max: MAX_PLACE_RATING });
    const user = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      avatarUrl: faker.image.url(),
      isPro: faker.datatype.boolean()
    };

    const mockResponse = {
      id: placeId,
      comment,
      rating,
      user,
    };


    mockAxiosAdapter.onPost(`${ApiRoute.Comments}/${placeId}`).reply(StatusCodes.OK, mockResponse);
    await userEvent.click(screen.getByTestId('review-submit-button'));

    const actions = mockStore.getActions();
    const actionTypes = extractActionsTypes(actions);
    const actionFulfilled = actions.find((action) => action.type === createCommentAction.fulfilled.type) as ReturnType<typeof createCommentAction.fulfilled>;


    expect(actionTypes).toEqual([
      createCommentAction.pending.type,
      createCommentAction.fulfilled.type,
    ]);

    expect(actionFulfilled.payload).toEqual(mockResponse);
  });
});
