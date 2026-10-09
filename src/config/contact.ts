// Datos de contacto centralizados. Cambiar el número aquí actualiza toda la
// web (enlaces de WhatsApp, tel: y texto visible) desde un único sitio.
export const PHONE_NUMBER = '34644665352';
export const PHONE_DISPLAY = '644 665 352';
export const PHONE_TEL_LINK = `tel:+${PHONE_NUMBER}`;
export const CONTACT_EMAIL = 'hola@36web.es';
export const BUSINESS_ADDRESS =
  'Calle Condega 7, 28850, Torrejón de Ardoz, Madrid';
export const INSTAGRAM_HANDLE = '36web.es';
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;
export const INSTAGRAM_EMBED_URL = `${INSTAGRAM_URL}embed/`;
// Formspree ya entrega a CONTACT_EMAIL; el CC tiene que ser otra dirección.
export const FORM_CC_EMAIL = 'info.danipereira@gmail.com';
export const BUSINESS_HOURS = 'L-V de 9:00h a 20:00h';
export const BUSINESS_HOURS_LABEL = `Horario: ${BUSINESS_HOURS}`;

// Ficha oficial de Google Maps (Pereira Web) para el mapa embebido en /contacto.
export const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194347.47826694263!2d-3.844350133832642!3d40.4380986114016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fbfaf5298cafb17%3A0xeff7a55bec419fb2!2sPereira%20Web!5e0!3m2!1ses!2ses!4v1786271937055!5m2!1ses!2ses';

export const GOOGLE_MAPS_PLACE_URL =
  'https://www.google.com/maps/place/Pereira+Web/data=!4m6!3m5!1s0x8fbfaf5298cafb17:0xeff7a55bec419fb2!8m2!3d40.4380986!4d-3.8443501!16s%2Fg%2F11zkg96x_g?hl=es&entry=ttu';

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hola, quiero información para un proyecto web.';

// Prefill de WhatsApp en landings de Ads. El texto identifica el producto
// en el chat (tracking de origen).
export const ADS_WHATSAPP_MESSAGE = 'Estoy interesado en diseño web';

export const ADS_SHOP_WHATSAPP_MESSAGE = 'Estoy interesado en tienda online';

export const ADS_MAINTENANCE_WHATSAPP_MESSAGE =
  'Hola, vengo de la página de mantenimiento web y quiero consultar mi caso.';

export const ADS_LAUNCH_WHATSAPP_MESSAGE =
  'Hola, me interesa la web de servicios por 399 € + IVA. Quiero información para mi negocio.';

export const ADS_GOOGLE_ADS_WHATSAPP_MESSAGE = 'Estoy interesado en Google Ads';

export const ADS_MAINTENANCE_INFRA_WHATSAPP_MESSAGE =
  'Estoy interesado en mantenimiento negocio e infraestructura';

/** Origen del formulario en la landing de oferta 590 €. Sale en Formspree y en el tracking. */
export const ADS_LAUNCH_FORM_ORIGIN = 'landing promo 590';

/** Captura de email: ¿entra en 590 €? No es el formulario de llamada. */
export const ADS_LAUNCH_FIT_FORM_ORIGIN = 'landing promo 590 encaje';

/** Popup de salida en la landing de oferta 590 €. */
export const ADS_LAUNCH_EXIT_FORM_ORIGIN = 'landing promo 590 salida';

/** Popup de salida en las demás landings de diseño web. */
export const ADS_WEB_EXIT_FORM_ORIGIN = 'landing diseño web salida';
export const ADS_CUSTOM_WEB_EXIT_FORM_ORIGIN = 'landing web a medida salida';
export const ADS_PSYCHOLOGISTS_EXIT_FORM_ORIGIN =
  'landing web psicologos salida';
export const ADS_REAL_ESTATE_EXIT_FORM_ORIGIN =
  'landing inmobiliarias 590 salida';

/** Origen del formulario de la landing de Google Ads. */
export const ADS_GOOGLE_ADS_FORM_ORIGIN = 'landing google ads';

/** Origen del formulario de la landing de mantenimiento + infraestructura. */
export const ADS_MAINTENANCE_INFRA_FORM_ORIGIN = 'landing mantenimiento infra';

/** Origen de cada formulario de la landing de mantenimiento (Formspree + GA). */
export const ADS_MAINTENANCE_FORM_HERO = 'Landing mantenimiento web — Hero';
export const ADS_MAINTENANCE_FORM_FINAL =
  'Landing mantenimiento web — CTA final';

// Mensaje para el botón de WhatsApp de /web-profesional (landing de packs).
export const WEB_PROFESIONAL_WHATSAPP_MESSAGE =
  'Hola, quiero información sobre la web profesional (590 € / 590 €).';

// Mensaje para el botón de WhatsApp de /tiendas-online.
export const ECOMMERCE_WHATSAPP_MESSAGE =
  'Hola, quiero información para una tienda online.';

// Mensaje para el botón de WhatsApp de /mantenimiento-web.
export const MAINTENANCE_WHATSAPP_MESSAGE =
  'Hola, vengo de la página de mantenimiento de 36web. Necesito ayuda con mi web:';

// Mensaje para el botón de WhatsApp de la página /contacto.
export const CONTACT_PAGE_WHATSAPP_MESSAGE =
  'Hola, quiero información para un proyecto web.';

// Mensaje para el CTA "Cuéntanos tu proyecto" de la página /sobre-el-estudio.
export const ABOUT_PAGE_WHATSAPP_MESSAGE =
  'Hola, he visto la página del estudio y quiero contaros mi proyecto.';

// Mensaje para el CTA "Solicitar ejemplos" de la sección de portfolio.
export const PORTFOLIO_WHATSAPP_MESSAGE =
  'Hola, he visto tu portfolio y me gustaría ver más ejemplos de proyectos similares al que necesito.';

export const CLIENT_REFERENCE_WHATSAPP_MESSAGE =
  'Hola, estoy valorando trabajar con 36web y me gustaría hablar con uno de vuestros clientes para conocer su experiencia.';

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

/** Catálogo de trabajos. No va en el menú: se entra por URL. */
export const PORTFOLIO_PATH = '/portfolio';

/** Página de servicio (orgánica). Menú Servicios → Diseño web. */
export const SITE_WEB_PATH = '/diseno-web';
export const SITE_WEB_PATH_N = '/diseño-web';
export const SITE_WEB_LABEL = 'Diseño web';

/** SEO local: /diseno-web/{slug}/. El slug vive en `src/data/localWebCities.ts`. */
export const localWebCityPath = (slug: string) => `${SITE_WEB_PATH}/${slug}`;

/** Página de servicio (orgánica). Menú Servicios → Tiendas online. */
export const SITE_SHOP_PATH = '/tiendas-online';
export const SITE_SHOP_LABEL = 'Tiendas Online';

export const SITE_APPS_PATH = '/aplicaciones';
export const SITE_APPS_LABEL = 'Aplicaciones';

export const SITE_MAINTENANCE_PATH = '/mantenimiento-web';
export const SITE_MAINTENANCE_LABEL = 'Mantenimiento Web';

export const ABOUT_PATH = '/sobre-36web';
export const ABOUT_LABEL = 'Nuestra agencia';

export const CONTACT_PATH = '/contacto';
export const CONTACT_LABEL = 'Contacto';
export const FORM_THANKS_PATH = '/gracias';

/** Captación de talento. Ciudad obligatoria para cruzar con páginas locales. */
export const TALENT_PATH = '/trabaja-con-nosotros';
export const TALENT_LABEL = 'Trabaja con nosotros';
export const TALENT_FORM_ORIGIN = 'trabaja-con-nosotros';

export const talentApplyPath = (ciudad: string) =>
  `${TALENT_PATH}/?ciudad=${encodeURIComponent(ciudad)}`;

export const talentLandingOrigin = (slug: string) => `landing_local_${slug}`;

/** Landing de Ads de diseño web. Redirige a web a medida. */
export const ADS_LANDING_PATH = '/landing-diseno-web';
export const ADS_LANDING_PATH_N = '/landing-diseño-web';

/** Landing de Ads de diseño web. Destino de campañas y de las URLs retiradas. */
export const ADS_CUSTOM_WEB_LANDING_PATH = '/landing-web-a-medida';

export const ADS_SHOP_LANDING_PATH = '/landing-tiendas-online';

export const ADS_MAINTENANCE_LANDING_PATH = '/landing-mantenimiento-web';

/** Antigua oferta 399 €. Redirige a web a medida. */
export const ADS_LAUNCH_LANDING_PATH = '/landing-web-profesional';
export const ADS_REAL_ESTATE_LANDING_PATH =
  '/landing-web-profesional-inmobiliarias';
export const ADS_REAL_ESTATE_FORM_ORIGIN = 'landing inmobiliarias 590';

/** Landing de Ads del servicio Google Ads. */
export const ADS_GOOGLE_ADS_LANDING_PATH = '/landing-google-ads';

/** Landing de mantenimiento Negocio + Infraestructura. */
export const ADS_MAINTENANCE_INFRA_LANDING_PATH =
  '/landing-mantenimiento-infra';

export const isAdsWebLandingPath = (pathname: string): boolean => {
  const path = normalizePath(pathname);
  return path === ADS_LANDING_PATH || path === ADS_LANDING_PATH_N;
};

export const isAdsShopLandingPath = (pathname: string): boolean =>
  normalizePath(pathname) === ADS_SHOP_LANDING_PATH;

export const isAdsMaintenanceLandingPath = (pathname: string): boolean =>
  normalizePath(pathname) === ADS_MAINTENANCE_LANDING_PATH;

export const isAdsLaunchLandingPath = (pathname: string): boolean =>
  normalizePath(pathname) === ADS_REAL_ESTATE_LANDING_PATH;

export const isAdsGoogleAdsLandingPath = (pathname: string): boolean =>
  normalizePath(pathname) === ADS_GOOGLE_ADS_LANDING_PATH;

export const isAdsMaintenanceInfraLandingPath = (pathname: string): boolean =>
  normalizePath(pathname) === ADS_MAINTENANCE_INFRA_LANDING_PATH;

export const isAdsLandingPath = (pathname: string): boolean =>
  [
    ADS_CUSTOM_WEB_LANDING_PATH,
    '/landing-web-psicologos',
    ADS_LAUNCH_LANDING_PATH,
  ].includes(normalizePath(pathname)) ||
  isAdsWebLandingPath(pathname) ||
  isAdsShopLandingPath(pathname) ||
  isAdsMaintenanceLandingPath(pathname) ||
  isAdsLaunchLandingPath(pathname) ||
  isAdsGoogleAdsLandingPath(pathname) ||
  isAdsMaintenanceInfraLandingPath(pathname);

const LEGAL_PATHS = new Set([
  '/aviso-legal',
  '/politica-de-privacidad',
  '/politica-de-cookies',
  '/terminos-y-condiciones',
]);

export const isHomePath = (pathname: string): boolean =>
  normalizePath(pathname) === '/';

export const isLegalPath = (pathname: string): boolean =>
  LEGAL_PATHS.has(normalizePath(pathname));

export const isFormThanksPath = (pathname: string): boolean =>
  normalizePath(pathname) === FORM_THANKS_PATH;

export const contactHrefForPath = (pathname: string): string =>
  isAdsLandingPath(pathname) ? '#contacto' : CONTACT_PATH;

export const isSiteWebPath = (pathname: string): boolean => {
  const path = normalizePath(pathname);
  return path === SITE_WEB_PATH || path === SITE_WEB_PATH_N;
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
  if (path === '/landing-web-psicologos')
    return 'Hola, me interesa una web para mi consulta de psicología. Me gustaría comentar mi proyecto y pedir una propuesta.';
  if (path === ADS_REAL_ESTATE_LANDING_PATH)
    return 'Hola, me interesa la web para mi inmobiliaria por 590 € + IVA. Quiero información sobre el catálogo y el panel de edición.';
  if (isAdsLaunchLandingPath(path)) return ADS_LAUNCH_WHATSAPP_MESSAGE;
  if (isAdsGoogleAdsLandingPath(path)) return ADS_GOOGLE_ADS_WHATSAPP_MESSAGE;
  if (isAdsMaintenanceInfraLandingPath(path))
    return ADS_MAINTENANCE_INFRA_WHATSAPP_MESSAGE;
  if (isAdsWebLandingPath(path)) return ADS_WHATSAPP_MESSAGE;
  if (isAdsMaintenanceLandingPath(path))
    return ADS_MAINTENANCE_WHATSAPP_MESSAGE;
  if (path === '/web-profesional') return WEB_PROFESIONAL_WHATSAPP_MESSAGE;
  if (path === SITE_APPS_PATH)
    return 'Hola, quiero contaros mi proyecto de aplicación y pedir una propuesta.';
  if (path === ABOUT_PATH) return ABOUT_PAGE_WHATSAPP_MESSAGE;
  if (path === CONTACT_PATH) return CONTACT_PAGE_WHATSAPP_MESSAGE;
  if (path === PORTFOLIO_PATH) return PORTFOLIO_WHATSAPP_MESSAGE;
  if (path === SITE_MAINTENANCE_PATH) return MAINTENANCE_WHATSAPP_MESSAGE;
  return DEFAULT_WHATSAPP_MESSAGE;
};
