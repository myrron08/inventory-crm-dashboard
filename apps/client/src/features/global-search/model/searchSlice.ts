import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store/store';

interface SearchState {
  query: string;
}

const initialState: SearchState = {
  query: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setGlobalSearchQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    clearGlobalSearchQuery(state) {
      state.query = '';
    },
  },
});

export const { setGlobalSearchQuery, clearGlobalSearchQuery } =
  searchSlice.actions;
export const searchReducer = searchSlice.reducer;

export const selectGlobalSearchQuery = (state: RootState): string =>
  state.search.query;
