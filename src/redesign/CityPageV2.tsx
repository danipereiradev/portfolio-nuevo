import { Fragment, useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import {
  CONTACT_PATH,
  SITE_MAINTENANCE_PATH,
  SITE_SHOP_PATH,
  SITE_WEB_PATH,
  buildWhatsAppUrl,
  localWebCityPath,
} from '../config/contact';
import {
  getLocalGeoContext,
  getLocalWebCity,
  getPublishedLocalWebFaqs,
  getRelatedCities,
  isLocalWebCityListed,
  type LocalWebCity,
} from '../data/localWebCities';
import { LOCAL_WEB_INCLUDES } from '../data/localWebIncludes';
import { getLocalWebDemos } from '../data/localWebDemos';
import { buildLocalWebCityJsonLd } from '../seo/localWebCitySchema';
import GoogleBadge from './GoogleBadge';
import { SpanishOnlyNotice } from './prefs';

/** Resalta el nombre de la ciudad en el texto. */
const withCity = (text: string, ciudad: string) =>
  text.split(ciudad).map((part, i, arr) => (
    <Fragment key={i}>
      {part}
      {i < arr.length - 1 ? <strong className='font-extrabold text-[#141414]'>{ciudad}</strong> : null}
    </Fragment>
  ));

const STEPS = [
  { t: 'Nos cuentas tu negocio', d: 'Formulario, WhatsApp o llamada. Qué haces y qué tiene que hacer la web. Aún no hay nada que pagar.' },
  { t: 'Diseñamos y desarrollamos', d: 'Con tu marca y enseñándote el avance. Precio y plazos por escrito antes de empezar.' },
  { t: 'Revisas y publicamos', d: 'Revisas, ajustamos y publicamos. La web queda a tu nombre.' },
];

function CityPage({ city }: { city: LocalWebCity }) {
  const path = `${SITE_WEB_PATH}/${city.slug}`;
  usePageMeta(path);
  const jsonLd = useMemo(() => buildLocalWebCityJsonLd(city), [city]);
  useJsonLd(`jsonld-diseno-web-${city.slug}`, jsonLd);

  const geo = getLocalGeoContext(city);
  const needs = city.necesidades_locales.length >= 3 ? city.necesidades_locales : [];
  const demos = getLocalWebDemos(city);
  const related = getRelatedCities(city);
  const faqs = getPublishedLocalWebFaqs(city);

  return (
    <main className='rd rd-page'>
      {/* HERO */}
      <section className='relative overflow-hidden pt-[var(--site-header-h)]'>
        <div className='rd-grid-bg pointer-events-none absolute inset-0' />
        <div className='relative mx-auto grid max-w-[1320px] gap-10 px-5 pb-20 pt-20 md:px-8 lg:grid-cols-[1.3fr_1fr] lg:items-end'>
          <div>
            <a href={SITE_WEB_PATH} className='rd-eyebrow mb-6 inline-block hover:!text-white'>
              01 — Presencia · Diseño web · {city.provincia}
            </a>
            <h1 className='rd-h1'>
              <span className='rd-mark'>DISEÑO WEB</span>
              <br />
              <span className='text-[#e1f56e]'>EN {city.ciudad.toUpperCase()}.</span>
            </h1>
          </div>
          <div>
            <p className='text-lg leading-relaxed text-white/65'>{city.hero_lead}</p>
            <div className='mt-8 flex flex-wrap gap-3'>
              <a href={CONTACT_PATH} className='rd-btn'>Pide una revisión gratis ↗</a>
              <a href='#incluye' className='rd-btn-ghost'>Qué incluye</a>
            </div>
            <GoogleBadge className='mt-8' />
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-[1320px] px-5 pb-20 pt-4 md:px-8'>
        <dl className='grid gap-px overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4'>
          {[
            ['Zona', city.contexto_local.area || city.ciudad],
            ['Provincia', `${city.provincia} · ${city.comunidad}`],
            ['Atención', 'Directa, con un interlocutor'],
            ['Propuesta', 'Por escrito, en el mismo día'],
          ].map(([k, v]) => (
            <div key={k} className='bg-[#0b0c0a] p-6'>
              <dt className='font-mono text-xs text-[#e1f56e]'>{k}</dt>
              <dd className='mt-3 font-semibold'>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* INTRO LOCAL */}
      <section className='rd-light'>
        <div className='mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:px-8 lg:grid-cols-[0.9fr_1.1fr]'>
          <div>
            <p className='rd-eyebrow mb-5'>Diseño web en {city.ciudad}</p>
            <h2 className='rd-h2'>
              Una web para tu <span className='rd-mark'>negocio</span> en {city.ciudad}.
            </h2>
          </div>
          <div className='space-y-5 text-lg leading-relaxed text-white/70'>
            {city.intro_local.map((p, i) => (
              <p key={i}>{withCity(p, city.ciudad)}</p>
            ))}
            {geo ? (
              <div className='rounded-[1.25rem] border-l-4 border-[#b1d004] bg-white p-6'>
                <p className='font-extrabold text-[#141414]'>{geo.heading}</p>
                {geo.body ? <p className='mt-2 text-base'>{withCity(geo.body, city.ciudad)}</p> : null}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* NECESIDADES */}
      {needs.length ? (
        <section className='mx-auto max-w-[1320px] px-5 py-24 md:px-8'>
          <p className='rd-eyebrow mb-5'>Lo que piden los negocios de {city.ciudad}</p>
          <h2 className='rd-h2 max-w-[18ch]'>
            Qué necesita tu <span className='rd-mark'>web.</span>
          </h2>
          <div className='mt-14 grid gap-4 md:grid-cols-3'>
            {needs.map((n, i) => (
              <div key={n.title} className='rd-card p-7'>
                <span className='font-mono text-xs text-[#e1f56e]'>{String(i + 1).padStart(2, '0')}</span>
                <h3 className='mt-6 text-xl font-extrabold uppercase'>{n.title}</h3>
                <p className='mt-3 text-sm leading-relaxed text-white/60'>{n.description}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* SECTORES */}
      <section className='rd-light rd-stone'>
        <div className='mx-auto max-w-[1320px] px-5 py-24 md:px-8'>
          <div className='mb-14 grid gap-8 lg:grid-cols-2 lg:items-end'>
            <div>
              <p className='rd-eyebrow mb-5'>Sectores</p>
              <h2 className='rd-h2'>
                Con <span className='rd-mark'>quién</span> trabajamos en {city.ciudad}.
              </h2>
            </div>
            <p className='max-w-lg text-white/60 lg:justify-self-end'>
              Negocios que necesitan una web clara para explicar sus servicios, generar contactos y facilitar presupuestos o reservas.
            </p>
          </div>
          <div className='grid gap-4 sm:grid-cols-2'>
            {city.sectores_locales.map((s, i) => (
              <div key={s.title} className='rd-card p-7'>
                <span className='font-mono text-xs text-[#e1f56e]'>{String(i + 1).padStart(2, '0')}</span>
                <h3 className='mt-6 text-xl font-extrabold uppercase'>{s.title}</h3>
                <p className='mt-3 text-sm leading-relaxed text-white/60'>{withCity(s.description, city.ciudad)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUÉ INCLUYE */}
      <section id='incluye' className='mx-auto max-w-[1320px] scroll-mt-28 px-5 py-24 md:px-8'>
        <p className='rd-eyebrow mb-5'>Qué incluye</p>
        <h2 className='rd-h2 max-w-[18ch]'>
          Tu web, <span className='rd-mark'>lista</span> para trabajar.
        </h2>
        <p className='mt-6 max-w-2xl text-white/60'>{LOCAL_WEB_INCLUDES.intro}</p>
        <div className='mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {LOCAL_WEB_INCLUDES.items.map((it, i) => (
            <div key={it.title} className='rd-card p-7'>
              <span className='font-mono text-xs text-[#e1f56e]'>{String(i + 1).padStart(2, '0')}</span>
              <h3 className='mt-6 text-lg font-extrabold uppercase'>{it.title}</h3>
              <p className='mt-3 text-sm leading-relaxed text-white/60'>{it.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEMOS */}
      <section className='rd-light'>
        <div className='mx-auto max-w-[1320px] px-5 py-24 md:px-8'>
          <p className='rd-eyebrow mb-5'>Ejemplos</p>
          <h2 className='rd-h2 mb-14 max-w-[20ch]'>
            Así podría ser <span className='rd-mark'>tu web</span> en {city.ciudad}.
          </h2>
          <div className='grid gap-5 md:grid-cols-3'>
            {demos.map((d) => (
              <a key={d.href} href={d.href} target='_blank' rel='noopener noreferrer' className='rd-card group flex h-full flex-col overflow-hidden'>
                <div className='aspect-[3/2] overflow-hidden bg-black'>
                  <img src={d.image} alt={d.title} loading='lazy' className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]' />
                </div>
                <div className='flex flex-1 items-center justify-between gap-4 p-6'>
                  <h3 className='text-lg font-extrabold uppercase'>{d.title}</h3>
                  <span className='text-xs font-bold uppercase tracking-[0.14em] text-white/60 group-hover:text-[#3346c1]'>Ver demo ↗</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section className='mx-auto max-w-[1320px] px-5 py-24 md:px-8'>
        <p className='rd-eyebrow mb-5'>Cómo trabajamos</p>
        <h2 className='rd-h2 max-w-[16ch]'>
          Directo y <span className='rd-mark'>sin líos.</span>
        </h2>
        <ol className='mt-14 grid gap-px overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/10 md:grid-cols-3'>
          {STEPS.map((s, i) => (
            <li key={s.t} className='bg-[#0b0c0a] p-7'>
              <span className='text-5xl font-black text-white/10'>{String(i + 1).padStart(2, '0')}</span>
              <h3 className='mt-6 text-xl font-extrabold uppercase'>{s.t}</h3>
              <p className='mt-3 text-sm leading-relaxed text-white/55'>{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ + ENLACES */}
      <section className='rd-light'>
        <div className='mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:px-8 lg:grid-cols-[0.8fr_1.2fr]'>
          <div>
            <p className='rd-eyebrow mb-5'>Preguntas frecuentes</p>
            <h2 className='rd-h2'>
              Hablemos <span className='rd-mark'>claro.</span>
            </h2>
            <div className='mt-10 space-y-6 text-sm'>
              {related.length ? (
                <div>
                  <p className='rd-eyebrow mb-3'>También en</p>
                  <ul className='flex flex-wrap gap-2'>
                    {related.map((c) => (
                      <li key={c.slug}>
                        <a href={localWebCityPath(c.slug)} className='inline-block rounded-full border border-black/15 bg-white px-4 py-2 font-semibold text-[#141414] hover:border-[#141414]'>
                          {c.ciudad}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div>
                <p className='rd-eyebrow mb-3'>¿Buscas otra cosa?</p>
                <ul className='flex flex-wrap gap-2'>
                  {[
                    [SITE_SHOP_PATH, 'Tiendas online'],
                    [SITE_MAINTENANCE_PATH, 'Mantenimiento web'],
                    [SITE_WEB_PATH, 'Diseño web'],
                  ].map(([href, label]) => (
                    <li key={href}>
                      <a href={href} className='inline-block rounded-full border border-black/15 bg-white px-4 py-2 font-semibold text-[#141414] hover:border-[#141414]'>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='divide-y divide-white/10 border-y border-white/10'>
            {faqs.map((f) => (
              <details key={f.question} className='group py-6'>
                <summary className='flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-bold'>
                  {f.question}
                  <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-[#e1f56e] transition-transform group-open:rotate-45'>+</span>
                </summary>
                <p className='mt-4 max-w-2xl text-white/60'>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='px-5 py-24 md:px-8'>
        <div className='mx-auto flex max-w-[1320px] flex-col gap-8 rounded-[1.75rem] bg-[#e1f56e] px-7 py-14 text-[#0b0c0a] md:flex-row md:items-center md:justify-between md:px-14'>
          <div>
            <p className='font-mono text-xs uppercase tracking-[0.2em]'>// let&apos;s build</p>
            <h2 className='rd-h2 mt-4 max-w-[18ch] !text-[clamp(1.9rem,4vw,3.4rem)]'>{city.cta_local.title}</h2>
            <p className='mt-4 max-w-lg text-[#0b0c0a]/70'>{city.cta_local.description}</p>
          </div>
          <div className='flex flex-wrap gap-3'>
            <a href={CONTACT_PATH} className='inline-flex items-center gap-2 rounded-full bg-[#0b0c0a] px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-[#3346c1]'>
              Hablemos ↗
            </a>
            <a href={buildWhatsAppUrl()} target='_blank' rel='noopener noreferrer' className='inline-flex items-center rounded-full border border-[#0b0c0a]/30 px-7 py-4 text-xs font-bold uppercase tracking-[0.14em]'>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
      <SpanishOnlyNotice />
    </main>
  );
}

export default function CityPageV2() {
  const { ciudad: slug } = useParams<{ ciudad: string }>();
  const city = getLocalWebCity(slug);
  if (!city || !isLocalWebCityListed(city.slug)) return <Navigate to={SITE_WEB_PATH} replace />;
  return <CityPage city={city} />;
}
