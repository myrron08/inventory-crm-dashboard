import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { OrdersPage } from '@/pages/orders/ui/OrdersPage';
import { renderWithProviders } from '@/shared/test/renderWithProviders';

describe('OrdersPage', () => {
  it('loads and renders orders from API', async () => {
    renderWithProviders(<OrdersPage />, { route: '/orders' });
    expect(
      screen.getByRole('heading', { name: /Приходы/i }),
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Тестовый приход')).toBeInTheDocument();
    });
  });
});
