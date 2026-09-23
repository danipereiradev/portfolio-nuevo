import type { LocalWebCity } from './localWebCityTypes';

export const LOCAL_WEB_DEMO_BASE = 'https://demo-36web.vercel.app';

export type LocalWebDemoSector = {
  sector: string;
  titlePrefix: string;
  imageFile: string;
};

/** Sectores de demo. Imagen genérica: `/img/local/{imageFile}`. URL: `/{sector}/{slug}`. */
export const LOCAL_WEB_DEMO_SECTORS: readonly LocalWebDemoSector[] = [
  {
    sector: 'reparaciones',
    titlePrefix: 'Reformas',
    imageFile: 'reformas.webp',
  },
  {
    sector: 'psicologia',
    titlePrefix: 'Psicóloga',
    imageFile: 'psicologa.webp',
  },
  {
    sector: 'inmobiliaria',
    titlePrefix: 'Inmobiliaria',
    imageFile: 'inmobiliaria.webp',
  },
];

export type LocalWebDemo = {
  title: string;
  href: string;
  image: string;
};

export const localWebDemoHref = (sector: string, citySlug: string): string =>
  `${LOCAL_WEB_DEMO_BASE}/${sector}/${citySlug}`;

export const localWebDemoTitle = (titlePrefix: string, ciudad: string): string =>
  `${titlePrefix} en ${ciudad}`;

export const localWebDemoImage = (imageFile: string): string =>
  `/img/local/${imageFile}`;

export const getLocalWebDemos = (city: LocalWebCity): LocalWebDemo[] =>
  LOCAL_WEB_DEMO_SECTORS.map((demo) => ({
    title: localWebDemoTitle(demo.titlePrefix, city.ciudad),
    href: localWebDemoHref(demo.sector, city.slug),
    image: localWebDemoImage(demo.imageFile),
  }));
