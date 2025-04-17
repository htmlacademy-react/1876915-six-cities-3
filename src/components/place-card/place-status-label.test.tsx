import { render, screen } from '@testing-library/react';
import PlaceStatusLabel from './place-status-label';

describe('Component: PlaceStatusLabel', () => {
  it('should render correctly with default text', () => {
    render(<PlaceStatusLabel className="place-card__mark" />);

    expect(screen.getByTestId('place-status-label')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should render correctly with custom text', () => {
    const customText = 'Custom Label';

    render(<PlaceStatusLabel className="place-card__mark" text={customText} />);

    expect(screen.getByTestId('place-status-label')).toBeInTheDocument();
    expect(screen.getByText(customText)).toBeInTheDocument();
  });
});
