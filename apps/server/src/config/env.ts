const port = Number(process.env.PORT ?? 3001);
const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173';
const nodeEnv = process.env.NODE_ENV ?? 'development';

export const env = {
  port: Number.isFinite(port) ? port : 3001,
  clientOrigin,
  nodeEnv,
  isProduction: nodeEnv === 'production',
} as const;
