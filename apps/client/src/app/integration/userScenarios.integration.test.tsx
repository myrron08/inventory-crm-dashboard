import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { screen, waitFor, within } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { AppShell } from '@/widgets/app-shell/AppShell';
import { OrdersPage } from '@/pages/orders/ui/OrdersPage';
import { ProductsPage } from '@/pages/products/ui/ProductsPage';
import { renderWithProviders } from '@/shared/test/renderWithProviders';

function renderApp(route = '/orders') {
  return renderWithProviders(
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route path="orders" element={<OrdersPage />} />
        <Route path="products" element={<ProductsPage />} />
      </Route>
    </Routes>,
    { route },
  );
}

describe('User scenarios (integration)', () => {
  it('navigates between orders and products', async () => {
    const user = userEvent.setup();
    renderApp('/orders');

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Приходы/i }),
      ).toBeInTheDocument();
    });

    await user.click(screen.getByRole('link', { name: 'ПРОДУКТЫ' }));

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Продукты/i }),
      ).toBeInTheDocument();
    });
  });

  it('filters orders via global search', async () => {
    const user = userEvent.setup();
    renderApp('/orders');

    const search = await screen.findByRole('searchbox', { name: /Поиск/i });
    await user.type(search, 'Тестовый');

    await waitFor(() => {
      expect(screen.getByText('Тестовый приход')).toBeInTheDocument();
    });
  });

  it('renders product delete actions in the table', async () => {
    renderApp('/products');

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Продукты/i }),
      ).toBeInTheDocument();
    });

    const deleteButtons = await screen.findAllByRole('button', {
      name: /Удалить продукт/i,
    });
    expect(deleteButtons.length).toBeGreaterThan(0);
  });

  it('opens order details panel on card click', async () => {
    const user = userEvent.setup();
    renderApp('/orders');

    await waitFor(() => {
      expect(screen.getByText('Тестовый приход')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Тестовый приход'));

    const panel = await screen.findByRole('complementary', {
      name: /Детали прихода/i,
    });
    expect(within(panel).getByText(/Тестовый приход/)).toBeInTheDocument();
  });
});
