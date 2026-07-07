// Datos de contacto centralizados. Cambiar el número aquí actualiza toda la
// web (enlaces de WhatsApp, tel: y texto visible) desde un único sitio.
export const PHONE_NUMBER = '34613444700';
export const PHONE_DISPLAY = '+34 613 444 700';
export const PHONE_TEL_LINK = `tel:+${PHONE_NUMBER}`;

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hola, quiero pedir presupuesto para mi web';

// Mensaje específico para el tráfico de campañas de Google Ads que llega a
// la landing /web-autonomos-pymes.
export const ADS_WHATSAPP_MESSAGE =
  'Hola Dani, vengo de Google y quiero información para una web profesional.';

export const buildWhatsAppUrl = (
  message: string = DEFAULT_WHATSAPP_MESSAGE,
) => `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
