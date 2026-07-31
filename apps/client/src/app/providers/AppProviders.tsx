import { memo } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/app/store/store';
import { SocketProvider } from '@/app/providers/SocketProvider';

import { AppErrorBoundary } from '@/app/providers/AppErrorBoundary';

export const AppProviders = memo(function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppErrorBoundary>
      <Provider store={store}>
        <SocketProvider>{children}</SocketProvider>
      </Provider>
    </AppErrorBoundary>
  );
});
