import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { MainNav } from '@/widgets/main-nav/MainNav';
import { renderWithProviders } from '@/shared/test/renderWithProviders';

describe('MainNav', () => {
  it('renders orders and products links', () => {
    renderWithProviders(<MainNav />);
    expect(screen.getByRole('link', { name: 'ПРИХОД' })).toHaveAttribute(
      'href',
      '/orders',
    );
    expect(screen.getByRole('link', { name: 'ПРОДУКТЫ' })).toHaveAttribute(
      'href',
      '/products',
    );
  });

  it('highlights active route', () => {
    renderWithProviders(<MainNav />, { route: '/products' });
    expect(screen.getByRole('link', { name: 'ПРОДУКТЫ' })).toHaveClass(
      'main-nav__link--active',
    );
  });
});
