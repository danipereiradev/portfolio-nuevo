import { useEffect } from 'react';

const SITE_URL = 'https://danipereiraweb.es';

interface PageMetaOptions {
  title: string;
  description: string;
  /** Ruta del sitio, ej. '/', '/tiendas-online' */
  path: string;
}

/**
 * Sincroniza title, meta description y canonical de la página actual.
 * Reutiliza el mismo <link rel="canonical"> del <head> en lugar de
 * crear uno nuevo en cada navegación.
 */
export const usePageMeta = ({ title, description, path }: PageMetaOptions) => {
  useEffect(() => {
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`;
    let canonicalLink = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [title, description, path]);
};
