import { getAuthStatus, getLoginStatus } from './user.selectors';
import { RequestStatus } from '../../types/state';
import { SliceNameSpace } from '../../const';
import { AuthorizationStatus } from '../../const';

describe('User selectors', () => {
  const state = {
    [SliceNameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      loginStatus: RequestStatus.Fulfilled
    }
  };

  it('should return auth status', () => {
    const result = getAuthStatus(state);
    expect(result).toBe(AuthorizationStatus.Auth);
  });

  it('should return login status', () => {
    const result = getLoginStatus(state);
    expect(result).toBe(RequestStatus.Fulfilled);
  });
});
