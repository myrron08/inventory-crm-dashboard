import { describe, expect, it } from 'vitest';
import { ordersApi } from '@/entities/order/api/ordersApi';
import { mockOrderSummaries } from '@/shared/api/mocks/fixtures';

describe('ordersApi', () => {
  it('fetches order list', async () => {
    const orders = await ordersApi.fetchList();
    expect(orders).toEqual(mockOrderSummaries);
  });
});
