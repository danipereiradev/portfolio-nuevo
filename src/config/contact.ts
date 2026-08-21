// Datos de contacto centralizados. Cambiar el número aquí actualiza toda la
// web (enlaces de WhatsApp, tel: y texto visible) desde un único sitio.
export const PHONE_NUMBER = '34644669828';
export const PHONE_DISPLAY = '+34 644 669 828';
export const PHONE_TEL_LINK = `tel:+${PHONE_NUMBER}`;

// Ficha oficial de Google Maps (Pereira Web) para el mapa embebido en /contacto.
export const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194347.47826694263!2d-3.844350133832642!3d40.4380986114016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fbfaf5298cafb17%3A0xeff7a55bec419fb2!2sPereira%20Web!5e0!3m2!1ses!2ses!4v1786271937055!5m2!1ses!2ses';

export const GOOGLE_MAPS_PLACE_URL =
  'https://www.google.com/maps/place/Pereira+Web/data=!4m6!3m5!1s0x8fbfaf5298cafb17:0xeff7a55bec419fb2!8m2!3d40.4380986!4d-3.8443501!16s%2Fg%2F11zkg96x_g?hl=es&entry=ttu';

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hola, quiero información para un proyecto web.';

// Mensaje específico para el tráfico de campañas de Google Ads que llega a
// la landing /web-profesional-a-medida.
export const ADS_WHATSAPP_MESSAGE =
  'Hola, vengo de Google y quiero información para una web profesional a medida.';

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

export const buildWhatsAppUrl = (
  message: string = DEFAULT_WHATSAPP_MESSAGE,
) => `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

// Quita la barra final de una ruta (salvo si es la raíz "/"), para que las
// comparaciones exactas de pathname no fallen si la URL llega con "/" al
// final (p. ej. "/web-profesional-a-medida/" servida directamente como
// carpeta por el hosting, o enlazada así desde fuera).
const normalizePath = (pathname: string): string =>
  pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

export const ADS_LANDING_PATH = '/web-profesional-a-medida';
export const SITE_WEB_PATH = '/web-a-medida';

export const isAdsLandingPath = (pathname: string): boolean =>
  normalizePath(pathname) === ADS_LANDING_PATH;

// Devuelve el mensaje de WhatsApp más adecuado según la ruta actual, para
// que el botón flotante / sticky de móvil hable del servicio concreto que
// el visitante está mirando en cada página.
export const getWhatsAppMessageForPath = (pathname: string): string => {
  const path = normalizePath(pathname);
  if (path === '/web-profesional-a-medida') return ADS_WHATSAPP_MESSAGE;
  if (path === '/web-profesional') return WEB_PROFESIONAL_WHATSAPP_MESSAGE;
  if (path === '/tiendas-online') return ECOMMERCE_WHATSAPP_MESSAGE;
  if (path === '/mantenimiento-web') return MAINTENANCE_WHATSAPP_MESSAGE;
  return DEFAULT_WHATSAPP_MESSAGE;
};
