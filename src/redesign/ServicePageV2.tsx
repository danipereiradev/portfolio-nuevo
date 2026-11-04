import { Navigate, useParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { CONTACT_PATH, buildWhatsAppUrl } from '../config/contact';
import { ALL_SERVICES, EXTRA_SERVICES, SERVICES, SERVICES_PATH } from './services';

function CtaBand({ text }: { text: string }) {
  return (
    <section className='px-5 pb-24 md:px-8'>
      <div className='mx-auto flex max-w-[1320px] flex-col gap-8 rounded-[1.75rem] bg-[#e1f56e] px-7 py-14 text-[#0b0c0a] md:flex-row md:items-center md:justify-between md:px-14'>
        <h2 className='rd-h2 max-w-[16ch] !text-[clamp(1.9rem,4vw,3.4rem)]'>{text}</h2>
        <div className='flex flex-wrap gap-3'>
          <a href={CONTACT_PATH} className='inline-flex items-center gap-2 rounded-full bg-[#0b0c0a] px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-[#3346c1]'>Hablemos ↗</a>
          <a href={buildWhatsAppUrl()} target='_blank' rel='noopener noreferrer' className='inline-flex items-center rounded-full border border-[#0b0c0a]/30 px-7 py-4 text-xs font-bold uppercase tracking-[0.14em]'>WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

export function ServicesIndex() {
  usePageMeta(SERVICES_PATH);
  return (
    <main className='rd rd-page'>
      <section className='relative overflow-hidden pt-[var(--site-header-h)]'>
        <div className='rd-grid-bg pointer-events-none absolute inset-0' />
        <div className='relative mx-auto max-w-[1320px] px-5 pb-16 pt-20 md:px-8'>
          <p className='rd-eyebrow mb-6'>00 — Todos los servicios</p>
          <h1 className='rd-h1 max-w-[12ch]'>
            Todo lo digital, <span className='rd-mark'>en un sitio.</span>
          </h1>
        </div>
      </section>
      <section className='mx-auto max-w-[1320px] px-5 pb-24 md:px-8'>
        <ul className='divide-y divide-white/10 border-y border-white/10'>
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <a href={s.href} className='group grid items-center gap-4 py-8 md:grid-cols-[80px_1fr_1.2fr_40px]'>
                <span className='font-mono text-sm text-[#e1f56e]'>{s.num}</span>
                <span className='text-3xl font-black uppercase md:text-4xl'>{s.name}</span>
                <span className='text-white/55'>{s.short}</span>
                <span className='text-2xl text-white/30 group-hover:text-[#e1f56e]'>↗</span>
              </a>
            </li>
          ))}
        </ul>
        <p className='rd-eyebrow mb-4 mt-16'>Además</p>
        <ul className='grid gap-4 md:grid-cols-2'>
          {EXTRA_SERVICES.map((s) => (
            <li key={s.slug}>
              <a href={s.href} className='rd-card group flex h-full items-start justify-between gap-6 p-6'>
                <span>
                  <span className='block text-2xl font-black uppercase'>{s.name}</span>
                  <span className='mt-2 block text-sm text-white/55'>{s.short}</span>
                </span>
                <span className='text-xl text-white/30 group-hover:text-[#e1f56e]'>↗</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand text='¿No sabes cuál necesitas?' />
    </main>
  );
}

export default function ServicePageV2({ slug: slugProp }: { slug?: string }) {
  const params = useParams();
  const slug = slugProp ?? params.slug;
  const s = ALL_SERVICES.find((x) => x.slug === slug);
  usePageMeta(s && !s.href.startsWith(SERVICES_PATH) ? s.href : `${SERVICES_PATH}/${slug}`);
  if (!s || !s.page) return <Navigate to={SERVICES_PATH} replace />;
  if (!slugProp && !s.href.startsWith(SERVICES_PATH)) return <Navigate to={s.href} replace />;
  const p = s.page;
  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <main className='rd rd-page'>
      <section className='relative overflow-hidden pt-[var(--site-header-h)]'>
        <div className='rd-grid-bg pointer-events-none absolute inset-0' />
        <div className='relative mx-auto grid max-w-[1320px] gap-10 px-5 pb-20 pt-20 md:px-8 lg:grid-cols-[1.3fr_1fr] lg:items-end'>
          <div>
            <p className='rd-eyebrow mb-6'>
              {s.num} — {s.area} · {s.name}
            </p>
            <h1 className='rd-h1'>
              {p.title[0]}
              <br />
              <span className='rd-mark'>{p.title[1]}</span>
              <br />
              <span className='text-[#e1f56e]'>{p.title[2]}</span>
            </h1>
          </div>
          <div>
            <p className='text-lg leading-relaxed text-white/65'>{p.intro}</p>
            <div className='mt-8 flex flex-wrap gap-3'>
              <a href={CONTACT_PATH} className='rd-btn'>Pide una revisión gratis ↗</a>
              <a href='#incluye' className='rd-btn-ghost'>Qué incluye</a>
            </div>
          </div>
        </div>
      </section>

      {p.steps ? (
        <section className='mx-auto max-w-[1320px] px-5 pt-4 md:px-8'>
          <ol className='grid gap-px overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4'>
            {p.steps.map((st, i) => (
              <li key={st.t} className='bg-[#0b0c0a] p-6'>
                <span className='font-mono text-xs text-[#e1f56e]'>Paso {String(i + 1).padStart(2, '0')}</span>
                <h2 className='mt-4 text-lg font-extrabold uppercase'>{st.t}</h2>
                <p className='mt-2 text-sm text-white/55'>{st.d}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <section id='incluye' className='mx-auto max-w-[1320px] scroll-mt-28 px-5 py-20 md:px-8'>
        <p className='rd-eyebrow mb-5'>Qué incluye</p>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {p.includes.map((it, i) => (
            <div key={it.t} className='rd-card p-7'>
              <span className='font-mono text-xs text-[#e1f56e]'>{String(i + 1).padStart(2, '0')}</span>
              <h2 className='mt-6 text-xl font-extrabold uppercase'>{it.t}</h2>
              <p className='mt-3 text-sm leading-relaxed text-white/55'>{it.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='border-y border-white/10 bg-[#101110]'>
        <div className='mx-auto grid max-w-[1320px] gap-12 px-5 py-20 md:px-8 lg:grid-cols-2'>
          <div>
            <p className='rd-eyebrow mb-5'>Para quién es</p>
            <ul className='space-y-4'>
              {p.forWho.map((w) => (
                <li key={w} className='flex gap-4 text-lg font-semibold'>
                  <span className='text-[#e1f56e]'>→</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className='rd-eyebrow mb-5'>Preguntas frecuentes</p>
            <div className='divide-y divide-white/10 border-y border-white/10'>
              {p.faq.map((f) => (
                <details key={f.q} className='group py-5'>
                  <summary className='flex cursor-pointer list-none items-center justify-between gap-6 font-bold'>
                    {f.q}
                    <span className='text-[#e1f56e] transition-transform group-open:rotate-45'>+</span>
                  </summary>
                  <p className='mt-3 text-white/60'>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-[1320px] px-5 py-20 md:px-8'>
        <p className='rd-eyebrow mb-5'>Funciona mejor junto a</p>
        <div className='grid gap-4 md:grid-cols-3'>
          {others.map((o) => (
            <a key={o.slug} href={o.href} className='rd-card group p-6'>
              <span className='font-mono text-xs text-[#e1f56e]'>{o.num}</span>
              <h3 className='mt-5 text-xl font-extrabold uppercase'>{o.name}</h3>
              <p className='mt-2 text-sm text-white/55'>{o.short}</p>
            </a>
          ))}
        </div>
      </section>

      <CtaBand text={`¿Empezamos con ${s.name}?`} />
    </main>
  );
}
