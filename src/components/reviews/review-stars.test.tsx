import { render, screen } from '@testing-library/react';
import ReviewStars from './review-stars';
import { RATING_GRADES } from '../../const';
import { vi } from 'vitest';

vi.mock('react-hook-form', () => ({
  useForm: () => ({
    register: () => ({
      onChange: vi.fn(),
      onBlur: vi.fn(),
      name: 'rating',
      ref: vi.fn()
    })
  })
}));

describe('Component: ReviewStars', () => {
  it('should render correctly', () => {
    render(<ReviewStars register={vi.fn()} />);

    RATING_GRADES.forEach((grade) => {
      expect(screen.getByTitle(grade)).toBeInTheDocument();
    });
  });
});
