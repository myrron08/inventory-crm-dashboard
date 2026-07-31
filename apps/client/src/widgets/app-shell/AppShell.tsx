import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { TopMenu } from '@/widgets/top-menu/TopMenu';
import { MainNav } from '@/widgets/main-nav/MainNav';
import { DeleteEntityModal } from '@/features/delete-entity/ui/DeleteEntityModal';
import { AnimatedOutlet } from '@/app/router/AnimatedOutlet';
import { ToastStack } from '@/shared/ui/Toast/ToastStack';

export const AppShell = memo(function AppShell() {
  return (
    <div className="app-shell">
      <TopMenu />
      <MainNav />
      <main className="app-shell__main">
        <AnimatedOutlet>
          <Outlet />
        </AnimatedOutlet>
      </main>
      <DeleteEntityModal />
      <ToastStack />
    </div>
  );
});
