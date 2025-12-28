import { render, screen } from '@testing-library/react';
import { EmptyFavoritesList } from './empty-favorites-list';

describe('Component: Loading screen', () => {
  it('should render correct', () => {
    const expectedText = /Save properties to narrow down search or plan your future trips./i;

    render(<EmptyFavoritesList />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
