import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, it } from 'vitest';
import { ordersReducer, fetchOrders } from '@/entities/order/model/ordersSlice';
import {
  tabsReducer,
  setActiveTabsCount,
} from '@/entities/session/model/tabsSlice';

describe('orders slice', () => {
  it('sets loading on fetchOrders.pending', () => {
    const state = ordersReducer(undefined, { type: fetchOrders.pending.type });
    expect(state.listStatus).toBe('loading');
  });
});

describe('tabs slice', () => {
  it('updates active tabs count', () => {
    const state = tabsReducer(undefined, setActiveTabsCount(3));
    expect(state.activeTabsCount).toBe(3);
  });

  it('never goes below zero', () => {
    const state = tabsReducer(undefined, setActiveTabsCount(-1));
    expect(state.activeTabsCount).toBe(0);
  });
});

describe('store wiring', () => {
  it('creates store with orders reducer', () => {
    const store = configureStore({ reducer: { orders: ordersReducer } });
    expect(store.getState().orders.items).toEqual([]);
  });
});
