import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store/store';

interface TabsState {
  activeTabsCount: number;
}

const initialState: TabsState = {
  activeTabsCount: 1,
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setActiveTabsCount(state, action: PayloadAction<number>) {
      state.activeTabsCount = Math.max(0, action.payload);
    },
  },
});

export const { setActiveTabsCount } = tabsSlice.actions;
export const tabsReducer = tabsSlice.reducer;

export const selectActiveTabsCount = (state: RootState): number =>
  state.tabs.activeTabsCount;
