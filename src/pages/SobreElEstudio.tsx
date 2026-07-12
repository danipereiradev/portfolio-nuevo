import { Link } from 'react-router-dom';
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
          className='hidden lg:block absolute top-28 left-[6%] z-0'
        />
        <FloatingPanel
          variant='layout'
          tilt={7}
          className='hidden lg:block absolute bottom-10 right-[6%] z-0'
        />

        <div className='relative z-10 text-center max-w-4xl mx-auto px-6 py-4'>
          <span className='inline-block bg-accent text-ink-dark text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-1.5 border-2 border-white/80 rotate-[-2deg] mb-6 shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]'>
            Sobre el estudio
          </span>
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight'>
            Detrás de PereiraWeb
          </h1>
          <p className='text-base md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto'>
            Un estudio web con base en Torrejón de Ardoz, Madrid,
            especializado en proyectos digitales para empresas, autónomos y
            negocios.
          </p>
        </div>
      </section>

      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto text-gray-700 leading-relaxed space-y-5 text-base md:text-lg'>
            <p>
              <strong className='text-gray-900'>PereiraWeb</strong> es un
              estudio web con base en{' '}
              <strong className='text-gray-900'>
                Torrejón de Ardoz, Madrid
              </strong>
              . Trabajamos con empresas, autónomos y negocios de toda España
              que necesitan crear o mejorar su presencia online con una web
              profesional, clara y preparada para generar confianza.
            </p>
            <p>
              Somos un equipo flexible especializado en diseño web,
              desarrollo y mantenimiento para negocios. Combinamos dirección
              técnica senior, criterio visual y una forma de trabajar cercana
              para que cada proyecto tenga una base sólida desde el primer
              día.
            </p>
            <p>
              El estudio está dirigido por{' '}
              <strong className='text-gray-900'>Dani Pereira</strong>,{' '}
              <strong className='text-gray-900'>
                desarrollador web senior
              </strong>
              , con experiencia en proyectos para pequeños negocios, pymes y
              colaboraciones en grandes empresas de sectores como{' '}
              <strong className='text-gray-900'>retail y banca</strong>. Según
              las necesidades de cada proyecto, contamos con perfiles
              especializados para cubrir diseño, desarrollo, contenido,
              mantenimiento o mejoras técnicas.
            </p>
            <p>
              Trabajamos con procesos claros, comunicación directa y
              propuestas cerradas antes de empezar. Nuestro objetivo es que
              cada cliente sepa qué vamos a construir, cómo lo vamos a hacer
              y qué necesita su proyecto para funcionar correctamente.
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
            <Link to='/contacto' className='text-accent hover:underline'>
              escríbenos por el formulario de contacto
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
};

export default SobreElEstudio;
