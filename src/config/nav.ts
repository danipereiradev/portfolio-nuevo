import {
  SITE_APPS_PATH,
  SITE_APPS_LABEL,
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
  { href: SITE_APPS_PATH, label: SITE_APPS_LABEL },
  { href: SITE_MAINTENANCE_PATH, label: SITE_MAINTENANCE_LABEL },
] as const;

export const MAIN_NAV = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: ABOUT_PATH, label: ABOUT_LABEL },
  { href: '#contacto', label: 'Contacto' },
] as const;

export const FOOTER_NAV = [
  { href: ABOUT_PATH, label: ABOUT_LABEL },
  ...SERVICE_NAV,
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '#contacto', label: 'Contacto' },
  {
    href: TALENT_PATH,
    label: TALENT_LABEL,
  },
] as const;
