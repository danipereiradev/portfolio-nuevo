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
 * Llamar UNA sola vez tras Formspree OK ({ ok: true }).
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

// Evento GA4/GTM para el clic en reservar (oferta de lanzamiento).
// En GTM se puede marcar como conversión. Si más adelante hay un send_to
// oficial de Ads (AW-…/label), pegarlo en GOOGLE_ADS_LAUNCH_RESERVE_SEND_TO.
const ADS_CONVERSION_RESERVA = 'ads_conversion_Reserva_1';

/**
 * send_to de Google Ads para el clic en Reservar (Stripe).
 * Vacío hasta que exista la conversión en la cuenta.
 */
export const GOOGLE_ADS_LAUNCH_RESERVE_SEND_TO = '';

/**
 * Dispara la conversión de reserva (Stripe) y navega al pago.
 * Misma lógica que WhatsApp: no bloquear si no hay gtag; esperar callback.
 */
export const trackGoogleAdsLaunchReserveConversion = (
  url: string,
  locationSection: string,
): boolean => {
  if (typeof window === 'undefined') return false;

  trackPricingSplitPayment('landing-web-profesional');
  trackEvent('begin_checkout', {
    event_category: 'ecommerce',
    event_label: locationSection,
    location_section: locationSection,
    value: 99,
    currency: 'EUR',
    item_name: 'Reserva web profesional',
  });

  let navigated = false;
  const go = () => {
    if (navigated) return;
    navigated = true;
    if (url) {
      window.location.assign(url);
    }
  };

  if (typeof window.gtag !== 'function') {
    go();
    return false;
  }

  try {
    window.gtag('event', ADS_CONVERSION_RESERVA, {
      page_path: window.location.pathname,
      page_title: document.title,
      event_category: 'lead',
      event_label: locationSection,
      value: 99,
      currency: 'EUR',
    });

    if (GOOGLE_ADS_LAUNCH_RESERVE_SEND_TO) {
      window.gtag('event', 'conversion', {
        send_to: GOOGLE_ADS_LAUNCH_RESERVE_SEND_TO,
        value: 99,
        currency: 'EUR',
        event_callback: go,
      });
    } else {
      window.gtag('event', 'generate_lead', {
        value: 99,
        currency: 'EUR',
        event_callback: go,
      });
    }
  } catch {
    go();
    return false;
  }

  setTimeout(go, 800);
  return false;
};

const THANKYOU_TRACKED_KEY = 'launch-reserve-thankyou-tracked';

const ADS_CONVERSION_RESERVA_PAGO = 'ads_conversion_ReservaPago_1';

/** Conversión oficial Ads: reserva pagada (oferta Web 299). */
export const GOOGLE_ADS_LAUNCH_RESERVE_PAID_SEND_TO =
  'AW-18305239496/aCsFCL3PvekcEMiTz5hE';

const LAUNCH_THANKYOU_PATH = '/pago/gracias/web-299';

let launchReserveThankYouLocked = false;

/**
 * Conversión de reserva pagada (página de gracias).
 * Llamar UNA vez al cargar /pago/gracias/web-299.
 * No usar en /pago/gracias ni en ninguna otra ruta.
 */
export const trackLaunchReserveThankYou = (): void => {
  if (typeof window === 'undefined') return;

  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path !== LAUNCH_THANKYOU_PATH) return;

  if (launchReserveThankYouLocked) return;
  try {
    if (sessionStorage.getItem(THANKYOU_TRACKED_KEY) === '1') return;
  } catch {
    // Safari privado: el candado de módulo evita el doble disparo en esta carga.
  }

  launchReserveThankYouLocked = true;
  try {
    sessionStorage.setItem(THANKYOU_TRACKED_KEY, '1');
  } catch {
    // Sin sessionStorage: el candado de módulo sigue valiendo en esta sesión JS.
  }

  trackEvent('purchase', {
    event_category: 'ecommerce',
    event_label: 'landing-web-profesional',
    value: 99,
    currency: 'EUR',
    item_name: 'Reserva web profesional',
  });

  try {
    window.gtag?.('event', 'purchase', {
      value: 99,
      currency: 'EUR',
      items: [
        {
          item_id: 'reserva-web-profesional',
          item_name: 'Reserva web profesional',
          price: 99,
          quantity: 1,
        },
      ],
    });
    window.gtag?.('event', ADS_CONVERSION_RESERVA_PAGO, {
      page_path: window.location.pathname,
      page_title: document.title,
      event_category: 'ecommerce',
      value: 99,
      currency: 'EUR',
    });
    window.gtag?.('event', 'conversion', {
      send_to: GOOGLE_ADS_LAUNCH_RESERVE_PAID_SEND_TO,
      transaction_id: '',
    });
  } catch {
    // La analítica nunca debe romper la experiencia del usuario.
  }
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

export const trackCrispChatOpened = () => {
  trackEvent('crisp_chat_opened', {
    event_category: 'contact',
    event_label: 'Crisp',
  });
};

export const trackCrispMessageSent = () => {
  trackEvent('crisp_message_sent', {
    event_category: 'contact',
    event_label: 'Crisp',
  });
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

/** Clic en “Hablar con un cliente”. Solo GA4; no es conversión de Ads. */
export const trackContactClientReference = () => {
  trackEvent('contact_client_reference', {
    event_category: 'engagement',
    event_label: 'Juanvi Raga',
    location_section: 'Testimonials',
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
