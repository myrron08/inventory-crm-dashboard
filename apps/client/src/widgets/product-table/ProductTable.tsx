import { memo, type MouseEvent, useRef } from 'react';
import { motion } from 'framer-motion';
import type { ProductListItem } from '@/shared/types/domain';
import {
  formatDateLong,
  formatDateShort,
  formatDualPrice,
  formatWarrantyRange,
} from '@/shared/lib/format/intlFormatters';
import {
  getProductConditionLabel,
  getProductStatusLabel,
} from '@/shared/lib/labels/productLabels';
import { Button } from '@/shared/ui/Button/Button';
import { VirtualList } from '@/shared/ui/VirtualList/VirtualList';
import './ProductTable.scss';

interface ProductTableProps {
  products: ProductListItem[];
  onDelete: (
    product: ProductListItem,
    event: MouseEvent<HTMLButtonElement>,
  ) => void;
}

const ROW_HEIGHT = 76;

export const ProductTable = memo(function ProductTable({
  products,
  onDelete,
}: ProductTableProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="product-table">
      <div
        ref={scrollRef}
        className="product-table__scroll product-table__scroll--virtual"
      >
        <div className="product-table__grid">
          <div className="product-table__head">
            <span />
            <span />
            <span>Продукт</span>
            <span>Статус</span>
            <span>Гарантия</span>
            <span>Сост.</span>
            <span>Цена</span>
            <span>Группа</span>
            <span>Ответственный</span>
            <span>Приход</span>
            <span>Дата</span>
            <span />
          </div>
          <VirtualList
            items={products}
            estimateSize={ROW_HEIGHT}
            scrollElementRef={scrollRef}
            className="product-table__virtual-body"
            getItemKey={(product) => product.id}
            renderItem={(product) => (
              <ProductRow product={product} onDelete={onDelete} />
            )}
          />
        </div>
      </div>
    </div>
  );
});

const ProductRow = memo(function ProductRow({
  product,
  onDelete,
}: {
  product: ProductListItem;
  onDelete: ProductTableProps['onDelete'];
}) {
  return (
    <motion.div
      layout
      className="product-table__row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <span
        className={[
          'product-table__status-dot',
          product.status === 'free'
            ? 'product-table__status-dot--free'
            : 'product-table__status-dot--repair',
        ].join(' ')}
      />
      <img
        className="product-table__thumb"
        src={product.imageUrl}
        alt=""
        loading="lazy"
        decoding="async"
        width={32}
        height={32}
      />
      <div>
        <p className="product-table__name">{product.name}</p>
        <p className="product-table__serial">{product.serialNumber}</p>
      </div>
      <span
        className={
          product.status === 'free'
            ? 'product-table__status-text--free'
            : 'product-table__status-text--repair'
        }
      >
        {getProductStatusLabel(product.status)}
      </span>
      <span className="product-table__muted">
        {formatWarrantyRange(product.warrantyStart, product.warrantyEnd)}
        <br />
        <small>{formatDateLong(product.warrantyStart)}</small>
      </span>
      <span className="product-table__muted">
        {getProductConditionLabel(product.condition)}
      </span>
      <span className="product-table__price">
        {formatDualPrice(product.priceUsd, product.priceUah)}
      </span>
      <span className="product-table__muted">{product.groupName}</span>
      <span className="product-table__muted">{product.assignee ?? '—'}</span>
      <span className="product-table__muted">{product.orderTitle}</span>
      <span className="product-table__muted">
        {formatDateShort(product.createdAt)}
        <br />
        <small>{formatDateLong(product.createdAt)}</small>
      </span>
      <Button
        variant="icon"
        aria-label="Удалить продукт"
        onClick={(event) => {
          onDelete(product, event);
        }}
      >
        🗑
      </Button>
    </motion.div>
  );
});
