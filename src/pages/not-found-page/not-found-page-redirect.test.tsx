import NotFoundPageRedirect from './not-found-page-redirect';
import { render } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { AppRoute } from '../../const';
import { createMemoryHistory, MemoryHistory } from 'history';

describe('Component: NotFoundPageRedirect', () => {
  let mockHistory: MemoryHistory;
  beforeEach(() => {
    mockHistory = createMemoryHistory();
    mockHistory.push('/fake-path');
  });

  it('should redirect to not found page', () => {


    const preparedComponent = withHistory(<NotFoundPageRedirect />, mockHistory);

    render(preparedComponent);

    expect(mockHistory.location.pathname).toBe(AppRoute.NotFound);
  });
});
