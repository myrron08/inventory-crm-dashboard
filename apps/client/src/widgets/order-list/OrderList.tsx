import { memo, type MouseEvent, useMemo, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/storeHooks';
import {
  fetchOrders,
  selectOrders,
  selectOrdersListStatus,
} from '@/entities/order/model/ordersSlice';
import { OrderCard } from '@/entities/order/ui/OrderCard';
import type { OrderSummary } from '@/shared/types/domain';
import { openOrderPanel } from '@/features/order-panel/model/orderPanelSlice';
import { openDeleteOrderModal } from '@/features/delete-entity/model/deleteModalSlice';
import { ordersApi } from '@/entities/order/api/ordersApi';
import { selectGlobalSearchQuery } from '@/features/global-search/model/searchSlice';
import { selectSelectedOrderId } from '@/features/order-panel/model/orderPanelSlice';
import { OrderListSkeleton } from '@/shared/ui/Skeleton/OrderListSkeleton';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState';
import './OrderList.scss';

export const OrderList = memo(function OrderList() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const listStatus = useAppSelector(selectOrdersListStatus);
  const search = useAppSelector(selectGlobalSearchQuery);
  const selectedOrderId = useAppSelector(selectSelectedOrderId);

  useEffect(() => {
    void dispatch(fetchOrders());
  }, [dispatch]);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return orders;
    }
    return orders.filter((order) => order.title.toLowerCase().includes(query));
  }, [orders, search]);

  const handleSelect = (orderId: string): void => {
    dispatch(openOrderPanel(orderId));
  };

  const handleDelete = async (
    order: OrderSummary,
    event: MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    event.stopPropagation();
    const details = await ordersApi.fetchById(order.id);
    dispatch(
      openDeleteOrderModal({
        orderId: order.id,
        title: order.title,
        previewProduct: details.products[0] ?? null,
      }),
    );
  };

  if (listStatus === 'loading' && orders.length === 0) {
    return <OrderListSkeleton />;
  }

  if (listStatus === 'failed') {
    return (
      <EmptyState
        title="Не удалось загрузить приходы"
        description="Проверьте API и попробуйте обновить страницу."
      />
    );
  }

  if (filteredOrders.length === 0) {
    const hasActiveSearch = search.trim().length > 0;
    return (
      <EmptyState
        title="Приходы не найдены"
        description={
          hasActiveSearch
            ? `По запросу «${search.trim()}» ничего не найдено. Очистите поиск в шапке.`
            : 'Измените поиск или добавьте новый приход.'
        }
      />
    );
  }

  return (
    <div className="order-list-virtual">
      <AnimatePresence initial={false}>
        {filteredOrders.map((order) => (
          <div key={order.id} className="order-list-virtual__item">
            <OrderCard
              order={order}
              isActive={selectedOrderId === order.id}
              onSelect={handleSelect}
              onDelete={(item, clickEvent) => {
                void handleDelete(item, clickEvent);
              }}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
});
