import { memo } from 'react';
import './EmptyState.scss';

interface EmptyStateProps {
  title: string;
  description?: string;
}

export const EmptyState = memo(function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="ui-empty">
      <h3 className="ui-empty__title">{title}</h3>
      {description ? <p className="ui-empty__text">{description}</p> : null}
    </div>
  );
});
