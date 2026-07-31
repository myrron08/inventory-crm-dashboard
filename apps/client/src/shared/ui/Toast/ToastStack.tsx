import { memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppSelector } from '@/shared/hooks/storeHooks';
import { selectToasts } from '@/features/toast/model/toastSlice';
import { ToastItemView } from '@/shared/ui/Toast/ToastItemView';
import './Toast.scss';

export const ToastStack = memo(function ToastStack() {
  const toasts = useAppSelector(selectToasts);

  return (
    <div className="ui-toast-stack" aria-live="polite">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItemView key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
});
