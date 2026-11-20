/**
 * HTML estático de la home y de las páginas de servicio.
 *
 * Lo consume `scripts/prerender-meta.mjs` y va dentro de #root. Sin esto el
 * HTML inicial solo tenía un H1 y una frase: Google tenía que ejecutar
 * JavaScript para ver el resto, y los buscadores de IA (que no lo ejecutan)
 * no veían nada. React lo sustituye al montar (createRoot, no hidrata), así
 * que aquí solo importa el contenido, no el diseño exacto.
 *
 * Los textos salen de los mismos datos que usa React (services.ts,
 * cases.ts, homeContent.ts): si cambias un texto allí, cambia aquí.
 */
import {
  BUSINESS_HOURS,
  CONTACT_EMAIL,
  CONTACT_PATH,
  PHONE_DISPLAY,
  PHONE_TEL_LINK,
  TRANQUILIDAD_DIGITAL_PATH,
  localWebCityHref,
  withSlash,
} from '../config/contact';
import { LOCAL_WEB_LISTED_CITIES } from '../data/localWebCities';
import { CASES, CASES_PATH } from '../redesign/cases';
import { FAQS, PEACE, PRINCIPLES, STEPS } from '../redesign/homeContent';
import {
  ALL_SERVICES,
  SERVICES,
  SERVICES_PATH,
  type Service,
} from '../redesign/services';

const esc = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const link = (href: string, label: string) =>
  `<a href="${esc(withSlash(href))}">${esc(label)}</a>`;

const section = (inner: string) =>
  `<section class="mx-auto max-w-[1320px] px-5 py-16 md:px-8">${inner}</section>`;

const eyebrow = (text: string) => `<p class="rd-eyebrow mb-5">${esc(text)}</p>`;

const faqList = (faqs: { q: string; a: string }[]) =>
  faqs
    .map((f) => `<div class="py-4"><h3 class="font-bold">${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`)
    .join('');

/** Bloque de contacto (mismos datos que la ficha de Google). */
const contactBlock = () =>
  section(`
    <h2 class="rd-h2">¿Revisamos tu web gratis?</h2>
    <p>Te decimos qué está frenando a tus clientes y cómo lo arreglaríamos. Sin compromiso.</p>
    <p>Llámanos al <a href="${PHONE_TEL_LINK}">${esc(PHONE_DISPLAY)}</a>, escríbenos a <a href="mailto:${CONTACT_EMAIL}">${esc(CONTACT_EMAIL)}</a> o ${link(CONTACT_PATH, 'déjanos tus datos')}.</p>
    <p>${esc(BUSINESS_HOURS)}. Trabajamos desde Torrejón de Ardoz para el Corredor del Henares y toda España.</p>`);

const localCitiesBlock = () =>
  section(`
    ${eyebrow('Diseño web por zonas')}
    <ul>${LOCAL_WEB_LISTED_CITIES.map((c) => `<li><a href="${esc(localWebCityHref(c.slug))}">${esc(`Diseño web en ${c.ciudad}`)}</a></li>`).join('')}</ul>`);

const serviceRoute = (s: Service) =>
  s.href.startsWith(SERVICES_PATH) ? `${SERVICES_PATH}/${s.slug}` : s.href;

/** Ruta de página (sin barra final, como en pagesMeta.json) → servicio. */
export const SERVICE_ROUTES: Record<string, string> = Object.fromEntries(
  ALL_SERVICES.filter((s) => s.page).map((s) => [serviceRoute(s), s.slug]),
);

export const buildHomeBodyHtml = () => `
  <main class="rd rd-page">
    <section class="mx-auto max-w-[1320px] px-5 pb-16 pt-[calc(var(--site-header-h,5rem)+3.5rem)] md:px-8">
      ${eyebrow('Torrejón de Ardoz · Corredor del Henares · Toda España')}
      <h1 class="rd-h1 rd-h1-seo">Agencia de diseño web y marketing digital.</h1>
      <p class="rd-slogan mt-6">Tu negocio, visible y sin líos.</p>
      <p class="mt-7 max-w-md text-lg">Hacemos tu web, te ponemos en Google y en la IA, y llevamos tus redes. Un solo equipo para que tus clientes te encuentren y te escriban.</p>
      <p class="mt-6">${link(CONTACT_PATH, 'Pide una revisión gratis')} · ${link(CASES_PATH, 'Ver resultados')}</p>
    </section>

    ${section(`
      ${eyebrow('Todo en un equipo')}
      <h2 class="rd-h2">Un solo equipo, todos tus canales.</h2>
      <p>La web, Google, la IA y las redes funcionan mejor cuando las lleva el mismo equipo. Elegimos lo que tu negocio necesita y lo hacemos trabajar junto, con un objetivo: que te contacten más.</p>
      <ul>${SERVICES.map((s) => `<li><h3>${link(s.href, s.name)}</h3><p>${esc(s.short)}</p></li>`).join('')}</ul>`)}

    ${section(`
      ${eyebrow('Tranquilidad digital')}
      <h2 class="rd-h2">Tú a lo tuyo. Nosotros, a lo digital.</h2>
      <p>Cuando hay hosting, dominios, programadores, plataformas y facturas de por medio, alguien tiene que estar de tu lado. Ese somos nosotros.</p>
      <ul>${PEACE.map(([t, d]) => `<li><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('')}</ul>
      <p>${link(TRANQUILIDAD_DIGITAL_PATH, 'Cómo funciona')}</p>`)}

    ${section(`
      ${eyebrow('Método')}
      <h2 class="rd-h2">Primero entender. Después construir.</h2>
      <ol>${STEPS.map((s) => `<li><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></li>`).join('')}</ol>`)}

    ${section(`
      ${eyebrow('Casos de éxito')}
      <h2 class="rd-h2">Resultados reales.</h2>
      <ul>${CASES.map((c) => `<li><h3>${link(`${CASES_PATH}/${c.slug}`, c.name)}</h3><p>${esc(`${c.sector} · ${c.city}. ${c.result}`)}</p></li>`).join('')}</ul>
      <p>${link(CASES_PATH, 'Ver todos los casos')}</p>`)}

    ${section(`
      ${eyebrow('Continuidad')}
      <h2 class="rd-h2">Clientes que se quedan.</h2>
      <p>Se quedan porque su web les trae clientes y porque, cuando algo pasa, siempre hay alguien al otro lado que conoce su negocio. 9 de cada 10 clientes siguen con nosotros.</p>`)}

    ${section(`
      ${eyebrow('Por qué 36web')}
      <h2 class="rd-h2">La confianza se gana trabajando.</h2>
      <dl>${PRINCIPLES.map((p) => `<dt class="font-extrabold">${esc(p.t)}</dt><dd>${esc(p.d)}</dd>`).join('')}</dl>`)}

    ${section(`
      ${eyebrow('Preguntas frecuentes')}
      <h2 class="rd-h2">Hablemos claro.</h2>
      ${faqList(FAQS)}`)}

    ${localCitiesBlock()}
    ${contactBlock()}
  </main>`;

export const buildServiceBodyHtml = (slug: string) => {
  const s = ALL_SERVICES.find((x) => x.slug === slug);
  if (!s?.page) return '';
  const p = s.page;
  const others = SERVICES.filter((o) => o.slug !== s.slug).slice(0, 3);

  return `
  <main class="rd rd-page">
    <section class="mx-auto max-w-[1320px] px-5 pb-16 pt-[calc(var(--site-header-h,5rem)+3.5rem)] md:px-8">
      <nav aria-label="Migas de pan"><a href="/">Inicio</a> / ${link(SERVICES_PATH, 'Servicios')} / <span aria-current="page">${esc(s.name)}</span></nav>
      ${eyebrow(`${s.area} · ${s.name}`)}
      <h1 class="rd-h1 rd-h1-seo">${esc((p.h1 ?? p.title).filter(Boolean).join(' '))}</h1>
      ${p.h1 ? `<p class="rd-slogan mt-6">${esc(p.title.join(' '))}</p>` : ''}
      <p class="mt-7 max-w-2xl text-lg">${esc(p.intro)}</p>
      <p class="mt-6">${link(CONTACT_PATH, 'Pide una revisión gratis')} · <a href="${PHONE_TEL_LINK}">Llámanos: ${esc(PHONE_DISPLAY)}</a></p>
    </section>

    ${p.steps ? section(`
      <h2 class="rd-h2">Cómo trabajamos</h2>
      <ol>${p.steps.map((st) => `<li><h3>${esc(st.t)}</h3><p>${esc(st.d)}</p></li>`).join('')}</ol>`) : ''}

    ${section(`
      ${eyebrow('Qué incluye')}
      <h2 class="rd-h2">${esc(`Qué incluye el servicio de ${s.name}`)}</h2>
      <ul>${p.includes.map((it) => `<li><h3>${esc(it.t)}</h3><p>${esc(it.d)}</p></li>`).join('')}</ul>`)}

    ${p.local ? section(`
      ${eyebrow(p.local.eyebrow)}
      <h2 class="rd-h2">${esc(p.local.heading)}</h2>
      ${p.local.paragraphs.map((para) => `<p>${esc(para)}</p>`).join('')}
      <ul>${LOCAL_WEB_LISTED_CITIES.filter((c) => c.provincia === 'Madrid').map((c) => `<li><a href="${esc(localWebCityHref(c.slug))}">${esc(`Diseño web en ${c.ciudad}`)}</a></li>`).join('')}</ul>`) : ''}

    ${s.slug === 'diseno-web' ? localCitiesBlock() : ''}

    ${section(`
      ${eyebrow('Para quién es')}
      <ul>${p.forWho.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>`)}

    ${section(`
      <h2 class="rd-h2">${esc(`Preguntas frecuentes: ${s.name}`)}</h2>
      ${faqList(p.faq)}`)}

    ${section(`
      ${eyebrow('Funciona mejor junto a')}
      <ul>${others.map((o) => `<li><h3>${link(o.href, o.name)}</h3><p>${esc(o.short)}</p></li>`).join('')}</ul>`)}

    ${contactBlock()}
  </main>`;
};
