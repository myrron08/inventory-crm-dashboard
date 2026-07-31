import { memo } from 'react';
import './Loader.scss';

interface LoaderProps {
  label?: string;
}

export const Loader = memo(function Loader({ label = 'Loading' }: LoaderProps) {
  return (
    <div className="ui-loader" role="status" aria-label={label}>
      <div className="ui-loader__spinner" />
      <span className="ui-loader__label">{label}</span>
    </div>
  );
});
