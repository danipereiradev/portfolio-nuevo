import { MessageCircle } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import {
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
} from '../utils/analytics';
import {
  ABOUT_PAGE_WHATSAPP_MESSAGE,
  buildWhatsAppUrl,
} from '../config/contact';
import GlowBackdrop from '../components/decor/GlowBackdrop';
import FloatingPanel from '../components/decor/FloatingPanel';

const WHATSAPP_URL = buildWhatsAppUrl(ABOUT_PAGE_WHATSAPP_MESSAGE);

const SobreElEstudio = () => {
  usePageMeta('/sobre-el-estudio');

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('SobreElEstudioPage', 'Cuéntanos tu proyecto');
    trackGoogleAdsWhatsAppConversion(WHATSAPP_URL);
  };

  return (
    <>
      <section className='relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20 pb-16'>
        <GlowBackdrop />

        <FloatingPanel
          variant='profile'
          tilt={-7}
          className='absolute top-24 -left-10 sm:top-28 sm:left-0 lg:left-[6%] z-0 opacity-50 sm:opacity-70 lg:opacity-100'
        />
        <FloatingPanel
          variant='layout'
          tilt={7}
          className='absolute bottom-10 -right-10 sm:bottom-14 sm:right-0 lg:right-[6%] z-0 opacity-50 sm:opacity-70 lg:opacity-100'
        />

        <div className='relative z-10 text-center max-w-4xl mx-auto px-6 py-4'>
          <span className='inline-block bg-accent text-ink-dark text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-1.5 border-2 border-white/80 rotate-[-2deg] mb-6 shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]'>
            Sobre el estudio
          </span>
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight'>
            Detrás de PereiraWeb
          </h1>
          <p className='text-base md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto'>
            Estudio pequeño de diseño y desarrollo web. Trabajamos online con
            clientes de toda España.
          </p>
        </div>
      </section>

      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto text-gray-700 leading-relaxed space-y-5 text-base md:text-lg'>
            <p>
              <strong className='text-gray-900'>PereiraWeb</strong> no es una
              agencia de 40 personas. Montamos webs, tiendas y mantenimiento
              para autónomos y empresas. Si el proyecto no encaja, te lo
              decimos.
            </p>
            <p>
              Nos escribes por email, teléfono, WhatsApp o videollamada. En
              Madrid también podemos vernos. No hay oficina abierta al público.
            </p>
            <p>
              El estudio lo dirige{' '}
              <strong className='text-gray-900'>Dani Pereira</strong>,{' '}
              desarrollador web senior con más de 12 años en esto. Ha trabajado
              en proyectos para pequeños negocios y también en entornos de{' '}
              <strong className='text-gray-900'>retail y banca</strong>. Cuando
              hace falta, entra gente de diseño, contenido o soporte.
            </p>
            <p>
              Trabajamos con propuesta por escrito antes de empezar: qué se
              hace, cuánto cuesta y en cuánto tiempo. Sin misterio a mitad de
              proyecto.
            </p>
          </div>

          <div className='flex justify-center mt-10'>
            <button
              onClick={handleWhatsAppClick}
              className='inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg border-2 border-ink-dark shadow-[4px_4px_0_0_#1a1a1a] hover:bg-accent-hover hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 font-bold'
            >
              <MessageCircle className='w-5 h-5' />
              Cuéntanos tu proyecto
            </button>
          </div>
          <p className='text-center text-sm text-gray-500 mt-4'>
            O si lo prefieres,{' '}
            <a href='/contacto' className='text-accent hover:underline'>
              escríbenos por el formulario de contacto
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
};

export default SobreElEstudio;
