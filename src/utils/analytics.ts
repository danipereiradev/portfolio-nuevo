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
};

export const trackEmailClick = (locationSection: string) => {
  trackEvent('click_email', {
    event_category: 'contact',
    event_label: locationSection,
    location_section: locationSection,
  });
};

export const trackPhoneClick = (locationSection: string) => {
  trackEvent('click_phone', {
    event_category: 'contact',
    event_label: locationSection,
    location_section: locationSection,
  });
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
