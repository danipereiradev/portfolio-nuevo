import {
  SITE_APPS_PATH,
  SITE_APPS_LABEL,
  ABOUT_LABEL,
  ABOUT_PATH,
  CONTACT_LABEL,
  CONTACT_PATH,
  SITE_MAINTENANCE_LABEL,
  SITE_MAINTENANCE_PATH,
  SITE_SHOP_LABEL,
  SITE_SHOP_PATH,
  SITE_WEB_LABEL,
  SITE_WEB_PATH,
  TALENT_LABEL,
  TALENT_PATH,
  TRANQUILIDAD_DIGITAL_LABEL,
  TRANQUILIDAD_DIGITAL_PATH,
} from './contact';

export const SERVICE_NAV = [
  { href: SITE_WEB_PATH, label: SITE_WEB_LABEL },
  { href: SITE_SHOP_PATH, label: SITE_SHOP_LABEL },
  { href: SITE_APPS_PATH, label: SITE_APPS_LABEL },
  { href: SITE_MAINTENANCE_PATH, label: SITE_MAINTENANCE_LABEL },
  { href: TRANQUILIDAD_DIGITAL_PATH, label: TRANQUILIDAD_DIGITAL_LABEL },
] as const;

export const MAIN_NAV = [
  { href: '/', label: 'Inicio' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: ABOUT_PATH, label: ABOUT_LABEL },
  { href: CONTACT_PATH, label: CONTACT_LABEL },
] as const;

export const FOOTER_NAV = [
  { href: '/', label: 'Inicio' },
  { href: ABOUT_PATH, label: ABOUT_LABEL },
  ...SERVICE_NAV,
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: CONTACT_PATH, label: CONTACT_LABEL },
  {
    href: TALENT_PATH,
    label: TALENT_LABEL,
  },
] as const;
