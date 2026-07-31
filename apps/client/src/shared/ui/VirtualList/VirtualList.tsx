import { useVirtualizer } from '@tanstack/react-virtual';
import { useLayoutEffect, useRef, type ReactNode, type RefObject } from 'react';

interface VirtualListProps<T> {
  items: T[];
  estimateSize: number;
  overscan?: number;
  className?: string;
  /** Scroll container; defaults to the list root element. */
  scrollElementRef?: RefObject<HTMLElement | null>;
  getItemKey: (item: T, index: number) => string | number;
  renderItem: (item: T, index: number) => ReactNode;
}

export function VirtualList<T>({
  items,
  estimateSize,
  overscan = 8,
  className,
  scrollElementRef,
  getItemKey,
  renderItem,
}: VirtualListProps<T>): ReactNode {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const getScrollElement = (): HTMLElement | null =>
    scrollElementRef?.current ?? rootRef.current;

  // TanStack Virtual manages scroll state; safe to opt out of React Compiler memo rules here.
  // eslint-disable-next-line react-hooks/incompatible-library -- virtualization library
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement,
    estimateSize: () => estimateSize,
    overscan,
    getItemKey: (index) => {
      const entry = items[index];
      return entry ? getItemKey(entry, index) : index;
    },
  });

  useLayoutEffect(() => {
    virtualizer.measure();
    const frame = requestAnimationFrame(() => {
      virtualizer.measure();
    });
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [items.length, virtualizer]);

  const virtualItems = virtualizer.getVirtualItems();

  if (virtualItems.length === 0 && items.length > 0) {
    return (
      <div ref={rootRef} className={className}>
        {items.map((item, index) => (
          <div key={getItemKey(item, index)}>{renderItem(item, index)}</div>
        ))}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={className}>
      <div
        style={{
          height: `${String(virtualizer.getTotalSize())}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualItems.map((virtualRow) => {
          const item = items[virtualRow.index];
          if (!item) {
            return null;
          }
          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${String(virtualRow.start)}px)`,
              }}
            >
              {renderItem(item, virtualRow.index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
