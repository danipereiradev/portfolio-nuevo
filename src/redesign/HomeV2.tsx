import { usePageMeta } from '../hooks/usePageMeta';
import { CONTACT_PATH, PORTFOLIO_PATH, TRANQUILIDAD_DIGITAL_PATH, buildWhatsAppUrl } from '../config/contact';
import { SERVICES, SERVICES_PATH } from './services';
import { CaseItem, CASES } from './cases';
import { PORTFOLIO_PAGE_PROJECTS } from '../data/portfolioPage';

// Prueba social: clientes reales del portfolio (src/data/portfolioPage.ts).
const PROOF = [
  'Confían en nosotros',
  '★★★★★ Clientes de 5 estrellas',
  ...PORTFOLIO_PAGE_PROJECTS.map((p) => p.name),
];

const STEPS = [
  { n: '01', t: 'Escuchamos', d: 'Una llamada de 30 minutos para entender tu negocio, tus clientes y qué necesitas de verdad.' },
  { n: '02', t: 'Auditamos', d: 'Revisamos tu web, tu Google y tus redes. Te enseñamos qué falla y qué es prioritario.' },
  { n: '03', t: 'Construimos', d: 'Diseñamos, desarrollamos y lanzamos. Tú apruebas cada paso; nosotros nos ocupamos del resto.' },
  { n: '04', t: 'Medimos y mejoramos', d: 'Llamadas, mensajes y ventas en un informe claro. Lo que no funciona, se cambia.' },
];

const PRINCIPLES = [
  { t: 'Hablas con quien lo hace', d: 'Sin cadenas de comerciales ni tickets. Un interlocutor que conoce tu proyecto.' },
  { t: 'Todo es tuyo', d: 'Dominio, web, cuentas de Google y redes, siempre a tu nombre.' },
  { t: 'Lenguaje claro', d: 'Te explicamos qué hacemos y por qué, sin tecnicismos.' },
  { t: 'Pensado para vender', d: 'Cada decisión de diseño se mide en llamadas, mensajes y ventas.' },
];

const FAQS = [
  { q: '¿Tengo que contratar todos los servicios?', a: 'No. Empezamos por lo que más impacto tenga en tu negocio y sumamos el resto solo si tiene sentido.' },
  { q: '¿Trabajáis solo en Madrid?', a: 'Trabajamos en remoto con negocios de toda España. Si estás cerca de Madrid, Galicia o Valencia, también podemos vernos.' },
  { q: '¿Cuánto se tarda en tener la web?', a: 'Una web de servicios suele estar lista en dos o tres semanas desde que tenemos los contenidos.' },
  { q: '¿Qué es Tranquilidad digital?', a: 'Un servicio en el que actuamos de tu lado frente a proveedores, programadores y plataformas: revisamos, negociamos y nos aseguramos de que todo funcione.' },
  { q: '¿Cómo empezamos?', a: 'Escríbenos o reserva una llamada. Revisamos tu situación gratis y te decimos qué haríamos nosotros.' },
];

function HeroVisual() {
  return (
    <div className='relative mx-auto aspect-square w-full max-w-[460px]' aria-hidden='true'>
      <div className='absolute inset-[8%] rounded-full border border-dashed border-white/10' />
      <div className='absolute inset-[22%] rounded-full border border-white/10' />
      <div className='absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(51,70,193,0.35),transparent_60%)]' />

      <div className='rd-float absolute left-[4%] top-[10%] w-[64%] overflow-hidden rounded-xl border border-white/10 bg-[#141513] shadow-2xl'>
        <div className='flex items-center gap-1.5 border-b border-white/10 px-3 py-2'>
          <span className='h-2 w-2 rounded-full bg-white/20' />
          <span className='h-2 w-2 rounded-full bg-white/20' />
          <span className='h-2 w-2 rounded-full bg-[#e1f56e]' />
          <span className='ml-2 truncate font-mono text-[10px] text-white/40'>tunegocio.es</span>
        </div>
        <div className='space-y-2 p-4 font-mono text-[11px] leading-relaxed'>
          <p className='text-[#e1f56e]'>// let&apos;s build</p>
          <p className='text-white/70'>web<span className='text-white/30'>.</span>publish<span className='text-white/30'>()</span></p>
          <p className='text-white/70'>seo<span className='text-white/30'>.</span>rank<span className='text-white/30'>(&apos;local&apos;)</span></p>
          <p className='text-white/70'>ads<span className='text-white/30'>.</span>launch<span className='text-white/30'>()</span><span className='rd-caret ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-[#e1f56e]' /></p>
          <div className='mt-3 h-1.5 overflow-hidden rounded-full bg-white/10'>
            <div className='rd-bar h-full w-[82%] rounded-full bg-[#e1f56e]' />
          </div>
        </div>
      </div>

      <div className='rd-float-2 absolute bottom-[16%] right-[2%] w-[60%] rounded-xl border border-white/10 bg-white p-4 text-[#141414] shadow-2xl'>
        <p className='text-[10px] text-[#4d4d4c]'>Google · cerca de ti</p>
        <p className='mt-1 text-sm font-bold text-[#3346c1]'>Tu negocio · Web oficial</p>
        <p className='mt-1 text-[11px] text-[#e3a008]'>★★★★★ <span className='text-[#4d4d4c]'>· Abierto ahora</span></p>
        <div className='mt-3 flex gap-2'>
          <span className='rounded-full bg-[#141414] px-2.5 py-1 text-[10px] font-semibold text-white'>Llamar</span>
          <span className='rounded-full border border-[#cbccc7] px-2.5 py-1 text-[10px] font-semibold'>Cómo llegar</span>
        </div>
      </div>

      <div className='rd-float-3 absolute bottom-[4%] left-[8%] flex items-center gap-3 rounded-full border border-white/10 bg-[#141513] py-2 pl-2 pr-4 shadow-2xl'>
        <span className='flex h-8 w-8 items-center justify-center rounded-full bg-[#e1f56e] text-sm font-black text-[#0b0c0a]'>+1</span>
        <span className='text-[11px] text-white/80'>«Hola, ¿tenéis hueco el jueves?»</span>
      </div>
    </div>
  );
}

function CaseCard({ c }: { c: CaseItem }) {
  return (
    <a href={c.href} className='rd-card group block overflow-hidden'>
      {c.image ? <img src={c.image} alt={c.name} loading='lazy' className='aspect-[4/3] w-full object-cover opacity-90 transition-opacity group-hover:opacity-100' /> : null}
      <div className='p-6'>
        <p className='rd-eyebrow mb-2'>{c.services.join(' · ')}</p>
        <h3 className='text-xl font-extrabold uppercase'>{c.name}</h3>
        <p className='mt-2 text-sm text-white/60'>{c.result}</p>
      </div>
    </a>
  );
}

export default function HomeV2() {
  usePageMeta('/');

  return (
    <main className='rd rd-page'>
      {/* HERO */}
      <section className='relative overflow-hidden pt-[var(--site-header-h)]'>
        <div className='rd-grid-bg pointer-events-none absolute inset-0' />
        <div className='relative mx-auto grid min-h-[calc(100svh-var(--site-header-h))] max-w-[1320px] items-center gap-12 px-5 py-14 md:px-8 lg:grid-cols-[1.15fr_1fr_0.75fr]'>
          <div>
            <p className='rd-eyebrow mb-6'>Web · eCommerce · SEO · SEM · GEO · Redes</p>
            <h1 className='rd-h1'>
              Tu negocio,
              <br />
              <span className='rd-mark'>visible</span>
              <br />
              <span className='text-[#e1f56e]'>y sin líos.</span>
            </h1>
            <p className='mt-7 max-w-md text-base leading-relaxed text-white/65 md:text-lg'>
              Hacemos tu web, te ponemos en Google y en la IA, y llevamos tus redes. Un solo equipo para que tus clientes te encuentren y te escriban.
            </p>
            <div className='mt-9 flex flex-wrap gap-3'>
              <a href={CONTACT_PATH} className='rd-btn'>Pide una revisión gratis ↗</a>
              <a href={PORTFOLIO_PATH} className='rd-btn-ghost'>Ver casos</a>
            </div>
          </div>

          <HeroVisual />

          <aside className='hidden lg:block'>
            <p className='rd-eyebrow mb-4 text-white/50'>Nuestros servicios</p>
            <ul className='divide-y divide-white/10 border-y border-white/10'>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <a href={s.href} className='group flex items-center gap-3 py-3.5'>
                    <span className='font-mono text-[11px] text-[#e1f56e]'>{s.num}</span>
                    <span className='text-sm font-semibold uppercase tracking-wide text-white/85 group-hover:text-white'>{s.name}</span>
                    <span className='ml-auto text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-[#e1f56e]'>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* PRUEBA SOCIAL */}
      <div className='overflow-hidden border-y border-white/10 bg-[#e1f56e] py-4 text-[#0b0c0a]' aria-label='Clientes que confían en 36web'>
        <div className='rd-marquee flex w-max items-center gap-8 whitespace-nowrap text-sm font-black uppercase tracking-[0.16em]'>
          {[...PROOF, ...PROOF].map((k, i) => (
            <span key={i} className='flex items-center gap-8'>
              <span aria-hidden='true' className='text-[#0b0c0a]/40'>&gt;</span>
              {k}
            </span>
          ))}
        </div>
      </div>

      {/* SISTEMA */}
      <div className='rd-light'>
      <section id='servicios' className='mx-auto max-w-[1320px] px-5 py-24 md:px-8 md:py-32'>
        <div className='mb-14 grid gap-8 lg:grid-cols-2 lg:items-end'>
          <div>
            <p className='rd-eyebrow mb-5'>01 — Sistema 36web</p>
            <h2 className='rd-h2'>
              Un solo equipo,
              <br />
              <span className='rd-mark'>todos</span> <span className='text-[#e1f56e]'>tus canales.</span>
            </h2>
          </div>
          <p className='max-w-lg text-white/60 lg:justify-self-end'>
            La web, Google, la IA y las redes funcionan mejor cuando las lleva el mismo equipo. Elegimos lo que tu negocio necesita y lo hacemos trabajar junto, con un objetivo: que te contacten más.
          </p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {SERVICES.map((s) => (
            <a key={s.slug} href={s.href} className='rd-card group flex min-h-[250px] flex-col p-6'>
              <div className='flex items-center justify-between'>
                <span className='font-mono text-xs text-[#e1f56e]'>{s.num}</span>
                <span className='rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/50'>{s.area}</span>
              </div>
              <h3 className='mt-8 text-2xl font-extrabold uppercase leading-tight'>{s.name}</h3>
              <p className='mt-3 text-sm leading-relaxed text-white/55'>{s.short}</p>
              <span className='mt-auto pt-6 text-xs font-bold uppercase tracking-[0.16em] text-white/60 group-hover:text-[#e1f56e]'>Explorar ↗</span>
            </a>
          ))}
          <a href={SERVICES_PATH} className='group flex min-h-[250px] flex-col justify-between rounded-[1.25rem] bg-[#e1f56e] p-6 text-[#0b0c0a] transition-transform hover:-translate-y-1'>
            <span className='font-mono text-xs'>+</span>
            <span className='text-2xl font-black uppercase leading-tight'>¿No sabes por dónde empezar?</span>
            <span className='text-xs font-bold uppercase tracking-[0.16em]'>Te lo decimos gratis ↗</span>
          </a>
        </div>
      </section>
      </div>

      {/* TRANQUILIDAD DIGITAL */}
      <section className='bg-[#101110]'>
        <div className='mx-auto grid max-w-[1320px] gap-14 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-2'>
          <div>
            <p className='rd-eyebrow mb-5'>02 — Tranquilidad digital</p>
            <h2 className='rd-h2'>
              Tú a lo tuyo.
              <br />
              <span className='rd-mark'>Nosotros,</span>
              <br />
              <span className='text-[#e1f56e]'>a lo digital.</span>
            </h2>
            <p className='mt-7 max-w-md text-white/60'>
              Cuando hay hosting, dominios, programadores, plataformas y facturas de por medio, alguien tiene que estar de tu lado. Ese somos nosotros.
            </p>
            <a href={TRANQUILIDAD_DIGITAL_PATH} className='rd-btn mt-9'>Cómo funciona ↗</a>
          </div>
          <ul className='grid gap-4 sm:grid-cols-2'>
            {[
              ['Un solo interlocutor', 'Hablamos nosotros con proveedores y plataformas.'],
              ['Revisamos antes de pagar', 'Presupuestos y facturas con criterio técnico.'],
              ['Copias y seguridad', 'Tu web vigilada, actualizada y con copias al día.'],
              ['Decides tú', 'Te lo explicamos claro y tú das el visto bueno.'],
            ].map(([t, d], i) => (
              <li key={t} className='rd-card p-6'>
                <span className='font-mono text-xs text-[#e1f56e]'>0{i + 1}</span>
                <h3 className='mt-6 text-lg font-extrabold uppercase'>{t}</h3>
                <p className='mt-2 text-sm text-white/55'>{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MÉTODO */}
      <div className='rd-light rd-stone'>
      <section className='mx-auto max-w-[1320px] px-5 py-24 md:px-8 md:py-32'>
        <p className='rd-eyebrow mb-5'>03 — Método</p>
        <h2 className='rd-h2 max-w-[16ch]'>
          Primero <span className='rd-mark'>entender.</span> <span className='text-[#e1f56e]'>Después construir.</span>
        </h2>
        <ol className='mt-14 grid gap-px overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4'>
          {STEPS.map((s) => (
            <li key={s.n} className='bg-[#0b0c0a] p-7'>
              <span className='text-5xl font-black text-white/10'>{s.n}</span>
              <h3 className='mt-6 text-xl font-extrabold uppercase'>{s.t}</h3>
              <p className='mt-3 text-sm leading-relaxed text-white/55'>{s.d}</p>
            </li>
          ))}
        </ol>
      </section>
      </div>

      {/* PRINCIPIOS */}
      <div>
      <section className='mx-auto max-w-[1320px] px-5 py-24 md:px-8 md:py-32'>
        <div className='grid gap-12 lg:grid-cols-[0.9fr_1.1fr]'>
          <div>
            <p className='rd-eyebrow mb-5'>04 — Por qué 36web</p>
            <h2 className='rd-h2'>
              La confianza <span className='rd-mark'>se gana</span> <span className='text-[#e1f56e]'>trabajando.</span>
            </h2>
          </div>
          <dl className='grid gap-x-10 gap-y-10 sm:grid-cols-2'>
            {PRINCIPLES.map((p) => (
              <div key={p.t} className='border-t border-white/15 pt-5'>
                <dt className='text-lg font-extrabold uppercase'>{p.t}</dt>
                <dd className='mt-2 text-sm text-white/55'>{p.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      </div>

      {/* CASOS DE ÉXITO (se muestra cuando haya casos en cases.ts) */}
      {CASES.length > 0 ? (
        <section id='casos' className='border-t border-white/10'>
          <div className='mx-auto max-w-[1320px] px-5 py-24 md:px-8 md:py-32'>
            <div className='mb-12 flex flex-wrap items-end justify-between gap-6'>
              <div>
                <p className='rd-eyebrow mb-5'>05 — Casos de éxito</p>
                <h2 className='rd-h2'>Resultados <span className='rd-mark'>reales.</span></h2>
              </div>
              <a href={PORTFOLIO_PATH} className='rd-btn-ghost'>Ver todos ↗</a>
            </div>
            <div className='grid gap-4 md:grid-cols-3'>
              {CASES.slice(0, 3).map((c) => <CaseCard key={c.name} c={c} />)}
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section className='rd-light'>
        <div className='mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[0.8fr_1.2fr]'>
          <div>
            <p className='rd-eyebrow mb-5'>Preguntas frecuentes</p>
            <h2 className='rd-h2'>Hablemos <span className='rd-mark'>claro.</span></h2>
          </div>
          <div className='divide-y divide-white/10 border-y border-white/10'>
            {FAQS.map((f) => (
              <details key={f.q} className='group py-6'>
                <summary className='flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-bold'>
                  {f.q}
                  <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-[#e1f56e] transition-transform group-open:rotate-45'>+</span>
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
          <div className='absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#b1d004]/50 blur-3xl' aria-hidden='true' />
          <p className='font-mono text-xs uppercase tracking-[0.2em]'>// let&apos;s build</p>
          <h2 className='rd-h2 relative mt-5 max-w-[15ch]'>¿Revisamos tu web gratis?</h2>
          <p className='relative mt-5 max-w-lg text-[#0b0c0a]/75'>
            Te decimos qué está frenando a tus clientes y cómo lo arreglaríamos. Sin compromiso.
          </p>
          <div className='relative mt-9 flex flex-wrap gap-3'>
            <a href={CONTACT_PATH} className='inline-flex items-center gap-2 rounded-full bg-[#0b0c0a] px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-[#3346c1]'>
              Quiero mi revisión ↗
            </a>
            <a href={buildWhatsAppUrl('Hola, quiero que reviséis mi web.')} target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-2 rounded-full border border-[#0b0c0a]/30 px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] hover:border-[#0b0c0a]'>
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
