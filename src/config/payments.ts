/** URL de retorno tras el pago. En Stripe Payment Link, usarla como success URL. */
export const PAYMENT_SUCCESS_PATH = '/pago/gracias';

/** Gracias de la oferta de lanzamiento 349 €. Success URL del Payment Link. */
export const PAYMENT_LAUNCH_SUCCESS_PATH = '/pago/gracias/web-299';

export const PAYMENT_ROBOTS = 'noindex, nofollow, noarchive';

export type PaymentType = 'one_time' | 'subscription';

/** Por ahora solo mensual. Se puede ampliar el modelo más adelante. */
export type BillingInterval = 'monthly';

export type PricingMode = 'fixed' | 'hourly';

export type PaymentConfig = {
  id: string;
  clientName: string;
  serviceName: string;
  description: string;
  /** Importe SIN IVA, en euros. Si pricingMode es hourly, es el precio por hora. */
  amount: number;
  /** Porcentaje de IVA. Ejemplo: 21 = 21%. */
  vatRate: number;
  paymentType: PaymentType;
  billingInterval?: BillingInterval;
  pricingMode?: PricingMode;
  stripePaymentLink: string;
  includes?: string[];
  conditions?: string;
};

/** Tarifa del paquete de horas, sin IVA. */
export const HOURLY_RATE = 35;

export const HOURLY_PAYMENT_ID = 'paquete-horas';

export const HOURLY_MIN_HOURS = 1;

/** Tope de Stripe en Payment Links con quantity. */
export const HOURLY_MAX_HOURS = 99;

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
  'reserva-web-profesional-esencial': {
    id: 'reserva-web-profesional-esencial',
    clientName: 'Oferta de lanzamiento',
    serviceName: 'Reserva — Web profesional',
    description:
      'Reserva de 99 € + IVA para la web profesional de lanzamiento (349 € + IVA). El resto (250 € + IVA) se paga antes de la publicación. Se publica en un máximo de 72 h desde que nos entregas la información de tu negocio.',
    amount: 99,
    vatRate: 21,
    paymentType: 'one_time',
    // Success URL en Stripe: https://36web.es/pago/gracias/web-299
    stripePaymentLink: 'https://buy.stripe.com/5kQ9ATcWL0Y0dfDaFI4AU01',
    includes: [
      'Reserva para empezar el proyecto',
      'Web profesional a 349 € + IVA',
      'Tú entregas logo, textos y fotos',
      'Hosting y dominio incluidos',
      'Publicación en un máximo de 72 h desde que nos entregas la información de tu negocio',
      'Sin permanencia. La web es tuya',
    ],
    conditions:
      '*El importe de esta página es solo la reserva (99 € + IVA).\nEl resto (250 € + IVA) se paga antes de la publicación.',
  },
  [HOURLY_PAYMENT_ID]: {
    id: HOURLY_PAYMENT_ID,
    clientName: '',
    serviceName: 'Paquete de horas',
    description:
      'Bolsa de horas de diseño y desarrollo a 35 €/h + IVA. Indica las horas acordadas y paga el total correspondiente.',
    amount: HOURLY_RATE,
    vatRate: 21,
    paymentType: 'one_time',
    pricingMode: 'hourly',
    // Payment Link de Stripe: producto de 35 € SIN IVA, IVA 21 %, cantidad por URL.
    // Success URL: https://36web.es/pago/gracias
    // Desactivar «los clientes pueden ajustar la cantidad»: la pone esta página.
    stripePaymentLink: '',
    includes: [
      'Horas de diseño y desarrollo',
      'Tarifa 35 €/h + IVA',
      'Pago único según las horas que indiques',
    ],
    conditions:
      '*El precio es 35 € por hora, sin IVA.\nEl IVA (21 %) se aplica sobre el subtotal.\nLas horas se cobran en bloques enteros (mínimo 1).',
  },
  'paquete-mantenimiento-6h': {
    id: 'paquete-mantenimiento-6h',
    clientName: '',
    serviceName: 'Paquete de mantenimiento — 6 h',
    description: '6 horas de mantenimiento a 35 €/h + IVA.',
    amount: 6 * HOURLY_RATE,
    vatRate: 21,
    paymentType: 'one_time',
    stripePaymentLink: 'https://buy.stripe.com/cNi8wPaODeOQa3r6ps4AU02',
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

export const getTotalsFromNet = (amount: number, vatRate: number) => {
  const vatAmount = Math.round(amount * (vatRate / 100) * 100) / 100;
  const total = Math.round((amount + vatAmount) * 100) / 100;
  return { vatAmount, total };
};

export const getPaymentTotals = (payment: PaymentConfig) => {
  const { vatAmount, total } = getTotalsFromNet(
    payment.amount,
    payment.vatRate,
  );
  return { vatAmount, total };
};

export const clampHours = (hours: number): number =>
  Math.min(HOURLY_MAX_HOURS, Math.max(HOURLY_MIN_HOURS, hours));

export const parseHours = (raw: string): number | null => {
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < HOURLY_MIN_HOURS) return null;
  return clampHours(n);
};

export const getHourlyTotals = (hours: number, payment: PaymentConfig) => {
  const amount = Math.round(hours * payment.amount * 100) / 100;
  return { amount, ...getTotalsFromNet(amount, payment.vatRate) };
};

/** Stripe Payment Link: quantity = horas (el producto debe ser 1 hora a 35 € + IVA). */
export const buildStripeHoursCheckoutUrl = (
  paymentLink: string,
  hours: number,
): string => {
  const url = new URL(paymentLink);
  url.searchParams.set('quantity', String(hours));
  url.searchParams.set('client_reference_id', `paquete-horas-${hours}`);
  return url.toString();
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
