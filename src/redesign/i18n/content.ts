import { useMemo } from 'react';
import { usePrefs, type Lang } from '../prefs';
import { ALL_SERVICES, EXTRA_SERVICES, SERVICES, type Service } from '../services';
import { CASES, type CaseItem } from '../cases';
import { SERVICES_EN } from './servicesEn';
import { CASES_EN } from './casesEn';
import { PORTFOLIO_EN } from './portfolioEn';

const locService = (s: Service, lang: Lang): Service => {
  const en = lang === 'en' ? SERVICES_EN[s.slug] : undefined;
  if (!en) return s;
  return { ...s, ...en, page: s.page && en.page ? { ...s.page, ...en.page } : s.page };
};

export function useServices() {
  const { lang } = usePrefs();
  return useMemo(
    () => ({
      services: SERVICES.map((s) => locService(s, lang)),
      extra: EXTRA_SERVICES.map((s) => locService(s, lang)),
      all: ALL_SERVICES.map((s) => locService(s, lang)),
    }),
    [lang],
  );
}

export function useCases(): CaseItem[] {
  const { lang } = usePrefs();
  return useMemo(
    () => CASES.map((c) => (lang === 'en' && CASES_EN[c.slug] ? { ...c, ...CASES_EN[c.slug] } : c)),
    [lang],
  );
}

/** Sector y descripción de un proyecto del portfolio en el idioma activo. */
export function usePortfolioText() {
  const { lang } = usePrefs();
  return (id: string, sector: string, description: string) => {
    const en = lang === 'en' ? PORTFOLIO_EN[id] : undefined;
    return en ? en : { sector, description };
  };
}

export const dateLocale = (lang: Lang) => (lang === 'en' ? 'en-GB' : 'es-ES');

export const formatDate = (iso: string, lang: Lang) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(dateLocale(lang), { day: 'numeric', month: 'long', year: 'numeric' });
};
