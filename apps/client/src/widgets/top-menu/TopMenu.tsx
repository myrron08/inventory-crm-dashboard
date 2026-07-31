import { memo, useEffect, useState } from 'react';
import { SearchField } from '@/shared/ui/SearchField/SearchField';
import {
  formatClockTime,
  formatHeaderDate,
} from '@/shared/lib/format/intlFormatters';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/storeHooks';
import { selectActiveTabsCount } from '@/entities/session/model/tabsSlice';
import {
  selectGlobalSearchQuery,
  setGlobalSearchQuery,
} from '@/features/global-search/model/searchSlice';
import './TopMenu.scss';

export const TopMenu = memo(function TopMenu() {
  const dispatch = useAppDispatch();
  const activeTabs = useAppSelector(selectActiveTabsCount);
  const searchQuery = useAppSelector(selectGlobalSearchQuery);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <header className="top-menu app-shell__header">
      <div className="top-menu__brand">
        <div className="top-menu__logo" aria-hidden>
          ✓
        </div>
        <span className="top-menu__title">INVENTORY</span>
      </div>
      <div className="top-menu__search">
        <SearchField
          value={searchQuery}
          onChange={(event) => {
            dispatch(setGlobalSearchQuery(event.target.value));
          }}
        />
      </div>
      <div className="top-menu__meta">
        <div className="top-menu__tabs" title="Активные вкладки">
          <span>Вкладки</span>
          <span className="top-menu__tabs-value">{activeTabs}</span>
        </div>
        <div className="top-menu__datetime">
          <strong>{formatHeaderDate(now)}</strong>
          <span>{formatClockTime(now)}</span>
        </div>
      </div>
    </header>
  );
});
