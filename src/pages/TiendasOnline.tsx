import { useContactModal } from '../contexts/ContactModalContext';
import { usePageMeta } from '../hooks/usePageMeta';
import {
  trackPhoneClick,
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
} from '../utils/analytics';
import {
  PHONE_TEL_LINK,
  ECOMMERCE_WHATSAPP_MESSAGE,
  buildWhatsAppUrl,
} from '../config/contact';
import SEOLandingHero from '../components/SEOLandingHero';
import ServiceScope from '../components/ServiceScope';
import SEOProcess from '../components/SEOProcess';
import SEOFAQ from '../components/SEOFAQ';
import SEOCTAFinal from '../components/SEOCTAFinal';
import ContactForm from '../components/ContactForm';
import Testimonials from '../components/Testimonials';
import Portfolio from '../components/Portfolio';
import { defaultServiceProcess } from '../data/serviceProcess';
import { servicesFaqs } from '../data/servicesFaqs';

const WHATSAPP_URL = buildWhatsAppUrl(ECOMMERCE_WHATSAPP_MESSAGE);

const TiendasOnline = () => {
  const { openModal } = useContactModal();

  usePageMeta('/tiendas-online');

  const callPhone = () => {
    trackPhoneClick('TiendasOnlineHero');
    window.location.href = PHONE_TEL_LINK;
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('TiendasOnlineCTAFinal');
    trackGoogleAdsWhatsAppConversion(WHATSAPP_URL);
  };

  const workItems = [
    'Estructura de catálogo y categorías',
    'Diseño de tienda adaptado a la marca',
    'Fichas de producto claras',
    'Carrito y proceso de compra',
    'Pasarela de pago',
    'Configuración básica de envíos',
    'Configuración básica de impuestos si aplica',
    'Emails transaccionales',
    'Gestión de pedidos',
    'Diseño responsive',
    'Base SEO para categorías y productos principales',
    'Analítica ecommerce básica si aplica',
    'Formación inicial para gestionar productos y pedidos',
  ];

  const resultItems = [
    'Una tienda online profesional',
    'Un catálogo más claro y ordenado',
    'Un proceso de compra más fácil',
    'Gestión de pedidos y productos',
    'Base preparada para campañas, SEO o mejoras futuras',
    'Una plataforma más seria para vender online',
  ];

  return (
    <>
      <SEOLandingHero
        title='Tienda online'
        subtitle='Una tienda online clara, cuidada y preparada para vender productos o servicios sin complicar la experiencia de compra.'
        description='Creamos tiendas online y catálogos digitales pensados para que el cliente pueda navegar, entender el producto y comprar con facilidad.'
        trustLine='Presupuesto cerrado antes de empezar · Proyectos en toda España · Base en Torrejón de Ardoz, Madrid'
        ctaText='Solicitar propuesta'
        onCTAClick={openModal}
        secondaryCTAText='Llamar Ahora'
        secondaryCTAAction={callPhone}
        secondaryCTAIcon='phone'
      />

      <ServiceScope
        audienceText='Para negocios que quieren vender online, organizar su catálogo, recibir pedidos y ofrecer una experiencia de compra profesional.'
        workItems={workItems}
        resultItems={resultItems}
      />

      <Portfolio />

      <SEOProcess title='Cómo trabajamos' steps={defaultServiceProcess} />

      <Testimonials />

      <SEOFAQ
        title='Preguntas frecuentes sobre tiendas online'
        faqs={servicesFaqs}
      />

      <SEOCTAFinal
        title='¿Hablamos de tu tienda online?'
        subtitle='Cuéntanos tu catálogo y objetivos. Te preparamos una propuesta cerrada, con alcance y plazos claros, antes de empezar.'
        buttonText='Solicitar propuesta'
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

      <ContactForm preselectedPlan='Tienda Online' />
    </>
  );
};

export default TiendasOnline;
