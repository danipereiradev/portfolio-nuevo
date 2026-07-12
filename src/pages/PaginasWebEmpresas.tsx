import { useContactModal } from '../contexts/ContactModalContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { trackPhoneClick } from '../utils/analytics';
import { PHONE_TEL_LINK } from '../config/contact';
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

const PaginasWebEmpresas = () => {
  const { openModal } = useContactModal();

  usePageMeta('/paginas-web-empresas');

  const callPhone = () => {
    trackPhoneClick('PaginasWebEmpresasHero');
    window.location.href = PHONE_TEL_LINK;
  };

  const workItems = [
    'Estructura de la web y organización de contenidos',
    'Diseño adaptado a la marca y al tipo de negocio',
    'Desarrollo responsive para móvil, tablet y ordenador',
    'Formularios, WhatsApp o vías de contacto claras',
    'Base SEO inicial',
    'Optimización de velocidad y rendimiento',
    'Publicación y revisión final',
    'Configuración básica de medición si aplica',
    'Acompañamiento inicial tras la publicación',
  ];

  const resultItems = [
    'Una web profesional preparada para presentar su negocio',
    'Una estructura clara para explicar servicios',
    'Mejor imagen y más confianza',
    'Una experiencia correcta en móvil',
    'Canales de contacto visibles',
    'Una base técnica sólida para crecer',
  ];

  return (
    <>
      <SEOLandingHero
        title='Página web profesional'
        subtitle='Una web clara, rápida y preparada para que tus clientes entiendan qué haces y puedan contactar fácilmente.'
        description='Diseñamos y desarrollamos páginas web profesionales para empresas, autónomos y negocios que necesitan algo más que una presencia online básica.'
        trustLine='Presupuesto cerrado antes de empezar · Proyectos en toda España · Base en Torrejón de Ardoz, Madrid'
        ctaText='Solicitar propuesta'
        onCTAClick={openModal}
        secondaryCTAText='Llamar Ahora'
        secondaryCTAAction={callPhone}
        secondaryCTAIcon='phone'
      />

      <ServiceScope
        audienceText='Para empresas, autónomos y negocios que necesitan una web profesional para presentar sus servicios, transmitir confianza y generar contactos.'
        workItems={workItems}
        resultItems={resultItems}
      />

      <Portfolio />

      <SEOProcess title='Cómo trabajamos' steps={defaultServiceProcess} />

      <Testimonials />

      <SEOFAQ
        title='Preguntas frecuentes sobre páginas web profesionales'
        faqs={servicesFaqs}
      />

      <SEOCTAFinal
        title='¿Hablamos de tu proyecto?'
        subtitle='Cuéntanos qué necesitas y te preparamos una propuesta cerrada, con alcance y plazos claros, antes de empezar.'
        buttonText='Solicitar propuesta'
        onButtonClick={openModal}
      />

      <ContactForm preselectedPlan='Página Web' />
    </>
  );
};

export default PaginasWebEmpresas;
