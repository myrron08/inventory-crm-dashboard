import { memo } from 'react';
import { OrderList } from '@/widgets/order-list/OrderList';
import { OrderDetailsPanel } from '@/widgets/order-details-panel/OrderDetailsPanel';
import { useAppSelector } from '@/shared/hooks/storeHooks';
import { selectOrders } from '@/entities/order/model/ordersSlice';
import './OrdersPage.scss';

export const OrdersPage = memo(function OrdersPage() {
  const orders = useAppSelector(selectOrders);

  return (
    <section className="page-section orders-page">
      <header className="page-header">
        <h1 className="page-header__title">
          Приходы <span className="page-header__count">/ {orders.length}</span>
        </h1>
      </header>
      <div className="orders-page__list">
        <OrderList />
      </div>
      <OrderDetailsPanel />
    </section>
  );
});
