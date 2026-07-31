import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { productsApi } from '@/entities/product/api/productsApi';
import type {
  ProductListItem,
  ProductType,
  ProductsMeta,
} from '@/shared/types/domain';
import type { RootState } from '@/app/store/store';

export interface ProductsFilterState {
  type: ProductType | '';
  specification: string;
  search: string;
}

export interface ProductsState {
  items: ProductListItem[];
  meta: ProductsMeta | null;
  filters: ProductsFilterState;
  listStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  deleteStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  meta: null,
  filters: {
    type: '',
    specification: '',
    search: '',
  },
  listStatus: 'idle',
  deleteStatus: 'idle',
  error: null,
};

export const fetchProductsMeta = createAsyncThunk(
  'products/fetchMeta',
  async () => productsApi.fetchMeta(),
);

export const fetchProducts = createAsyncThunk(
  'products/fetchList',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { type, specification, search } = state.products.filters;
    return productsApi.fetchList({
      type: type || undefined,
      specification: specification || undefined,
      search: search || undefined,
    });
  },
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (productId: string) => productsApi.remove(productId),
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductTypeFilter(state, action: PayloadAction<ProductType | ''>) {
      state.filters.type = action.payload;
    },
    setProductSpecificationFilter(state, action: PayloadAction<string>) {
      state.filters.specification = action.payload;
    },
    setProductSearchFilter(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsMeta.fulfilled, (state, action) => {
        state.meta = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.listStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.listStatus = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.listStatus = 'failed';
        state.error = action.error.message ?? 'Failed to load products';
      })
      .addCase(deleteProduct.pending, (state) => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded';
        state.items = state.items.filter(
          (product) => product.id !== action.payload.id,
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.error = action.error.message ?? 'Failed to delete product';
      });
  },
});

export const {
  setProductTypeFilter,
  setProductSpecificationFilter,
  setProductSearchFilter,
} = productsSlice.actions;

export const productsReducer = productsSlice.reducer;

export const selectProducts = (state: RootState): ProductListItem[] =>
  state.products.items;

export const selectProductsFilters = (state: RootState): ProductsFilterState =>
  state.products.filters;

export const selectProductsMeta = (state: RootState): ProductsMeta | null =>
  state.products.meta;

export const selectProductsListStatus = (
  state: RootState,
): ProductsState['listStatus'] => state.products.listStatus;

export const selectDeleteProductStatus = (
  state: RootState,
): ProductsState['deleteStatus'] => state.products.deleteStatus;
