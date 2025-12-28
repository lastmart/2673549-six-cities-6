import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './footer';
import { AppRoute } from '@constants';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const footerContainer = screen.getByTestId('footer-container');
    expect(footerContainer).toBeInTheDocument();
  });

  it('should render logo link with correct attributes', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const logoLink = screen.getByTestId('footer-link');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', AppRoute.Main);
    expect(logoLink).toHaveClass('footer__logo-link');
  });
});
