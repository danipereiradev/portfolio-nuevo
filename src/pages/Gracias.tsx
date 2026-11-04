import { usePageMeta } from '../hooks/usePageMeta';
import { FORM_THANKS_PATH, buildWhatsAppUrl } from '../config/contact';
import { BLOG_PATH } from '../blog/posts';
import { CASES_PATH } from '../redesign/cases';
import { usePrefs } from '../redesign/prefs';

const Gracias = () => {
  usePageMeta(FORM_THANKS_PATH);
  const { t } = usePrefs();

  return (
    <main className='rd rd-page'>
      <section className='relative overflow-hidden pt-[var(--site-header-h)]'>
        <div className='rd-grid-bg pointer-events-none absolute inset-0' />
        <div className='relative mx-auto grid min-h-[calc(80svh-var(--site-header-h))] max-w-[1320px] items-center gap-10 px-5 py-20 md:px-8 lg:grid-cols-[1.3fr_1fr]'>
          <div>
            <p className='rd-eyebrow mb-6'>{t('// mensaje recibido', '// message received')}</p>
            <h1 className='rd-h1'>
              {t('¡GRACIAS!', 'THANK YOU!')}
              <br />
              <span className='rd-mark'>{t('YA LO TENEMOS.', 'WE’VE GOT IT.')}</span>
            </h1>
            <p className='mt-8 max-w-xl text-lg leading-relaxed text-white/65'>
              {t('Hemos recibido tu mensaje. Te escribimos o te llamamos en breve para hablar de tu proyecto.', 'We’ve received your message. We’ll write or call you shortly to talk about your project.')}
            </p>
            <div className='mt-9 flex flex-wrap gap-3'>
              <a href='/' className='rd-btn'>{t('Volver al inicio', 'Back to home')} →</a>
              <a href={buildWhatsAppUrl('Hola, acabo de enviaros el formulario de la web.')} target='_blank' rel='noopener noreferrer' className='rd-btn-ghost'>
                {t('Escríbenos por WhatsApp', 'Message us on WhatsApp')}
              </a>
            </div>
          </div>
          <div className='rd-card p-8'>
            <p className='font-mono text-[11px] uppercase tracking-[0.2em] text-[#e1f56e]'>{t('Mientras tanto', 'In the meantime')}</p>
            <ul className='mt-6 divide-y divide-white/10 border-y border-white/10'>
              {[
                [CASES_PATH, t('Mira nuestros casos de éxito', 'See our case studies')],
                ['/portfolio', t('Recorre el portfolio', 'Browse the portfolio')],
                [BLOG_PATH, t('Lee el 36Blog', 'Read the 36Blog')],
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
