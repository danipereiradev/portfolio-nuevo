const ADS_LANDING_SAFE_PATHS = new Set([
  '/aviso-legal',
  '/politica-de-privacidad',
  '/politica-de-cookies',
  '/condiciones-del-proyecto',
  '/terminos-y-condiciones',
]);

const isAllowedHost = (hostname: string): boolean => {
  const host = hostname.replace(/^www\./, '');
  return (
    host === 'wa.me' ||
    host.endsWith('whatsapp.com') ||
    host === 'stripe.com' ||
    host.endsWith('.stripe.com')
  );
};

const normalizePath = (pathname: string): string =>
  pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

const isSafeSameOriginPath = (pathname: string): boolean => {
  const path = normalizePath(pathname);
  if (ADS_LANDING_SAFE_PATHS.has(path)) return true;
  if (path === '/pago' || path.startsWith('/pago/')) return true;
  if (path.startsWith('/gracias/')) return true;
  return false;
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

  try {
    const url = new URL(value, window.location.origin);
    if (url.origin === window.location.origin) {
      return isSafeSameOriginPath(url.pathname);
    }
    return isAllowedHost(url.hostname);
  } catch {
    return false;
  }
};

const neutralizeAnchor = (anchor: Element): void => {
  const href = anchor.getAttribute('href') || '';
  if (!href || isAllowedAdsLandingHref(href)) return;
  anchor.removeAttribute('href');
  anchor.removeAttribute('target');
  if (anchor.getAttribute('rel')) anchor.removeAttribute('rel');
};

export const neutralizeAdsLandingOutbound = (root: ParentNode): void => {
  root.querySelectorAll('a[href]').forEach(neutralizeAnchor);
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
