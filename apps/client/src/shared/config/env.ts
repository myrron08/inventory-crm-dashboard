function readEnvUrl(value: string | undefined): string {
  if (!value) {
    return '';
  }
  return value.replace(/\/$/, '');
}

export const API_BASE_URL = readEnvUrl(import.meta.env.VITE_API_URL);

export const SOCKET_URL = readEnvUrl(import.meta.env.VITE_SOCKET_URL);

export const APP_LOCALE = 'ru-RU';

export const CURRENCY_USD = 'USD';
export const CURRENCY_UAH = 'UAH';
