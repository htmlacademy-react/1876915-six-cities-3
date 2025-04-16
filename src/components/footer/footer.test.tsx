import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import Footer from './footer';
import { AppRoute } from '../../const';

describe('Component: Footer', () => {

  it('should render correctly with default props', () => {
    const customClassName = 'custom-class';
    const preparedComponent = withHistory(<Footer className={customClassName} />);

    render(preparedComponent);

    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toHaveClass('footer');
    expect(screen.getByRole('link')).toHaveAttribute('href', AppRoute.Main);
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toHaveClass('footer', customClassName);
  });
});
