import { render, screen } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import NotFoundPage from './not-found-page';
import { withHistory } from 'lib/test-utils/mock-component';
import { AppRoute } from '@constants';

vi.mock('services/process-error-handle', () => ({
  processErrorHandle: vi.fn(),
}));

describe('Component: Not found page', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Favorites);
  });

  it('should render correct', () => {
    const expectedText = /404. Page not found/i;

    const preparedComponent = withHistory(<NotFoundPage />, mockHistory);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
