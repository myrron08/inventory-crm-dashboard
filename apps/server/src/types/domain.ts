export type ProductStatus = 'free' | 'in_repair';
export type ProductCondition = 'new' | 'used';
export type ProductType = 'monitor' | 'laptop' | 'storage' | 'other';

export interface Product {
  id: string;
  orderId: string;
  name: string;
  serialNumber: string;
  type: ProductType;
  specification: string;
  status: ProductStatus;
  condition: ProductCondition;
  priceUsd: number;
  priceUah: number;
  groupName: string;
  assignee: string | null;
  warrantyStart: string;
  warrantyEnd: string;
  imageUrl: string;
  createdAt: string;
}

export interface Order {
  id: string;
  title: string;
  productCount: number;
  totalPriceUsd: number;
  totalPriceUah: number;
  createdAt: string;
  products: Product[];
}

export interface ProductListItem extends Product {
  orderTitle: string;
}
