import { useEffect, useRef, useState } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import {
  CONTACT_PATH,
  TRANQUILIDAD_DIGITAL_PATH,
  buildWhatsAppUrl,
} from '../config/contact';
import { SERVICES_PATH } from './services';
import { CASES_PATH } from './cases';
import { usePrefs } from './prefs';
import { useCases, useServices } from './i18n/content';
import { CaseCard } from './CasePages';
import GoogleBadge from './GoogleBadge';
import BgDigit from './BgDigit';

const STEPS = [
  {
    n: '01',
    t: 'Escuchamos',
    d: 'Una llamada de 30 minutos para entender tu negocio, tus clientes y qué necesitas de verdad.',
  },
  {
    n: '02',
    t: 'Auditamos',
    d: 'Revisamos tu web, tu Google y tus redes. Te enseñamos qué falla y qué es prioritario.',
  },
  {
    n: '03',
    t: 'Construimos',
    d: 'Diseñamos, desarrollamos y lanzamos. Tú apruebas cada paso; nosotros nos ocupamos del resto.',
  },
  {
    n: '04',
    t: 'Medimos y mejoramos',
    d: 'Llamadas, mensajes y ventas en un informe claro. Lo que no funciona, se cambia.',
  },
];

const PRINCIPLES = [
  {
    t: 'Hablas con quien lo hace',
    d: 'Sin cadenas de comerciales ni tickets. Un interlocutor que conoce tu proyecto.',
  },
  {
    t: 'Todo es tuyo',
    d: 'Dominio, web, cuentas de Google y redes, siempre a tu nombre.',
  },
  {
    t: 'Lenguaje claro',
    d: 'Te explicamos qué hacemos y por qué, sin tecnicismos.',
  },
  {
    t: 'Pensado para vender',
    d: 'Cada decisión de diseño se mide en llamadas, mensajes y ventas.',
  },
];

const FAQS = [
  {
    q: '¿Tengo que contratar todos los servicios?',
    a: 'No. Empezamos por lo que más impacto tenga en tu negocio y sumamos el resto solo si tiene sentido.',
  },
  {
    q: '¿Trabajáis solo en Madrid?',
    a: 'Trabajamos en remoto con negocios de toda España. Si estás cerca de Madrid, Galicia o Valencia, también podemos vernos.',
  },
  {
    q: '¿Cuánto se tarda en tener la web?',
    a: 'Una web de servicios suele estar lista en dos o tres semanas desde que tenemos los contenidos.',
  },
  {
    q: '¿Qué es Tranquilidad digital?',
    a: 'Un servicio en el que actuamos de tu lado frente a proveedores, programadores y plataformas: revisamos, negociamos y nos aseguramos de que todo funcione.',
  },
  {
    q: '¿Cómo empezamos?',
    a: 'Escríbenos o reserva una llamada. Revisamos tu situación gratis y te decimos qué haríamos nosotros.',
  },
];

const STEPS_EN = [
  {
    n: '01',
    t: 'We listen',
    d: 'A 30-minute call to understand your business, your customers and what you really need.',
  },
  {
    n: '02',
    t: 'We audit',
    d: 'We review your website, your Google presence and your social media, and show you what’s failing and what matters most.',
  },
  {
    n: '03',
    t: 'We build',
    d: 'We design, develop and launch. You approve every step; we take care of the rest.',
  },
  {
    n: '04',
    t: 'We measure and improve',
    d: 'Calls, messages and sales in a clear report. Whatever doesn’t work gets changed.',
  },
];

const PRINCIPLES_EN = [
  {
    t: 'You talk to the people doing the work',
    d: 'No chains of sales reps or support tickets. One point of contact who knows your project.',
  },
  {
    t: 'Everything is yours',
    d: 'Domain, website, Google accounts and social profiles, always in your name.',
  },
  { t: 'Plain language', d: 'We explain what we do and why, without jargon.' },
  {
    t: 'Built to sell',
    d: 'Every design decision is measured in calls, messages and sales.',
  },
];

const FAQS_EN = [
  {
    q: 'Do I have to hire every service?',
    a: 'No. We start with whatever has the biggest impact on your business and add the rest only if it makes sense.',
  },
  {
    q: 'Do you only work in Madrid?',
    a: 'We work remotely with businesses all over Spain. If you’re near Madrid, Galicia or Valencia, we can also meet in person.',
  },
  {
    q: 'How long does a website take?',
    a: 'A service website is usually ready two or three weeks after we have the content.',
  },
  {
    q: 'What is Digital peace of mind?',
    a: 'A service where we act on your side with suppliers, developers and platforms: we review, negotiate and make sure everything works.',
  },
  {
    q: 'How do we get started?',
    a: 'Write to us or book a call. We review your situation for free and tell you what we would do.',
  },
];

const PEACE_EN: [string, string][] = [
  ['One point of contact', 'We deal with suppliers and platforms for you.'],
  [
    'We review before you pay',
    'Quotes and invoices checked with technical judgement.',
  ],
  ['Backups and security', 'Your website monitored, updated and backed up.'],
  ['You decide', 'We explain it clearly and you give the go-ahead.'],
];

function HeroVisual() {
  const { t } = usePrefs();
  return (
    <div
      className='relative mx-auto aspect-square w-full max-w-[460px]'
      aria-hidden='true'
    >
      <div className='absolute inset-[8%] rounded-full border border-dashed border-white/10' />
      <div className='absolute inset-[22%] rounded-full border border-white/10' />
      <div className='absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(51,70,193,0.35),transparent_60%)]' />

      <div className='rd-float absolute left-[4%] top-[10%] w-[64%] overflow-hidden rounded-xl border border-white/10 bg-[#141513] shadow-2xl'>
        <div className='flex items-center gap-1.5 border-b border-white/10 px-3 py-2'>
          <span className='h-2 w-2 rounded-full bg-white/20' />
          <span className='h-2 w-2 rounded-full bg-white/20' />
          <span className='h-2 w-2 rounded-full bg-[#e1f56e]' />
          <span className='ml-2 truncate font-mono text-[10px] text-white/40'>
            {t('tunegocio.es', 'yourbusiness.com')}
          </span>
        </div>
        <div className='space-y-2 p-4 font-mono text-[11px] leading-relaxed'>
          <p className='text-[#e1f56e]'>
            {t('// a construir', "// let's build")}
          </p>
          <p className='text-white/70'>
            web<span className='text-white/30'>.</span>
            {t('publicar', 'publish')}
            <span className='text-white/30'>()</span>
          </p>
          <p className='text-white/70'>
            seo<span className='text-white/30'>.</span>
            {t('posicionar', 'rank')}
            <span className='text-white/30'>(&apos;local&apos;)</span>
          </p>
          <p className='text-white/70'>
            ads<span className='text-white/30'>.</span>
            {t('lanzar', 'launch')}
            <span className='text-white/30'>()</span>
            <span className='rd-caret ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-[#e1f56e]' />
          </p>
          <div className='mt-3 h-1.5 overflow-hidden rounded-full bg-white/10'>
            <div className='rd-bar h-full w-[82%] rounded-full bg-[#e1f56e]' />
          </div>
        </div>
      </div>

      <div className='rd-float-2 absolute bottom-[16%] right-[2%] w-[60%] rounded-xl border border-white/10 bg-white p-4 text-[#141414] shadow-2xl'>
        <p className='text-[10px] text-[#4d4d4c]'>
          {t('Google · cerca de ti', 'Google · near you')}
        </p>
        <p className='mt-1 text-sm font-bold text-[#3346c1]'>
          {t('Tu negocio · Web oficial', 'Your business · Official site')}
        </p>
        <p className='mt-1 text-[11px] text-[#e3a008]'>
          ★★★★★{' '}
          <span className='text-[#4d4d4c]'>
            {t('· Abierto ahora', '· Open now')}
          </span>
        </p>
        <div className='mt-3 flex gap-2'>
          <span className='rounded-full bg-[#141414] px-2.5 py-1 text-[10px] font-semibold text-white'>
            {t('Llamar', 'Call')}
          </span>
          <span className='rounded-full border border-[#cbccc7] px-2.5 py-1 text-[10px] font-semibold'>
            {t('Cómo llegar', 'Directions')}
          </span>
        </div>
      </div>

      <div className='rd-float-3 absolute bottom-[4%] left-[8%] flex items-center gap-3 rounded-full border border-white/10 bg-[#141513] py-2 pl-2 pr-4 shadow-2xl'>
        <span className='flex h-8 w-8 items-center justify-center rounded-full bg-[#e1f56e] text-sm font-black text-[#0b0c0a]'>
          +1
        </span>
        <span className='text-[11px] text-white/80'>
          {t(
            '«Hola, ¿tenéis hueco el jueves?»',
            '“Hi, any slots on Thursday?”',
          )}
        </span>
      </div>
    </div>
  );
}

// Anillo animado de retención: se dibuja y cuenta hasta 90 al entrar en pantalla.
function RetentionRing({ value = 90 }: { value?: number }) {
  const { t } = usePrefs();
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduce || !('IntersectionObserver' in window)) {
      setOn(true);
      setN(value);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setOn(true);
        const t0 = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / 1600);
          setN(Math.round(value * (1 - Math.pow(1 - k, 3))));
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  const R = 88;
  const C = 2 * Math.PI * R;
  const ticks = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div
      ref={ref}
      className='relative mx-auto aspect-square w-full max-w-[340px]'
    >
      <svg
        viewBox='0 0 220 220'
        className='h-full w-full -rotate-90'
        aria-hidden='true'
      >
        <circle
          cx='110'
          cy='110'
          r={R}
          fill='none'
          stroke='rgba(255,255,255,0.08)'
          strokeWidth='18'
        />
        <circle
          cx='110'
          cy='110'
          r={R}
          fill='none'
          stroke='#e1f56e'
          strokeWidth='18'
          strokeLinecap='round'
          strokeDasharray={C}
          strokeDashoffset={on ? C * (1 - value / 100) : C}
          style={{
            transition: 'stroke-dashoffset 1.6s cubic-bezier(.2,.8,.2,1)',
          }}
        />
        {ticks.map((i) => {
          const a = (i / 10) * 2 * Math.PI;
          return (
            <line
              key={i}
              x1={110 + Math.cos(a) * 104}
              y1={110 + Math.sin(a) * 104}
              x2={110 + Math.cos(a) * 109}
              y2={110 + Math.sin(a) * 109}
              stroke='rgba(255,255,255,0.35)'
              strokeWidth='2'
            />
          );
        })}
      </svg>
      <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
        <span className='text-[clamp(3.5rem,8vw,5.5rem)] font-black leading-none tracking-tighter'>
          {n}
          <span className='text-brand-light'>%</span>
        </span>
        <span className='mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#ffffff]/60'>
          {t('se quedan', 'stay')}
        </span>
      </div>
    </div>
  );
}

export default function HomeV2() {
  usePageMeta('/');
  const { t, lang } = usePrefs();
  const { services: SERVICES } = useServices();
  const CASES = useCases();
  const en = lang === 'en';
  const STEPS_L = en ? STEPS_EN : STEPS;
  const PRINCIPLES_L = en ? PRINCIPLES_EN : PRINCIPLES;
  const FAQS_L = en ? FAQS_EN : FAQS;

  return (
    <main className='rd rd-page'>
      {/* HERO */}
      <section className='relative overflow-hidden pt-[var(--site-header-h)]'>
        <div className='rd-grid-bg pointer-events-none absolute inset-0' />
        <div className='relative mx-auto grid min-h-[calc(100svh-var(--site-header-h))] max-w-[1320px] items-center gap-12 px-5 pb-20 pt-14 md:pb-28 md:px-8 lg:grid-cols-[1.15fr_1fr_0.75fr]'>
          <div>
            <p className='rd-eyebrow mb-6'>
              {t(
                'Web · eCommerce · SEO · SEM · GEO · Redes',
                'Web · eCommerce · SEO · SEM · GEO · Social',
              )}
            </p>
            <h1 className='rd-h1'>
              {t('Tu negocio,', 'Your business,')}
              <br />
              <span className='rd-mark'>{t('visible', 'visible')}</span>
              <br />
              <span className='text-[#e1f56e]'>
                {t('y sin líos.', 'hassle-free.')}
              </span>
            </h1>
            <p className='mt-7 max-w-md text-base leading-relaxed text-white/65 md:text-lg'>
              {t(
                'Hacemos tu web, te ponemos en Google y en la IA, y llevamos tus redes. Un solo equipo para que tus clientes te encuentren y te escriban.',
                'We build your website, put you on Google and in AI answers, and run your social media. One team so your customers find you and get in touch.',
              )}
            </p>
            <div className='mt-9 flex flex-wrap gap-3'>
              <a href={CONTACT_PATH} className='rd-btn'>
                {t('Pide una revisión gratis', 'Get a free review')} ↗
              </a>
              <a href={CASES_PATH} className='rd-btn-ghost'>
                {t('Ver resultados', 'See results')}
              </a>
            </div>
            <GoogleBadge className='mt-8' />
          </div>

          <HeroVisual />

          <aside className='hidden lg:block'>
            <p className='rd-eyebrow mb-4 text-white/50'>
              {t('Nuestros servicios', 'Our services')}
            </p>
            <ul className='divide-y divide-white/10 border-y border-white/10'>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <a
                    href={s.href}
                    className='group flex items-center gap-3 py-3.5'
                  >
                    <span className='rd-dot' aria-hidden='true' />
                    <span className='text-sm font-semibold uppercase tracking-wide text-white/85 group-hover:text-white'>
                      {s.name}
                    </span>
                    <span className='ml-auto text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-[#e1f56e]'>
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Divisor en ola hacia la sección clara */}
        <svg
          className='pointer-events-none absolute inset-x-0 -bottom-px h-14 w-full md:h-24'
          viewBox='0 0 1440 120'
          preserveAspectRatio='none'
          aria-hidden='true'
        >
          <path
            className='rd-wave-fill'
            opacity='0.06'
            d='M0,58 C220,104 470,10 735,44 C985,76 1190,118 1440,50 L1440,120 L0,120 Z'
          />
          <path
            className='rd-wave-line rd-wave-line--soft'
            d='M0,58 C220,104 470,10 735,44 C985,76 1190,118 1440,50'
            fill='none'
            vectorEffect='non-scaling-stroke'
          />
          <path
            className='rd-wave-fill'
            d='M0,96 C300,38 575,122 870,84 C1105,54 1265,70 1440,98 L1440,120 L0,120 Z'
          />
          <path
            className='rd-wave-line'
            d='M0,96 C300,38 575,122 870,84 C1105,54 1265,70 1440,98'
            fill='none'
            vectorEffect='non-scaling-stroke'
          />
        </svg>
      </section>

      {/* SISTEMA */}
      <div className='rd-light relative isolate overflow-hidden'>
        <BgDigit d='3' side='right' />
        <section
          id='servicios'
          className='mx-auto max-w-[1320px] px-5 py-24 md:px-8 md:py-32'
        >
          <div className='mb-14 grid gap-8 lg:grid-cols-2 lg:items-end'>
            <div>
              <p className='rd-eyebrow mb-5'>
                {t('Todo en un equipo', 'All in one team')}
              </p>
              <h2 className='rd-h2'>
                {t('Un solo equipo,', 'One team,')}
                <br />
                <span className='rd-mark'>{t('todos', 'all')}</span>{' '}
                <span className='text-[#e1f56e]'>
                  {t('tus canales.', 'your channels.')}
                </span>
              </h2>
            </div>
            <p className='max-w-lg text-white/60 lg:justify-self-end'>
              {t(
                'La web, Google, la IA y las redes funcionan mejor cuando las lleva el mismo equipo. Elegimos lo que tu negocio necesita y lo hacemos trabajar junto, con un objetivo: que te contacten más.',
                'Your website, Google, AI and social media work better when one team runs them. We pick what your business needs and make it work together, with one goal: more people getting in touch.',
              )}
            </p>
          </div>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {SERVICES.map((s) => (
              <a
                key={s.slug}
                href={s.href}
                className='rd-card group flex min-h-[250px] flex-col p-6'
              >
                <div className='flex items-center justify-between'>
                  <span className='rd-dot' aria-hidden='true' />
                  <span className='rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/50'>
                    {s.area}
                  </span>
                </div>
                <h3 className='mt-8 text-2xl font-extrabold uppercase leading-tight'>
                  {s.name}
                </h3>
                <p className='mt-3 text-sm leading-relaxed text-white/55'>
                  {s.short}
                </p>
                <span className='mt-auto pt-6 text-xs font-bold uppercase tracking-[0.16em] text-white/60 group-hover:text-[#e1f56e]'>
                  {t('Ver servicio', 'View service')} →
                </span>
              </a>
            ))}
            <a
              href={SERVICES_PATH}
              className='group flex min-h-[250px] flex-col justify-between rounded-[1.25rem] bg-[#e1f56e] p-6 text-[#0b0c0a] transition-transform hover:-translate-y-1'
            >
              <span className='font-mono text-xs'>+</span>
              <span className='text-2xl font-black uppercase leading-tight'>
                {t('¿No sabes por dónde empezar?', 'Not sure where to start?')}
              </span>
              <span className='text-xs font-bold uppercase tracking-[0.16em]'>
                {t('Te lo decimos gratis', 'We’ll tell you for free')} ↗
              </span>
            </a>
          </div>
        </section>
      </div>

      {/* TRANQUILIDAD DIGITAL */}
      <section className='bg-[#101110]'>
        <div className='mx-auto grid max-w-[1320px] gap-14 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-2'>
          <div>
            <p className='rd-eyebrow mb-5'>
              {t('Tranquilidad digital', 'Digital peace of mind')}
            </p>
            <h2 className='rd-h2'>
              {t('Tú a lo tuyo.', 'You run your business.')}
              <br />
              <span className='rd-mark'>{t('Nosotros,', 'We handle')}</span>
              <br />
              <span className='text-[#e1f56e]'>
                {t('a lo digital.', 'digital.')}
              </span>
            </h2>
            <p className='mt-7 max-w-md text-white/60'>
              {t(
                'Cuando hay hosting, dominios, programadores, plataformas y facturas de por medio, alguien tiene que estar de tu lado. Ese somos nosotros.',
                'When hosting, domains, developers, platforms and invoices are involved, someone needs to be on your side. That’s us.',
              )}
            </p>
            <a href={TRANQUILIDAD_DIGITAL_PATH} className='rd-btn mt-9'>
              {t('Cómo funciona', 'How it works')} ↗
            </a>
          </div>
          <ul className='grid gap-4 sm:grid-cols-2'>
            {(en
              ? PEACE_EN
              : ([
                  [
                    'Un solo interlocutor',
                    'Hablamos nosotros con proveedores y plataformas.',
                  ],
                  [
                    'Revisamos antes de pagar',
                    'Presupuestos y facturas con criterio técnico.',
                  ],
                  [
                    'Copias y seguridad',
                    'Tu web vigilada, actualizada y con copias al día.',
                  ],
                  [
                    'Decides tú',
                    'Te lo explicamos claro y tú das el visto bueno.',
                  ],
                ] as [string, string][])
            ).map(([tt, d]) => (
              <li key={tt} className='rd-card p-6'>
                <span className='rd-dot' aria-hidden='true' />
                <h3 className='mt-6 text-lg font-extrabold uppercase'>{tt}</h3>
                <p className='mt-2 text-sm text-white/55'>{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MÉTODO */}
      <div className='rd-light rd-stone'>
        <section className='mx-auto max-w-[1320px] px-5 py-24 md:px-8 md:py-32'>
          <p className='rd-eyebrow mb-5'>{t('Método', 'Method')}</p>
          <h2 className='rd-h2 max-w-[16ch]'>
            {t('Primero', 'First,')}{' '}
            <span className='rd-mark'>{t('entender.', 'understand.')}</span>{' '}
            <span className='text-[#e1f56e]'>
              {t('Después construir.', 'Then build.')}
            </span>
          </h2>
          <ol className='mt-14 grid gap-px overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4'>
            {STEPS_L.map((s) => (
              <li key={s.n} className='bg-[#0b0c0a] p-7'>
                <span className='text-5xl font-black text-white/10'>{s.n}</span>
                <h3 className='mt-6 text-xl font-extrabold uppercase'>{s.t}</h3>
                <p className='mt-3 text-sm leading-relaxed text-white/55'>
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* CASOS DE ÉXITO */}
      {CASES.length > 0 ? (
        <section id='casos' className='border-t border-white/10'>
          <div className='mx-auto max-w-[1320px] px-5 py-24 md:px-8 md:py-32'>
            <div className='mb-12 flex flex-wrap items-end justify-between gap-6'>
              <div>
                <p className='rd-eyebrow mb-5'>
                  {t('Casos de éxito', 'Case studies')}
                </p>
                <h2 className='rd-h2'>
                  {t('Resultados', 'Real')}{' '}
                  <span className='rd-mark'>{t('reales.', 'results.')}</span>
                </h2>
              </div>
              <a href={CASES_PATH} className='rd-btn-ghost'>
                {t('Ver todos', 'See all')} ↗
              </a>
            </div>
            <div className='grid gap-4 md:grid-cols-3'>
              {CASES.slice(0, 3).map((c) => (
                <CaseCard key={c.slug} c={c} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CONTINUIDAD */}
      <section className='rd-light bg-white'>
        <div className='mx-auto grid max-w-[1320px] items-center gap-14 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[1.1fr_0.9fr]'>
          <div>
            <p className='rd-eyebrow mb-5'>{t('Continuidad', 'Retention')}</p>
            <h2 className='rd-h2'>
              {t('Clientes que', 'Clients who')}
              <br />
              <span className='rd-mark'>{t('se quedan.', 'stay.')}</span>
            </h2>
            <p className='mt-7 max-w-md text-white/60'>
              {t(
                'Se quedan porque su web les trae clientes y porque, cuando algo pasa, siempre hay alguien al otro lado que conoce su negocio.',
                'They stay because their website brings them customers and because, when something comes up, there’s always someone on the other end who knows their business.',
              )}
            </p>
            <dl className='mt-10 flex flex-wrap gap-x-12 gap-y-6'>
              <div>
                <dt className='font-mono text-[11px] uppercase tracking-[0.2em] text-white/50'>
                  {t('Clientes desde que abrimos', 'Clients since we opened')}
                </dt>
                <dd className='mt-1 text-3xl font-black'>+23</dd>
              </div>
              <div>
                <dt className='font-mono text-[11px] uppercase tracking-[0.2em] text-white/50'>
                  {t('Siguen con nosotros', 'Still with us')}
                </dt>
                <dd className='mt-1 text-3xl font-black'>
                  {t('9 de 10', '9 in 10')}
                </dd>
              </div>
            </dl>
          </div>
          <div className='rounded-[1.75rem] bg-[#0e0e0c] p-8 text-[#ffffff] md:p-12'>
            <p className='font-mono text-[11px] uppercase tracking-[0.2em] text-brand-light'>
              {t('// retención de clientes', '// client retention')}
            </p>
            <div className='mt-6'>
              <RetentionRing value={90} />
            </div>
            <p className='mt-6 text-center text-lg font-semibold'>
              {t(
                '9 de cada 10 clientes siguen con nosotros.',
                '9 out of 10 clients stay with us.',
              )}
            </p>
          </div>
        </div>
      </section>

      {/* PRINCIPIOS */}
      <div className='relative isolate overflow-hidden'>
        <BgDigit d='6' side='left' />
        <section className='mx-auto max-w-[1320px] px-5 py-24 md:px-8 md:py-32'>
          <div className='grid gap-12 lg:grid-cols-[0.9fr_1.1fr]'>
            <div>
              <p className='rd-eyebrow mb-5'>
                {t('Por qué 36web', 'Why 36web')}
              </p>
              <h2 className='rd-h2'>
                {t('La confianza', 'Trust is')}{' '}
                <span className='rd-mark'>{t('se gana', 'earned')}</span>{' '}
                <span className='text-[#e1f56e]'>
                  {t('trabajando.', 'by working.')}
                </span>
              </h2>
            </div>
            <dl className='grid gap-x-10 gap-y-10 sm:grid-cols-2'>
              {PRINCIPLES_L.map((p) => (
                <div key={p.t} className='border-t border-white/15 pt-5'>
                  <dt className='text-lg font-extrabold uppercase'>{p.t}</dt>
                  <dd className='mt-2 text-sm text-white/55'>{p.d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>

      {/* FAQ */}
      <section className='rd-light'>
        <div className='mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[0.8fr_1.2fr]'>
          <div>
            <p className='rd-eyebrow mb-5'>
              {t('Preguntas frecuentes', 'FAQ')}
            </p>
            <h2 className='rd-h2'>
              {t('Hablemos', 'Straight')}{' '}
              <span className='rd-mark'>{t('claro.', 'talk.')}</span>
            </h2>
          </div>
          <div className='divide-y divide-white/10 border-y border-white/10'>
            {FAQS_L.map((f) => (
              <details key={f.q} className='group py-6'>
                <summary className='flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-bold'>
                  {f.q}
                  <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-[#e1f56e] transition-transform group-open:rotate-45'>
                    +
                  </span>
                </summary>
                <p className='mt-4 max-w-2xl text-white/60'>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className='px-5 py-24 md:px-8'>
        <div className='relative mx-auto max-w-[1320px] overflow-hidden rounded-[1.75rem] bg-[#e1f56e] px-7 py-16 text-[#0b0c0a] md:px-14 md:py-20'>
          <div
            className='absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#b1d004]/50 blur-3xl'
            aria-hidden='true'
          />
          <p className='font-mono text-xs uppercase tracking-[0.2em]'>
            // let&apos;s build
          </p>
          <h2 className='rd-h2 relative mt-5 max-w-[15ch]'>
            {t(
              '¿Revisamos tu web gratis?',
              'Shall we review your website for free?',
            )}
          </h2>
          <p className='relative mt-5 max-w-lg text-[#0b0c0a]/75'>
            {t(
              'Te decimos qué está frenando a tus clientes y cómo lo arreglaríamos. Sin compromiso.',
              'We’ll tell you what’s holding your customers back and how we’d fix it. No strings attached.',
            )}
          </p>
          <div className='relative mt-9 flex flex-wrap gap-3'>
            <a
              href={CONTACT_PATH}
              className='inline-flex items-center gap-2 rounded-full bg-[#0b0c0a] px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-[#3346c1]'
            >
              {t('Quiero mi revisión', 'I want my review')} ↗
            </a>
            <a
              href={buildWhatsAppUrl('Hola, quiero que reviséis mi web.')}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 rounded-full border border-[#0b0c0a]/30 px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] hover:border-[#0b0c0a]'
            >
              {t('Escríbenos por WhatsApp', 'Message us on WhatsApp')}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
