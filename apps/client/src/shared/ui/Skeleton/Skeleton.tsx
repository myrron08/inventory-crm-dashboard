import { memo, type CSSProperties } from 'react';
import './Skeleton.scss';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Skeleton = memo(function Skeleton({
  width = '100%',
  height = 16,
  className,
}: SkeletonProps) {
  const style: CSSProperties = {
    width,
    height,
  };

  return (
    <div
      className={['ui-skeleton', className].filter(Boolean).join(' ')}
      style={style}
      aria-hidden
    />
  );
});
