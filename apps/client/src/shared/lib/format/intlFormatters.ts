import { APP_LOCALE, CURRENCY_UAH, CURRENCY_USD } from '@/shared/config/env';

const dateLongFormatter = new Intl.DateTimeFormat(APP_LOCALE, {
  weekday: 'long',
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const dateShortFormatter = new Intl.DateTimeFormat(APP_LOCALE, {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const dateCompactFormatter = new Intl.DateTimeFormat(APP_LOCALE, {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const timeFormatter = new Intl.DateTimeFormat(APP_LOCALE, {
  hour: '2-digit',
  minute: '2-digit',
});

const usdFormatter = new Intl.NumberFormat(APP_LOCALE, {
  style: 'currency',
  currency: CURRENCY_USD,
  maximumFractionDigits: 0,
});

const uahFormatter = new Intl.NumberFormat(APP_LOCALE, {
  style: 'currency',
  currency: CURRENCY_UAH,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatClockTime = (date: Date): string =>
  timeFormatter.format(date);

export const formatHeaderDate = (date: Date): string =>
  dateLongFormatter.format(date);

export const formatDateLong = (iso: string): string =>
  dateLongFormatter.format(new Date(iso));

export const formatDateShort = (iso: string): string =>
  dateShortFormatter.format(new Date(iso));

export const formatDateCompact = (iso: string): string =>
  dateCompactFormatter.format(new Date(iso));

export const formatWarrantyRange = (startIso: string, endIso: string): string =>
  `с ${formatDateCompact(startIso)} по ${formatDateCompact(endIso)}`;

export const formatUsd = (value: number): string => usdFormatter.format(value);

export const formatUah = (value: number): string => uahFormatter.format(value);

export const formatDualPrice = (usd: number, uah: number): string =>
  `${formatUsd(usd)} / ${formatUah(uah)}`;
