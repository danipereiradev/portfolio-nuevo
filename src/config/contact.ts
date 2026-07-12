// Datos de contacto centralizados. Cambiar el número aquí actualiza toda la
// web (enlaces de WhatsApp, tel: y texto visible) desde un único sitio.
export const PHONE_NUMBER = '34644669828';
export const PHONE_DISPLAY = '+34 644 669 828';
export const PHONE_TEL_LINK = `tel:+${PHONE_NUMBER}`;

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hola, quiero información para un proyecto web.';

// Mensaje específico para el tráfico de campañas de Google Ads que llega a
// la landing /web-autonomos-pymes.
export const ADS_WHATSAPP_MESSAGE =
  'Hola, vengo de Google y quiero información para una web profesional.';

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

export const buildWhatsAppUrl = (
  message: string = DEFAULT_WHATSAPP_MESSAGE,
) => `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

// Quita la barra final de una ruta (salvo si es la raíz "/"), para que las
// comparaciones exactas de pathname no fallen si la URL llega con "/" al
// final (p. ej. "/web-autonomos-pymes/" servida directamente como carpeta
// por el hosting, o enlazada así desde fuera).
const normalizePath = (pathname: string): string =>
  pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

// Devuelve el mensaje de WhatsApp más adecuado según la ruta actual, para
// que el botón flotante / sticky de móvil hable del servicio concreto que
// el visitante está mirando en cada página.
export const getWhatsAppMessageForPath = (pathname: string): string => {
  const path = normalizePath(pathname);
  if (path === '/web-autonomos-pymes') return ADS_WHATSAPP_MESSAGE;
  if (path === '/tiendas-online') return ECOMMERCE_WHATSAPP_MESSAGE;
  if (path === '/mantenimiento-web') return MAINTENANCE_WHATSAPP_MESSAGE;
  return DEFAULT_WHATSAPP_MESSAGE;
};
