import { memo, useEffect, useId, useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import Modal from 'bootstrap/js/dist/modal.js';
import { Button } from '@/shared/ui/Button/Button';
import './Modal.scss';

interface ModalAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'ghost' | 'danger';
  disabled?: boolean;
}

interface AppModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
}

export const AppModal = memo(function AppModal({
  isOpen,
  title,
  onClose,
  children,
  primaryAction,
  secondaryAction,
}: AppModalProps) {
  const isTestEnv = import.meta.env.MODE === 'test';
  const dialogRef = useRef<HTMLDivElement>(null);
  const bootstrapRef = useRef<Modal | null>(null);
  const titleId = useId();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (isTestEnv) {
      return;
    }
    const element = dialogRef.current;
    if (!element) {
      return;
    }
    bootstrapRef.current = new Modal(element, {
      backdrop: true,
      keyboard: true,
      focus: false,
    });
    return () => {
      bootstrapRef.current?.dispose();
      bootstrapRef.current = null;
    };
  }, [isTestEnv]);

  useEffect(() => {
    if (isTestEnv) {
      return;
    }
    const instance = bootstrapRef.current;
    if (!instance) {
      return;
    }
    if (isOpen) {
      instance.show();
    } else {
      instance.hide();
    }
  }, [isOpen, isTestEnv]);

  useEffect(() => {
    if (isTestEnv) {
      return;
    }
    const element = dialogRef.current;
    if (!element) {
      return;
    }
    const handleHidden = (): void => {
      onCloseRef.current();
    };
    element.addEventListener('hidden.bs.modal', handleHidden);
    return () => {
      element.removeEventListener('hidden.bs.modal', handleHidden);
    };
  }, [isTestEnv]);

  if (isTestEnv && !isOpen) {
    return null;
  }

  return (
    <div
      ref={dialogRef}
      className={['modal fade', isOpen ? 'show d-block' : ''].join(' ')}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      aria-labelledby={titleId}
      aria-hidden={!isOpen}
    >
      <div className="modal-dialog modal-dialog-centered">
        <motion.div
          className="modal-content ui-modal__dialog"
          initial={false}
          animate={
            isOpen ? { opacity: 1, scale: 1 } : { opacity: 0.98, scale: 0.98 }
          }
          transition={{ duration: 0.18 }}
        >
          <div className="ui-modal__dialog-wrap">
            <Button
              variant="icon"
              className="ui-modal__close"
              aria-label="Закрыть"
              onClick={onClose}
            >
              ×
            </Button>
            <div className="ui-modal__header">
              <h2 id={titleId} className="ui-modal__title">
                {title}
              </h2>
            </div>
            <div className="ui-modal__body">{children}</div>
            {(primaryAction || secondaryAction) && (
              <div className="ui-modal__footer">
                {secondaryAction ? (
                  <Button
                    variant={secondaryAction.variant ?? 'ghost'}
                    onClick={secondaryAction.onClick}
                    disabled={secondaryAction.disabled}
                  >
                    {secondaryAction.label}
                  </Button>
                ) : (
                  <span />
                )}
                {primaryAction ? (
                  <Button
                    variant={primaryAction.variant ?? 'danger'}
                    onClick={primaryAction.onClick}
                    disabled={primaryAction.disabled}
                  >
                    {primaryAction.label}
                  </Button>
                ) : null}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
});
