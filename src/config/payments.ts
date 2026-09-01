/** URL de retorno tras el pago. En Stripe Payment Link, usarla como success URL. */
export const PAYMENT_SUCCESS_PATH = '/pago/gracias';

/** Gracias de la oferta de lanzamiento 299 €. Success URL del Payment Link. */
export const PAYMENT_LAUNCH_SUCCESS_PATH = '/pago/gracias/web-299';

export const PAYMENT_ROBOTS = 'noindex, nofollow, noarchive';

export type PaymentType = 'one_time' | 'subscription';

/** Por ahora solo mensual. Se puede ampliar el modelo más adelante. */
export type BillingInterval = 'monthly';

export type PaymentConfig = {
  id: string;
  clientName: string;
  serviceName: string;
  description: string;
  /** Importe SIN IVA, en euros. */
  amount: number;
  /** Porcentaje de IVA. Ejemplo: 21 = 21%. */
  vatRate: number;
  paymentType: PaymentType;
  billingInterval?: BillingInterval;
  stripePaymentLink: string;
  includes?: string[];
  conditions?: string;
};

/**
 * Pagos acordados. Añadir un cliente = añadir una entrada aquí.
 *
 * El ID es la URL: /pago/[id]
 * El importe sale SOLO de este archivo, nunca de la URL.
 * Pegar el Stripe Payment Link en stripePaymentLink.
 */
export const paymentConfigs: Record<string, PaymentConfig> = {
  'cliente-antiguo-ecommerce': {
    id: 'cliente-antiguo-ecommerce',
    clientName: 'Irene Camisetas Ahora',
    serviceName: 'Mantenimiento de 2 tiendas online',
    description: 'Mantenimiento mensual según condiciones acordadas.',
    amount: 70,
    vatRate: 21,
    paymentType: 'subscription',
    billingInterval: 'monthly',
    stripePaymentLink: 'https://buy.stripe.com/28EcN56yndKMgrPbJM4AU00',
    includes: [
      'Actualizaciones técnicas',
      'Copias de seguridad',
      'Resolución de incidencias',
      'Pequeños cambios acordados',
    ],
    conditions:
      '*Servicio con permanencia mínima de 6 meses.\nLa suscripción se renueva mensualmente y, una vez cumplido el periodo mínimo, puede cancelarse según las condiciones acordadas.',
  },
  'reserva-web-profesional': {
    id: 'reserva-web-profesional',
    clientName: 'Oferta de lanzamiento',
    serviceName: 'Reserva — Web profesional',
    description:
      'Reserva de 99 € + IVA para la web profesional de lanzamiento (299 € + IVA). El resto (200 € + IVA) se paga antes de la publicación. Se publica en un máximo de 72 h desde que nos entregas la información de tu negocio.',
    amount: 99,
    vatRate: 21,
    paymentType: 'one_time',
    // Success URL en Stripe: https://36web.es/pago/gracias/web-299
    stripePaymentLink: 'https://buy.stripe.com/5kQ9ATcWL0Y0dfDaFI4AU01',
    includes: [
      'Reserva para empezar el proyecto',
      'Web profesional a 299 € + IVA',
      'Tú entregas logo, textos y fotos',
      'Hosting y dominio incluidos',
      'Publicación en un máximo de 72 h desde que nos entregas la información de tu negocio',
      'Sin permanencia. La web es tuya',
    ],
    conditions:
      '*El importe de esta página es solo la reserva (99 € + IVA).\nEl resto (200 € + IVA) se paga antes de la publicación.',
  },
  'mantenimiento-base': {
    id: 'mantenimiento-base',
    clientName: '[CLIENTE]',
    serviceName: 'Mantenimiento web básico',
    description: 'Mantenimiento mensual según condiciones acordadas.',
    amount: 60,
    vatRate: 21,
    paymentType: 'subscription',
    billingInterval: 'monthly',
    stripePaymentLink: 'https://buy.stripe.com/28EcN56yndKMgrPbJM4AU01',
    includes: [
      'Actualizaciones técnicas',
      'Copias de seguridad',
      'Resolución de incidencias',
      'Pequeños cambios acordados',
      '1h de edición de contenidos en la web',
    ],
    conditions:
      '*Servicio con permanencia mínima de 6 meses.\nLa suscripción se renueva mensualmente y, una vez cumplido el periodo mínimo, puede cancelarse según las condiciones acordadas.',
  },
};

export const getPaymentById = (
  id: string | undefined,
): PaymentConfig | undefined => {
  if (!id) return undefined;
  return paymentConfigs[id];
};

export const getPaymentTotals = (payment: PaymentConfig) => {
  const vatAmount =
    Math.round(payment.amount * (payment.vatRate / 100) * 100) / 100;
  const total = Math.round((payment.amount + vatAmount) * 100) / 100;
  return { vatAmount, total };
};

export const formatEuro = (value: number): string => {
  const hasCents = Math.round(value * 100) % 100 !== 0;
  return `${new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value)} €`;
};

export const BILLING_INTERVAL_LABEL: Record<BillingInterval, string> = {
  monthly: 'Mensual',
};
