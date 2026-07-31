import { AppProviders } from '@/app/providers/AppProviders';
import { AppRouter } from '@/app/router/AppRouter';
import '@/app/styles/index.scss';

export function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}
