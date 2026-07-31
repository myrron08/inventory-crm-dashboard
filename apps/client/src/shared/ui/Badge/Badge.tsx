import { memo, type ReactNode } from 'react';
import './Badge.scss';

type BadgeTone = 'success' | 'warning' | 'muted';

interface BadgeProps {
  tone?: BadgeTone;
  withDot?: boolean;
  children: ReactNode;
}

export const Badge = memo(function Badge({
  tone = 'muted',
  withDot = false,
  children,
}: BadgeProps) {
  return (
    <span className={`ui-badge ui-badge--${tone}`}>
      {withDot ? <span className="ui-badge__dot" aria-hidden /> : null}
      {children}
    </span>
  );
});
