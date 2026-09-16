import {
  formatEuro,
  GOOGLE_ADS_MONTHLY_AMOUNT,
  GOOGLE_ADS_PAYMENT_ID,
  GOOGLE_ADS_SETUP_AMOUNT,
  GOOGLE_ADS_TODAY_AMOUNT,
  paymentPath,
} from './payments';

export const getGoogleAdsSetupLabel = (): string =>
  `${formatEuro(GOOGLE_ADS_SETUP_AMOUNT)} + IVA`;

export const getGoogleAdsMonthlyLabel = (): string =>
  `${formatEuro(GOOGLE_ADS_MONTHLY_AMOUNT)} + IVA/mes`;

export const getGoogleAdsTodayLabel = (): string =>
  `${formatEuro(GOOGLE_ADS_TODAY_AMOUNT)} + IVA`;

export const getGoogleAdsFirstPaymentLabel = (): string =>
  `${getGoogleAdsTodayLabel()} (setup + primer mes)`;

export const GOOGLE_ADS_PAY_PATH = paymentPath(GOOGLE_ADS_PAYMENT_ID);
