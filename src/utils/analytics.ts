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

/**
 * Conversión oficial de formulario (evento gtag 'conversion').
 *
 * Crear en Google Ads → Objetivos → Conversiones → + Nueva conversión
 * → Sitio web → "Envío formulario de contacto" → Evento.
 * Luego pegar aquí el Conversion Label que genera Ads (parte tras la /).
 *
 * send_to resultante: AW-18305239496/<LABEL>
 */
export const GOOGLE_ADS_FORM_CONVERSION_LABEL = 'REEMPLAZAR_LABEL_FORMULARIO';

const GOOGLE_ADS_FORM_CONVERSION_SEND_TO = `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_FORM_CONVERSION_LABEL}`;

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

/**
 * Conversión oficial de Google Ads por envío de formulario.
 * Llamar UNA sola vez tras Formspree OK ({ ok: true }), antes de /gracias.
 * No usar en WhatsApp, newsletter, errores ni carga de página.
 */
export const trackGoogleAdsFormConversion = (): void => {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;

  if (
    !GOOGLE_ADS_FORM_CONVERSION_LABEL ||
    GOOGLE_ADS_FORM_CONVERSION_LABEL === 'REEMPLAZAR_LABEL_FORMULARIO'
  ) {
    console.warn(
      '[Ads] Falta GOOGLE_ADS_FORM_CONVERSION_LABEL en analytics.ts. Crea la conversión en Google Ads y pega el label.',
    );
    return;
  }

  try {
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_FORM_CONVERSION_SEND_TO,
      value: 1.0,
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
export const trackGuideSubscribe = (source: string) => {
  trackEvent('guide_subscribe', {
    event_category: 'engagement',
    event_label: source,
    source,
  });
};

/** Vista válida de /gracias tras envío confirmado (una vez por envío). */
export const trackThankYouView = () => {
  trackEvent('thank_you_view', {
    event_category: 'engagement',
    event_label: 'gracias',
  });
};

export const trackFormError = (errorReason: string, serviceType?: string) => {
  trackEvent('form_error', {
    event_category: 'engagement',
    event_label: errorReason,
    error_reason: errorReason,
    service_type: serviceType,
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
