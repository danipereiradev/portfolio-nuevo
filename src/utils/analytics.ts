// Utilidades para tracking de eventos en Google Analytics 4

declare global {
  interface Window {
    trackEvent?: (eventName: string, eventParams?: Record<string, unknown>) => void;
  }
}

const pushEvent = (
  eventName: string,
  eventParams: Record<string, unknown> = {},
) => {
  if (window.trackEvent) {
    window.trackEvent(eventName, eventParams);
  }
};

export const trackFormSubmit = (planName: string, value?: number) => {
  pushEvent('submit_contact_form', {
    event_category: 'engagement',
    event_label: 'contact_form',
    plan_selected: planName,
    value: value || 0,
    currency: 'EUR',
  });
};

export const trackButtonClick = (buttonName: string, location: string) => {
  pushEvent('button_click', {
    event_category: 'engagement',
    event_label: buttonName,
    location: location,
  });
};

export const trackPlanView = (planName: string, planPrice: string) => {
  pushEvent('view_item', {
    event_category: 'ecommerce',
    event_label: planName,
    currency: 'EUR',
    value: parseFloat(planPrice),
    items: [
      {
        item_name: planName,
        item_category: 'web_development',
        price: parseFloat(planPrice),
      },
    ],
  });
};

export const trackPlanSelect = (planName: string, planPrice: string) => {
  pushEvent('select_item', {
    event_category: 'ecommerce',
    event_label: planName,
    currency: 'EUR',
    value: parseFloat(planPrice),
    items: [
      {
        item_name: planName,
        item_category: 'web_development',
        price: parseFloat(planPrice),
      },
    ],
  });
};

export const trackPortfolioView = (projectName: string) => {
  pushEvent('portfolio_view', {
    event_category: 'engagement',
    event_label: projectName,
  });
};

export const trackExternalLink = (url: string, linkText: string) => {
  pushEvent('external_link_click', {
    event_category: 'engagement',
    event_label: linkText,
    url: url,
  });
};

export const trackScrollDepth = (depth: number) => {
  pushEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `${depth}%`,
    value: depth,
  });
};

export const trackFormStep = (stepNumber: number, stepName: string) => {
  pushEvent('form_step', {
    event_category: 'engagement',
    event_label: stepName,
    step_number: stepNumber,
  });
};

export const trackTestimonialView = (testimonialName: string) => {
  pushEvent('testimonial_view', {
    event_category: 'engagement',
    event_label: testimonialName,
  });
};

// Eventos preparados para campañas de Google Ads / Analytics

export const trackWhatsAppClick = (location: string) => {
  pushEvent('click_whatsapp', {
    event_category: 'contact',
    event_label: location,
  });
};

export const trackEmailClick = (location: string) => {
  pushEvent('click_email', {
    event_category: 'contact',
    event_label: location,
  });
};

export const trackPhoneClick = (location: string) => {
  pushEvent('click_phone', {
    event_category: 'contact',
    event_label: location,
  });
};

export const trackPricingCtaClick = (planName: string) => {
  pushEvent('click_pricing_cta', {
    event_category: 'engagement',
    event_label: planName,
  });
};

export const trackViewPricing = () => {
  pushEvent('view_pricing', {
    event_category: 'engagement',
  });
};

export const trackViewPortfolioSection = () => {
  pushEvent('view_portfolio', {
    event_category: 'engagement',
  });
};
