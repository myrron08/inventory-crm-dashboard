import { memo, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import type { OrderSummary } from '@/shared/types/domain';
import {
  formatDateLong,
  formatDateShort,
  formatDualPrice,
} from '@/shared/lib/format/intlFormatters';
import { Button } from '@/shared/ui/Button/Button';
import './OrderCard.scss';

interface OrderCardProps {
  order: OrderSummary;
  isActive: boolean;
  onSelect: (orderId: string) => void;
  onDelete: (order: OrderSummary, event: MouseEvent<HTMLButtonElement>) => void;
}

export const OrderCard = memo(function OrderCard({
  order,
  isActive,
  onSelect,
  onDelete,
}: OrderCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className={['order-card', isActive ? 'order-card--active' : '']
        .filter(Boolean)
        .join(' ')}
      onClick={() => {
        onSelect(order.id);
      }}
    >
      <h3 className="order-card__title">{order.title}</h3>
      <div className="order-card__count">
        <span className="order-card__count-icon" aria-hidden>
          ≡
        </span>
        <span>{order.productCount} Продукта</span>
      </div>
      <div className="order-card__dates">
        <span>{formatDateShort(order.createdAt)}</span>
        <small>{formatDateLong(order.createdAt)}</small>
      </div>
      <div className="order-card__price">
        {formatDualPrice(order.totalPriceUsd, order.totalPriceUah)}
      </div>
      <Button
        variant="icon"
        aria-label="Удалить приход"
        onClick={(event) => {
          onDelete(order, event);
        }}
      >
        🗑
      </Button>
    </motion.article>
  );
});
