import { useContactModal } from '../contexts/ContactModalContext';
import { usePageMeta } from '../hooks/usePageMeta';
import {
  trackPhoneClick,
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
} from '../utils/analytics';
import {
  PHONE_TEL_LINK,
  MAINTENANCE_WHATSAPP_MESSAGE,
  buildWhatsAppUrl,
} from '../config/contact';
import SEOLandingHero from '../components/SEOLandingHero';
import ServiceScope from '../components/ServiceScope';
import SEOProcess from '../components/SEOProcess';
import SEOFAQ from '../components/SEOFAQ';
import SEOCTAFinal from '../components/SEOCTAFinal';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import { defaultServiceProcess } from '../data/serviceProcess';
import { servicesFaqs } from '../data/servicesFaqs';

const WHATSAPP_URL = buildWhatsAppUrl(MAINTENANCE_WHATSAPP_MESSAGE);

const MantenimientoWeb = () => {
  const { openModal } = useContactModal();

  usePageMeta('/mantenimiento-web');

  const callPhone = () => {
    trackPhoneClick('MantenimientoWebHero');
    window.location.href = PHONE_TEL_LINK;
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('MantenimientoWebCTAFinal');
    trackGoogleAdsWhatsAppConversion(WHATSAPP_URL);
  };

  const workItems = [
    'Actualizaciones técnicas',
    'Copias de seguridad',
    'Revisión de seguridad',
    'Pequeños cambios de contenido',
    'Revisión de formularios y vías de contacto',
    'Revisión básica de velocidad',
    'Corrección de errores',
    'Ajustes visuales o funcionales menores',
    'Soporte técnico',
    'Mejoras continuas según necesidad',
    'Revisión mensual o periódica según el servicio contratado',
  ];

  const resultItems = [
    'Una web más cuidada y actualizada',
    'Menos riesgo de errores o abandono técnico',
    'Soporte cuando necesita cambios',
    'Mejor continuidad después de publicar',
    'Tranquilidad para centrarse en su negocio',
    'Posibilidad de seguir mejorando la web con el tiempo',
  ];

  return (
    <>
      <SEOLandingHero
        title='Mantenimiento web'
        subtitle='Soporte y mejoras para que tu web siga funcionando, cargando bien y transmitiendo confianza después de publicarla.'
        description='Ofrecemos mantenimiento web para negocios que quieren tener la tranquilidad de que su web está atendida y pueden pedir cambios cuando lo necesiten.'
        trustLine='Presupuesto cerrado antes de empezar · Proyectos en toda España · Base en Torrejón de Ardoz, Madrid'
        ctaText='Solicitar orientación'
        onCTAClick={openModal}
        secondaryCTAText='Llamar Ahora'
        secondaryCTAAction={callPhone}
        secondaryCTAIcon='phone'
      />

      <ServiceScope
        audienceText='Para negocios que ya tienen una web publicada y necesitan mantenerla actualizada, segura, revisada y en buen estado.'
        workItems={workItems}
        resultItems={resultItems}
      />

      <SEOProcess title='Cómo trabajamos' steps={defaultServiceProcess} />

      <Testimonials />

      <SEOFAQ
        title='Preguntas frecuentes sobre mantenimiento web'
        faqs={servicesFaqs}
      />

      <SEOCTAFinal
        title='¿Hablamos del mantenimiento de tu web?'
        subtitle='Cuéntanos cómo está tu web ahora y te preparamos una propuesta cerrada de mantenimiento, con alcance y plazos claros.'
        buttonText='Solicitar orientación'
        onButtonClick={openModal}
      />

      <div className='text-center pb-16'>
        <button
          onClick={handleWhatsAppClick}
          className='inline-flex items-center gap-1.5 text-sm text-accent font-semibold hover:underline'
        >
          O escríbenos directo por WhatsApp
        </button>
      </div>

      <ContactForm preselectedPlan='Mantenimiento Web' />
    </>
  );
};

export default MantenimientoWeb;
