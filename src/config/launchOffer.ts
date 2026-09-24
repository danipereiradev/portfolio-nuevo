import { formatEuro } from './payments';

/** Tope de la oferta de lanzamiento. No cambiar. */
export const LAUNCH_OFFER_MAX = 10;

/**
 * Plazas que quedan (no las vendidas).
 * Empieza en 10. Cuando entre una reserva, bajar a 9, luego 8, etc.
 *
 * 10 → "10 disponibles"
 * 9  → "Quedan 9 de 10 disponibles"
 * 0  → "No quedan plazas"
 */
export const soldWebs = 5;

/** Precio del pack, sin IVA. */
export const LAUNCH_PRICE = 590;

/** Reserva ahora, sin IVA. El resto se paga en la entrega. */
export const LAUNCH_RESERVE = 99;

/** Plazo de entrega de la oferta de lanzamiento. */
export const LAUNCH_DELIVERY_LABEL = '1–2 semanas';

export const LAUNCH_RESERVE_PAYMENT_ID = 'reserva-web-profesional-esencial';

export const getLaunchRemaining = (remaining = soldWebs): number =>
  Math.max(0, Math.min(LAUNCH_OFFER_MAX, remaining));

export const isLaunchSoldOut = (remaining = soldWebs): boolean =>
  getLaunchRemaining(remaining) === 0;

export const getLaunchAvailabilityCopy = (remaining = soldWebs): string => {
  const n = getLaunchRemaining(remaining);
  if (n === 0) return 'No quedan plazas';
  if (n === LAUNCH_OFFER_MAX) return `${LAUNCH_OFFER_MAX} disponibles`;
  return `Quedan ${n} de ${LAUNCH_OFFER_MAX} disponibles`;
};

export const getLaunchRemainder = (): number => LAUNCH_PRICE - LAUNCH_RESERVE;

export const getLaunchPriceAmountLabel = (): string =>
  `${formatEuro(LAUNCH_PRICE)} + IVA`;

export const getLaunchPriceLabel = (): string =>
  `Desde ${getLaunchPriceAmountLabel()}`;

export const getLaunchReserveLabel = (): string =>
  `${formatEuro(LAUNCH_RESERVE)} + IVA`;

export const getLaunchRemainderLabel = (): string =>
  `${formatEuro(getLaunchRemainder())} + IVA`;

/** Landing de pago de la reserva. Stripe se abre desde esa página. */
export const getLaunchReserveHref = (): string =>
  `/pago/${LAUNCH_RESERVE_PAYMENT_ID}`;
