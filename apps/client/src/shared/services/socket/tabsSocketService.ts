import { io, type Socket } from 'socket.io-client';
import { SOCKET_URL } from '@/shared/config/env';

const TABS_COUNT_EVENT = 'tabs:count';

type TabsCountHandler = (count: number) => void;

let socket: Socket | null = null;

export function connectTabsSocket(onCount: TabsCountHandler): Socket {
  if (socket?.connected) {
    return socket;
  }

  const url = SOCKET_URL.length > 0 ? SOCKET_URL : undefined;

  socket = io(url, {
    transports: ['websocket'],
    autoConnect: true,
  });

  socket.on(TABS_COUNT_EVENT, (payload: { count: number }) => {
    onCount(payload.count);
  });

  return socket;
}

export function disconnectTabsSocket(): void {
  socket?.disconnect();
  socket = null;
}

export { TABS_COUNT_EVENT };
