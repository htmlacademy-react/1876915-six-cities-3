import { RequestStatus } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { userReducer } from '../index';
import { checkAuthAction, loginAction, logoutAction } from '../../services/api-actions';
import { UserState } from '../../types/state';
import { LoggedUser } from '../../types/user';

describe('User slice', () => {
  const initialState: UserState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    loginStatus: RequestStatus.Fulfilled,
  };

  const mockUser: LoggedUser = {
    email: 'test@test.com',
    name: 'Test User',
    avatarUrl: 'test.jpg',
    isPro: false,
    token: 'test-token'
  };

  it('should return initial state', () => {
    const result = userReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle checkAuthAction.fulfilled', () => {
    const result = userReducer(initialState, checkAuthAction.fulfilled(undefined, '', undefined));
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should handle checkAuthAction.rejected', () => {
    const result = userReducer(initialState, checkAuthAction.rejected(null, '', undefined));
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should handle loginAction.pending', () => {
    const result = userReducer(initialState, loginAction.pending('', { email: '', password: '' }));
    expect(result.loginStatus).toBe(RequestStatus.Pending);
  });

  it('should handle loginAction.fulfilled', () => {
    const result = userReducer(initialState, loginAction.fulfilled(mockUser, '', { email: '', password: '' }));
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.loginStatus).toBe(RequestStatus.Fulfilled);
  });

  it('should handle loginAction.rejected', () => {
    const result = userReducer(initialState, loginAction.rejected(null, '', { email: '', password: '' }));
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.loginStatus).toBe(RequestStatus.Rejected);
  });

  it('should handle logoutAction.fulfilled', () => {
    const result = userReducer(initialState, logoutAction.fulfilled(undefined, '', undefined));
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });
});
