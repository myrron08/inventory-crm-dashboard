import type {
  ProductCondition,
  ProductStatus,
  ProductType,
} from '@/shared/types/domain';

const productTypeLabels: Record<ProductType, string> = {
  monitor: 'Moni I',
  laptop: 'Laptop',
  storage: 'Storage',
  other: 'Other',
};

const statusLabels: Record<ProductStatus, string> = {
  free: 'свободен',
  in_repair: 'В ремонте',
};

const conditionLabels: Record<ProductCondition, string> = {
  new: 'новый',
  used: 'Б / У',
};

export const getProductTypeLabel = (type: ProductType): string =>
  productTypeLabels[type];

export const getProductStatusLabel = (status: ProductStatus): string =>
  statusLabels[status];

export const getProductConditionLabel = (condition: ProductCondition): string =>
  conditionLabels[condition];

export const productTypeFilterOptions: { value: ProductType; label: string }[] =
  (Object.keys(productTypeLabels) as ProductType[]).map((value) => ({
    value,
    label: productTypeLabels[value],
  }));
