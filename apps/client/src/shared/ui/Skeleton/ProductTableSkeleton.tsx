import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import './ProductTableSkeleton.scss';

const ROWS = 5;

export const ProductTableSkeleton = memo(function ProductTableSkeleton() {
  return (
    <div
      className="product-table-skeleton"
      aria-busy
      aria-label="Загрузка продуктов"
    >
      {Array.from({ length: ROWS }, (_, index) => (
        <div key={index} className="product-table-skeleton__row">
          <Skeleton height={32} width={32} />
          <Skeleton height={36} width="70%" />
          <Skeleton height={14} width={80} />
          <Skeleton height={14} width={120} />
        </div>
      ))}
    </div>
  );
});
