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
  pushEvent('form_submit', {
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
