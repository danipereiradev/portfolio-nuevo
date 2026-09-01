/** URL de retorno tras el pago. En Stripe Payment Link, usarla como success URL. */
export const PAYMENT_SUCCESS_PATH = '/pago/gracias';

/** Gracias de la oferta de lanzamiento 349 €. Success URL del Payment Link. */
export const PAYMENT_LAUNCH_SUCCESS_PATH = '/pago/gracias/web-299';

export const PAYMENT_ROBOTS = 'noindex, nofollow, noarchive';

export type ThankYouPage = {
  path: string;
  title: string;
  heading: string;
  body: string;
};

export const THANK_YOU_PAGES = {
  default: {
    path: PAYMENT_SUCCESS_PATH,
    title: 'Pago recibido | 36web',
    heading: 'Pago recibido',
    body: 'Gracias. Hemos recibido tu pago. En breve la persona encargada de tu proyecto se pondrá en contacto contigo.',
  },
  'web-299': {
    path: PAYMENT_LAUNCH_SUCCESS_PATH,
    title: 'Reserva recibida | 36web',
    heading: 'Gracias por reservar tu web profesional con 36web',
    body: 'En breve la persona encargada de tu proyecto se pondrá en contacto contigo.',
  },
  'bono-tecnico-3h': {
    path: '/pago/gracias/bono-tecnico-3h',
    title: 'Pago recibido | Bono técnico 3 horas | 36web',
    heading: 'Pago recibido',
    body: 'Gracias. Hemos recibido el pago del bono técnico de 3 horas. En breve te escribimos para revisar la tarea y empezar.',
  },
  'bono-tecnico-6h': {
    path: '/pago/gracias/bono-tecnico-6h',
    title: 'Pago recibido | Bono técnico 6 horas | 36web',
    heading: 'Pago recibido',
    body: 'Gracias. Hemos recibido el pago del bono técnico de 6 horas. En breve te escribimos para revisar la tarea y empezar.',
  },
  'bono-tecnico-10h': {
    path: '/pago/gracias/bono-tecnico-10h',
    title: 'Pago recibido | Bono técnico 10 horas | 36web',
    heading: 'Pago recibido',
    body: 'Gracias. Hemos recibido el pago del bono técnico de 10 horas. En breve te escribimos para revisar la tarea y empezar.',
  },
  'mantenimiento-web-base-mensual': {
    path: '/gracias/mantenimiento-web-base-mensual',
    title: 'Pago recibido | Mantenimiento web base mensual | 36web',
    heading: 'Pago recibido',
    body: 'Gracias. Hemos recibido el pago del mantenimiento web base mensual. En breve nos pondremos en contacto contigo para activar el plan.',
  },
  'mantenimiento-web-negocio-mensual': {
    path: '/gracias/mantenimiento-web-negocio-mensual',
    title: 'Pago recibido | Mantenimiento Negocio | 36web',
    heading: 'Pago recibido',
    body: 'Gracias. Hemos recibido el pago del plan Negocio. En breve nos pondremos en contacto contigo para activar el mantenimiento.',
  },
} as const satisfies Record<string, ThankYouPage>;

export type ThankYouVariant = keyof typeof THANK_YOU_PAGES;

export const isPaymentOrThankYouPath = (pathname: string): boolean => {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (path === '/pago' || path.startsWith('/pago/')) return true;
  return Object.values(THANK_YOU_PAGES).some((page) => page.path === path);
};

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
  excludes?: string[];
  /** Texto del botón. Si no se indica: “Pagar ahora” o “Activar pago mensual”. */
  cta?: string;
  conditions?: string;
};

/** IDs de /pago para bonos y planes de la landing /mantenimiento-web. */
export const MAINTENANCE_PACK_3H_ID = 'paquete-mantenimiento-3h';
export const MAINTENANCE_PACK_6H_ID = 'paquete-mantenimiento-6h';
export const MAINTENANCE_PACK_10H_ID = 'paquete-mantenimiento-10h';
export const MAINTENANCE_PLAN_WEB_ID = 'mantenimiento-web';
export const MAINTENANCE_PLAN_NEGOCIO_ID = 'mantenimiento-negocio';
export const MAINTENANCE_PLAN_ECOMMERCE_ID = 'mantenimiento-ecommerce';

/** Caducidad de los bonos de mantenimiento, en meses desde la compra. */
export const HOUR_PACK_VALIDITY_MONTHS = 6;

export const paymentPath = (id: string): string => `/pago/${id}`;

/** Tarifa del paquete de horas, sin IVA. */
export const HOURLY_RATE = 35;

export const HOURLY_PAYMENT_ID = 'paquete-horas';

export const HOURLY_MIN_HOURS = 1;

/** Tope de Stripe en Payment Links con quantity. */
export const HOURLY_MAX_HOURS = 99;

const hourPackIncludes = (hours: number): string[] => [
  `${hours} horas de trabajo en tu web`,
  'Las horas se descuentan según el tiempo real trabajado',
  'Arreglos, cambios y soporte',
  `Si no las usas todas, duran ${HOUR_PACK_VALIDITY_MONTHS} meses`,
  'No superamos el bono sin tu aprobación',
];

const hourPackConditions =
  '*Pago único. Antes de empezar, revisamos la tarea.';

const monthlyMaintenanceExcludes = (hours: number): string[] => [
  'Rediseños',
  'Nuevas funcionalidades',
  'Desarrollos grandes',
  `El trabajo que pase de ${hours} ${hours === 1 ? 'hora' : 'horas'} se valora y se presupuesta antes`,
];

const monthlyMaintenanceConditions =
  '*Sin permanencia. Pago mensual. Puedes cancelar.\nLas horas de este mes no pasan al siguiente.';

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
  [MAINTENANCE_PACK_3H_ID]: {
    id: MAINTENANCE_PACK_3H_ID,
    clientName: '',
    serviceName: 'Bono técnico 3 horas',
    description:
      'Horas de trabajo para arreglar o mejorar tu web. Pagas ahora y las usamos cuando las necesites.',
    amount: 120,
    vatRate: 21,
    paymentType: 'one_time',
    stripePaymentLink: 'https://buy.stripe.com/cNi9AT7Cr6ikfnL6ps4AU03',
    // Success URL: https://36web.es/pago/gracias/bono-tecnico-3h
    includes: hourPackIncludes(3),
    cta: 'Pagar ahora',
    conditions: hourPackConditions,
  },
  [MAINTENANCE_PACK_6H_ID]: {
    id: MAINTENANCE_PACK_6H_ID,
    clientName: '',
    serviceName: 'Bono técnico 6 horas',
    description:
      'Ideal si tienes varias cosas que arreglar, mejorar o revisar en tu web.',
    amount: 210,
    vatRate: 21,
    paymentType: 'one_time',
    stripePaymentLink: 'https://buy.stripe.com/14A14naODbCEcbzeVY4AU04',
    // Success URL: https://36web.es/pago/gracias/bono-tecnico-6h
    includes: hourPackIncludes(6),
    cta: 'Pagar ahora',
    conditions: hourPackConditions,
  },
  [MAINTENANCE_PACK_10H_ID]: {
    id: MAINTENANCE_PACK_10H_ID,
    clientName: '',
    serviceName: 'Bono técnico 10 horas',
    description:
      'Encaja si tienes varias tareas pendientes o un trabajo más grande.',
    amount: 320,
    vatRate: 21,
    paymentType: 'one_time',
    stripePaymentLink: 'https://buy.stripe.com/cNifZhbSHgWY5Nb5lo4AU05',
    // Success URL: https://36web.es/pago/gracias/bono-tecnico-10h
    includes: hourPackIncludes(10),
    cta: 'Pagar ahora',
    conditions: hourPackConditions,
  },
  [MAINTENANCE_PLAN_WEB_ID]: {
    id: MAINTENANCE_PLAN_WEB_ID,
    clientName: '',
    serviceName: 'Mantenimiento Web · Plan Base',
    description:
      'Nos ocupamos de tu web cada mes: que funcione, esté al día y tengas a quién escribir si algo falla.',
    amount: 59,
    vatRate: 21,
    paymentType: 'subscription',
    billingInterval: 'monthly',
    stripePaymentLink: 'https://buy.stripe.com/3cIbJ12i7gWYa3r4hk4AU06',
    // Success URL: https://36web.es/gracias/mantenimiento-web-base-mensual
    includes: [
      'Revisión mensual de que la web funciona',
      'Actualizaciones cuando hagan falta',
      'Copias de seguridad cuando la infraestructura de la web lo permita',
      'Formularios y certificado de seguridad',
      'Soporte por email',
      'Hasta 1 hora al mes para pequeños cambios',
    ],
    excludes: monthlyMaintenanceExcludes(1),
    cta: 'Activar mantenimiento mensual',
    conditions: monthlyMaintenanceConditions,
  },
  [MAINTENANCE_PLAN_NEGOCIO_ID]: {
    id: MAINTENANCE_PLAN_NEGOCIO_ID,
    clientName: '',
    serviceName: 'Mantenimiento Web · Plan Negocio',
    description:
      'Para webs que generan contactos o cambian a menudo. Más prioridad y más tiempo cada mes.',
    amount: 99,
    vatRate: 21,
    paymentType: 'subscription',
    billingInterval: 'monthly',
    stripePaymentLink: 'https://buy.stripe.com/cNieVdf4T7modfDdRU4AU07',
    // Success URL: https://36web.es/gracias/mantenimiento-web-negocio-mensual
    includes: [
      'Todo lo del Plan Base',
      'Hasta 2 horas al mes para soporte y cambios',
      'Más prioridad cuando algo falla',
      'Revisión periódica del estado de la web',
    ],
    excludes: monthlyMaintenanceExcludes(2),
    cta: 'Activar mantenimiento mensual',
    conditions: monthlyMaintenanceConditions,
  },
  [MAINTENANCE_PLAN_ECOMMERCE_ID]: {
    id: MAINTENANCE_PLAN_ECOMMERCE_ID,
    clientName: '',
    serviceName: 'Mantenimiento Ecommerce',
    description:
      'Mantenimiento mensual para WooCommerce, Shopify, Prestashop y otras tiendas. Desde 149 € + IVA/mes, según la tienda.',
    amount: 149,
    vatRate: 21,
    paymentType: 'subscription',
    billingInterval: 'monthly',
    stripePaymentLink: '',
    includes: [
      'Revisión técnica',
      'Checkout, pagos y pedidos',
      'Actualizaciones e integraciones',
      'Copias cuando corresponda',
      'Rendimiento',
      'Soporte prioritario',
      'Hasta 2 horas mensuales como referencia (no acumulable)',
    ],
    conditions:
      '*Precio de partida. Antes de aceptar el mantenimiento revisamos tu tienda para confirmar que este plan encaja.\nSin permanencia. Pago mensual. Puedes cancelar.',
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
