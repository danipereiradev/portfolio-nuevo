// Post-build: genera un index.html propio por cada ruta comercial dentro de
// dist/, con su title/description/canonical/OG/Twitter ya "horneados" en el
// HTML estático.
//
// En páginas locales `/diseno-web/{ciudad}/` también deja en el HTML inicial
// el H1, intro, contenido, enlaces internos, FAQ y JSON-LD. Google no tiene
// que ejecutar React para ver esa página.
//
// Genera sitemap.xml (rutas indexables + ciudades publicadas) y 404.html.
// Un slug de ciudad que no exista no se prerenderiza: Netlify lo sirve como 404.

import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const distIndexPath = path.join(distDir, 'index.html');

const SITE_URL = 'https://36web.es';
const SITE_WEB_PATH = '/diseno-web';

if (!existsSync(distIndexPath)) {
  console.error(
    '[prerender-meta] No se encontró dist/index.html. Ejecuta "vite build" antes de este script.',
  );
  process.exit(1);
}

const pagesMeta = JSON.parse(
  readFileSync(path.join(rootDir, 'src', 'seo', 'pagesMeta.json'), 'utf-8'),
);

const heroLcp = JSON.parse(
  readFileSync(path.join(rootDir, 'src', 'config', 'heroLcp.json'), 'utf-8'),
);

const buildHeroPreloadTags = (routePath) => {
  const assets = heroLcp[routePath];
  if (!assets) return '';

  const tags = [];
  if (assets.image) {
    tags.push(
      `<link rel="preload" as="image" href="${escapeHtml(assets.image)}" fetchpriority="high" />`,
    );
  }
  if (assets.video) {
    tags.push(
      `<link rel="preload" as="video" href="${escapeHtml(assets.video)}" type="video/mp4" fetchpriority="high" />`,
    );
  }
  return tags.join('\n    ');
};

const template = readFileSync(distIndexPath, 'utf-8');

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const buildCanonicalUrl = (routePath) => {
  if (routePath === '/') return `${SITE_URL}/`;
  const normalized = routePath.endsWith('/') ? routePath : `${routePath}/`;
  return `${SITE_URL}${normalized}`;
};

const injectRoot = (html, inner) =>
  html.replace(/<div id="root"><\/div>/, `<div id="root">${inner}</div>`);

const injectJsonLd = (html, id, data) => {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  const script = `    <script type="application/ld+json" id="${escapeHtml(id)}">${json}</script>\n`;
  if (html.includes(`id="${id}"`)) {
    return html.replace(
      new RegExp(
        `<script type="application/ld\\+json" id="${id}">[\\s\\S]*?</script>`,
      ),
      script.trim(),
    );
  }
  return html.replace('</head>', `${script}  </head>`);
};

const loadLocalWebSnapshot = async () => {
  const { build } = await import('esbuild');
  const tmpDir = path.join(rootDir, '.prerender-tmp');
  mkdirSync(tmpDir, { recursive: true });
  const outfile = path.join(tmpDir, 'localWebSnapshot.mjs');

  try {
    await build({
      absWorkingDir: rootDir,
      entryPoints: [path.join(rootDir, 'src', 'seo', 'localWebSnapshot.ts')],
      bundle: true,
      format: 'esm',
      platform: 'node',
      outfile,
      logLevel: 'silent',
    });
    return await import(pathToFileURL(outfile).href);
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
};

const buildHtmlForRoute = (
  routePath,
  { title, description, robots, canonical },
) => {
  const canonicalUrl = canonical ?? buildCanonicalUrl(routePath);
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safeCanonical = escapeHtml(canonicalUrl);

  let html = template;

  html = html.replace('<!--hero-lcp-->', buildHeroPreloadTags(routePath));

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

  if (robots) {
    const safeRobots = escapeHtml(robots);
    if (/<meta\s+name="robots"\s+content="[^"]*"\s*\/>/.test(html)) {
      html = html.replace(
        /<meta\s+name="robots"\s+content="[^"]*"\s*\/>/,
        `<meta name="robots" content="${safeRobots}" />`,
      );
    } else {
      html = html.replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
        `<meta name="description" content="${safeDescription}" />\n    <meta name="robots" content="${safeRobots}" />`,
      );
    }
  }

  return html;
};

const writeRouteHtml = (routePath, html) => {
  if (routePath === '/') {
    writeFileSync(distIndexPath, html, 'utf-8');
    return;
  }

  const routeDir = path.join(distDir, routePath.replace(/^\//, ''));
  mkdirSync(routeDir, { recursive: true });
  writeFileSync(path.join(routeDir, 'index.html'), html, 'utf-8');
};

const writeSitemap = (cityList) => {
  const urls = new Set();

  for (const [routePath, meta] of Object.entries(pagesMeta)) {
    if (typeof meta.robots === 'string' && meta.robots.includes('noindex')) {
      continue;
    }
    urls.add(buildCanonicalUrl(routePath));
  }

  for (const city of cityList) {
    urls.add(buildCanonicalUrl(`${SITE_WEB_PATH}/${city.slug}`));
  }

  const lastmod = new Date().toISOString().slice(0, 10);
  const body = [...urls]
    .sort()
    .map(
      (loc) => `  <url>
    <loc>${escapeHtml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

  writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');
  return urls.size;
};

const writeNotFoundPage = (bodyHtml) => {
  let html = template;
  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    '<title>Página no encontrada | 36web</title>',
  );
  if (/<meta\s+name="robots"\s+content="[^"]*"\s*\/>/.test(html)) {
    html = html.replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/>/,
      '<meta name="robots" content="noindex, nofollow" />',
    );
  } else {
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      '<meta name="description" content="Esta página no existe." />\n    <meta name="robots" content="noindex, nofollow" />',
    );
  }
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    '',
  );
  html = injectRoot(html, bodyHtml);
  writeFileSync(path.join(distDir, '404.html'), html, 'utf-8');
};

const localWeb = await loadLocalWebSnapshot();
const cityList = localWeb.LOCAL_WEB_CITY_LIST ?? [];
const cityByRoute = new Map(
  cityList.map((city) => [`${SITE_WEB_PATH}/${city.slug}`, city]),
);

let generated = 0;
let localWithBody = 0;

for (const [routePath, meta] of Object.entries(pagesMeta)) {
  let html = buildHtmlForRoute(routePath, meta);
  const city = cityByRoute.get(routePath);

  if (city) {
    html = injectJsonLd(
      html,
      `jsonld-diseno-web-${city.slug}`,
      localWeb.buildLocalWebCityJsonLd(city),
    );
    html = injectRoot(html, localWeb.buildLocalWebCityBodyHtml(city));
    localWithBody += 1;
  } else if (routePath === SITE_WEB_PATH) {
    html = injectRoot(
      html,
      `<main>${localWeb.buildLocalWebSpainSectionHtml()}</main>`,
    );
  }

  writeRouteHtml(routePath, html);
  generated += 1;
}

for (const city of cityList) {
  const routePath = `${SITE_WEB_PATH}/${city.slug}`;
  if (!pagesMeta[routePath]) {
    console.error(
      `[prerender-meta] Ciudad "${city.slug}" publicada sin entrada en pagesMeta.json.`,
    );
    process.exit(1);
  }
}

const patchDistRedirects = (cities) => {
  const redirectsPath = path.join(distDir, '_redirects');
  if (!existsSync(redirectsPath)) return;

  const cityRules = cities
    .map((city) => {
      const from = `${SITE_WEB_PATH}/${city.slug}`;
      return `${from}    ${from}/index.html    200`;
    })
    .join('\n');

  let text = readFileSync(redirectsPath, 'utf-8');
  const splat = '/diseno-web/*                   /404.html                                  404';
  if (cityRules && text.includes(splat) && !text.includes(`${SITE_WEB_PATH}/${cities[0]?.slug} `)) {
    text = text.replace(splat, `${cityRules}\n${splat}`);
    writeFileSync(redirectsPath, text, 'utf-8');
  }
};

writeNotFoundPage(localWeb.buildNotFoundBodyHtml());
const sitemapUrls = writeSitemap(cityList);
patchDistRedirects(cityList);

console.log(
  `[prerender-meta] Generadas ${generated} páginas (${localWithBody} locales con contenido completo), sitemap (${sitemapUrls} URLs) y 404.html.`,
);
