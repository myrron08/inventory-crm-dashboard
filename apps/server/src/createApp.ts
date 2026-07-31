import cors from 'cors';
import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import type { Express } from 'express';
import { env } from './config/env.js';
import { graphqlSchema } from './graphql/schema.js';
import { apiRouter } from './routes/apiRouter.js';

export function createApp(): Express {
  const app = express();

  app.use(
    cors({
      origin: env.clientOrigin,
    }),
  );
  app.use(express.json());
  app.use('/api', apiRouter);
  app.all(
    '/graphql',
    createHandler({
      schema: graphqlSchema,
    }),
  );

  return app;
}
