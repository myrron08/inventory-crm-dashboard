import { describe, expect, it, beforeEach } from 'vitest';
import {
  deleteOrder,
  getOrderById,
  listOrders,
  listProducts,
  resetStoreForTests,
} from './memoryStore.js';

describe('memoryStore', () => {
  beforeEach(() => {
    resetStoreForTests();
  });

  it('lists seeded orders', () => {
    expect(listOrders().length).toBeGreaterThanOrEqual(4);
  });

  it('filters products by search', () => {
    const all = listProducts({});
    const filtered = listProducts({ search: 'Gigabyte' });
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.length).toBeLessThanOrEqual(all.length);
  });

  it('deletes order and related products', () => {
    const target = listOrders()[0];
    expect(target).toBeDefined();
    if (!target) {
      return;
    }
    const orderId = target.id;
    const before = listProducts({}).filter((p) => p.orderId === orderId);
    expect(before.length).toBeGreaterThan(0);
    expect(deleteOrder(orderId)).toBe(true);
    expect(getOrderById(orderId)).toBeUndefined();
    expect(listProducts({}).some((p) => p.orderId === orderId)).toBe(false);
  });
});
