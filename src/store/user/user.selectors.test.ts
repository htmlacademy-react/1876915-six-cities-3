import { getAuthStatus, getLoginStatus } from './user.selectors';
import { RequestStatus } from '../../types/state';
import { SliceNameSpace } from '../../const';
import { AuthorizationStatus } from '../../const';

describe('User selectors', () => {
  const mockState = {
    [SliceNameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      loginStatus: RequestStatus.Fulfilled
    }
  };

  it('should return auth status', () => {
    const result = getAuthStatus(mockState);
    expect(result).toBe(AuthorizationStatus.Auth);
  });

  it('should return login status', () => {
    const result = getLoginStatus(mockState);
    expect(result).toBe(RequestStatus.Fulfilled);
  });
});
