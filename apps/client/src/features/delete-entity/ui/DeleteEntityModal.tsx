import { memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/storeHooks';
import {
  closeDeleteModal,
  selectDeleteModalState,
} from '@/features/delete-entity/model/deleteModalSlice';
import {
  deleteOrder,
  selectDeleteOrderStatus,
} from '@/entities/order/model/ordersSlice';
import {
  deleteProduct,
  selectDeleteProductStatus,
} from '@/entities/product/model/productsSlice';
import { closeOrderPanel } from '@/features/order-panel/model/orderPanelSlice';
import { pushToast } from '@/features/toast/model/toastSlice';
import { AppModal } from '@/shared/ui/Modal/Modal';
import { getProductStatusLabel } from '@/shared/lib/labels/productLabels';

export const DeleteEntityModal = memo(function DeleteEntityModal() {
  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectDeleteModalState);
  const deleteOrderStatus = useAppSelector(selectDeleteOrderStatus);
  const deleteProductStatus = useAppSelector(selectDeleteProductStatus);

  const isDeleting =
    deleteOrderStatus === 'loading' || deleteProductStatus === 'loading';

  const handleClose = useCallback((): void => {
    dispatch(closeDeleteModal());
  }, [dispatch]);

  const handleConfirm = useCallback((): void => {
    if (!modal.entityId || !modal.entityType) {
      return;
    }
    if (modal.entityType === 'order') {
      void dispatch(deleteOrder(modal.entityId))
        .unwrap()
        .then(() => {
          dispatch(closeOrderPanel());
          dispatch(closeDeleteModal());
          dispatch(
            pushToast({
              variant: 'success',
              message: 'Приход успешно удалён',
            }),
          );
        })
        .catch(() => {
          dispatch(
            pushToast({
              variant: 'error',
              message: 'Не удалось удалить приход',
            }),
          );
        });
      return;
    }
    void dispatch(deleteProduct(modal.entityId))
      .unwrap()
      .then(() => {
        dispatch(closeDeleteModal());
        dispatch(
          pushToast({
            variant: 'success',
            message: 'Продукт успешно удалён',
          }),
        );
      })
      .catch(() => {
        dispatch(
          pushToast({
            variant: 'error',
            message: 'Не удалось удалить продукт',
          }),
        );
      });
  }, [dispatch, modal.entityId, modal.entityType]);

  const title =
    modal.entityType === 'order'
      ? 'Вы уверены, что хотите удалить этот приход?'
      : 'Вы уверены, что хотите удалить этот продукт?';

  return (
    <AppModal
      isOpen={modal.isOpen}
      title={title}
      onClose={handleClose}
      secondaryAction={{
        label: 'ОТМЕНИТЬ',
        onClick: handleClose,
        variant: 'ghost',
      }}
      primaryAction={{
        label: 'УДАЛИТЬ',
        onClick: handleConfirm,
        variant: 'danger',
        disabled: isDeleting,
      }}
    >
      {modal.previewProduct ? (
        <div className="delete-preview">
          <img
            src={modal.previewProduct.imageUrl}
            alt=""
            width={36}
            height={36}
          />
          <div>
            <p>{modal.previewProduct.name}</p>
            <small>{modal.previewProduct.serialNumber}</small>
            <div>{getProductStatusLabel(modal.previewProduct.status)}</div>
          </div>
        </div>
      ) : (
        <p>{modal.title}</p>
      )}
    </AppModal>
  );
});
