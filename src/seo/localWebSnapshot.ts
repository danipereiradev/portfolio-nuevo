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
  localWebCityPath,
} from '../config/contact';
import { LOCAL_WEB_CITY_LIST, type LocalWebCity } from '../data/localWebCities';
import { buildLocalWebCityJsonLd } from './localWebCitySchema';

export { LOCAL_WEB_CITY_LIST, buildLocalWebCityJsonLd };

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const p = (text: string) =>
  `<p class="text-xl text-ink-dark md:text-2xl">${escapeHtml(text)}</p>`;

const cityLink = (slug: string, label: string) =>
  `<a href="${escapeHtml(localWebCityPath(slug))}" class="font-bold text-link underline">${escapeHtml(label)}</a>`;

export const buildLocalWebSpainSectionHtml = (currentSlug?: string) => {
  if (LOCAL_WEB_CITY_LIST.length === 0) return '';

  const items = LOCAL_WEB_CITY_LIST.map((city) => {
    const label = `Diseño web en ${city.ciudad}`;
    if (city.slug === currentSlug) {
      return `<li><span class="font-bold text-ink-dark">${escapeHtml(label)}</span></li>`;
    }
    return `<li>${cityLink(city.slug, label)}</li>`;
  }).join('');

  return `
    <section class="page-section">
      <div class="container mx-auto max-w-4xl text-center">
        <div class="page-title-block mx-auto">
          <h2 class="text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl">Diseño web en España</h2>
          <p class="text-xl text-ink-dark md:text-2xl">Páginas de diseño web por ciudad.</p>
        </div>
        <ul class="mt-page-gap flex flex-col items-center gap-3 text-lg md:text-xl">
          ${currentSlug ? `<li><a href="${SITE_WEB_PATH}" class="font-bold text-link underline">${escapeHtml(SITE_WEB_LABEL)} (toda España)</a></li>` : ''}
          ${items}
        </ul>
      </div>
    </section>`;
};

export const buildLocalWebCityBodyHtml = (city: LocalWebCity) => {
  const h1 = `Diseño web en ${city.ciudad}`;
  const introHeading = `Una web para tu negocio en ${city.ciudad}. Sin inflarla.`;
  const otherCities = LOCAL_WEB_CITY_LIST.filter(
    (item) => item.slug !== city.slug,
  );

  const intro = city.intro_local.map(p).join('\n');
  const sectores = city.sectores_locales
    .map(
      (sector) => `
        <article>
          <h3 class="text-2xl font-extrabold text-ink-dark">${escapeHtml(sector.title)}</h3>
          ${p(sector.description)}
        </article>`,
    )
    .join('');

  const faqs = city.faq_local
    .map(
      (faq) => `
        <div>
          <h3 class="text-xl font-extrabold text-ink-dark">${escapeHtml(faq.question)}</h3>
          ${p(faq.answer)}
        </div>`,
    )
    .join('');

  const related = otherCities
    .map(
      (relatedCity) =>
        `<li>${cityLink(relatedCity.slug, `Diseño web en ${relatedCity.ciudad}`)}</li>`,
    )
    .join('');

  return `
    <main>
      <article>
        <header class="page-hero relative overflow-hidden bg-surface-muted">
          <div class="container mx-auto max-w-5xl py-16 text-center">
            <h1 class="text-3xl font-extrabold text-ink-dark md:text-5xl lg:text-6xl">${escapeHtml(h1)}</h1>
            ${p(city.hero_lead)}
          </div>
        </header>

        <section class="page-section">
          <div class="container mx-auto max-w-5xl text-center">
            <p class="text-md font-extrabold text-accent underline">${escapeHtml(h1)}</p>
            <h2 class="text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl">${escapeHtml(introHeading)}</h2>
            ${intro}
          </div>
        </section>

        <section class="page-section">
          <div class="container mx-auto max-w-5xl">
            <h2 class="text-3xl font-extrabold text-ink-dark md:text-4xl">Para autónomos y pequeños negocios</h2>
            <p class="text-xl text-ink-dark md:text-2xl">No hacemos webs de agencia para impresionar a otras agencias. Las hacemos para que te encuentren y te escriban.</p>
            <h3 class="mt-8 text-2xl font-extrabold text-ink-dark">Autónomos</h3>
            ${p('Una página que explique qué haces, se vea bien en el teléfono y deje un formulario o WhatsApp. Eso ya es una web profesional.')}
            <h3 class="mt-8 text-2xl font-extrabold text-ink-dark">Pequeños negocios</h3>
            ${p('Servicios, quiénes sois, cómo os contactan. Si hace falta más — citas, área privada, tienda— te lo decimos en la propuesta, no te lo colamos.')}
          </div>
        </section>

        <section class="page-section">
          <div class="container mx-auto max-w-5xl">
            <h2 class="text-3xl font-extrabold text-ink-dark md:text-4xl">Qué montamos</h2>
            ${p('La base de una web de negocio. El resto va por escrito en la propuesta. Sin sorpresas.')}
            <ul class="mt-6 list-disc space-y-3 pl-6 text-xl text-ink-dark">
              <li>Diseño adaptado a tu marca. No reutilizamos el mismo diseño entre clientes.</li>
              <li>Se ve y se usa en el móvil.</li>
              <li>Formulario y WhatsApp. Sin eso, la web es un folleto.</li>
              <li>Publicación a tu nombre. Dominio, hosting para arrancar y la web tuya.</li>
            </ul>
          </div>
        </section>

        <section class="page-section">
          <div class="container mx-auto max-w-5xl">
            <h2 class="text-3xl font-extrabold text-ink-dark md:text-4xl">${escapeHtml(`Sectores con los que trabajamos en ${city.ciudad}`)}</h2>
            ${p('No cubrimos “todo”. Cubrimos negocios a los que una web clara les cambia el día a día.')}
            ${sectores}
          </div>
        </section>

        <section class="page-section">
          <div class="container mx-auto max-w-5xl">
            <h2 class="text-3xl font-extrabold text-ink-dark md:text-4xl">Trabajos</h2>
            ${p(city.casos_note)}
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
              <li><a href="${SITE_WEB_PATH}" class="font-bold text-link underline">${escapeHtml(SITE_WEB_LABEL)} (toda España)</a></li>
              <li><a href="${SITE_SHOP_PATH}" class="font-bold text-link underline">${escapeHtml(SITE_SHOP_LABEL)}</a></li>
              <li><a href="${SITE_MAINTENANCE_PATH}" class="font-bold text-link underline">${escapeHtml(SITE_MAINTENANCE_LABEL)}</a></li>
              ${related}
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
