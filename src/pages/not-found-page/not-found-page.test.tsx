import NotFoundPage from './not-found-page';
import { render, screen, waitFor } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { AppRoute } from '../../const';

describe('Component: NotFoundPage', () => {
  it('should render correctly', async () => {
    const preparedComponent = withHistory(<NotFoundPage />);

    render(preparedComponent);

    expect(screen.getByText('404 Page not found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Go Back/i })).toHaveAttribute('href', AppRoute.Main);
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument();

    await waitFor(() => {
      expect(document.title).toBe('6 Cities. Page not found');
    });
  });
});
