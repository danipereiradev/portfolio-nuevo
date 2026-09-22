import type { LocalWebCity } from './localWebCityTypes';

export type LocalGeoContext = {
  heading: string;
  body?: string;
};

const GENERIC_ZONAS = new Set([
  'centro',
  'comercio de barrio',
  'comercio local',
  'naves',
  'polígono',
  'polígonos',
]);

const fold = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');

const appearsIn = (haystack: string, needle: string) =>
  fold(haystack).includes(fold(needle.trim()));

export const joinEs = (items: string[]): string => {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} y ${items[1]}`;
  return `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`;
};

const areaComplement = (area: string) => {
  const trimmed = area.trim();
  if (/^(corredor|área|area)\b/i.test(trimmed)) return `del ${trimmed}`;
  return `de ${trimmed}`;
};

const areaCoversCity = (city: LocalWebCity) => {
  const area = fold(city.contexto_local.area);
  const ciudad = fold(city.ciudad);
  return area === ciudad || area.startsWith(`${ciudad} `);
};

const placeZonas = (city: LocalWebCity) =>
  city.contexto_local.zonas
    .map((zona) => zona.trim())
    .filter((zona) => zona.length > 0)
    .filter((zona) => !GENERIC_ZONAS.has(zona.toLowerCase()))
    .filter((zona) => !appearsIn(city.contexto_local.area, zona));

const tejidoAsList = (tejido: string) => {
  const trimmed = tejido.trim().replace(/\.+$/, '');
  if (!trimmed) return '';
  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
};

/**
 * Plaza económica, no un listado de barrios.
 * Usa `tejido_empresarial` cuando existe; las zonas solo si no hay tejido.
 * No lista municipios: eso ya va en “otras páginas”.
 */
export const getLocalGeoContext = (
  city: LocalWebCity,
): LocalGeoContext | null => {
  const area = city.contexto_local.area.trim();
  if (!area) return null;

  const heading = areaCoversCity(city)
    ? `Trabajamos con negocios de ${area}`
    : `Trabajamos con negocios de ${city.ciudad} y ${areaComplement(area)}`;

  const tejido = tejidoAsList(city.contexto_local.tejido_empresarial);
  if (tejido) {
    return {
      heading,
      body: `${city.ciudad} combina ${tejido}. La web puede dejar claro qué hace la empresa, dónde trabaja y cómo pedir presupuesto.`,
    };
  }

  const intro = city.intro_local.join(' ');
  const zonas = placeZonas(city)
    .filter((zona) => !appearsIn(intro, zona))
    .slice(0, 3);

  if (zonas.length >= 2) {
    return {
      heading,
      body: `Si te buscan por zona —${joinEs(zonas)}— la web lo deja escrito.`,
    };
  }

  if (zonas.length === 1) {
    return {
      heading,
      body: `Si te buscan por ${zonas[0]}, la web lo deja escrito.`,
    };
  }

  return { heading };
};
