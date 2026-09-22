const isAllowedHost = (hostname: string): boolean => {
  const host = hostname.replace(/^www\./, '');
  return (
    host === '36web.es' ||
    host === 'wa.me' ||
    host.endsWith('whatsapp.com') ||
    host === 'stripe.com' ||
    host.endsWith('.stripe.com') ||
    host === 'hatena.es' ||
    host === 'carpersonido.com'
  );
};

export const isAllowedAdsLandingHref = (href: string): boolean => {
  const value = href.trim();
  if (!value || value === '#') return true;
  if (
    value.startsWith('#') ||
    value.startsWith('tel:') ||
    value.startsWith('mailto:') ||
    value.startsWith('sms:')
  ) {
    return true;
  }
  if (value.startsWith('/') && !value.startsWith('//')) return true;

  try {
    const url = new URL(value, window.location.origin);
    if (url.origin === window.location.origin) return true;
    return isAllowedHost(url.hostname);
  } catch {
    return true;
  }
};

export const preventAdsLandingOutbound = (event: {
  target: EventTarget | null;
  preventDefault: () => void;
  stopPropagation: () => void;
}): void => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const anchor = target.closest('a');
  if (!anchor) return;
  const href = anchor.getAttribute('href') || '';
  if (!href || isAllowedAdsLandingHref(href)) return;
  event.preventDefault();
  event.stopPropagation();
};
