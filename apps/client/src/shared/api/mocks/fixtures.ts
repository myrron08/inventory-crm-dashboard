import type {
  OrderDetails,
  OrderSummary,
  ProductListItem,
} from '@/shared/types/domain';

const baseProduct = {
  id: 'ord-1-p1',
  orderId: 'ord-1',
  name: 'Gigabyte Technology X58-USB3',
  serialNumber: 'SN-123456789',
  type: 'monitor' as const,
  specification: 'Moni I',
  status: 'free' as const,
  condition: 'new' as const,
  priceUsd: 2500,
  priceUah: 250_000.5,
  groupName: 'Группа A',
  assignee: null,
  warrantyStart: '2017-04-06T00:00:00.000Z',
  warrantyEnd: '2025-08-06T00:00:00.000Z',
  imageUrl: '/assets/monitor.svg',
  createdAt: '2017-09-06T00:00:00.000Z',
};

export const mockOrderSummaries: OrderSummary[] = [
  {
    id: 'ord-1',
    title: 'Тестовый приход',
    productCount: 23,
    totalPriceUsd: 2500,
    totalPriceUah: 250_000.5,
    createdAt: '2017-04-06T12:00:00.000Z',
  },
];

export const mockOrderDetails: OrderDetails = {
  id: 'ord-1',
  title: 'Тестовый приход',
  productCount: 23,
  totalPriceUsd: 2500,
  totalPriceUah: 250_000.5,
  createdAt: '2017-04-06T12:00:00.000Z',
  products: [baseProduct],
};

export const mockProducts: ProductListItem[] = [
  {
    ...baseProduct,
    orderTitle: 'Тестовый приход',
  },
];
