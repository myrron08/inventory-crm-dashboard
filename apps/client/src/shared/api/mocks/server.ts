import { setupServer } from 'msw/node';
import { handlers } from '@/shared/api/mocks/handlers';

export const mswServer = setupServer(...handlers);
