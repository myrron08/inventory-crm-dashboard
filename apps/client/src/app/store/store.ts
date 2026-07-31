import { configureStore } from '@reduxjs/toolkit';
import { ordersReducer } from '@/entities/order/model/ordersSlice';
import { productsReducer } from '@/entities/product/model/productsSlice';
import { tabsReducer } from '@/entities/session/model/tabsSlice';
import { orderPanelReducer } from '@/features/order-panel/model/orderPanelSlice';
import { deleteModalReducer } from '@/features/delete-entity/model/deleteModalSlice';
import { searchReducer } from '@/features/global-search/model/searchSlice';
import { toastReducer } from '@/features/toast/model/toastSlice';

export const store = configureStore({
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
