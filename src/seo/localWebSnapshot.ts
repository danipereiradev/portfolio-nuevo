/**
 * HTML estático de las páginas `/diseno-web/{ciudad}/`.
 * Lo consume `scripts/prerender-meta.mjs` para dejar H1, intro, FAQ,
 * enlaces internos y schema en el HTML inicial, sin esperar a React.
 */
import {
  SITE_MAINTENANCE_LABEL,
  SITE_MAINTENANCE_PATH,
  SITE_SHOP_LABEL,
  SITE_SHOP_PATH,
  SITE_WEB_LABEL,
  SITE_WEB_PATH,
  TALENT_PATH,
  localWebCityPath,
} from '../config/contact';
import {
  LOCAL_WEB_LISTED_CITIES,
  getLocalGeoContext,
  getPublishedLocalWebFaqs,
  getRelatedCities,
  type LocalWebCity,
} from '../data/localWebCities';
import { LOCAL_WEB_INCLUDES } from '../data/localWebIncludes';
import { getLocalWebDemos } from '../data/localWebDemos';
import { buildLocalWebCityJsonLd } from './localWebCitySchema';

export { LOCAL_WEB_LISTED_CITIES, buildLocalWebCityJsonLd };

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const p = (text: string) =>
  `<p class="text-xl text-ink-dark md:text-2xl">${escapeHtml(text)}</p>`;

const pOnMedia = (text: string) =>
  `<p class="text-xl text-white md:text-2xl">${escapeHtml(text)}</p>`;

const cityLink = (slug: string, label: string) =>
  `<a href="${escapeHtml(localWebCityPath(slug))}" class="font-bold text-link underline">${escapeHtml(label)}</a>`;

export const buildLocalWebSpainSectionHtml = (currentSlug?: string) => {
  if (LOCAL_WEB_LISTED_CITIES.length === 0) return '';

  const currentCity = currentSlug
    ? LOCAL_WEB_LISTED_CITIES.find((city) => city.slug === currentSlug)
    : undefined;
  const cities = currentCity
    ? getRelatedCities(currentCity)
    : LOCAL_WEB_LISTED_CITIES;

  if (currentCity && cities.length === 0) {
    return '';
  }

  const heading = currentCity
    ? 'Otras páginas de diseño web'
    : 'Diseño web en España';
  const subtitle = currentCity
    ? 'Otras páginas de diseño web.'
    : 'Páginas de diseño web por ciudad.';

  const items = cities
    .map(
      (city) =>
        `<li>${cityLink(city.slug, `Diseño web en ${city.ciudad}`)}</li>`,
    )
    .join('');

  return `
    <section class="page-section">
      <div class="container mx-auto max-w-4xl text-center">
        <div class="page-title-block mx-auto">
          <h2 class="text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl">${escapeHtml(heading)}</h2>
          <p class="text-xl text-ink-dark md:text-2xl">${escapeHtml(subtitle)}</p>
        </div>
        <ul class="mt-page-gap flex flex-col items-center gap-3 text-lg md:text-xl">
          ${items}
        </ul>
      </div>
    </section>`;
};

export const buildLocalWebCityBodyHtml = (city: LocalWebCity) => {
  const h1 = `Diseño web en ${city.ciudad}`;
  const introHeading = `Una web para tu negocio en ${city.ciudad}.`;

  const intro = city.intro_local.map(p).join('\n');
  const geo = getLocalGeoContext(city);
  const geoHtml = geo
    ? `
        <section class="page-section relative z-10">
          <div class="container mx-auto max-w-5xl text-center">
            <h2 class="text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">${escapeHtml(geo.heading)}</h2>
            ${geo.body ? pOnMedia(geo.body) : ''}
          </div>
        </section>`
    : '';
  const necesidadesHtml =
    city.necesidades_locales.length >= 3
      ? `
        <section class="page-section">
          <div class="container mx-auto max-w-5xl">
            <h2 class="text-3xl font-extrabold text-ink-dark md:text-4xl">${escapeHtml(`Qué suele necesitar un negocio de ${city.ciudad} en su web`)}</h2>
            ${city.necesidades_locales
              .map(
                (need) => `
            <article>
              <h3 class="text-2xl font-extrabold text-ink-dark">${escapeHtml(need.title)}</h3>
              ${p(need.description)}
            </article>`,
              )
              .join('')}
          </div>
        </section>`
      : '';
  const sectores = city.sectores_locales
    .map(
      (sector) => `
        <article>
          <h3 class="text-2xl font-extrabold text-ink-dark">${escapeHtml(sector.title)}</h3>
          ${p(sector.description)}
        </article>`,
    )
    .join('');

  const faqs = getPublishedLocalWebFaqs(city)
    .map(
      (faq) => `
        <div>
          <h3 class="text-xl font-extrabold text-ink-dark">${escapeHtml(faq.question)}</h3>
          ${p(faq.answer)}
        </div>`,
    )
    .join('');

  return `
    <main>
      <article>
        <div class="relative overflow-hidden bg-ink-dark">
          <img src="/video/hero-nubes.jpg" alt="" aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 z-0 h-[135%] w-full object-cover object-center" />
          <div class="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-black/40 to-black/55" aria-hidden="true"></div>
          <header class="page-hero relative z-10 overflow-hidden">
            <div class="container relative z-10 mx-auto max-w-5xl py-16 text-center">
              <nav aria-label="Migas de pan" class="mb-2 text-xs font-normal tracking-wide text-white/70">
                <ol class="flex flex-wrap items-center justify-center gap-x-1.5">
                  <li><a href="/" class="underline decoration-current/25 underline-offset-4">Inicio</a></li>
                  <li aria-hidden="true">/</li>
                  <li><a href="${SITE_WEB_PATH}" class="underline decoration-current/25 underline-offset-4">${escapeHtml(SITE_WEB_LABEL)}</a></li>
                  <li aria-hidden="true">/</li>
                  <li>${escapeHtml(h1)}</li>
                </ol>
              </nav>
              <h1 class="text-3xl font-extrabold text-white md:text-5xl lg:text-6xl">${escapeHtml(h1)}</h1>
              <p class="text-xl text-white md:text-2xl">${escapeHtml(city.hero_lead)}</p>
            </div>
          </header>

          <section class="page-section relative z-10 bg-white">
            <div class="container mx-auto max-w-5xl text-center">
              <p class="text-md font-extrabold text-accent underline">${escapeHtml(h1)}</p>
              <h2 class="text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl">${escapeHtml(introHeading)}</h2>
              ${intro}
            </div>
          </section>
          ${geoHtml}
        </div>
        ${necesidadesHtml}

        <section class="page-section">
          <div class="container mx-auto max-w-5xl">
            <h2 class="text-3xl font-extrabold text-ink-dark md:text-4xl">${escapeHtml(`Sectores con los que trabajamos en ${city.ciudad}`)}</h2>
            ${p('No cubrimos “todo”. Cubrimos negocios a los que una web clara les cambia el día a día.')}
            ${sectores}
          </div>
        </section>

        <section class="page-section">
          <div class="container mx-auto max-w-5xl">
            <h2 class="text-3xl font-extrabold text-ink-dark md:text-4xl">${escapeHtml(LOCAL_WEB_INCLUDES.title)}</h2>
            ${p(LOCAL_WEB_INCLUDES.intro)}
            <ul class="mt-6 list-disc space-y-3 pl-6 text-xl text-ink-dark">
              ${LOCAL_WEB_INCLUDES.items
                .map(
                  (item) =>
                    `<li>${escapeHtml(item.title)}. ${escapeHtml(item.description)}</li>`,
                )
                .join('\n              ')}
            </ul>
          </div>
        </section>

        <section class="page-section">
          <div class="container mx-auto max-w-5xl">
            <h2 class="text-3xl font-extrabold text-ink-dark md:text-4xl">Para autónomos, pymes y empresas</h2>
            <p class="text-xl text-ink-dark md:text-2xl">No hacemos webs de agencia para impresionar a otras agencias. Las hacemos para que te encuentren y te escriban.</p>
            <h3 class="mt-8 text-2xl font-extrabold text-ink-dark">Autónomos y profesionales</h3>
            ${p('Una página que explique qué haces, se vea bien en el teléfono y deje un formulario o WhatsApp. Eso ya es una web profesional.')}
            <h3 class="mt-8 text-2xl font-extrabold text-ink-dark">Pequeños negocios</h3>
            ${p('Servicios, quiénes sois, cómo os contactan. Si hace falta más — citas, área privada, tienda— te lo decimos en la propuesta, no te lo colamos.')}
            <h3 class="mt-8 text-2xl font-extrabold text-ink-dark">Pymes y empresas</h3>
            ${p('Servicios, zona de trabajo y cómo pedir presupuesto. Si tu cliente es otra empresa, que lo entienda a la primera.')}
          </div>
        </section>

        <section class="page-section">
          <div class="container mx-auto max-w-5xl">
            <h2 class="text-3xl font-extrabold text-ink-dark md:text-4xl">${escapeHtml(`Así puede quedar tu web en ${city.ciudad}`)}</h2>
            ${p('Ejemplos reales de cómo podría verse tu web. Entra y navega cada diseño.')}
            <ul class="mt-6 list-disc space-y-3 pl-6 text-xl text-ink-dark">
              ${getLocalWebDemos(city)
                .map(
                  (demo) =>
                    `<li><a href="${escapeHtml(demo.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(demo.title)}</a></li>`,
                )
                .join('\n              ')}
            </ul>
          </div>
        </section>

        <section class="page-section">
          <div class="container mx-auto max-w-5xl">
            <h2 class="text-3xl font-extrabold text-ink-dark md:text-4xl">Nuestros clientes están contentos con cómo lo hacemos</h2>
            ${p('Estas son valoraciones sacadas de nuestro perfil oficial de Google con certificación Trustindex.')}
          </div>
        </section>

        <section class="page-section">
          <div class="container mx-auto max-w-5xl">
            <h2 class="text-3xl font-extrabold text-ink-dark md:text-4xl">Cómo trabajamos</h2>
            ${p('Atención directa. Diseño web cercano, profesional y sin intermediarios.')}
            <ol class="mt-6 list-decimal space-y-3 pl-6 text-xl text-ink-dark">
              <li>Nos cuentas tu negocio. Formulario, WhatsApp o llamada. Qué haces y qué tiene que hacer la web. Aún no hay nada que pagar.</li>
              <li>Diseñamos y desarrollamos. Diseño y desarrollo con tu marca. Te vamos mostrando el avance. Precio y plazos por escrito.</li>
              <li>Revisas y publicamos. Revisas, encaja, publicamos. La web queda a tu nombre.</li>
            </ol>
          </div>
        </section>

        <section class="page-section">
          <div class="container mx-auto max-w-4xl text-center">
            <h2 class="text-3xl font-extrabold text-ink-dark md:text-4xl">Diseño web, tienda o mantenimiento</h2>
            ${p(`Esta página es para una web de presentación en ${city.ciudad}. Si el proyecto es otra cosa, ve al servicio que toca.`)}
            <ul class="mt-page-gap flex flex-col items-center gap-3 text-lg md:text-xl">
              <li><a href="${SITE_SHOP_PATH}" class="font-bold text-link underline">${escapeHtml(SITE_SHOP_LABEL)}</a></li>
              <li><a href="${SITE_MAINTENANCE_PATH}" class="font-bold text-link underline">${escapeHtml(SITE_MAINTENANCE_LABEL)}</a></li>
            </ul>
          </div>
        </section>

        ${buildLocalWebSpainSectionHtml(city.slug)}

        <section id="faq" class="page-section">
          <div class="container mx-auto max-w-5xl">
            <h2 class="text-3xl font-extrabold text-ink-dark md:text-4xl">${escapeHtml(`Preguntas de diseño web en ${city.ciudad}`)}</h2>
            ${faqs}
          </div>
        </section>

        <section class="page-section">
          <div class="container mx-auto max-w-5xl text-center">
            <h2 class="text-3xl font-extrabold text-ink-dark md:text-4xl">${escapeHtml(city.cta_local.title)}</h2>
            ${p(city.cta_local.description)}
          </div>
        </section>

        <section class="page-section">
          <div class="container mx-auto max-w-3xl text-center">
            <p class="text-lg font-extrabold text-ink-dark md:text-xl">¿Eres diseñador/a o desarrollador/a?</p>
            ${p(`Estamos ampliando el equipo de 36web en ${city.ciudad}.`)}
            ${p('Si trabajas en diseño web, WordPress, frontend, ecommerce o marketing digital, queremos conocerte.')}
            <p class="mt-4"><a href="${TALENT_PATH}/?ciudad=${encodeURIComponent(city.ciudad)}" class="font-bold text-link underline">Enviar candidatura</a></p>
          </div>
        </section>
      </article>
    </main>`;
};

export const buildNotFoundBodyHtml = () => `
  <main class="page-section pt-[calc(var(--site-header-h)+var(--page-hero-offset)+1rem)]">
    <div class="container mx-auto max-w-3xl text-center">
      <h1 class="text-3xl font-extrabold text-ink-dark md:text-5xl">Página no encontrada</h1>
      <p class="mt-6 text-xl text-ink-dark md:text-2xl">Esta URL no existe. Si buscabas diseño web, ve a la página de servicio.</p>
      <p class="mt-6 text-lg">
        <a href="/" class="font-bold text-link underline">Inicio</a>
        ·
        <a href="${SITE_WEB_PATH}" class="font-bold text-link underline">${escapeHtml(SITE_WEB_LABEL)}</a>
      </p>
    </div>
  </main>`;
