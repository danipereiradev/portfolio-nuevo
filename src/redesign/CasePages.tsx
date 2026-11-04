import { Navigate, useParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { CONTACT_PATH, PORTFOLIO_PATH, buildWhatsAppUrl } from '../config/contact';
import { CASES, CASES_PATH, CaseItem } from './cases';

export function CaseCard({ c }: { c: CaseItem }) {
  return (
    <a href={`${CASES_PATH}/${c.slug}`} className='rd-card group flex h-full flex-col overflow-hidden'>
      <div className='aspect-[3/2] overflow-hidden bg-black'>
        <img
          src={c.image}
          alt={`Web de ${c.name}`}
          loading='lazy'
          className='h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]'
        />
      </div>
      <div className='flex flex-1 flex-col p-6'>
        <p className='rd-eyebrow mb-3'>
          {c.sector} · {c.city}
        </p>
        <h3 className='text-2xl font-extrabold uppercase'>{c.name}</h3>
        <p className='mt-3 text-sm leading-relaxed text-white/60'>{c.result}</p>
        <div className='mt-auto flex flex-wrap gap-2 pt-6'>
          {c.services.map((s) => (
            <span key={s} className='rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/60'>
              {s}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

function Cta() {
  return (
    <section className='px-5 py-24 md:px-8'>
      <div className='mx-auto flex max-w-[1320px] flex-col gap-8 rounded-[1.75rem] bg-[#e1f56e] px-7 py-14 text-[#0b0c0a] md:flex-row md:items-center md:justify-between md:px-14'>
        <div>
          <p className='font-mono text-xs uppercase tracking-[0.2em]'>// let&apos;s build</p>
          <h2 className='rd-h2 mt-4 max-w-[16ch] !text-[clamp(1.9rem,4vw,3.4rem)]'>¿El próximo caso es el tuyo?</h2>
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
  );
}

export function CasesIndex() {
  usePageMeta(CASES_PATH);
  return (
    <main className='rd rd-page'>
      <section className='relative overflow-hidden pt-[var(--site-header-h)]'>
        <div className='rd-grid-bg pointer-events-none absolute inset-0' />
        <div className='relative mx-auto grid max-w-[1320px] gap-10 px-5 pb-20 pt-20 md:px-8 lg:grid-cols-[1.3fr_1fr] lg:items-end'>
          <div>
            <p className='rd-eyebrow mb-6'>00 — Casos de éxito · Resultados reales</p>
            <h1 className='rd-h1'>
              NEGOCIOS
              <br />
              <span className='rd-mark'>QUE CRECEN</span>
              <br />
              <span className='text-[#e1f56e]'>CON NOSOTROS.</span>
            </h1>
          </div>
          <div>
            <p className='text-lg leading-relaxed text-white/65'>
              Talleres, clínicas y empresas de servicios que hoy venden más, salen en Google o tienen la agenda llena. Así lo hicimos.
            </p>
            <div className='mt-8 flex flex-wrap gap-3'>
              <a href={CONTACT_PATH} className='rd-btn'>Pide una revisión gratis ↗</a>
              <a href={PORTFOLIO_PATH} className='rd-btn-ghost'>Ver portfolio</a>
            </div>
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-[1320px] px-5 pb-20 pt-4 md:px-8'>
        <ol className='grid gap-px overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3'>
          {CASES.map((c, i) => (
            <li key={c.slug} className='bg-[#0b0c0a]'>
              <a href={`${CASES_PATH}/${c.slug}`} className='group block h-full p-6'>
                <span className='font-mono text-xs text-[#e1f56e]'>Caso {String(i + 1).padStart(2, '0')}</span>
                <h2 className='mt-4 text-lg font-extrabold uppercase group-hover:text-[#e1f56e]'>{c.name}</h2>
                <p className='mt-2 text-sm text-white/55'>{c.after}</p>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section className='rd-light'>
        <div className='mx-auto max-w-[1320px] px-5 py-24 md:px-8'>
          <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
            {CASES.map((c) => (
              <CaseCard key={c.slug} c={c} />
            ))}
          </div>
          <p className='mt-12 text-center text-white/60'>
            ¿Quieres ver más trabajos?{' '}
            <a href={PORTFOLIO_PATH} className='font-semibold underline underline-offset-4 hover:text-[#3346c1]'>
              Mira el portfolio completo
            </a>
            .
          </p>
        </div>
      </section>

      <Cta />
    </main>
  );
}

export default function CasePage() {
  const { slug } = useParams();
  const idx = CASES.findIndex((c) => c.slug === slug);
  usePageMeta(`${CASES_PATH}/${slug}`);
  if (idx < 0) return <Navigate to={CASES_PATH} replace />;
  const c = CASES[idx];
  const next = CASES[(idx + 1) % CASES.length];

  return (
    <main className='rd rd-page'>
      {/* HERO */}
      <section className='relative overflow-hidden pt-[var(--site-header-h)]'>
        <div className='rd-grid-bg pointer-events-none absolute inset-0' />
        <div className='relative mx-auto max-w-[1320px] px-5 pb-16 pt-16 md:px-8'>
          <a href={CASES_PATH} className='rd-eyebrow inline-flex items-center gap-2 !text-white/50 hover:!text-[#e1f56e]'>
            ← Casos de éxito
          </a>
          <div className='mt-10 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-end'>
            <div>
              <p className='rd-eyebrow mb-6'>
                {c.name} · {c.city}
              </p>
              <h1 className='rd-h1'>
                {c.title[0]}
                <br />
                <span className='rd-mark'>{c.title[1]}</span>
                <br />
                <span className='text-[#e1f56e]'>{c.title[2]}</span>
              </h1>
            </div>
            <p className='text-lg leading-relaxed text-white/65'>{c.result}</p>
          </div>

          <dl className='mt-14 grid gap-px overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4'>
            {[
              ['Cliente', c.name],
              ['Sector', c.sector],
              ['Ciudad', c.city],
              ['Servicios', c.services.join(' · ')],
            ].map(([k, v]) => (
              <div key={k} className='bg-[#0e0e0c] p-5'>
                <dt className='font-mono text-[10px] uppercase tracking-[0.2em] text-white/45'>{k}</dt>
                <dd className='mt-2 font-semibold'>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* IMAGEN */}
      <section className='mx-auto max-w-[1320px] px-5 md:px-8'>
        <a href={c.url} target='_blank' rel='noopener noreferrer' className='group relative block overflow-hidden rounded-[1.5rem] border border-white/10'>
          <img src={c.image} alt={`Web de ${c.name}`} className='w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]' />
          <span className='absolute bottom-5 right-5 rounded-full bg-[#e1f56e] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#0b0c0a]'>
            Ver la web ↗
          </span>
        </a>
      </section>

      {/* ANTES / DESPUÉS */}
      <section className='mx-auto max-w-[1320px] px-5 py-20 md:px-8'>
        <div className='grid gap-4 md:grid-cols-2'>
          <div className='rd-card p-8'>
            <p className='font-mono text-[11px] uppercase tracking-[0.2em] text-white/45'>Antes</p>
            <p className='mt-4 text-2xl font-extrabold leading-snug'>{c.before}</p>
          </div>
          <div className='rounded-[1.25rem] bg-[#e1f56e] p-8 text-[#0b0c0a]'>
            <p className='font-mono text-[11px] uppercase tracking-[0.2em] text-[#0b0c0a]/60'>Después</p>
            <p className='mt-4 text-2xl font-extrabold leading-snug'>{c.after}</p>
          </div>
        </div>
      </section>

      {/* RETO */}
      <section className='rd-light'>
        <div className='mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:px-8 lg:grid-cols-[0.8fr_1.2fr]'>
          <div>
            <p className='rd-eyebrow mb-5'>El punto de partida</p>
            <h2 className='rd-h2'>
              El <span className='rd-mark'>reto.</span>
            </h2>
          </div>
          <p className='self-end text-xl leading-relaxed text-white/70'>{c.challenge}</p>
        </div>
      </section>

      {/* QUÉ HICIMOS */}
      <section className='mx-auto max-w-[1320px] px-5 py-24 md:px-8'>
        <p className='rd-eyebrow mb-5'>Qué hicimos</p>
        <h2 className='rd-h2 max-w-[16ch]'>
          Paso a paso, <span className='rd-mark'>sin humo.</span>
        </h2>
        <ol className='mt-14 grid gap-4 sm:grid-cols-2'>
          {c.work.map((w, i) => (
            <li key={w.t} className='rd-card p-7'>
              <span className='font-mono text-xs text-[#e1f56e]'>{String(i + 1).padStart(2, '0')}</span>
              <h3 className='mt-6 text-xl font-extrabold uppercase'>{w.t}</h3>
              <p className='mt-3 text-sm leading-relaxed text-white/60'>{w.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* RESULTADO */}
      <section className='rd-light bg-white'>
        <div className='mx-auto max-w-[1320px] px-5 py-24 md:px-8'>
          <p className='rd-eyebrow mb-5'>El resultado</p>
          <h2 className='rd-h2 max-w-[18ch]'>{c.after}</h2>
          <dl className='mt-14 grid gap-px overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/10 md:grid-cols-3'>
            {c.outcomes.map((o) => (
              <div key={o.k} className='bg-[#f4f5f2] p-7'>
                <dt className='font-mono text-[11px] uppercase tracking-[0.2em] text-white/50'>{o.k}</dt>
                <dd className='mt-3 text-2xl font-black uppercase leading-tight'>{o.v}</dd>
              </div>
            ))}
          </dl>
          {c.quote ? (
            <figure className='mt-14 max-w-3xl'>
              <blockquote className='text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-tight'>
                «{c.quote.text}»
              </blockquote>
              <figcaption className='mt-5 font-mono text-xs uppercase tracking-[0.18em] text-white/55'>
                {c.quote.author} · {c.quote.role}
              </figcaption>
            </figure>
          ) : null}
        </div>
      </section>

      {/* SIGUIENTE CASO */}
      {next && next.slug !== c.slug ? (
        <section className='mx-auto max-w-[1320px] px-5 pt-24 md:px-8'>
          <a href={`${CASES_PATH}/${next.slug}`} className='group flex flex-col gap-4 border-y border-white/10 py-10 md:flex-row md:items-center md:justify-between'>
            <span className='rd-eyebrow'>Siguiente caso</span>
            <span className='text-3xl font-black uppercase md:text-5xl'>{next.name}</span>
            <span className='text-white/55 md:max-w-sm'>{next.result}</span>
            <span className='text-3xl text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-[#e1f56e]'>→</span>
          </a>
        </section>
      ) : null}

      <Cta />
    </main>
  );
}
