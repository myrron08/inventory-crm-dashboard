import { http, HttpResponse } from 'msw';
import {
  mockOrderDetails,
  mockOrderSummaries,
  mockProducts,
} from '@/shared/api/mocks/fixtures';

export const handlers = [
  http.get('/api/orders', () => HttpResponse.json(mockOrderSummaries)),
  http.get('/api/orders/:id', () => HttpResponse.json(mockOrderDetails)),
  http.delete('/api/orders/:id', ({ params }) =>
    HttpResponse.json({
      id: String(params.id),
      previewProduct: mockOrderDetails.products[0] ?? null,
    }),
  ),
  http.get('/api/products/meta', () =>
    HttpResponse.json({
      types: ['monitor', 'laptop', 'storage', 'other'],
      specifications: ['Moni I', 'Moni II'],
    }),
  ),
  http.get('/api/products', () => HttpResponse.json(mockProducts)),
  http.delete('/api/products/:id', ({ params }) =>
    HttpResponse.json({ id: String(params.id) }),
  ),
];
