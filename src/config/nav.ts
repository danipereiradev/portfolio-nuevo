import { BLOG_PATH } from '../blog/types';
import {
  ABOUT_LABEL,
  ABOUT_PATH,
  SITE_SHOP_LABEL,
  SITE_SHOP_PATH,
  SITE_WEB_LABEL,
  SITE_WEB_PATH,
} from './contact';

export const SERVICE_NAV = [
  { href: SITE_WEB_PATH, label: SITE_WEB_LABEL },
  { href: SITE_SHOP_PATH, label: SITE_SHOP_LABEL },
] as const;

export const MAIN_NAV = [
  { href: ABOUT_PATH, label: ABOUT_LABEL },
  { href: BLOG_PATH, label: 'Blog' },
  { href: '#contacto', label: 'Contacto' },
] as const;

export const FOOTER_NAV = [
  { href: ABOUT_PATH, label: ABOUT_LABEL },
  ...SERVICE_NAV,
  { href: BLOG_PATH, label: 'Blog' },
  { href: '#contacto', label: 'Contacto' },
  {
    href: 'mailto:hola@pereiraweb.es?subject=Trabaja%20con%20nosotros',
    label: 'Trabaja con nosotros',
  },
] as const;
