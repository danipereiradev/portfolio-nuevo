import { usePageMeta } from '../hooks/usePageMeta';
import { FORM_THANKS_PATH, buildWhatsAppUrl } from '../config/contact';
import { BLOG_PATH } from '../blog/posts';
import { CASES_PATH } from '../redesign/cases';

const Gracias = () => {
  usePageMeta(FORM_THANKS_PATH);

  return (
    <main className='rd rd-page'>
      <section className='relative overflow-hidden pt-[var(--site-header-h)]'>
        <div className='rd-grid-bg pointer-events-none absolute inset-0' />
        <div className='relative mx-auto grid min-h-[calc(80svh-var(--site-header-h))] max-w-[1320px] items-center gap-10 px-5 py-20 md:px-8 lg:grid-cols-[1.3fr_1fr]'>
          <div>
            <p className='rd-eyebrow mb-6'>// mensaje recibido</p>
            <h1 className='rd-h1'>
              ¡GRACIAS!
              <br />
              <span className='rd-mark'>YA LO TENEMOS.</span>
            </h1>
            <p className='mt-8 max-w-xl text-lg leading-relaxed text-white/65'>
              Hemos recibido tu mensaje. Te escribimos o te llamamos en breve para hablar de tu proyecto.
            </p>
            <div className='mt-9 flex flex-wrap gap-3'>
              <a href='/' className='rd-btn'>Volver al inicio →</a>
              <a href={buildWhatsAppUrl('Hola, acabo de enviaros el formulario de la web.')} target='_blank' rel='noopener noreferrer' className='rd-btn-ghost'>
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>
          <div className='rd-card p-8'>
            <p className='font-mono text-[11px] uppercase tracking-[0.2em] text-[#e1f56e]'>Mientras tanto</p>
            <ul className='mt-6 divide-y divide-white/10 border-y border-white/10'>
              {[
                [CASES_PATH, 'Mira nuestros casos de éxito'],
                ['/portfolio', 'Recorre el portfolio'],
                [BLOG_PATH, 'Lee el 36Blog'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className='group flex items-center justify-between py-4 font-semibold'>
                    {label}
                    <span className='text-white/30 group-hover:text-[#e1f56e]'>→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Gracias;
