import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { ProductsPage } from '@/pages/products/ui/ProductsPage';
import { renderWithProviders } from '@/shared/test/renderWithProviders';

describe('ProductsPage', () => {
  it('loads and renders products from API', async () => {
    renderWithProviders(<ProductsPage />, { route: '/products' });
    expect(
      screen.getByRole('heading', { name: /Продукты/i }),
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByText('Gigabyte Technology X58-USB3'),
      ).toBeInTheDocument();
    });
  });
});
