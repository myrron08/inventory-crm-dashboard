import { memo, useEffect } from 'react';
import {
  connectTabsSocket,
  disconnectTabsSocket,
} from '@/shared/services/socket/tabsSocketService';
import { setActiveTabsCount } from '@/entities/session/model/tabsSlice';
import { useAppDispatch } from '@/shared/hooks/storeHooks';

export const SocketProvider = memo(function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (import.meta.env.MODE === 'test') {
      return;
    }
    connectTabsSocket((count) => {
      dispatch(setActiveTabsCount(count));
    });
    return () => {
      disconnectTabsSocket();
    };
  }, [dispatch]);

  return children;
});
