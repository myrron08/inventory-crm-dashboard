import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { ordersReducer } from '@/entities/order/model/ordersSlice';
import { productsReducer } from '@/entities/product/model/productsSlice';
import { tabsReducer } from '@/entities/session/model/tabsSlice';
import { orderPanelReducer } from '@/features/order-panel/model/orderPanelSlice';
import { deleteModalReducer } from '@/features/delete-entity/model/deleteModalSlice';
import { searchReducer } from '@/features/global-search/model/searchSlice';
import { toastReducer } from '@/features/toast/model/toastSlice';
import type { ReactElement, ReactNode } from 'react';

export function createTestStore() {
  return configureStore({
    reducer: {
      orders: ordersReducer,
      products: productsReducer,
      tabs: tabsReducer,
      orderPanel: orderPanelReducer,
      deleteModal: deleteModalReducer,
      search: searchReducer,
      toast: toastReducer,
    },
  });
}

interface ExtendedOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
}

export function renderWithProviders(
  ui: ReactElement,
  { route = '/', ...options }: ExtendedOptions = {},
) {
  const store = createTestStore();

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    );
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
}
