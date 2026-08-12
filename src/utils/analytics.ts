// Utilidad de tracking de eventos para Google Analytics 4 / Google Ads / GTM.
//
// Diseñada para no romper la web si todavía no hay ningún proveedor
// configurado: comprueba la existencia de `window.gtag` y `window.dataLayer`
// antes de enviar nada, y nunca lanza excepciones.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Envía un evento a Google Analytics/Ads (vía gtag) y/o a Google Tag Manager
 * (vía dataLayer), usando lo que esté disponible en cada momento.
 *
 * - Si existe `window.gtag`, se llama a `gtag('event', eventName, params)`.
 * - Si existe `window.dataLayer`, se hace `dataLayer.push({ event: eventName, ...params })`
 *   (formato estándar que espera un contenedor de GTM).
 * - Si no existe ninguno de los dos, no hace nada (no rompe la web).
 */
export const trackEvent = (
  eventName: string,
  params: Record<string, unknown> = {},
) => {
  if (typeof window === 'undefined') return;

  const enrichedParams = {
    page_path: window.location?.pathname,
    page_title: document?.title,
    ...params,
  };

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, enrichedParams);
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...enrichedParams });
    }
  } catch {
    // La analítica nunca debe romper la experiencia del usuario.
  }
};

// ---------------------------------------------------------------------------
// Google Ads — cuenta AW-18305239496 (configurada en index.html)
// ---------------------------------------------------------------------------

/** Conversion ID de la cuenta (parte AW-…). */
export const GOOGLE_ADS_CONVERSION_ID = 'AW-18305239496';

/** Label de la conversión "Envío formulario de contacto" (evento). */
export const GOOGLE_ADS_FORM_CONVERSION_LABEL = 'augtCPDI39kcEMiTz5hE';

// Conversión oficial WhatsApp (ya existente en la cuenta).
// send_to: AW-18305239496/uNL7CKX5j84cEMiTz5hE
const GOOGLE_ADS_WHATSAPP_CONVERSION_SEND_TO =
  'AW-18305239496/uNL7CKX5j84cEMiTz5hE';

// Evento GA4 auxiliar (NO es la conversión oficial de Ads con send_to).
// Se mantiene solo para WhatsApp / email / teléfono como señal en GA4.
const ADS_CONVERSION_CONTACTO = 'ads_conversion_Contacto_1';

type ContactConversionType = 'whatsapp' | 'email' | 'phone';

const trackAdsContactConversion = (contactType: ContactConversionType) => {
  if (typeof window === 'undefined') return;

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', ADS_CONVERSION_CONTACTO, {
        page_path: window.location.pathname,
        page_title: document.title,
        event_category: 'lead',
        event_label: contactType,
      });
    }
  } catch {
    // La analítica nunca debe romper la experiencia del usuario.
  }
};

/** Evita doble disparo (doble clic / listener duplicado) en el mismo envío. */
let formAdsConversionLocked = false;

/** Liberar el candado al iniciar un nuevo intento de envío (misma sesión SPA). */
export const unlockGoogleAdsFormConversion = (): void => {
  formAdsConversionLocked = false;
};

/**
 * Conversión oficial de Google Ads por envío de formulario.
 * Llamar UNA sola vez tras Formspree OK ({ ok: true }), antes de /gracias.
 * No usar en WhatsApp, newsletter, errores ni carga de página.
 */
export const trackGoogleAdsFormConversion = (): void => {
  if (typeof window === 'undefined') return;
  if (formAdsConversionLocked) return;
  formAdsConversionLocked = true;

  try {
    window.gtag?.('event', 'conversion', {
      send_to: 'AW-18305239496/augtCPDI39kcEMiTz5hE',
      value: 1,
      currency: 'EUR',
    });
  } catch {
    // La analítica nunca debe romper la experiencia del usuario.
  }
};

/**
 * Dispara la conversión de Google Ads "Contacto - Click WhatsApp" y a
 * continuación abre WhatsApp con la URL indicada.
 *
 * - Si `window.gtag` no existe (bloqueador de anuncios, fallo de carga del
 *   tag, etc.), abre WhatsApp igualmente: la conversión nunca debe bloquear
 *   ni retrasar la acción del usuario.
 * - Si `window.gtag` existe, se dispara el evento de conversión y WhatsApp se
 *   abre desde `event_callback`. Como red de seguridad (por si el callback
 *   no llega a tiempo) se abre también tras 800ms si aún no se ha abierto.
 * - WhatsApp se abre siempre en una pestaña nueva (`window.open`), igual que
 *   hacía cada botón antes de esta función, para no perder la página actual.
 */
export const trackGoogleAdsWhatsAppConversion = (url: string): boolean => {
  if (typeof window === 'undefined') return false;

  let opened = false;
  const openWhatsAppOnce = () => {
    if (opened) return;
    opened = true;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  if (typeof window.gtag !== 'function') {
    openWhatsAppOnce();
    return false;
  }

  try {
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_WHATSAPP_CONVERSION_SEND_TO,
      value: 1.0,
      currency: 'EUR',
      event_callback: openWhatsAppOnce,
    });
  } catch {
    // La analítica nunca debe romper la experiencia del usuario.
    openWhatsAppOnce();
    return false;
  }

  setTimeout(openWhatsAppOnce, 800);

  return false;
};

// Contacto directo

export const trackWhatsAppClick = (
  locationSection: string,
  ctaText?: string,
) => {
  trackEvent('click_whatsapp', {
    event_category: 'contact',
    event_label: locationSection,
    location_section: locationSection,
    cta_text: ctaText,
  });
  trackAdsContactConversion('whatsapp');
};

export const trackEmailClick = (locationSection: string) => {
  trackEvent('click_email', {
    event_category: 'contact',
    event_label: locationSection,
    location_section: locationSection,
  });
  trackAdsContactConversion('email');
};

export const trackPhoneClick = (locationSection: string) => {
  trackEvent('click_phone', {
    event_category: 'contact',
    event_label: locationSection,
    location_section: locationSection,
  });
  trackAdsContactConversion('phone');
};

// Formulario de contacto

export const trackFormSubmit = (serviceType: string, value?: number) => {
  // Solo evento GA4. La conversión oficial de Ads del formulario se dispara
  // aparte con trackGoogleAdsFormConversion() tras Formspree OK.
  trackEvent('submit_contact_form', {
    event_category: 'engagement',
    event_label: 'contact_form',
    service_type: serviceType,
    value: value || 0,
    currency: 'EUR',
  });
};

/** Suscripción a guía / MailerLite: NO es conversión de contacto Ads. */
export const trackGuideSubscribe = (
  source: string,
  extra: Record<string, unknown> = {},
) => {
  trackEvent('guide_subscribe', {
    event_category: 'engagement',
    event_label: source,
    source,
    ...extra,
  });
};

// Popup exit-intent / guía (comportamiento de usuario; NO es conversión Ads)

export type ExitIntentTrigger =
  | 'desktop_exit_intent'
  | 'desktop_guaranteed'
  | 'mobile_pricing'
  | 'mobile_scroll'
  | 'mobile_guaranteed';

export type ExitIntentCloseMethod = 'overlay' | 'button' | 'escape';

export type ExitIntentNotShownReason =
  | 'cookie'
  | 'not_interested'
  | 'cooldown'
  | 'mobile_disabled';

/** Inicio de engagement de la página actual (reiniciar en cada ruta SPA). */
let pageEngagementStartedAt =
  typeof performance !== 'undefined' ? performance.now() : 0;

export const markPageEngagementStart = () => {
  if (typeof performance === 'undefined') return;
  pageEngagementStartedAt = performance.now();
};

const getTimeOnPageSeconds = (): number => {
  if (typeof performance === 'undefined') return 0;
  return Math.max(0, Math.round((performance.now() - pageEngagementStartedAt) / 1000));
};

const getScrollDepthPercent = (): number => {
  if (typeof window === 'undefined') return 0;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) return 100;
  return Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)));
};

/** Contexto de comportamiento común a todos los eventos del popup. */
export const getExitIntentEngagementParams = () => ({
  page_path:
    typeof window !== 'undefined' ? window.location.pathname : undefined,
  time_on_page: getTimeOnPageSeconds(),
  scroll_depth: getScrollDepthPercent(),
});

/** Popup mostrado al usuario. */
export const trackExitIntentPopupView = (trigger: ExitIntentTrigger) => {
  trackEvent('exit_intent_popup_view', {
    event_category: 'exit_intent',
    event_label: trigger,
    trigger,
    ...getExitIntentEngagementParams(),
  });
};

/**
 * Usuario cierra el popup sin convertir (abandono).
 * No se dispara tras un envío OK: eso ya va en submit / guide_subscribe.
 */
export const trackExitIntentPopupClose = (
  method: ExitIntentCloseMethod,
  status: 'form' = 'form',
  trigger?: ExitIntentTrigger,
) => {
  trackEvent('exit_intent_popup_close', {
    event_category: 'exit_intent',
    event_label: method,
    close_method: method,
    popup_status: status,
    trigger,
    ...getExitIntentEngagementParams(),
  });
};

/** Envío válido del formulario del popup (además de guide_subscribe). */
export const trackExitIntentPopupSubmit = (trigger?: ExitIntentTrigger) => {
  trackEvent('exit_intent_popup_submit', {
    event_category: 'exit_intent',
    event_label: 'guide_claimed',
    trigger,
    ...getExitIntentEngagementParams(),
  });
};

/** Clic en Calendly desde la pantalla de éxito del popup. */
export const trackExitIntentPopupCalendlyClick = (
  trigger?: ExitIntentTrigger,
) => {
  trackEvent('exit_intent_popup_calendly_click', {
    event_category: 'exit_intent',
    event_label: 'calendly',
    trigger,
    ...getExitIntentEngagementParams(),
  });
};

/**
 * Popup no mostrado (solo bloqueos reales / persistentes).
 * - cookie: guía ya reclamada (localStorage)
 * - not_interested: pulsó "No me interesa" (flag permanente)
 * - cooldown: cerró hace poco (oculto 7 días)
 * - mobile_disabled: popup móvil desactivado
 *
 * Se emite como máximo 1 vez por razón y sesión de pestaña
 * (sessionStorage), en el momento en que el popup habría saltado.
 * No cuenta pageviews de usuarios ya bloqueados.
 */
export const trackExitIntentPopupNotShown = (
  reason: ExitIntentNotShownReason,
  trigger?: ExitIntentTrigger,
) => {
  trackEvent('popup_not_shown', {
    event_category: 'exit_intent',
    event_label: reason,
    reason,
    trigger,
    ...getExitIntentEngagementParams(),
  });
};

/** Usuario pulsa "No me interesa" (rechazo explícito, no volver a mostrar). */
export const trackExitIntentPopupNotInterested = (
  trigger?: ExitIntentTrigger,
) => {
  trackEvent('popup_not_interested', {
    event_category: 'exit_intent',
    event_label: 'not_interested',
    trigger,
    ...getExitIntentEngagementParams(),
  });
};

/** Vista válida de /gracias tras envío confirmado (una vez por envío). */
export const trackThankYouView = () => {
  trackEvent('thank_you_view', {
    event_category: 'engagement',
    event_label: 'gracias',
  });
};

export const trackFormError = (
  errorReason: string,
  serviceType?: string,
  extra: Record<string, unknown> = {},
) => {
  trackEvent('form_error', {
    event_category: 'engagement',
    event_label: errorReason,
    error_reason: errorReason,
    service_type: serviceType,
    ...extra,
  });
};

export const trackFormStep = (stepNumber: number, stepName: string) => {
  trackEvent('form_step', {
    event_category: 'engagement',
    event_label: stepName,
    step_number: stepNumber,
  });
};

// Pricing

export const trackPricingCtaClick = (serviceType: string, ctaText?: string) => {
  trackEvent('click_pricing_cta', {
    event_category: 'engagement',
    event_label: serviceType,
    service_type: serviceType,
    cta_text: ctaText,
  });
};

export const trackPricingSinglePayment = (serviceType: string) => {
  trackEvent('click_pricing_single_payment', {
    event_category: 'engagement',
    event_label: serviceType,
    service_type: serviceType,
    pricing_option: 'single_payment',
  });
};

export const trackPricingSplitPayment = (serviceType: string) => {
  trackEvent('click_pricing_split_payment', {
    event_category: 'engagement',
    event_label: serviceType,
    service_type: serviceType,
    pricing_option: 'split_payment',
  });
};

export const trackPricingMonthlyPlan = (serviceType: string) => {
  trackEvent('click_pricing_monthly_plan', {
    event_category: 'engagement',
    event_label: serviceType,
    service_type: serviceType,
    pricing_option: 'monthly_plan',
  });
};

export const trackViewPricing = () => {
  trackEvent('view_pricing', {
    event_category: 'engagement',
  });
};

// Portfolio

export const trackViewPortfolioSection = () => {
  trackEvent('view_portfolio', {
    event_category: 'engagement',
  });
};

export const trackPortfolioClick = (projectName: string) => {
  trackEvent('click_portfolio', {
    event_category: 'engagement',
    event_label: projectName,
    cta_text: projectName,
  });
};

/**
 * Play en el vídeo de reseña / testimonio (sección valoraciones).
 * Disparar una vez por reproducción iniciada (el componente deduplica).
 */
export const trackPlayReviewVideo = (params: {
  videoName: string;
  company?: string;
}) => {
  trackEvent('play_review_video', {
    event_category: 'engagement',
    event_label: params.videoName,
    video_name: params.videoName,
    company: params.company,
    page_path:
      typeof window !== 'undefined' ? window.location.pathname : undefined,
  });
};

// Genéricos / otros

export const trackButtonClick = (buttonName: string, locationSection: string) => {
  trackEvent('button_click', {
    event_category: 'engagement',
    event_label: buttonName,
    cta_text: buttonName,
    location_section: locationSection,
  });
};

export const trackExternalLink = (url: string, linkText: string) => {
  trackEvent('external_link_click', {
    event_category: 'engagement',
    event_label: linkText,
    url,
  });
};

export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `${depth}%`,
    value: depth,
  });
};

// Landing Web Start (tráfico desde automatización de email)

export const trackWebStartView = () => {
  trackEvent('web_start_view', {
    event_category: 'web_start',
    event_label: 'landing',
  });
};

export const trackWebStartCalendlyClick = (locationSection: string) => {
  trackEvent('web_start_calendly_click', {
    event_category: 'web_start',
    event_label: locationSection,
    location_section: locationSection,
  });
};

export const trackWebStartContactClick = (locationSection: string) => {
  trackEvent('web_start_contact_click', {
    event_category: 'web_start',
    event_label: locationSection,
    location_section: locationSection,
  });
};

export const trackWebStartFaqOpen = (question: string) => {
  trackEvent('web_start_faq_open', {
    event_category: 'web_start',
    event_label: question,
  });
};

// Landing /web-profesional (packs 249 € / 349 €)

export const trackWebProfesionalView = () => {
  trackEvent('web_profesional_view', {
    event_category: 'web_profesional',
    event_label: 'landing',
  });
};

export const trackWebProfesionalWhatsAppClick = (
  locationSection: string,
  plan?: string,
) => {
  trackEvent('web_profesional_whatsapp_click', {
    event_category: 'web_profesional',
    event_label: locationSection,
    location_section: locationSection,
    plan: plan || undefined,
  });
};

export const trackWebProfesionalViewPlanes = () => {
  trackEvent('web_profesional_view_planes', {
    event_category: 'web_profesional',
    event_label: 'incluye',
  });
};

export const trackWebProfesionalScrollToPlanes = () => {
  trackEvent('web_profesional_scroll_to_planes', {
    event_category: 'web_profesional',
    event_label: 'hero_ver_que_incluye',
  });
};

export const trackWebProfesionalFormSubmit = (plan: string, value?: number) => {
  trackEvent('web_profesional_form_submit', {
    event_category: 'web_profesional',
    event_label: plan,
    plan,
    value: value || 0,
    currency: 'EUR',
  });
};
