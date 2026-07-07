import { useEffect } from 'react';

const SITE_URL = 'https://danipereiraweb.es';

interface PageMetaOptions {
  title: string;
  description: string;
  /** Ruta del sitio, ej. '/', '/tiendas-online' */
  path: string;
}

const setMetaByAttr = (
  attr: 'name' | 'property',
  key: string,
  content: string,
) => {
  let tag = document.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

/**
 * Sincroniza title, meta description, canonical y metadata social
 * (Open Graph + Twitter Card) de la página actual. Reutiliza las mismas
 * etiquetas del <head> en lugar de crear duplicados en cada navegación.
 */
export const usePageMeta = ({ title, description, path }: PageMetaOptions) => {
  useEffect(() => {
    document.title = title;
    setMetaByAttr('name', 'description', description);

    const canonicalUrl = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
    let canonicalLink = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Open Graph
    setMetaByAttr('property', 'og:title', title);
    setMetaByAttr('property', 'og:description', description);
    setMetaByAttr('property', 'og:url', canonicalUrl);
    setMetaByAttr('property', 'og:type', 'website');

    // Twitter Card
    setMetaByAttr('name', 'twitter:title', title);
    setMetaByAttr('name', 'twitter:description', description);
  }, [title, description, path]);
};
