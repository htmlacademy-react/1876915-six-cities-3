import browserHistory from '../../../browser-history';
import { redirect } from './redirect';
import { AnyAction } from 'redux';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../../types';
import { AppRoute } from '../../../const';
import { redirectAction } from './redirect-action';

vi.mock('../../../browser-history', () => ({
  __esModule: true,
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    },
  }
}));

describe('Redirect middleware', () => {
  const initialPath = 'default';
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const storeCreator = configureMockStore<State, AnyAction>(middleware);
    store = storeCreator();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    browserHistory.push(initialPath);
  });

  it('should redirect to "/login" with redirectToRoute action', () => {
    store.dispatch(redirectAction(AppRoute.Login));
    expect(browserHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('should redirect to "/favorites" with redirectToRoute action', () => {
    store.dispatch(redirectAction(AppRoute.Favorites));
    expect(browserHistory.location.pathname).toBe(AppRoute.Favorites);
  });

  it('should redirect to "/offer/:id" with redirectToRoute action', () => {
    const offerId = '123';
    store.dispatch(redirectAction(`${AppRoute.Offer}/${offerId}`));
    expect(browserHistory.location.pathname).toBe(`${AppRoute.Offer}/${offerId}`);
  });

  it('should not redirect with empty action', () => {
    store.dispatch({ type: '', payload: '' });
    expect(browserHistory.location.pathname).toBe(initialPath);
  });

  it('should not redirect with unknown action type', () => {
    store.dispatch({ type: 'unknown/action', payload: AppRoute.Login });
    expect(browserHistory.location.pathname).toBe(initialPath);
  });

  it('should handle redirect with empty payload', () => {
    store.dispatch({ type: 'app/redirectToRoute', payload: '' });
    expect(browserHistory.location.pathname).toBe('');
  });
});
