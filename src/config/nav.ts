import {
  ABOUT_LABEL,
  ABOUT_PATH,
  SITE_MAINTENANCE_LABEL,
  SITE_MAINTENANCE_PATH,
  SITE_SHOP_LABEL,
  SITE_SHOP_PATH,
  SITE_WEB_LABEL,
  SITE_WEB_PATH,
  TALENT_LABEL,
  TALENT_PATH,
} from './contact';

export const SERVICE_NAV = [
  { href: SITE_WEB_PATH, label: SITE_WEB_LABEL },
  { href: SITE_SHOP_PATH, label: SITE_SHOP_LABEL },
  { href: SITE_MAINTENANCE_PATH, label: SITE_MAINTENANCE_LABEL },
] as const;

export const MAIN_NAV = [
  { href: ABOUT_PATH, label: ABOUT_LABEL },
  { href: '#contacto', label: 'Contacto' },
] as const;

export const FOOTER_NAV = [
  { href: ABOUT_PATH, label: ABOUT_LABEL },
  ...SERVICE_NAV,
  { href: '#contacto', label: 'Contacto' },
  {
    href: TALENT_PATH,
    label: TALENT_LABEL,
  },
] as const;

export const LANDING_NAV = [
  { href: '#incluye', label: 'Qué incluye' },
  { href: '#portfolio', label: 'Trabajos' },
  { href: '#testimonials', label: 'Opiniones' },
  { href: '#faq', label: 'FAQ' },
] as const;

export const LANDING_NAV_GOOGLE_ADS = [
  { href: '#incluye', label: 'Qué incluye' },
  { href: '#casos', label: 'Casos' },
  { href: '#testimonials', label: 'Opiniones' },
  { href: '#faq', label: 'FAQ' },
] as const;

export const LANDING_NAV_CTA = {
  href: '#contacto',
  label: 'Pedir propuesta',
} as const;
