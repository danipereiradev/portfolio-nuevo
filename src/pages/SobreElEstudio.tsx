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

const WHATSAPP_URL = buildWhatsAppUrl(ABOUT_PAGE_WHATSAPP_MESSAGE);

const SobreElEstudio = () => {
  usePageMeta('/sobre-el-estudio');

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('SobreElEstudioPage', 'Cuéntanos tu proyecto');
    trackGoogleAdsWhatsAppConversion(WHATSAPP_URL);
  };

  return (
    <>
      <section className='relative h-[70vh] flex items-center justify-center overflow-hidden pt-20'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: 'url(/img/sobre-el-estudio.png)',
          }}
        >
          <div className='absolute inset-0 bg-black/70'></div>
        </div>

        <div className='relative z-10 text-center max-w-4xl mx-auto px-6 py-4'>
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight'>
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
              className='inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium'
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
