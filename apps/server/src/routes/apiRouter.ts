import { Router } from 'express';
import {
  deleteOrder,
  deleteProduct,
  getOrderById,
  getProductPreviewForOrder,
  listOrders,
  listProducts,
} from '../store/memoryStore.js';
import type { ProductType } from '../types/domain.js';
import { productTypeOptions, specificationOptions } from '../data/seed.js';

export const apiRouter = Router();

apiRouter.get('/health', (_req, res) => {
  res.json({ ok: true });
});

apiRouter.get('/orders', (_req, res) => {
  const data = listOrders().map(
    ({ id, title, productCount, totalPriceUsd, totalPriceUah, createdAt }) => ({
      id,
      title,
      productCount,
      totalPriceUsd,
      totalPriceUah,
      createdAt,
    }),
  );
  res.json(data);
});

apiRouter.get('/orders/:id', (req, res) => {
  const order = getOrderById(req.params.id);
  if (!order) {
    res.status(404).json({ message: 'Order not found' });
    return;
  }
  res.json(order);
});

apiRouter.delete('/orders/:id', (req, res) => {
  const preview = getProductPreviewForOrder(req.params.id);
  const deleted = deleteOrder(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: 'Order not found' });
    return;
  }
  res.json({ id: req.params.id, previewProduct: preview ?? null });
});

apiRouter.get('/products/meta', (_req, res) => {
  res.json({
    types: productTypeOptions,
    specifications: specificationOptions,
  });
});

apiRouter.get('/products', (req, res) => {
  const type = req.query.type as ProductType | undefined;
  const specification =
    typeof req.query.specification === 'string'
      ? req.query.specification
      : undefined;
  const search =
    typeof req.query.search === 'string' ? req.query.search : undefined;

  const data = listProducts({ type, specification, search });
  res.json(data);
});

apiRouter.delete('/products/:id', (req, res) => {
  const deleted = deleteProduct(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  res.json({ id: req.params.id });
});
