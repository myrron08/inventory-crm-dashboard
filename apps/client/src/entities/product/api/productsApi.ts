import { apiClient } from '@/shared/api/client';
import type { ProductListItem, ProductsMeta } from '@/shared/types/domain';

export const productsApi = {
  fetchMeta: async (): Promise<ProductsMeta> => {
    const { data } = await apiClient.get<ProductsMeta>('/products/meta');
    return data;
  },
  fetchList: async (params: {
    type?: string;
    specification?: string;
    search?: string;
  }): Promise<ProductListItem[]> => {
    const { data } = await apiClient.get<ProductListItem[]>('/products', {
      params,
    });
    return data;
  },
  remove: async (id: string): Promise<{ id: string }> => {
    const { data } = await apiClient.delete<{ id: string }>(`/products/${id}`);
    return data;
  },
};
