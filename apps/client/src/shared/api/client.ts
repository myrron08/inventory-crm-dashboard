import axios, { isAxiosError } from 'axios';
import { API_BASE_URL } from '@/shared/config/env';
import type { ApiErrorBody } from '@/shared/types/domain';

export const apiClient = axios.create({
  baseURL: API_BASE_URL ? `${API_BASE_URL}/api` : '/api',
  headers: {
    Accept: 'application/json',
  },
  timeout: 15_000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (isAxiosError<ApiErrorBody>(error)) {
      const message = error.response?.data.message ?? error.message;
      return Promise.reject(new Error(message));
    }
    return Promise.reject(
      error instanceof Error ? error : new Error('Unexpected network error'),
    );
  },
);
