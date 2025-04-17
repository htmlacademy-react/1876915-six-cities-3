import LoginPage from './login-page';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { withStore } from '../../utils/test/with-store-component';
import { AppRoute, AuthorizationStatus, SliceNameSpace } from '../../const';
import { ReactElement, JSX } from 'react';
import { RequestStatus } from '../../types';
import { State } from '../../types';
import { createMemoryHistory } from 'history';

describe('Component: LoginPage', () => {
  const mockState: Partial<State> = {
    [SliceNameSpace.User]: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      loginStatus: RequestStatus.Fulfilled,
    }
  };

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<LoginPage />, mockState);
    const preparedComponent = withHistory(withStoreComponent as JSX.Element);

    render(preparedComponent as ReactElement);

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    expect(screen.getByTestId('login-title')).toHaveTextContent('Sign in');
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    expect(screen.getByTestId('city-link')).toBeInTheDocument();
  });

  it('should redirect to main page if user is authorized', () => {
    const { withStoreComponent } = withStore(<LoginPage />, {
      [SliceNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        loginStatus: RequestStatus.Pending
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.queryByTestId('login-page')).not.toBeInTheDocument();
  });

  it('should dispatch login action when form is submitted', async () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(<LoginPage />, mockState);
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    await userEvent.type(screen.getByTestId('email-input'), 'test@test.com');
    await userEvent.type(screen.getByTestId('password-input'), '123456');

    expect(screen.getByDisplayValue('test@test.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123456')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('submit-button'));
    expect(mockHistory.location.pathname).toBe(AppRoute.Main);
  });
});
