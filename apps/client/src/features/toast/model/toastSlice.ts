import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store/store';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastState {
  items: ToastItem[];
}

const initialState: ToastState = {
  items: [],
};

let toastCounter = 0;

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    pushToast(
      state,
      action: PayloadAction<{ message: string; variant?: ToastVariant }>,
    ) {
      toastCounter += 1;
      state.items.push({
        id: `toast-${String(toastCounter)}`,
        message: action.payload.message,
        variant: action.payload.variant ?? 'info',
      });
    },
    removeToast(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { pushToast, removeToast } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;

export const selectToasts = (state: RootState): ToastItem[] =>
  state.toast.items;
