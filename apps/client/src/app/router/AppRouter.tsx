import { lazy, memo, Suspense, type ReactNode } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { AppShell } from '@/widgets/app-shell/AppShell';
import { Loader } from '@/shared/ui/Loader/Loader';

const OrdersPage = lazy(async () => {
  const module = await import('@/pages/orders/ui/OrdersPage');
  return { default: module.OrdersPage };
});

const ProductsPage = lazy(async () => {
  const module = await import('@/pages/products/ui/ProductsPage');
  return { default: module.ProductsPage };
});

const NotFoundPage = lazy(async () => {
  const module = await import('@/pages/not-found/ui/NotFoundPage');
  return { default: module.NotFoundPage };
});

const withSuspense = (element: ReactNode): ReactNode => (
  <Suspense fallback={<Loader label="Загрузка страницы" />}>{element}</Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/orders" replace /> },
      { path: 'orders', element: withSuspense(<OrdersPage />) },
      { path: 'products', element: withSuspense(<ProductsPage />) },
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
]);

export const AppRouter = memo(function AppRouter() {
  return <RouterProvider router={router} />;
});
