import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store/store';

interface OrderPanelState {
  isOpen: boolean;
  selectedOrderId: string | null;
}

const initialState: OrderPanelState = {
  isOpen: false,
  selectedOrderId: null,
};

const orderPanelSlice = createSlice({
  name: 'orderPanel',
  initialState,
  reducers: {
    openOrderPanel(state, action: PayloadAction<string>) {
      state.isOpen = true;
      state.selectedOrderId = action.payload;
    },
    closeOrderPanel(state) {
      state.isOpen = false;
      state.selectedOrderId = null;
    },
  },
});

export const { openOrderPanel, closeOrderPanel } = orderPanelSlice.actions;
export const orderPanelReducer = orderPanelSlice.reducer;

export const selectIsOrderPanelOpen = (state: RootState): boolean =>
  state.orderPanel.isOpen;

export const selectSelectedOrderId = (state: RootState): string | null =>
  state.orderPanel.selectedOrderId;
