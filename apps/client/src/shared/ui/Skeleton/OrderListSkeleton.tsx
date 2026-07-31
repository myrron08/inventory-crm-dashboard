import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import './OrderListSkeleton.scss';

const ROWS = 4;

export const OrderListSkeleton = memo(function OrderListSkeleton() {
  return (
    <div
      className="order-list-skeleton"
      aria-busy
      aria-label="Загрузка приходов"
    >
      {Array.from({ length: ROWS }, (_, index) => (
        <div key={index} className="order-list-skeleton__row">
          <Skeleton height={18} width="55%" />
          <Skeleton height={14} width={120} />
          <Skeleton height={14} width={100} />
          <Skeleton height={14} width={140} />
          <Skeleton
            height={36}
            width={36}
            className="order-list-skeleton__icon"
          />
        </div>
      ))}
    </div>
  );
});
