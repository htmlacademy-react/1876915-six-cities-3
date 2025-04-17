import { render, screen, waitFor } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { withStore } from '../../utils/test/with-store-component';
import MainPage from './main-page';
import { ReactElement, JSX } from 'react';
import { State, RequestStatus } from '../../types';
import { AuthorizationStatus, SliceNameSpace } from '../../const';

describe('Component: MainPage', () => {
  const mockState: Partial<State> = {
    [SliceNameSpace.User]: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      loginStatus: RequestStatus.Pending
    },
    [SliceNameSpace.Place]: {
      previews: [],
      previewsFetchStatus: RequestStatus.Pending,
      placeFetchStatus: RequestStatus.Pending,
      nearbyFetchStatus: RequestStatus.Pending,
      place: null,
      nearbyPreviews: []
    }
  };

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<MainPage />, mockState);
    const preparedComponent = withHistory(withStoreComponent as JSX.Element);

    render(preparedComponent as ReactElement);

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should have correct title', async () => {
    const { withStoreComponent } = withStore(<MainPage />, mockState);
    const preparedComponent = withHistory(withStoreComponent as JSX.Element);

    render(preparedComponent as ReactElement);

    await waitFor(() => {
      expect(document.title).toBe('6 Cities');
    });
  });
});
