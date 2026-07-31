import { describe, expect, it, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from './createApp.js';
import { resetStoreForTests } from './store/memoryStore.js';

interface OrderSummaryResponse {
  id: string;
  title: string;
}

interface ProductListItemResponse {
  type: string;
}

describe('REST API', () => {
  const app = createApp();

  beforeEach(() => {
    resetStoreForTests();
  });

  it('returns health', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });

  it('lists orders', async () => {
    const response = await request(app).get('/api/orders');
    expect(response.status).toBe(200);
    const body = response.body as OrderSummaryResponse[];
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  it('lists products with filters', async () => {
    const response = await request(app).get('/api/products?type=monitor');
    expect(response.status).toBe(200);
    const body = response.body as ProductListItemResponse[];
    expect(body.every((item) => item.type === 'monitor')).toBe(true);
  });
});
