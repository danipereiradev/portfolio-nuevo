// Datos de contacto centralizados. Cambiar el número aquí actualiza toda la
// web (enlaces de WhatsApp, tel: y texto visible) desde un único sitio.
export const PHONE_NUMBER = '34644669828';
export const PHONE_DISPLAY = '+34 644 669 828';
export const PHONE_TEL_LINK = `tel:+${PHONE_NUMBER}`;
export const CONTACT_EMAIL = 'hola@36web.es';
export const BUSINESS_HOURS_LABEL = 'Horario: L-V de 9:00h a 18:00h';

// Ficha oficial de Google Maps (Pereira Web) para el mapa embebido en /contacto.
export const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194347.47826694263!2d-3.844350133832642!3d40.4380986114016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fbfaf5298cafb17%3A0xeff7a55bec419fb2!2sPereira%20Web!5e0!3m2!1ses!2ses!4v1786271937055!5m2!1ses!2ses';

export const GOOGLE_MAPS_PLACE_URL =
  'https://www.google.com/maps/place/Pereira+Web/data=!4m6!3m5!1s0x8fbfaf5298cafb17:0xeff7a55bec419fb2!8m2!3d40.4380986!4d-3.8443501!16s%2Fg%2F11zkg96x_g?hl=es&entry=ttu';

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hola, quiero información para un proyecto web.';

// Mensaje específico para el tráfico de campañas de Google Ads que llega a
// la landing /landing-diseno-web.
export const ADS_WHATSAPP_MESSAGE =
  'Hola, vengo de Google y quiero información para una web profesional a medida.';

export const ADS_SHOP_WHATSAPP_MESSAGE =
  'Hola, vengo de Google y quiero información para una tienda online.';

export const ADS_MAINTENANCE_WHATSAPP_MESSAGE =
  'Hola, vengo de Google y quiero información sobre mantenimiento web.';

// Mensaje para el botón de WhatsApp de /web-profesional (landing de packs).
export const WEB_PROFESIONAL_WHATSAPP_MESSAGE =
  'Hola, quiero información sobre la web profesional (249 € / 349 €).';

// Mensaje para el botón de WhatsApp de /tiendas-online.
export const ECOMMERCE_WHATSAPP_MESSAGE =
  'Hola, quiero información para una tienda online.';

// Mensaje para el botón de WhatsApp de /mantenimiento-web.
export const MAINTENANCE_WHATSAPP_MESSAGE =
  'Hola, quiero información sobre mantenimiento web.';

// Mensaje para el botón de WhatsApp de la página /contacto.
export const CONTACT_PAGE_WHATSAPP_MESSAGE =
  'Hola, quiero información para un proyecto web.';

// Mensaje para el CTA "Cuéntanos tu proyecto" de la página /sobre-el-estudio.
export const ABOUT_PAGE_WHATSAPP_MESSAGE =
  'Hola, he visto la página del estudio y quiero contaros mi proyecto.';

// Mensaje para el CTA "Solicitar ejemplos" de la sección de portfolio.
export const PORTFOLIO_WHATSAPP_MESSAGE =
  'Hola, he visto tu portfolio y me gustaría ver más ejemplos de proyectos similares al que necesito.';

export const buildWhatsAppUrl = (message: string = DEFAULT_WHATSAPP_MESSAGE) =>
  `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

// Quita la barra final de una ruta (salvo si es la raíz "/"), para que las
// comparaciones exactas de pathname no fallen si la URL llega con "/" al
// final (p. ej. "/landing-diseno-web/" servida como carpeta).
const normalizePath = (pathname: string): string => {
  const trimmed = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  try {
    return decodeURIComponent(trimmed);
  } catch {
    return trimmed;
  }
};

/** Página de servicio (orgánica). Menú Servicios → Diseño web. */
export const SITE_WEB_PATH = '/diseño-web';
export const SITE_WEB_PATH_ASCII = '/diseno-web';
export const SITE_WEB_LABEL = 'Páginas web';

/** Página de servicio (orgánica). Menú Servicios → Tiendas online. */
export const SITE_SHOP_PATH = '/tiendas-online';
export const SITE_SHOP_LABEL = 'Tiendas online';

export const SITE_MAINTENANCE_PATH = '/mantenimiento-web';
export const SITE_MAINTENANCE_LABEL = 'Mantenimiento web';

export const ABOUT_PATH = '/sobre-36web';
export const ABOUT_LABEL = 'nuestra agencia';

/** Landing de Ads de este servicio. Futuros servicios: /landing-{slug}. */
export const ADS_LANDING_PATH = '/landing-diseno-web';
export const ADS_LANDING_PATH_N = '/landing-diseño-web';

export const ADS_SHOP_LANDING_PATH = '/landing-tiendas-online';

export const ADS_MAINTENANCE_LANDING_PATH = '/landing-mantenimiento-web';

export const isAdsWebLandingPath = (pathname: string): boolean => {
  const path = normalizePath(pathname);
  return path === ADS_LANDING_PATH || path === ADS_LANDING_PATH_N;
};

export const isAdsShopLandingPath = (pathname: string): boolean =>
  normalizePath(pathname) === ADS_SHOP_LANDING_PATH;

export const isAdsMaintenanceLandingPath = (pathname: string): boolean =>
  normalizePath(pathname) === ADS_MAINTENANCE_LANDING_PATH;

export const isAdsLandingPath = (pathname: string): boolean =>
  isAdsWebLandingPath(pathname) ||
  isAdsShopLandingPath(pathname) ||
  isAdsMaintenanceLandingPath(pathname);

export const isSiteWebPath = (pathname: string): boolean => {
  const path = normalizePath(pathname);
  return path === SITE_WEB_PATH || path === SITE_WEB_PATH_ASCII;
};

// Devuelve el mensaje de WhatsApp más adecuado según la ruta actual, para
// que el botón flotante / sticky de móvil hable del servicio concreto que
// el visitante está mirando en cada página.
export const getWhatsAppMessageForPath = (pathname: string): string => {
  const path = normalizePath(pathname);
  if (isAdsShopLandingPath(path) || path === SITE_SHOP_PATH) {
    return path === SITE_SHOP_PATH
      ? ECOMMERCE_WHATSAPP_MESSAGE
      : ADS_SHOP_WHATSAPP_MESSAGE;
  }
  if (isAdsWebLandingPath(path)) return ADS_WHATSAPP_MESSAGE;
  if (isAdsMaintenanceLandingPath(path))
    return ADS_MAINTENANCE_WHATSAPP_MESSAGE;
  if (path === '/web-profesional') return WEB_PROFESIONAL_WHATSAPP_MESSAGE;
  if (path === ABOUT_PATH) return ABOUT_PAGE_WHATSAPP_MESSAGE;
  if (path === SITE_MAINTENANCE_PATH) return MAINTENANCE_WHATSAPP_MESSAGE;
  return DEFAULT_WHATSAPP_MESSAGE;
};
