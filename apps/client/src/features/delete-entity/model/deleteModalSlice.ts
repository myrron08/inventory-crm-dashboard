import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/shared/types/domain';
import type { RootState } from '@/app/store/store';

export type DeleteEntityType = 'order' | 'product';

interface DeleteModalState {
  isOpen: boolean;
  entityType: DeleteEntityType | null;
  entityId: string | null;
  previewProduct: Product | null;
  title: string;
}

const initialState: DeleteModalState = {
  isOpen: false,
  entityType: null,
  entityId: null,
  previewProduct: null,
  title: '',
};

const deleteModalSlice = createSlice({
  name: 'deleteModal',
  initialState,
  reducers: {
    openDeleteOrderModal(
      state,
      action: PayloadAction<{
        orderId: string;
        title: string;
        previewProduct: Product | null;
      }>,
    ) {
      state.isOpen = true;
      state.entityType = 'order';
      state.entityId = action.payload.orderId;
      state.title = action.payload.title;
      state.previewProduct = action.payload.previewProduct;
    },
    openDeleteProductModal(
      state,
      action: PayloadAction<{ productId: string; product: Product }>,
    ) {
      state.isOpen = true;
      state.entityType = 'product';
      state.entityId = action.payload.productId;
      state.title = action.payload.product.name;
      state.previewProduct = action.payload.product;
    },
    closeDeleteModal(state) {
      state.isOpen = false;
      state.entityType = null;
      state.entityId = null;
      state.previewProduct = null;
      state.title = '';
    },
  },
});

export const {
  openDeleteOrderModal,
  openDeleteProductModal,
  closeDeleteModal,
} = deleteModalSlice.actions;

export const deleteModalReducer = deleteModalSlice.reducer;

export const selectDeleteModalState = (state: RootState): DeleteModalState =>
  state.deleteModal;
