import type { Server as HttpServer } from 'node:http';
import { Server } from 'socket.io';

const TABS_COUNT_EVENT = 'tabs:count';

export function attachTabsSocket(
  httpServer: HttpServer,
  clientOrigin: string,
): () => number {
  const io = new Server(httpServer, {
    cors: {
      origin: clientOrigin,
      methods: ['GET', 'POST'],
    },
  });

  let activeTabs = 0;

  const broadcast = (): void => {
    io.emit(TABS_COUNT_EVENT, { count: activeTabs });
  };

  io.on('connection', (socket) => {
    activeTabs += 1;
    broadcast();
    socket.emit(TABS_COUNT_EVENT, { count: activeTabs });

    socket.on('disconnect', () => {
      activeTabs = Math.max(0, activeTabs - 1);
      broadcast();
    });
  });

  return () => activeTabs;
}

export { TABS_COUNT_EVENT };
