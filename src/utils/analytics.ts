// Utilidades para tracking de eventos en Google Analytics 4

declare global {
  interface Window {
    trackEvent?: (eventName: string, eventParams?: Record<string, any>) => void;
  }
}

// Eventos de conversión principales
export const trackFormSubmit = (planName: string, value?: number) => {
  if (window.trackEvent) {
    window.trackEvent('form_submit', {
      event_category: 'engagement',
      event_label: 'contact_form',
      plan_selected: planName,
      value: value || 0,
      currency: 'EUR',
    });
  }
};

export const trackButtonClick = (buttonName: string, location: string) => {
  if (window.trackEvent) {
    window.trackEvent('button_click', {
      event_category: 'engagement',
      event_label: buttonName,
      location: location,
    });
  }
};

export const trackPlanView = (planName: string, planPrice: string) => {
  if (window.trackEvent) {
    window.trackEvent('view_item', {
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
  }
};

export const trackPlanSelect = (planName: string, planPrice: string) => {
  if (window.trackEvent) {
    window.trackEvent('select_item', {
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
  }
};

export const trackPortfolioView = (projectName: string) => {
  if (window.trackEvent) {
    window.trackEvent('portfolio_view', {
      event_category: 'engagement',
      event_label: projectName,
    });
  }
};

export const trackExternalLink = (url: string, linkText: string) => {
  if (window.trackEvent) {
    window.trackEvent('external_link_click', {
      event_category: 'engagement',
      event_label: linkText,
      url: url,
    });
  }
};

export const trackScrollDepth = (depth: number) => {
  if (window.trackEvent) {
    window.trackEvent('scroll_depth', {
      event_category: 'engagement',
      event_label: `${depth}%`,
      value: depth,
    });
  }
};

export const trackFormStep = (stepNumber: number, stepName: string) => {
  if (window.trackEvent) {
    window.trackEvent('form_step', {
      event_category: 'engagement',
      event_label: stepName,
      step_number: stepNumber,
    });
  }
};

export const trackTestimonialView = (testimonialName: string) => {
  if (window.trackEvent) {
    window.trackEvent('testimonial_view', {
      event_category: 'engagement',
      event_label: testimonialName,
    });
  }
};
