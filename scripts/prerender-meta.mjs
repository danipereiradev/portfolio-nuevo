// Post-build: genera un index.html propio por cada ruta comercial dentro de
// dist/, con su title/description/canonical/OG/Twitter ya "horneados" en el
// HTML estático.
//
// Por qué existe este script:
// La web es una SPA cliente (Vite + React Router) sin SSR. Sin este paso,
// TODAS las rutas devuelven el mismo dist/index.html cuando se piden con
// curl, un bot que no ejecuta JS, o un revisor de anuncios de Google Ads:
// el <title>/meta de la ruta solo se actualiza en el navegador, después de
// hidratar React (ver src/hooks/usePageMeta.ts). Este script resuelve eso
// generando un HTML distinto por ruta a partir de la misma fuente única de
// metadata (src/seo/pagesMeta.json) que usa el hook, para que no puedan
// desincronizarse.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const distIndexPath = path.join(distDir, 'index.html');

const SITE_URL = 'https://danipereiraweb.es';

if (!existsSync(distIndexPath)) {
  console.error(
    '[prerender-meta] No se encontró dist/index.html. Ejecuta "vite build" antes de este script.',
  );
  process.exit(1);
}

const pagesMeta = JSON.parse(
  readFileSync(path.join(rootDir, 'src', 'seo', 'pagesMeta.json'), 'utf-8'),
);

const template = readFileSync(distIndexPath, 'utf-8');

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const buildHtmlForRoute = (routePath, { title, description }) => {
  const canonicalUrl =
    routePath === '/' ? `${SITE_URL}/` : `${SITE_URL}${routePath}`;
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safeCanonical = escapeHtml(canonicalUrl);

  let html = template;

  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${safeTitle}</title>`,
  );

  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${safeDescription}" />`,
  );

  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${safeCanonical}" />`,
  );

  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${safeTitle}" />`,
  );

  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${safeDescription}" />`,
  );

  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${safeCanonical}" />`,
  );

  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${safeTitle}" />`,
  );

  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${safeDescription}" />`,
  );

  return html;
};

let generated = 0;

for (const [routePath, meta] of Object.entries(pagesMeta)) {
  const html = buildHtmlForRoute(routePath, meta);

  if (routePath === '/') {
    writeFileSync(distIndexPath, html, 'utf-8');
    generated += 1;
    continue;
  }

  const routeDir = path.join(distDir, routePath.replace(/^\//, ''));
  mkdirSync(routeDir, { recursive: true });
  writeFileSync(path.join(routeDir, 'index.html'), html, 'utf-8');
  generated += 1;
}

console.log(
  `[prerender-meta] Generadas ${generated} páginas con metadata propia en dist/.`,
);
