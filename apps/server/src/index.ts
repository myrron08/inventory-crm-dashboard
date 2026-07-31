import { createServer } from 'node:http';
import { createApp } from './createApp.js';
import { env } from './config/env.js';
import { attachTabsSocket } from './socket/tabsSocket.js';

const app = createApp();
const httpServer = createServer(app);
attachTabsSocket(httpServer, env.clientOrigin);

httpServer.listen(env.port, () => {
  console.info(`API listening on http://localhost:${String(env.port)}`);
  console.info(
    `GraphQL endpoint: http://localhost:${String(env.port)}/graphql`,
  );
});

export { app, httpServer };
