import { usePageMeta } from '../hooks/usePageMeta';
import { CONTACT_PATH, PORTFOLIO_PATH, TRANQUILIDAD_DIGITAL_PATH, buildWhatsAppUrl } from '../config/contact';
import { SERVICES, SERVICES_PATH } from './services';
import { CaseItem, CASES } from './cases';

const KEYWORDS = ['Diseño web', 'eCommerce', 'SEO local', 'Google Ads', 'GEO · IA', 'Reels', 'Instagram', 'Tranquilidad digital'];

const STEPS = [
  { n: '01', t: 'Te grabamos un vídeo', d: 'Revisamos tu web, tu Google y tus redes y te enseñamos en menos de un minuto qué te está quitando clientes.' },
  { n: '02', t: 'Hablamos 10 minutos', d: 'Te contamos qué arreglaríamos primero y por qué. Sin compromiso.' },
  { n: '03', t: 'Construimos', d: 'Diseñamos, desarrollamos y lanzamos. Tú apruebas cada paso; nosotros nos ocupamos del resto.' },
  { n: '04', t: 'Medimos y mejoramos', d: 'Llamadas, mensajes y ventas en un informe claro. Lo que no funciona, se cambia.' },
];

const PRINCIPLES = [
  { t: 'Hablas con Dani', d: 'Ni comerciales ni tickets: hablas directamente con quien hace tu proyecto.' },
  { t: 'La web es tuya', d: 'Dominio, archivos y cuentas de Google, siempre a tu nombre.' },
  { t: 'Revisión gratis en vídeo', d: 'Antes de hablar de nada, te enseñamos lo que vemos en tu web.' },
  { t: 'Negocios de verdad', d: 'Talleres, reformas, tiendas y despachos: sabemos qué necesita un negocio local.' },
];

const FAQS = [
  { q: '¿Tengo que contratar todos los servicios?', a: 'No. Empezamos por lo que más impacto tenga en tu negocio y sumamos el resto solo si tiene sentido.' },
  { q: '¿Trabajáis solo en Madrid?', a: 'Trabajamos en remoto con negocios de toda España. Si estás cerca de Madrid, Galicia o Valencia, también podemos vernos.' },
  { q: '¿Cuánto se tarda en tener la web?', a: 'Una web de servicios suele estar lista en dos o tres semanas desde que tenemos los contenidos.' },
  { q: '¿Qué es Tranquilidad digital?', a: 'Un servicio en el que actuamos de tu lado frente a proveedores, programadores y plataformas: revisamos, negociamos y nos aseguramos de que todo funcione.' },
  { q: '¿Cómo empezamos?', a: 'Escríbenos o reserva una llamada. Revisamos tu situación gratis y te decimos qué haríamos nosotros.' },
];

function HeroVisual() {
  // Captura ficticia de una web auditada: fallos en rojo y arreglos en lima,
  // como en los vídeos de revisión de 36web.
  return (
    <div className='relative mx-auto w-full max-w-[560px]' aria-hidden='true'>
      <div className='rd-float overflow-hidden rounded-2xl border border-white/10 bg-[#f4f5f2] text-[#141414] shadow-2xl'>
        <div className='flex items-center gap-1.5 border-b border-black/10 bg-white px-4 py-2.5'>
          <span className='h-2.5 w-2.5 rounded-full bg-black/15' />
          <span className='h-2.5 w-2.5 rounded-full bg-black/15' />
          <span className='h-2.5 w-2.5 rounded-full bg-black/15' />
          <span className='ml-3 rounded-full bg-black/5 px-3 py-0.5 font-mono text-[10px] text-black/50'>tunegocio.es</span>
        </div>
        <div className='space-y-4 p-6'>
          <div className='flex items-center justify-between'>
            <span className='h-3 w-20 rounded bg-black/80' />
            <span className='flex gap-2'>
              <span className='h-2 w-10 rounded bg-black/20' />
              <span className='h-2 w-10 rounded bg-black/20' />
              <span className='h-2 w-10 rounded bg-black/20' />
            </span>
          </div>
          <div className='relative rounded-lg border-[3px] border-[#e86054] p-3'>
            <span className='absolute -top-3 right-3 rounded bg-[#e86054] px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-white'>Fallo #1</span>
            <span className='block h-4 w-3/4 rounded bg-black/70' />
            <span className='mt-2 block h-2 w-full rounded bg-black/15' />
            <span className='mt-1.5 block h-2 w-5/6 rounded bg-black/15' />
          </div>
          <div className='grid grid-cols-3 gap-3'>
            <span className='h-16 rounded-lg bg-black/10' />
            <span className='h-16 rounded-lg bg-black/10' />
            <span className='relative h-16 rounded-lg border-[3px] border-[#e86054] bg-black/10'>
              <span className='absolute -top-3 left-2 rounded bg-[#e86054] px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-white'>Fallo #2</span>
            </span>
          </div>
          <div className='flex items-center gap-3'>
            <span className='rounded-full bg-black/15 px-4 py-2 font-mono text-[10px] text-black/40'>Contactar</span>
            <span className='font-mono text-[10px] text-[#e86054]'>← no funciona en el móvil</span>
          </div>
        </div>
      </div>
      <div className='rd-float-2 absolute -bottom-6 -left-4 max-w-[260px] rounded-xl bg-[#e1f56e] p-4 text-[#0b0c0a] shadow-2xl md:-left-10'>
        <p className='font-mono text-[10px] uppercase tracking-[0.18em]'>// let&apos;s build</p>
        <p className='mt-1 text-sm font-black uppercase leading-tight'>3 fallos encontrados. Te los enseñamos en vídeo.</p>
      </div>
      <div className='rd-float-3 absolute -right-2 -top-5 flex items-center gap-2 rounded-full border border-white/10 bg-[#161614] py-2 pl-2 pr-4 shadow-2xl md:-right-8'>
        <span className='flex h-7 w-7 items-center justify-center rounded-full bg-[#e1f56e] text-xs font-black text-[#0b0c0a]'>+1</span>
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
        <div className='relative mx-auto grid min-h-[calc(88svh-var(--site-header-h))] max-w-[1320px] items-center gap-16 px-5 py-14 md:px-8 lg:grid-cols-[1.05fr_1fr]'>
          <div>
            <p className='rd-eyebrow mb-6'>// let&apos;s build — web, google y redes</p>
            <h1 className='rd-h1'>
              Más clientes
              <br />
              desde <span className='rd-mark'>tu web.</span>
            </h1>
            <p className='mt-7 max-w-md text-base leading-relaxed text-white/65 md:text-lg'>
              Revisamos tu web gratis, te enseñamos en vídeo qué te está quitando clientes y lo arreglamos: web, Google, IA y redes, con trato directo y todo a tu nombre.
            </p>
            <div className='mt-9 flex flex-wrap gap-3'>
              <a href={CONTACT_PATH} className='rd-btn'>Quiero mi vídeo de revisión →</a>
              <a href={PORTFOLIO_PATH} className='rd-btn-ghost'>Ver casos</a>
            </div>
          </div>

          <HeroVisual />

        </div>
      </section>

      {/* SERVICIOS EN FILA */}
      <nav aria-label='Servicios' className='border-t border-white/10'>
        <ul className='mx-auto grid max-w-[1320px] grid-cols-2 sm:grid-cols-4 lg:grid-cols-7'>
          {SERVICES.map((s) => (
            <li key={s.slug} className='border-b border-r border-white/10 lg:border-b-0'>
              <a href={s.href} className='group flex h-full flex-col gap-1 px-5 py-5 transition-colors hover:bg-[#e1f56e] hover:text-[#0b0c0a]'>
                <span className='font-mono text-[10px] uppercase tracking-widest text-white/40 group-hover:text-[#0b0c0a]/60'>{s.area}</span>
                <span className='text-sm font-extrabold uppercase'>{s.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* MARQUEE */}
      <div className='overflow-hidden border-y border-white/10 bg-[#e1f56e] py-4 text-[#0b0c0a]'>
        <div className='rd-marquee flex w-max gap-10 whitespace-nowrap text-sm font-black uppercase tracking-[0.2em]'>
          {[...KEYWORDS, ...KEYWORDS, ...KEYWORDS, ...KEYWORDS].map((k, i) => (
            <span key={i} className='flex items-center gap-10'>
              {k}
              <span aria-hidden='true'>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* SISTEMA */}
      <section id='servicios' className='mx-auto max-w-[1320px] px-5 py-24 md:px-8 md:py-32'>
        <div className='mb-14 grid gap-8 lg:grid-cols-2 lg:items-end'>
          <div>
            <p className='rd-eyebrow mb-5'>// lo que hacemos</p>
            <h2 className='rd-h2'>
              Si te buscan,
              <br />
              <span className='text-[#e1f56e]'>que te encuentren.</span>
            </h2>
          </div>
          <p className='max-w-lg text-white/60 lg:justify-self-end'>
            Da igual si te buscan en Google, le preguntan a ChatGPT o te ven en Instagram: al final todos acaban en tu web. Nos ocupamos de cada paso para que ese camino termine en una llamada o un mensaje.
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
              <span className='mt-auto pt-6 text-xs font-bold uppercase tracking-[0.16em] text-white/60 group-hover:text-[#e1f56e]'>Explorar →</span>
            </a>
          ))}
          <a href={SERVICES_PATH} className='group flex min-h-[250px] flex-col justify-between rounded-[1.25rem] bg-[#e1f56e] p-6 text-[#0b0c0a] transition-transform hover:-translate-y-1'>
            <span className='font-mono text-xs'>+</span>
            <span className='text-2xl font-black uppercase leading-tight'>¿No sabes por dónde empezar?</span>
            <span className='text-xs font-bold uppercase tracking-[0.16em]'>Te lo decimos gratis →</span>
          </a>
        </div>
      </section>

      {/* TRANQUILIDAD DIGITAL */}
      <section className='border-y border-white/10 bg-[#101110]'>
        <div className='mx-auto grid max-w-[1320px] gap-14 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-2'>
          <div>
            <p className='rd-eyebrow mb-5'>// tranquilidad digital</p>
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
            <a href={TRANQUILIDAD_DIGITAL_PATH} className='rd-btn mt-9'>Cómo funciona →</a>
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
      <section className='mx-auto max-w-[1320px] px-5 py-24 md:px-8 md:py-32'>
        <p className='rd-eyebrow mb-5'>// cómo trabajamos</p>
        <h2 className='rd-h2 max-w-[16ch]'>
          Primero un vídeo. <span className='text-[#e1f56e]'>Después, manos a la obra.</span>
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

      {/* PRINCIPIOS */}
      <section className='mx-auto max-w-[1320px] px-5 pb-24 md:px-8 md:pb-32'>
        <div className='grid gap-12 lg:grid-cols-[0.9fr_1.1fr]'>
          <div>
            <p className='rd-eyebrow mb-5'>// por qué 36web</p>
            <h2 className='rd-h2'>
              Sin humo. <span className='rd-mark'>Con nombre</span> <span className='text-[#e1f56e]'>y apellidos.</span>
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

      {/* CASOS DE ÉXITO (se muestra cuando haya casos en cases.ts) */}
      {CASES.length > 0 ? (
        <section id='casos' className='border-t border-white/10'>
          <div className='mx-auto max-w-[1320px] px-5 py-24 md:px-8 md:py-32'>
            <div className='mb-12 flex flex-wrap items-end justify-between gap-6'>
              <div>
                <p className='rd-eyebrow mb-5'>// casos reales</p>
                <h2 className='rd-h2'>Resultados <span className='text-[#e1f56e]'>reales.</span></h2>
              </div>
              <a href={PORTFOLIO_PATH} className='rd-btn-ghost'>Ver todos →</a>
            </div>
            <div className='grid gap-4 md:grid-cols-3'>
              {CASES.slice(0, 3).map((c) => <CaseCard key={c.name} c={c} />)}
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section className='border-t border-white/10'>
        <div className='mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[0.8fr_1.2fr]'>
          <div>
            <p className='rd-eyebrow mb-5'>Preguntas frecuentes</p>
            <h2 className='rd-h2'>Hablemos <span className='text-[#e1f56e]'>claro.</span></h2>
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
      <section className='px-5 pb-24 md:px-8'>
        <div className='relative mx-auto max-w-[1320px] overflow-hidden rounded-[1.75rem] bg-[#e1f56e] px-7 py-16 text-[#0b0c0a] md:px-14 md:py-20'>
          <div className='absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#b1d004]/50 blur-3xl' aria-hidden='true' />
          <p className='font-mono text-xs uppercase tracking-[0.2em]'>// let&apos;s build</p>
          <h2 className='rd-h2 relative mt-5 max-w-[15ch]'>¿Revisamos tu web gratis?</h2>
          <p className='relative mt-5 max-w-lg text-[#0b0c0a]/75'>
            Te grabamos un vídeo corto con lo que está frenando a tus clientes y cómo lo arreglaríamos. Sin compromiso.
          </p>
          <div className='relative mt-9 flex flex-wrap gap-3'>
            <a href={CONTACT_PATH} className='inline-flex items-center gap-2 rounded-full bg-[#0b0c0a] px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-[#3346c1]'>
              Quiero mi revisión →
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
