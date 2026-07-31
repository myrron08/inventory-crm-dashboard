import { memo, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/storeHooks';
import {
  clearSelectedOrder,
  fetchOrderDetails,
  selectOrderDetailsStatus,
  selectSelectedOrder,
} from '@/entities/order/model/ordersSlice';
import {
  closeOrderPanel,
  selectIsOrderPanelOpen,
  selectSelectedOrderId,
} from '@/features/order-panel/model/orderPanelSlice';
import { getProductStatusLabel } from '@/shared/lib/labels/productLabels';
import { Loader } from '@/shared/ui/Loader/Loader';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState';
import { Button } from '@/shared/ui/Button/Button';
import './OrderDetailsPanel.scss';

export const OrderDetailsPanel = memo(function OrderDetailsPanel() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOrderPanelOpen);
  const orderId = useAppSelector(selectSelectedOrderId);
  const order = useAppSelector(selectSelectedOrder);
  const status = useAppSelector(selectOrderDetailsStatus);

  useEffect(() => {
    if (isOpen && orderId) {
      void dispatch(fetchOrderDetails(orderId));
    }
  }, [dispatch, isOpen, orderId]);

  const handleClose = useCallback(() => {
    dispatch(closeOrderPanel());
    dispatch(clearSelectedOrder());
  }, [dispatch]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [handleClose, isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            className="order-panel__overlay"
            aria-label="Закрыть панель"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.aside
            className="order-panel"
            role="complementary"
            aria-label="Детали прихода"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            <div className="order-panel__header">
              <h2 className="order-panel__title">
                {order?.title ?? 'Загрузка прихода…'}
              </h2>
              <Button variant="icon" aria-label="Закрыть" onClick={handleClose}>
                ×
              </Button>
            </div>
            <div className="order-panel__body">
              {status === 'loading' ? (
                <Loader label="Загрузка продуктов" />
              ) : null}
              {status === 'succeeded' && order?.products.length === 0 ? (
                <EmptyState
                  title="Нет продуктов"
                  description="В этом приходе пока нет позиций."
                />
              ) : null}
              {status === 'succeeded' && order && order.products.length > 0 ? (
                <ul className="order-panel__list">
                  {order.products.map((product) => (
                    <li key={product.id} className="order-panel__item">
                      <img
                        className="order-panel__thumb"
                        src={product.imageUrl}
                        alt=""
                      />
                      <div>
                        <p className="order-panel__name">{product.name}</p>
                        <p className="order-panel__serial">
                          {product.serialNumber}
                        </p>
                      </div>
                      <span className="order-panel__status">
                        {getProductStatusLabel(product.status)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
});
