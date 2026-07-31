import type { Order, Product } from '../types/domain.js';

const longOrderTitle = 'Длинное предлинное длиннющее название прихода';
const longGroupName = 'Длинное предлинное длиннющее название группы';

const productName = 'Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3';

function buildProduct(
  id: string,
  orderId: string,
  overrides: Partial<Product> = {},
): Product {
  return {
    id,
    orderId,
    name: productName,
    serialNumber: 'SN-123456789',
    type: 'monitor',
    specification: 'Moni I',
    status: 'free',
    condition: 'new',
    priceUsd: 2500,
    priceUah: 250_000.5,
    groupName: longGroupName,
    assignee: null,
    warrantyStart: '2017-04-06T00:00:00.000Z',
    warrantyEnd: '2025-08-06T00:00:00.000Z',
    imageUrl: '/assets/monitor.svg',
    createdAt: '2017-09-06T00:00:00.000Z',
    ...overrides,
  };
}

function buildOrder(
  id: string,
  title: string,
  createdAt: string,
  productOverrides: Partial<Product>[] = [],
): Order {
  const products = productOverrides.map((override, index) =>
    buildProduct(`${id}-p${index + 1}`, id, override),
  );
  const resolvedProducts =
    products.length > 0
      ? products
      : Array.from({ length: 6 }, (_, i) =>
          buildProduct(`${id}-p${i + 1}`, id),
        );
  const productCount = 23;
  const totalPriceUsd =
    resolvedProducts.reduce((sum, p) => sum + p.priceUsd, 0) || 2500;
  const totalPriceUah =
    resolvedProducts.reduce((sum, p) => sum + p.priceUah, 0) || 250_000.5;

  return {
    id,
    title,
    productCount,
    totalPriceUsd,
    totalPriceUah,
    createdAt,
    products: resolvedProducts,
  };
}

const coreOrders: Order[] = [
  buildOrder('ord-1', longOrderTitle, '2017-04-06T12:00:00.000Z', [
    { status: 'free', assignee: 'Христорождественский Александр' },
    { status: 'in_repair', condition: 'used' },
    { status: 'free' },
    { status: 'in_repair', condition: 'used', assignee: null },
  ]),
  buildOrder('ord-2', longOrderTitle, '2017-04-06T14:00:00.000Z'),
  buildOrder('ord-3', longOrderTitle, '2017-10-06T10:00:00.000Z'),
  buildOrder('ord-4', longOrderTitle, '2017-10-12T08:00:00.000Z'),
];

const generatedOrders: Order[] = Array.from({ length: 56 }, (_, index) => {
  const day = String((index % 28) + 1).padStart(2, '0');
  const month = index % 2 === 0 ? '04' : '10';
  return buildOrder(
    `ord-gen-${index + 1}`,
    `${longOrderTitle} (${index + 5})`,
    `2017-${month}-${day}T10:00:00.000Z`,
    index % 3 === 0
      ? [{ status: index % 2 === 0 ? 'free' : 'in_repair', condition: 'used' }]
      : [],
  );
});

export const initialOrders: Order[] = [...coreOrders, ...generatedOrders];

export const initialProducts: Product[] = initialOrders.flatMap((order) =>
  order.products.map((product) => ({ ...product })),
);

export const productTypeOptions: Product['type'][] = [
  'monitor',
  'laptop',
  'storage',
  'other',
];

export const specificationOptions = ['Moni I', 'Moni II', 'Storage Pro'];
