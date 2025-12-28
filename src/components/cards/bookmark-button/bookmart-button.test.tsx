import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookmarkButton } from './bookmark-button';

describe('Component: BookmarkButton', () => {
  const onClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly inactive button', () => {
    render(
      <BookmarkButton
        blockName="place-card"
        isActive={false}
        width={18}
        height={19}
        onClick={onClick}
      />
    );

    const button = screen.getByTestId('bookmark-button');
    expect(button).toBeInTheDocument();

    const text = screen.getByTestId('bookmark-text');
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('To bookmarks');
  });

  it('should render correctly active button', () => {
    render(
      <BookmarkButton
        blockName="offer"
        isActive
        width={31}
        height={33}
        onClick={onClick}
      />
    );

    const button = screen.getByTestId('bookmark-button');
    expect(button).toBeInTheDocument();

    const text = screen.getByTestId('bookmark-text');
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('In bookmarks');
  });

  it('should call onClick when button is clicked', () => {
    render(
      <BookmarkButton
        blockName="place-card"
        isActive
        width={31}
        height={33}
        onClick={onClick}
      />
    );

    const button = screen.getByTestId('bookmark-button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should have correct width and height', () => {
    render(
      <BookmarkButton
        blockName="place-card"
        isActive={false}
        width={18}
        height={19}
        onClick={onClick}
      />
    );

    const icon = screen.getByTestId('bookmark-icon');
    expect(icon).toHaveAttribute('width', '18');
    expect(icon).toHaveAttribute('height', '19');
  });
});
