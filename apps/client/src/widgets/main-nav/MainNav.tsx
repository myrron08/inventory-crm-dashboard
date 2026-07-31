import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '@/shared/hooks/storeHooks';
import { clearGlobalSearchQuery } from '@/features/global-search/model/searchSlice';
import { closeOrderPanel } from '@/features/order-panel/model/orderPanelSlice';
import { clearSelectedOrder } from '@/entities/order/model/ordersSlice';
import './MainNav.scss';

const navItems = [
  { to: '/orders', label: 'Orders', caption: 'ПРИХОД' },
  { to: '/products', label: 'Products', caption: 'ПРОДУКТЫ' },
] as const;

export const MainNav = memo(function MainNav() {
  const dispatch = useAppDispatch();

  const handleNavigate = (): void => {
    dispatch(clearGlobalSearchQuery());
    dispatch(closeOrderPanel());
    dispatch(clearSelectedOrder());
  };

  return (
    <nav className="main-nav app-shell__sidebar" aria-label="Main navigation">
      <div className="main-nav__profile" aria-hidden />
      <ul className="main-nav__list">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              onClick={handleNavigate}
              className={({ isActive }) =>
                ['main-nav__link', isActive ? 'main-nav__link--active' : '']
                  .filter(Boolean)
                  .join(' ')
              }
            >
              {item.caption}
            </NavLink>
          </li>
        ))}
      </ul>
      <footer className="main-nav__footer">
        <a
          className="main-nav__footer-link"
          href="https://github.com/myrron08/inventory-crm-dashboard"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          className="main-nav__footer-link"
          href="https://github.com/myrron08/inventory-crm-dashboard/blob/main/DEVLOG.md"
          target="_blank"
          rel="noreferrer"
        >
          Заметки по разработке
        </a>
      </footer>
    </nav>
  );
});
