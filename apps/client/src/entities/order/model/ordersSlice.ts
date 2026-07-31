import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ordersApi } from '@/entities/order/api/ordersApi';
import type { OrderDetails, OrderSummary } from '@/shared/types/domain';
import type { RootState } from '@/app/store/store';

export interface OrdersState {
  items: OrderSummary[];
  selectedOrder: OrderDetails | null;
  listStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  detailsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  deleteStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  selectedOrder: null,
  listStatus: 'idle',
  detailsStatus: 'idle',
  deleteStatus: 'idle',
  error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchList', async () =>
  ordersApi.fetchList(),
);

export const fetchOrderDetails = createAsyncThunk(
  'orders/fetchDetails',
  async (orderId: string) => ordersApi.fetchById(orderId),
);

export const deleteOrder = createAsyncThunk(
  'orders/delete',
  async (orderId: string) => ordersApi.remove(orderId),
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearSelectedOrder(state) {
      state.selectedOrder = null;
      state.detailsStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.listStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.listStatus = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.listStatus = 'failed';
        state.error = action.error.message ?? 'Failed to load orders';
      })
      .addCase(fetchOrderDetails.pending, (state) => {
        state.detailsStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.detailsStatus = 'succeeded';
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.detailsStatus = 'failed';
        state.error = action.error.message ?? 'Failed to load order details';
      })
      .addCase(deleteOrder.pending, (state) => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded';
        state.items = state.items.filter(
          (order) => order.id !== action.payload.id,
        );
        if (state.selectedOrder?.id === action.payload.id) {
          state.selectedOrder = null;
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.error = action.error.message ?? 'Failed to delete order';
      });
  },
});

export const { clearSelectedOrder } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;

export const selectOrders = (state: RootState): OrderSummary[] =>
  state.orders.items;

export const selectOrdersListStatus = (
  state: RootState,
): OrdersState['listStatus'] => state.orders.listStatus;

export const selectSelectedOrder = (state: RootState): OrderDetails | null =>
  state.orders.selectedOrder;

export const selectOrderDetailsStatus = (
  state: RootState,
): OrdersState['detailsStatus'] => state.orders.detailsStatus;

export const selectOrdersError = (state: RootState): string | null =>
  state.orders.error;

export const selectDeleteOrderStatus = (
  state: RootState,
): OrdersState['deleteStatus'] => state.orders.deleteStatus;
