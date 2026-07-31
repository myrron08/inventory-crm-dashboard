import { apiClient } from '@/shared/api/client';
import type {
  OrderDetails,
  OrderSummary,
  ProductListItem,
} from '@/shared/types/domain';

export const ordersApi = {
  fetchList: async (): Promise<OrderSummary[]> => {
    const { data } = await apiClient.get<OrderSummary[]>('/orders');
    return data;
  },
  fetchById: async (id: string): Promise<OrderDetails> => {
    const { data } = await apiClient.get<OrderDetails>(`/orders/${id}`);
    return data;
  },
  remove: async (
    id: string,
  ): Promise<{ id: string; previewProduct: ProductListItem | null }> => {
    const { data } = await apiClient.delete<{
      id: string;
      previewProduct: ProductListItem | null;
    }>(`/orders/${id}`);
    return data;
  },
};
