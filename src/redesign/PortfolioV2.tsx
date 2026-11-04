import { useMemo, useState } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import { CONTACT_PATH, PORTFOLIO_PATH, buildWhatsAppUrl } from '../config/contact';
import {
  PORTFOLIO_PAGE_PROJECTS,
  PORTFOLIO_PROJECT_LINK_REL,
  PortfolioPageProject,
} from '../data/portfolioPage';
import { APP_PROJECTS, appImage, type AppProject } from '../data/appProjects';
import { CASES, CASES_PATH } from './cases';

const SITE_URL = 'https://36web.es';

// Proyectos del portfolio que tienen caso de éxito propio.
const CASE_BY_PROJECT: Record<string, string> = {
  camisetas: 'camisetas-ahora',
  hatena: 'hatena',
  carper: 'carper-sonido',
};

const FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'web', label: 'Webs' },
  { id: 'shop', label: 'Tiendas online' },
  { id: 'app', label: 'Apps' },
] as const;
type FilterId = (typeof FILTERS)[number]['id'];

function ProjectCard({ p }: { p: PortfolioPageProject }) {
  const caseSlug = CASE_BY_PROJECT[p.id];
  const hasCase = Boolean(caseSlug && CASES.some((c) => c.slug === caseSlug));
  const href = hasCase ? `${CASES_PATH}/${caseSlug}` : p.url;
  const ext = hasCase ? {} : { target: '_blank', rel: PORTFOLIO_PROJECT_LINK_REL };
  return (
    <a href={href} {...ext} className='rd-card group flex h-full flex-col overflow-hidden'>
      <div className='aspect-[3/2] overflow-hidden bg-black'>
        <img
          src={p.image}
          alt={`Web de ${p.name}`}
          loading='lazy'
          className='h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]'
        />
      </div>
      <div className='flex flex-1 flex-col p-6'>
        <p className='rd-eyebrow mb-3'>{p.sector}</p>
        <h3 className='text-2xl font-extrabold uppercase'>{p.name}</h3>
        <p className='mt-3 text-sm leading-relaxed text-white/60'>{p.description}</p>
        <div className='mt-auto flex flex-wrap gap-2 pt-6'>
          <span className='rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/60'>
            {p.category === 'shop' ? 'eCommerce' : 'Diseño web'}
          </span>
          {hasCase ? (
            <span className='rounded-full bg-[#e1f56e] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#0b0c0a]'>
              Caso de éxito
            </span>
          ) : null}
        </div>
      </div>
    </a>
  );
}

function AppCard({ a }: { a: AppProject }) {
  const shots = a.images.filter((f) => !f.endsWith('-04.webp')).slice(0, 3);
  const isIllustration = 'illustration' in a && a.illustration;
  const url = 'url' in a ? a.url : undefined;
  const inner = (
    <>
      <div className='flex aspect-[3/2] items-center justify-center gap-3 overflow-hidden bg-[#e8e9e3] px-6 py-5'>
        {shots.map((f) => (
          <img
            key={f}
            src={appImage(f)}
            alt={`Pantalla de ${a.name}`}
            loading='lazy'
            className={`h-full rounded-xl object-contain shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-transform duration-500 group-hover:-translate-y-1 ${
              isIllustration ? 'w-auto' : 'w-auto max-w-[31%]'
            }`}
          />
        ))}
      </div>
      <div className='flex flex-1 flex-col p-6'>
        <p className='rd-eyebrow mb-3'>{a.sector}</p>
        <h3 className='text-2xl font-extrabold uppercase'>{a.name}</h3>
        <p className='mt-3 text-sm leading-relaxed text-white/60'>{a.description}</p>
        <p className='mt-3 font-mono text-[11px] leading-relaxed text-white/45'>{a.technologies}</p>
        <div className='mt-auto flex flex-wrap gap-2 pt-6'>
          <span className='rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/60'>
            App
          </span>
          {isIllustration ? (
            <span className='rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/60'>
              Imagen recreada
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
  return url ? (
    <a href={url} target='_blank' rel={PORTFOLIO_PROJECT_LINK_REL} className='rd-card group flex h-full flex-col overflow-hidden'>
      {inner}
    </a>
  ) : (
    <article className='rd-card group flex h-full flex-col overflow-hidden'>{inner}</article>
  );
}

export default function PortfolioV2() {
  usePageMeta(PORTFOLIO_PATH);
  const [filter, setFilter] = useState<FilterId>('all');

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${SITE_URL}${PORTFOLIO_PATH}/` },
          ],
        },
        {
          '@type': 'CollectionPage',
          name: 'Portfolio de webs, tiendas online y aplicaciones | 36web',
          url: `${SITE_URL}${PORTFOLIO_PATH}/`,
          description: 'Webs y tiendas online de negocios reales. Visita los proyectos y lee sus casos de éxito.',
        },
      ],
    }),
    [],
  );
  useJsonLd('jsonld-portfolio', jsonLd);

  const projects = PORTFOLIO_PAGE_PROJECTS.filter((p) => filter === 'all' || p.category === filter);
  const apps = filter === 'all' || filter === 'app' ? APP_PROJECTS : [];
  const count = (id: FilterId) =>
    id === 'all'
      ? PORTFOLIO_PAGE_PROJECTS.length + APP_PROJECTS.length
      : id === 'app'
        ? APP_PROJECTS.length
        : PORTFOLIO_PAGE_PROJECTS.filter((p) => p.category === id).length;

  return (
    <main className='rd rd-page'>
      {/* HERO */}
      <section className='relative overflow-hidden pt-[var(--site-header-h)]'>
        <div className='rd-grid-bg pointer-events-none absolute inset-0' />
        <div className='relative mx-auto grid max-w-[1320px] gap-10 px-5 pb-20 pt-20 md:px-8 lg:grid-cols-[1.3fr_1fr] lg:items-end'>
          <div>
            <p className='rd-eyebrow mb-6'>00 — Portfolio · Proyectos reales</p>
            <h1 className='rd-h1'>
              WEBS QUE
              <br />
              <span className='rd-mark'>YA ESTÁN</span>
              <br />
              <span className='text-[#e1f56e]'>TRABAJANDO.</span>
            </h1>
          </div>
          <div>
            <p className='text-lg leading-relaxed text-white/65'>
              Webs, tiendas online y apps de negocios reales: clínicas, talleres, tiendas, despachos y productos digitales. Entra en cualquiera y compruébalo tú mismo.
            </p>
            <div className='mt-8 flex flex-wrap gap-3'>
              <a href={CONTACT_PATH} className='rd-btn'>Pide una revisión gratis ↗</a>
              <a href={CASES_PATH} className='rd-btn-ghost'>Casos de éxito</a>
            </div>
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-[1320px] px-5 pb-20 pt-4 md:px-8'>
        <dl className='grid gap-px overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4'>
          {[
            ['Proyectos', count('all'), 'Webs, tiendas y apps'],
            ['Webs', count('web'), 'Negocios de servicios'],
            ['Tiendas online', count('shop'), 'Vendiendo en internet'],
            ['Apps', count('app'), 'Web, Android e iOS'],
          ].map(([k, v, d]) => (
            <div key={k} className='bg-[#0b0c0a] p-6'>
              <dt className='font-mono text-xs text-[#e1f56e]'>{k}</dt>
              <dd className='mt-4 text-4xl font-black'>{v}</dd>
              <dd className='mt-2 text-sm text-white/55'>{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* GRID */}
      <section className='rd-light'>
        <div className='mx-auto max-w-[1320px] px-5 py-20 md:px-8'>
          <div className='mb-10 flex flex-wrap gap-2' role='tablist' aria-label='Filtrar proyectos'>
            {FILTERS.map((f) => {
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  type='button'
                  role='tab'
                  aria-selected={on}
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors ${
                    on ? 'border-[#141414] bg-[#141414] text-[#ffffff]' : 'border-black/15 bg-white text-[#141414] hover:border-[#141414]'
                  }`}
                >
                  {f.label} <span className='ml-1 font-mono opacity-60'>{count(f.id)}</span>
                </button>
              );
            })}
          </div>
          <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
            {projects.map((p) => (
              <ProjectCard key={p.id} p={p} />
            ))}
            {apps.map((a) => (
              <AppCard key={a.id} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='px-5 py-24 md:px-8'>
        <div className='mx-auto flex max-w-[1320px] flex-col gap-8 rounded-[1.75rem] bg-[#e1f56e] px-7 py-14 text-[#0b0c0a] md:flex-row md:items-center md:justify-between md:px-14'>
          <div>
            <p className='font-mono text-xs uppercase tracking-[0.2em]'>// let&apos;s build</p>
            <h2 className='rd-h2 mt-4 max-w-[16ch] !text-[clamp(1.9rem,4vw,3.4rem)]'>¿Quieres una web así?</h2>
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
    </main>
  );
}
