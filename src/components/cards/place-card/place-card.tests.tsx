import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PlaceCard } from './place-card';
import { makeFakeOffer } from 'lib/test-utils/mocks';

vi.mock('hooks/use-favorite-offer-update', () => ({
  useFavoriteOfferUpdate: vi.fn(() => vi.fn()),
}));

vi.mock('./bookmark-button/bookmark-button', () => ({
  BookmarkButton: ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      data-testid="bookmark-button"
    >
      Bookmark
    </button>
  ),
}));

describe('Component: PlaceCard', () => {
  const mockOffer = makeFakeOffer();

  const renderPlaceCard = (props = {}) =>
    render(
      <MemoryRouter>
        <PlaceCard
          offer={mockOffer}
          blockName="cities"
          {...props}
        />
      </MemoryRouter>
    );

  it('should render correct', () => {
    renderPlaceCard();

    expect(screen.getByTestId('place-card')).toBeInTheDocument();
    expect(screen.getByTestId('place-image')).toBeInTheDocument();
    expect(screen.getByTestId('place-price')).toBeInTheDocument();
    expect(screen.getByTestId('rating-stars')).toBeInTheDocument();
    expect(screen.getByTestId('place-title')).toBeInTheDocument();
    expect(screen.getByTestId('place-link')).toBeInTheDocument();
    expect(screen.getByTestId('place-type')).toBeInTheDocument();
  });

  it('should show premium mark when offer.isPremium is true', () => {
    const offerWithPremium = { ...mockOffer, isPremium: true };
    renderPlaceCard(offerWithPremium);

    expect(screen.getByTestId('premium-mark')).toBeInTheDocument();
    expect(screen.getByTestId('premium-mark')).toHaveTextContent('Premium');
  });

  it('should not show premium mark when offer.isPremium is false', () => {
    const offerWithoutPremium = { ...mockOffer, isPremium: false };
    renderPlaceCard({ offer: offerWithoutPremium });

    expect(screen.queryByTestId('premium-mark')).not.toBeInTheDocument();
  });

  it('should display correct offer information', () => {
    renderPlaceCard();

    expect(screen.getByTestId('place-price')).toHaveTextContent(`€${mockOffer.price}`);
    expect(screen.getByTestId('place-title')).toHaveTextContent(mockOffer.title);
    expect(screen.getByTestId('place-type')).toHaveTextContent(mockOffer.type);
  });

  it('should have correct link to offer details', () => {
    renderPlaceCard();

    const link = screen.getByTestId('place-link');
    expect(link).toHaveAttribute('href', `/offer/${mockOffer.id}`);
  });

  it('should call onMouseEnter when mouse enters', () => {
    const onMouseEnter = vi.fn();
    renderPlaceCard({ onMouseEnter });

    const card = screen.getByTestId('place-card');
    fireEvent.mouseEnter(card);

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('should call onMouseLeave when mouse leaves', () => {
    const onMouseLeave = vi.fn();
    renderPlaceCard({ onMouseLeave });

    const card = screen.getByTestId('place-card');
    fireEvent.mouseLeave(card);

    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });
});
