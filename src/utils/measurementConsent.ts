export const CONSENT_KEY = '36web_measurement_consent_v1';
export type MeasurementConsent = { analytics: boolean; advertising: boolean; updatedAt: number };
let current: MeasurementConsent | null | undefined;
export function getMeasurementConsent(): MeasurementConsent | null {
  if (current !== undefined) return current;
  try {
    const saved = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
    current = saved && typeof saved.analytics === 'boolean' && typeof saved.advertising === 'boolean' && Date.now() - saved.updatedAt < 180 * 86400000 ? saved : null;
  } catch { current = null; }
  return current ?? null;
}
export function saveMeasurementConsent(analytics: boolean, advertising: boolean) {
  current = { analytics, advertising, updatedAt: Date.now() };
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify(current)); } catch { /* Session choice remains effective. */ }
  window.gtag?.('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: advertising ? 'granted' : 'denied',
    ad_user_data: advertising ? 'granted' : 'denied',
    ad_personalization: 'denied',
  });
  if (!advertising) window.gtag?.('set', 'user_data', null);
  window.dispatchEvent(new Event('36web:consent-updated'));
}
