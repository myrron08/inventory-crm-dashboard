import type {
  Order,
  Product,
  ProductListItem,
  ProductType,
} from '../types/domain.js';
import { initialOrders, initialProducts } from '../data/seed.js';

let orders: Order[] = structuredClone(initialOrders);
let products: Product[] = structuredClone(initialProducts);

function syncOrderAggregates(order: Order): void {
  order.productCount = order.products.length;
  order.totalPriceUsd = order.products.reduce((sum, p) => sum + p.priceUsd, 0);
  order.totalPriceUah = order.products.reduce((sum, p) => sum + p.priceUah, 0);
}

export function listOrders(): Order[] {
  return orders.map((order) => ({
    ...order,
    products: order.products.map((p) => ({ ...p })),
  }));
}

export function getOrderById(id: string): Order | undefined {
  const order = orders.find((item) => item.id === id);
  if (!order) {
    return undefined;
  }
  return {
    ...order,
    products: order.products.map((p) => ({ ...p })),
  };
}

export function deleteOrder(id: string): boolean {
  const exists = orders.some((order) => order.id === id);
  if (!exists) {
    return false;
  }
  // Удаляем приход и все продукты этого прихода — как CASCADE в schema.sql
  orders = orders.filter((order) => order.id !== id);
  products = products.filter((product) => product.orderId !== id);
  return true;
}

export function listProducts(filters: {
  type?: ProductType;
  specification?: string;
  search?: string;
}): ProductListItem[] {
  const search = filters.search?.trim().toLowerCase() ?? '';

  return products
    .filter((product) => {
      if (filters.type && product.type !== filters.type) {
        return false;
      }
      if (
        filters.specification &&
        product.specification !== filters.specification
      ) {
        return false;
      }
      if (!search) {
        return true;
      }
      const haystack = [product.name, product.serialNumber, product.groupName]
        .join(' ')
        .toLowerCase();
      return haystack.includes(search);
    })
    .map((product) => {
      const order = orders.find((item) => item.id === product.orderId);
      return {
        ...product,
        orderTitle: order?.title ?? '—',
      };
    });
}

export function deleteProduct(id: string): boolean {
  const product = products.find((item) => item.id === id);
  if (!product) {
    return false;
  }
  products = products.filter((item) => item.id !== id);
  const order = orders.find((item) => item.id === product.orderId);
  if (order) {
    order.products = order.products.filter((item) => item.id !== id);
    syncOrderAggregates(order);
  }
  return true;
}

export function getProductPreviewForOrder(
  orderId: string,
): Product | undefined {
  return products.find((product) => product.orderId === orderId);
}

/** Restores in-memory data from seed (tests only). */
export function resetStoreForTests(): void {
  orders = structuredClone(initialOrders);
  products = structuredClone(initialProducts);
}
