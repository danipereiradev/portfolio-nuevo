import {
  formatEuroWithVat,
  GOOGLE_ADS_MONTHLY_AMOUNT,
  GOOGLE_ADS_PAYMENT_ID,
  GOOGLE_ADS_SETUP_AMOUNT,
  GOOGLE_ADS_TODAY_AMOUNT,
  paymentPath,
} from './payments';

export const getGoogleAdsSetupLabel = (): string =>
  formatEuroWithVat(GOOGLE_ADS_SETUP_AMOUNT);

export const getGoogleAdsMonthlyLabel = (): string =>
  formatEuroWithVat(GOOGLE_ADS_MONTHLY_AMOUNT, '/mes');

export const getGoogleAdsTodayLabel = (): string =>
  formatEuroWithVat(GOOGLE_ADS_TODAY_AMOUNT);

export const getGoogleAdsFirstPaymentLabel = (): string =>
  `${getGoogleAdsTodayLabel()} (setup + primer mes)`;

export const GOOGLE_ADS_PAY_PATH = paymentPath(GOOGLE_ADS_PAYMENT_ID);
