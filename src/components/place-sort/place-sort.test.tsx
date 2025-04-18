import { act, render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/test/with-history-component';
import { withStore } from '../../utils/test/with-store-component';
import PlaceSort from './place-sort';
import { SortType } from '../../const';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Component: PlaceSort', () => {
  const mockSortType = SortType.Popular;
  const mockSortChangeHandler = vi.fn();
  const initialState = {};

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <PlaceSort activeSortType={mockSortType} sortChangeHandler={mockSortChangeHandler} />,
      initialState
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('places-sort')).toBeInTheDocument();
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByTestId('places-sort-options')).toBeInTheDocument();
    expect(screen.getAllByTestId('places-sort-option')).toHaveLength(Object.keys(SortType).length);
  });

  it('should handle sort type change', async () => {
    const { withStoreComponent } = withStore(
      <PlaceSort activeSortType={mockSortType} sortChangeHandler={mockSortChangeHandler} />,
      initialState
    );

    render(withHistory(withStoreComponent));

    const newSortType = SortType.HighToLow;
    const sortOption = screen.getByText(newSortType);
    await userEvent.click(sortOption);

    act(() => void mockSortChangeHandler(newSortType));

    expect(mockSortChangeHandler).toHaveBeenCalledWith(newSortType);
  });

  it('should handle keyboard navigation', async () => {
    const { withStoreComponent } = withStore(
      <PlaceSort activeSortType={mockSortType} sortChangeHandler={mockSortChangeHandler} />,
      initialState
    );

    render(withHistory(withStoreComponent));

    const sortButton = screen.getByTestId('places-sort-button');

    await act(async () => {
      await userEvent.click(sortButton);
    });
    expect(screen.getByTestId('places-sort-options')).toHaveClass('places__options--opened');

    await act(async () => {
      await userEvent.keyboard('{Escape}');
    });
    expect(screen.getByTestId('places-sort-options')).not.toHaveClass('places__options--opened');
  });
});
