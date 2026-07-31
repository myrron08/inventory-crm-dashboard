import { memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '@/shared/hooks/storeHooks';
import { removeToast, type ToastItem } from '@/features/toast/model/toastSlice';

const AUTO_DISMISS_MS = 4000;

interface ToastItemViewProps {
  toast: ToastItem;
}

export const ToastItemView = memo(function ToastItemView({
  toast,
}: ToastItemViewProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      dispatch(removeToast(toast.id));
    }, AUTO_DISMISS_MS);
    return () => {
      window.clearTimeout(timer);
    };
  }, [dispatch, toast.id]);

  return (
    <motion.div
      className={['ui-toast', `ui-toast--${toast.variant}`].join(' ')}
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      layout
    >
      {toast.message}
    </motion.div>
  );
});
