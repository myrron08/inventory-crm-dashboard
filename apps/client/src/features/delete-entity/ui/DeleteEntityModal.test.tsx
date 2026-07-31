import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DeleteEntityModal } from '@/features/delete-entity/ui/DeleteEntityModal';
import { openDeleteProductModal } from '@/features/delete-entity/model/deleteModalSlice';
import { renderWithProviders } from '@/shared/test/renderWithProviders';
import { mockProducts } from '@/shared/api/mocks/fixtures';

describe('DeleteEntityModal', () => {
  it('opens and confirms product deletion flow UI', async () => {
    const user = userEvent.setup();
    const product = mockProducts[0];
    if (!product) {
      throw new Error('Missing mock product');
    }

    const { store } = renderWithProviders(<DeleteEntityModal />);
    store.dispatch(
      openDeleteProductModal({
        productId: product.id,
        product,
      }),
    );

    expect(
      await screen.findByText(/удалить этот продукт/i),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'ОТМЕНИТЬ' }));
  });
});
