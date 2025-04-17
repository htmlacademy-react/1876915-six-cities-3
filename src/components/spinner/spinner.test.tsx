import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    render(<Spinner />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('spin-wrapper');
  });
});
