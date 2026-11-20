// 301 de /ruta a /ruta/ (la versión canónica y la del sitemap).
//
// Va como Edge Function y no como regla en _redirects porque Netlify trata
// /ruta y /ruta/ como la misma URL al aplicar redirects: una regla
// "/ruta -> /ruta/" entra en bucle. La Edge Function ve la URL original.
//
// Sin esto Google indexaba las dos versiones (p. ej. /diseno-web/logrono y
// /diseno-web/logrono/) y se repartían las impresiones.

const CANONICAL_HOST = '36web.es';
const ALIAS_HOSTS = new Set([
  'www.36web.es',
  'pereiraweb.es',
  'www.pereiraweb.es',
]);

export default async (
  request: Request,
  context: { next: () => Promise<Response> },
) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return context.next();
  }

  const url = new URL(request.url);
  const { pathname } = url;

  const needsSlash =
    pathname !== '/' &&
    !pathname.endsWith('/') &&
    // Archivos (.js, .xml, .png, robots.txt...) se quedan como están.
    !/\.[a-z0-9]+$/i.test(pathname);

  if (!needsSlash) return context.next();

  // Desde un dominio alias saltamos directo al canónico (un solo 301).
  if (ALIAS_HOSTS.has(url.hostname)) url.hostname = CANONICAL_HOST;
  url.pathname = `${pathname}/`;

  return new Response(null, {
    status: 301,
    headers: { Location: url.toString() },
  });
};

export const config = {
  path: '/*',
  excludedPath: ['/api/*', '/.netlify/*', '/assets/*', '/img/*', '/fonts/*', '/video/*'],
};
