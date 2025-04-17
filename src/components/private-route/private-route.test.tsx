import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { withStore } from '../../utils/test/with-store-component';
import PrivateRoute from './private-route';
import { createMemoryHistory, MemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus, SliceNameSpace } from '../../const';
import { RequestStatus } from '../../types';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should redirect to login page when user is not authorized', () => {
    const mockState = {
      [SliceNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        loginStatus: RequestStatus.Pending
      }
    };

    const { withStoreComponent } = withStore(
      <PrivateRoute>
        <div data-testid="private-content">Private Content</div>
      </PrivateRoute>,
      mockState
    );

    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(mockHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('should render children when user is authorized', () => {
    const mockState = {
      User: {
        authorizationStatus: AuthorizationStatus.Auth,
        loginStatus: RequestStatus.Pending
      }
    };

    const { withStoreComponent } = withStore(
      <PrivateRoute>
        <div data-testid="private-content">Private Content</div>
      </PrivateRoute>,
      mockState
    );

    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByTestId('private-content')).toBeInTheDocument();
    expect(screen.getByText('Private Content')).toBeInTheDocument();
  });
});
