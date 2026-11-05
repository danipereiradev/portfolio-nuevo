import { Navigate, useParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { CONTACT_PATH, buildWhatsAppUrl } from '../config/contact';
import GoogleBadge from './GoogleBadge';
import { SERVICES_PATH } from './services';
import { usePrefs } from './prefs';
import { useServices } from './i18n/content';
import BgDigit from './BgDigit';
import { LOCAL_WEB_LISTED_CITIES } from '../data/localWebCities';
import { localWebCityHref } from '../config/contact';

function CtaBand({ text }: { text: string }) {
  const { t } = usePrefs();
  return (
    <section className='px-5 pb-24 md:px-8'>
      <div className='mx-auto flex max-w-[1320px] flex-col gap-8 rounded-[1.75rem] bg-[#e1f56e] px-7 py-14 text-[#0b0c0a] md:flex-row md:items-center md:justify-between md:px-14'>
        <h2 className='rd-h2 max-w-[16ch] !text-[clamp(1.9rem,4vw,3.4rem)]'>{text}</h2>
        <div className='flex flex-wrap gap-3'>
          <a href={CONTACT_PATH} className='inline-flex items-center gap-2 rounded-full bg-[#0b0c0a] px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-[#3346c1]'>{t('Cuéntanos', 'Tell us')} ↗</a>
          <a href={buildWhatsAppUrl()} target='_blank' rel='noopener noreferrer' className='inline-flex items-center rounded-full border border-[#0b0c0a]/30 px-7 py-4 text-xs font-bold uppercase tracking-[0.14em]'>WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

export function ServicesIndex() {
  usePageMeta(SERVICES_PATH);
  const { t } = usePrefs();
  const { services: SERVICES, extra: EXTRA_SERVICES } = useServices();
  return (
    <main className='rd rd-page'>
      <section className='relative overflow-hidden pt-[var(--site-header-h)] isolate'>
        <BgDigit d='3' side='right' />
        <div className='rd-grid-bg pointer-events-none absolute inset-0' />
        <div className='relative mx-auto max-w-[1320px] px-5 pb-16 pt-20 md:px-8'>
          <p className='rd-eyebrow mb-6'>{t('Todos los servicios', 'All services')}</p>
          <h1 className='rd-h1 max-w-[12ch]'>
            {t('Todo lo digital,', 'All things digital,')} <span className='rd-mark'>{t('en un sitio.', 'in one place.')}</span>
          </h1>
        </div>
      </section>
      <section className='mx-auto max-w-[1320px] px-5 pb-24 md:px-8'>
        <ul className='divide-y divide-white/10 border-y border-white/10'>
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <a href={s.href} className='group grid items-center gap-4 py-8 md:grid-cols-[80px_1fr_1.2fr_40px]'>
                <span className='rd-dot' aria-hidden='true' />
                <span className='text-3xl font-black uppercase md:text-4xl'>{s.name}</span>
                <span className='text-white/55'>{s.short}</span>
                <span className='text-2xl text-white/30 group-hover:text-[#e1f56e]'>↗</span>
              </a>
            </li>
          ))}
        </ul>
        <p className='rd-eyebrow mb-4 mt-16'>{t('Además', 'Also')}</p>
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
      <CtaBand text={t('¿No sabes cuál necesitas?', 'Not sure which one you need?')} />
    </main>
  );
}

export default function ServicePageV2({ slug: slugProp }: { slug?: string }) {
  const params = useParams();
  const slug = slugProp ?? params.slug;
  const { t } = usePrefs();
  const { services: SERVICES, all: ALL_SERVICES } = useServices();
  const s = ALL_SERVICES.find((x) => x.slug === slug);
  usePageMeta(s && !s.href.startsWith(SERVICES_PATH) ? s.href : `${SERVICES_PATH}/${slug}`);
  if (!s || !s.page) return <Navigate to={SERVICES_PATH} replace />;
  if (!slugProp && !s.href.startsWith(SERVICES_PATH)) return <Navigate to={s.href} replace />;
  const p = s.page;
  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <main className='rd rd-page'>
      <section className='relative overflow-hidden pt-[var(--site-header-h)] isolate'>
        <BgDigit d='3' side='right' />
        <div className='rd-grid-bg pointer-events-none absolute inset-0' />
        <div className='relative mx-auto grid max-w-[1320px] gap-10 px-5 pb-20 pt-20 md:px-8 lg:grid-cols-[1.3fr_1fr] lg:items-end'>
          <div>
            <p className='rd-eyebrow mb-6'>
              {s.area} · {s.name}
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
              <a href={CONTACT_PATH} className='rd-btn'>{t('Pide una revisión gratis', 'Get a free review')} ↗</a>
              <a href='#incluye' className='rd-btn-ghost'>{t('Qué incluye', 'What’s included')}</a>
            </div>
            <GoogleBadge className='mt-8' />
          </div>
        </div>
      </section>

      {p.steps ? (
        <section className='mx-auto max-w-[1320px] px-5 pt-4 md:px-8'>
          <ol className='grid gap-px overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4'>
            {p.steps.map((st, i) => (
              <li key={st.t} className='bg-[#0b0c0a] p-6'>
                <span className='font-mono text-xs text-[#e1f56e]'>{t('Paso', 'Step')} {String(i + 1).padStart(2, '0')}</span>
                <h2 className='mt-4 text-lg font-extrabold uppercase'>{st.t}</h2>
                <p className='mt-2 text-sm text-white/55'>{st.d}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <div className='rd-light relative isolate overflow-hidden'>
        <BgDigit d='6' side='left' />
      <section id='incluye' className='mx-auto max-w-[1320px] scroll-mt-28 px-5 py-20 md:px-8'>
        <p className='rd-eyebrow mb-5'>{t('Qué incluye', 'What’s included')}</p>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {p.includes.map((it) => (
            <div key={it.t} className='rd-card p-7'>
              <span className='rd-dot' aria-hidden='true' />
              <h2 className='mt-6 text-xl font-extrabold uppercase'>{it.t}</h2>
              <p className='mt-3 text-sm leading-relaxed text-white/55'>{it.d}</p>
            </div>
          ))}
        </div>
      </section>

      {s.slug === 'diseno-web' ? (
        <section className='mx-auto max-w-[1320px] px-5 pb-20 md:px-8'>
          <p className='rd-eyebrow mb-5'>{t('Diseño web por zonas', 'Web design by area')}</p>
          <ul className='flex flex-wrap gap-2'>
            {LOCAL_WEB_LISTED_CITIES.map((c) => (
              <li key={c.slug}>
                <a href={localWebCityHref(c.slug)} className='inline-block rounded-full border border-white/15 px-4 py-2 text-sm font-semibold hover:border-[#141414]'>
                  {t(`Diseño web en ${c.ciudad}`, `Web design in ${c.ciudad}`)}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      </div>

      <section className='bg-[#101110]'>
        <div className='mx-auto grid max-w-[1320px] gap-12 px-5 py-20 md:px-8 lg:grid-cols-2'>
          <div>
            <p className='rd-eyebrow mb-5'>{t('Para quién es', 'Who it’s for')}</p>
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
            <p className='rd-eyebrow mb-5'>{t('Preguntas frecuentes', 'FAQ')}</p>
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

      <div className='rd-light mb-0'>
      <section className='mx-auto max-w-[1320px] px-5 py-20 md:px-8'>
        <p className='rd-eyebrow mb-5'>{t('Funciona mejor junto a', 'Works best with')}</p>
        <div className='grid gap-4 md:grid-cols-3'>
          {others.map((o) => (
            <a key={o.slug} href={o.href} className='rd-card group p-6'>
              <span className='rd-dot' aria-hidden='true' />
              <h3 className='mt-5 text-xl font-extrabold uppercase'>{o.name}</h3>
              <p className='mt-2 text-sm text-white/55'>{o.short}</p>
            </a>
          ))}
        </div>
      </section>
      </div>

      <div className='pt-24'>
        <CtaBand text={t(`¿Empezamos con ${s.name}?`, `Shall we start with ${s.name}?`)} />
      </div>
    </main>
  );
}
