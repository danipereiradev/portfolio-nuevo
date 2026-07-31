import { useEffect } from 'react';
import pagesMeta from '../seo/pagesMeta.json';

const SITE_URL = 'https://pereiraweb.es';

type PageMetaEntry = {
  title: string;
  description: string;
  robots?: string;
  canonical?: string;
};

type PagesMeta = Record<string, PageMetaEntry>;

const setMetaByAttr = (
  attr: 'name' | 'property',
  key: string,
  content: string,
) => {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

/**
 * Sincroniza title, meta description, canonical y metadata social
 * (Open Graph + Twitter Card) de la página actual.
 *
 * Toma el título y la descripción desde `src/seo/pagesMeta.json`, la misma
 * fuente única que usa el script de pre-renderizado (`scripts/prerender-meta.mjs`)
 * para generar el HTML estático por ruta. Así evitamos que el texto mostrado
 * en el navegador (tras hidratar React) y el texto que ven los bots/curl
 * (HTML estático servido antes de ejecutar JS) puedan desincronizarse.
 */
export const usePageMeta = (path: string) => {
  useEffect(() => {
    const meta =
      (pagesMeta as PagesMeta)[path] ?? (pagesMeta as PagesMeta)['/'];
    const { title, description, robots, canonical } = meta;

    document.title = title;
    setMetaByAttr('name', 'description', description);

    const canonicalUrl =
      canonical ??
      (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);
    let canonicalLink = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    let robotsMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    if (robots) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', robots);
    } else if (robotsMeta) {
      robotsMeta.remove();
    }

    // Open Graph
    setMetaByAttr('property', 'og:title', title);
    setMetaByAttr('property', 'og:description', description);
    setMetaByAttr('property', 'og:url', canonicalUrl);
    setMetaByAttr('property', 'og:type', 'website');

    // Twitter Card
    setMetaByAttr('name', 'twitter:title', title);
    setMetaByAttr('name', 'twitter:description', description);

    return () => {
      if (robots) {
        document.querySelector('meta[name="robots"]')?.remove();
      }
    };
  }, [path]);
};
