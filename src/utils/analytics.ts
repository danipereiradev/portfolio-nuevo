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

// Conversión de Google Ads: "Contacto" (ads_conversion_Contacto_1)
//
// Debe dispararse ÚNICAMENTE cuando hay una acción real de contacto
// (WhatsApp, formulario, email o teléfono). Nunca al cargar la página, en
// scroll, o en eventos de solo visualización (view_pricing, view_portfolio,
// click_pricing_cta, etc). Por eso vive aislada de `trackEvent` y se invoca
// solo desde las 4 funciones de contacto de abajo.
const ADS_CONVERSION_CONTACTO = 'ads_conversion_Contacto_1';

type ContactConversionType = 'whatsapp' | 'contact_form' | 'email' | 'phone';

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

// Conversión de Google Ads (cuenta de Ads, no GA4): "Contacto - Click
// WhatsApp". Usa directamente el destino (send_to) que da Google Ads para
// esta conversión concreta, independiente del evento GA4 de arriba.
//
// Debe dispararse ÚNICAMENTE con un clic real en un botón/enlace de
// WhatsApp. Nunca en carga de página, scroll, view_pricing, ni en el envío
// del formulario (ese flujo ya redirige a /gracias y no pasa por aquí).
const GOOGLE_ADS_WHATSAPP_CONVERSION_SEND_TO =
  'AW-18305239496/uNL7CKX5j84cEMiTz5hE';

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
  trackEvent('submit_contact_form', {
    event_category: 'engagement',
    event_label: 'contact_form',
    service_type: serviceType,
    value: value || 0,
    currency: 'EUR',
  });
  trackAdsContactConversion('contact_form');
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
