import {
  formatEuro,
  MAINTENANCE_PACK_10H_ID,
  MAINTENANCE_PACK_3H_ID,
  MAINTENANCE_PACK_6H_ID,
  MAINTENANCE_PLAN_NEGOCIO_ID,
  MAINTENANCE_PLAN_WEB_ID,
  HOUR_PACK_VALIDITY_MONTHS,
  paymentPath,
} from './payments';

/** Origen del formulario. Sale en Formspree y en el tracking. */
export const MAINTENANCE_FORM_ORIGIN = 'mantenimiento-web';

export const MAINTENANCE_BONOS_ID = 'bonos';
export const MAINTENANCE_PLANES_ID = 'planes';
export const MAINTENANCE_CONTACT_ID = 'contacto';
export const MAINTENANCE_APPS_ID = 'aplicaciones';

export { HOUR_PACK_VALIDITY_MONTHS };

/** Rutas /pago. El Stripe Payment Link va en payments.ts (vacío hasta crearlo). */
export const BONO_3H_URL = paymentPath(MAINTENANCE_PACK_3H_ID);
export const BONO_6H_URL = paymentPath(MAINTENANCE_PACK_6H_ID);
export const BONO_10H_URL = paymentPath(MAINTENANCE_PACK_10H_ID);
export const PLAN_WEB_URL = paymentPath(MAINTENANCE_PLAN_WEB_ID);
export const PLAN_NEGOCIO_URL = paymentPath(MAINTENANCE_PLAN_NEGOCIO_ID);

export const maintenanceCardAlignClass =
  'items-center text-center md:items-stretch md:text-left';

export const maintenanceListClass =
  'mx-auto w-fit text-left md:mx-0 md:w-full';

export const maintenancePriceCardClass = (featured?: boolean): string =>
  `relative flex h-full flex-col ${maintenanceCardAlignClass} rounded-lg bg-white p-content-pad text-ink-dark shadow-xl ${
    featured ? 'ring-2 ring-accent' : 'ring-1 ring-black/10'
  }`;

export type HourPackId = '3' | '6' | '10';

export type HourPack = {
  id: HourPackId;
  hours: number;
  amount: number;
  hourlyRate: number;
  name: string;
  cta: string;
  featured?: boolean;
  featuredLabel?: string;
  ideal: string[];
  checkoutUrl: string;
};

export const HOUR_PACKS: HourPack[] = [
  {
    id: '3',
    hours: 3,
    amount: 120,
    hourlyRate: 40,
    name: 'Bono 3 horas',
    cta: 'Contratar',
    ideal: [
      'Pequeños arreglos',
      'Ajustes visuales',
      'Configuración',
      'Formularios',
      'SSL',
      'Cambios de contenido',
    ],
    checkoutUrl: BONO_3H_URL,
  },
  {
    id: '6',
    hours: 6,
    amount: 210,
    hourlyRate: 35,
    name: 'Bono 6 horas',
    cta: 'Contratar',
    featured: true,
    featuredLabel: 'Más elegido',
    ideal: [
      'Varias incidencias',
      'Reparaciones',
      'Frontend',
      'Configuración de servidor',
      'Integraciones',
      'Mejoras técnicas',
    ],
    checkoutUrl: BONO_6H_URL,
  },
  {
    id: '10',
    hours: 10,
    amount: 320,
    hourlyRate: 32,
    name: 'Bono 10 horas',
    cta: 'Contratar',
    ideal: [
      'Varias tareas pendientes',
      'Evolución',
      'Mantenimiento correctivo',
      'Cambios técnicos más importantes',
    ],
    checkoutUrl: BONO_10H_URL,
  },
];

export type MaintenancePlanId = 'web' | 'negocio' | 'ecommerce' | 'apps';

export type MaintenancePlan = {
  id: MaintenancePlanId;
  name: string;
  amount: number;
  from?: boolean;
  interval: string;
  ideal: string;
  featured?: boolean;
  featuredLabel?: string;
  includes: string[];
  notes?: string[];
  cta: string;
  ctaHref: string;
};

export const MAINTENANCE_PLANS: MaintenancePlan[] = [
  {
    id: 'web',
    name: 'Mantenimiento Web',
    amount: 59,
    interval: ' / mes',
    ideal: 'Web corporativa, landing, portfolio o WordPress sencillo.',
    includes: [
      'Revisiones técnicas',
      'Actualizaciones cuando proceda',
      'Copias de seguridad si la infraestructura lo permite',
      'Comprobación de funcionamiento',
      'Revisión de formularios',
      'SSL',
      'Soporte por email',
      'Revisión de incidencias',
      'Hasta 1 hora mensual para pequeños cambios',
      'Respuesta laboral objetivo ≤ 48 h',
    ],
    notes: ['No acumulable.'],
    cta: 'Contratar',
    ctaHref: PLAN_WEB_URL,
  },
  {
    id: 'negocio',
    name: 'Mantenimiento Negocio',
    amount: 99,
    interval: ' / mes',
    featured: true,
    featuredLabel: 'Recomendado',
    ideal:
      'Webs que generan contactos, WordPress activo, reservas, integraciones o cambios frecuentes.',
    includes: [
      'Todo lo del plan Web',
      'Monitorización',
      'Mayor prioridad',
      'Revisión básica de rendimiento',
      'Hasta 2 horas mensuales para soporte y cambios',
      'Respuesta laboral objetivo ≤ 24 h',
      'Revisión periódica del estado técnico',
    ],
    notes: ['No acumulable.'],
    cta: 'Contratar',
    ctaHref: PLAN_NEGOCIO_URL,
  },
  {
    id: 'ecommerce',
    name: 'Mantenimiento Ecommerce',
    amount: 149,
    from: true,
    interval: ' / mes',
    ideal: 'WooCommerce, Shopify, Prestashop y otras tiendas.',
    includes: [
      'Revisión técnica',
      'Checkout, pagos y pedidos',
      'Actualizaciones e integraciones',
      'Copias cuando corresponda',
      'Rendimiento',
      'Soporte prioritario',
      'Pequeñas modificaciones',
      'Hasta 2 horas mensuales como referencia',
    ],
    notes: [
      'Antes de aceptar el mantenimiento revisamos tu tienda para confirmar que este plan encaja.',
    ],
    cta: 'Contratar',
    ctaHref: `#${MAINTENANCE_CONTACT_ID}`,
  },
];

export const APP_MAINTENANCE_FROM = 199;

export const getHourPackHref = (pack: HourPack): string => {
  const url = pack.checkoutUrl.trim();
  return url || `#${MAINTENANCE_CONTACT_ID}`;
};

export const getHourPackPriceLabel = (pack: HourPack): string =>
  `${formatEuro(pack.amount)} + IVA`;

export const getHourPackRateLabel = (pack: HourPack): string =>
  `${formatEuro(pack.hourlyRate)}/hora`;

export const getPlanPriceLabel = (plan: MaintenancePlan): string => {
  const prefix = plan.from ? 'Desde ' : '';
  return `${prefix}${formatEuro(plan.amount)} + IVA${plan.interval}`;
};

export const getHourPackValidityCopy = (): string =>
  `Bonos válidos durante ${HOUR_PACK_VALIDITY_MONTHS} meses desde la compra.`;

export const getHourPackRemainderCopy = (): string =>
  `Si terminamos la tarea antes de consumir el bono, las horas restantes pueden utilizarse en pequeños trabajos dentro de esos ${HOUR_PACK_VALIDITY_MONTHS} meses.`;

export const MAINTENANCE_NEED_OPTIONS = [
  { value: '', label: '¿Qué necesitas? (opcional)' },
  { value: 'incidencia', label: 'Tengo una incidencia' },
  { value: 'cambios', label: 'Necesito cambios' },
  { value: 'mantenimiento', label: 'Quiero mantenimiento' },
  { value: 'tienda', label: 'Tengo una tienda online' },
  { value: 'aplicacion', label: 'Tengo una aplicación' },
  { value: 'no-seguro', label: 'No estoy seguro' },
] as const;
