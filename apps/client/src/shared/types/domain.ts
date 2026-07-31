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

export interface OrderSummary {
  id: string;
  title: string;
  productCount: number;
  totalPriceUsd: number;
  totalPriceUah: number;
  createdAt: string;
}

export interface OrderDetails extends OrderSummary {
  products: Product[];
}

export interface ProductListItem extends Product {
  orderTitle: string;
}

export interface ProductsMeta {
  types: ProductType[];
  specifications: string[];
}

export interface ApiErrorBody {
  message: string;
}
