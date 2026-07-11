import {
  Building2,
  Users,
  TrendingUp,
  Shield,
  Headphones,
  Zap,
  Clock,
  Target,
  Award,
} from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { trackPhoneClick } from '../utils/analytics';
import { PHONE_TEL_LINK } from '../config/contact';
import SEOLandingHero from '../components/SEOLandingHero';
import SEOProblem from '../components/SEOProblem';
import SEOBenefits from '../components/SEOBenefits';
import SEOFeatures from '../components/SEOFeatures';
import SEOProcess from '../components/SEOProcess';
import SEOWhyMe from '../components/SEOWhyMe';
import SEOFAQ from '../components/SEOFAQ';
import SEOCTAFinal from '../components/SEOCTAFinal';
import ContactForm from '../components/ContactForm';
import Testimonials from '../components/Testimonials';
import Portfolio from '../components/Portfolio';

const PaginasWebEmpresas = () => {
  const { openModal } = useContactModal();

  usePageMeta('/paginas-web-empresas');

  const callPhone = () => {
    trackPhoneClick('PaginasWebEmpresasHero');
    window.location.href = PHONE_TEL_LINK;
  };

  const problems = [
    {
      text: 'Tu empresa no tiene presencia online o tu web actual parece poco profesional',
    },
    {
      text: 'No generas suficientes leads cualificados desde tu web corporativa',
    },
    { text: 'Tu competencia te supera con webs más modernas y efectivas' },
    {
      text: 'Necesitas transmitir confianza y credibilidad a clientes potenciales',
    },
    {
      text: 'Tu web no está preparada para negocio B2B ni captación comercial',
    },
    {
      text: 'Quieres diferenciarte como líder en tu sector pero tu web no lo refleja',
    },
  ];

  const benefits = [
    {
      icon: Building2,
      title: 'Imagen Corporativa Profesional',
      description:
        'Tu web corporativa transmitirá confianza y profesionalidad, reflejando los valores de tu empresa y diferenciándote de la competencia.',
    },
    {
      icon: Users,
      title: 'Captación de Clientes B2B',
      description:
        'Diseñamos tu web pensando en convertir visitantes corporativos en leads cualificados para tu equipo comercial.',
    },
    {
      icon: TrendingUp,
      title: 'Generación de Leads',
      description:
        'Implementamos formularios estratégicos y CTAs efectivos que capturan información de clientes potenciales interesados en tus servicios.',
    },
    {
      icon: Shield,
      title: 'Seguridad y Confiabilidad',
      description:
        'Tu web corporativa contará con certificado SSL, copias de seguridad automáticas y protección contra amenazas.',
    },
    {
      icon: Headphones,
      title: 'Soporte Empresarial',
      description:
        'Ofrecemos soporte prioritario para empresas, con respuesta rápida y asistencia técnica cuando la necesites.',
    },
    {
      icon: Zap,
      title: 'Escalable y Flexible',
      description:
        'Desarrollamos webs preparadas para crecer con tu empresa, facilitando la incorporación de nuevas funcionalidades.',
    },
  ];

  const process = [
    {
      number: '1',
      title: 'Consultoría Inicial',
      description:
        'Nos reunimos para entender tu empresa, objetivos comerciales, público objetivo y necesidades específicas del proyecto web.',
    },
    {
      number: '2',
      title: 'Propuesta y Planificación',
      description:
        'Preparamos una propuesta detallada con estructura web, funcionalidades, plazos y presupuesto ajustado a tu empresa.',
    },
    {
      number: '3',
      title: 'Diseño Corporativo',
      description:
        'Creamos un diseño profesional alineado con tu identidad corporativa, incluyendo colores, tipografías y elementos visuales de marca.',
    },
    {
      number: '4',
      title: 'Desarrollo y Contenidos',
      description:
        'Programamos tu web corporativa e integramos todos los contenidos, asegurando claridad en la comunicación de tus servicios.',
    },
    {
      number: '5',
      title: 'Entrega y Seguimiento',
      description:
        'Publicamos tu web corporativa, formamos a tu equipo y realizamos seguimiento para optimizar resultados continuamente.',
    },
  ];

  const features = [
    {
      title: 'Diseño Corporativo Profesional',
      description:
        'Diseño personalizado que refleja la identidad de tu empresa y transmite profesionalidad a clientes potenciales.',
    },
    {
      title: 'Secciones Corporativas Completas',
      description:
        'Páginas de servicios, sobre nosotros, equipo, casos de éxito, certificaciones y todas las secciones necesarias.',
    },
    {
      title: 'Formularios de Captación B2B',
      description:
        'Formularios estratégicos diseñados para captar leads cualificados y facilitar el contacto comercial.',
    },
    {
      title: 'Integración con CRM',
      description:
        'Conectamos tu web con tu CRM para automatizar la gestión de leads y centralizar información de clientes.',
    },
    {
      title: 'Blog Corporativo',
      description:
        'Blog integrado para compartir noticias, artículos y posicionar tu empresa como referente del sector.',
    },
    {
      title: 'Área de Recursos',
      description:
        'Zona de descargas para catálogos, fichas técnicas, whitepapers y otros recursos corporativos.',
    },
    {
      title: 'Multi-idioma',
      description:
        'Web preparada para internacionalización con soporte multi-idioma si lo necesitas.',
    },
    {
      title: 'SEO y Analytics Empresarial',
      description:
        'Optimización SEO avanzada e integración con Google Analytics y herramientas de seguimiento.',
    },
  ];

  const whyMeReasons = [
    {
      icon: Clock,
      title: '+12 Años con Empresas',
      description:
        'Experiencia trabajando con empresas de diferentes sectores y tamaños, entendiendo las necesidades corporativas.',
    },
    {
      icon: Target,
      title: 'Enfoque B2B',
      description:
        'Especializados en webs corporativas enfocadas en captación de leads cualificados y apoyo comercial.',
    },
    {
      icon: Award,
      title: 'Resultados Medibles',
      description:
        'Implementamos sistemas de seguimiento para medir leads, conversiones y ROI de tu inversión web.',
    },
    {
      icon: Shield,
      title: 'Confidencialidad Garantizada',
      description:
        'Firmamos acuerdos de confidencialidad y protegemos la información sensible de tu empresa.',
    },
    {
      icon: Headphones,
      title: 'Soporte Empresarial',
      description:
        'Atención prioritaria para empresas con respuesta rápida y canal directo de comunicación.',
    },
    {
      icon: TrendingUp,
      title: 'Escalabilidad',
      description:
        'Webs preparadas para crecer con tu empresa, facilitando la incorporación de nuevas funcionalidades.',
    },
  ];

  const faqs = [
    {
      question: '¿Qué incluye una página web corporativa para empresas?',
      answer:
        'Una web corporativa profesional incluye diseño personalizado, páginas de servicios, sobre nosotros, casos de éxito, blog corporativo, formularios de contacto, integración con CRM, optimización SEO, hosting y dominio el primer año, formación y soporte técnico.',
    },
    {
      question: '¿Cómo puede una web corporativa ayudar a mi empresa?',
      answer:
        'Una web corporativa bien diseñada mejora tu credibilidad, genera confianza en clientes potenciales, te diferencia de competidores, facilita la captación de leads B2B, y sirve como herramienta de ventas disponible 24/7 para tu equipo comercial.',
    },
    {
      question:
        '¿Podéis integrar la web con nuestros sistemas empresariales existentes?',
      answer:
        'Sí, podemos integrar tu web corporativa con CRM, ERP, plataformas de email marketing, sistemas de gestión interna y otras herramientas empresariales que utilices, automatizando procesos y centralizando información.',
    },
    {
      question: '¿Ofrecéis planes de mantenimiento para empresas?',
      answer:
        'Sí, ofrecemos planes de mantenimiento empresarial que incluyen actualizaciones de seguridad, copias de seguridad diarias, soporte técnico prioritario, optimizaciones de rendimiento y actualizaciones de contenido mensuales.',
    },
    {
      question: '¿Cuánto cuesta una página web para empresa?',
      answer:
        'El precio depende del alcance del proyecto: estructura, funcionalidades, contenidos y objetivos de la web, con opciones de pago único, fraccionado o mensual. Preparamos una propuesta a medida, cerrada y transparente antes de empezar, adaptada a las necesidades de tu empresa.',
    },
    {
      question: '¿Qué diferencia hay entre una web corporativa y una básica?',
      answer:
        'Una web corporativa incluye mayor complejidad en estructura, secciones específicas para empresas (casos de éxito, equipo, certificaciones), integraciones con sistemas empresariales, diseño más elaborado y funcionalidades avanzadas de captación de leads.',
    },
  ];

  return (
    <>
      <SEOLandingHero
        title='Páginas Web para Empresas'
        subtitle='Páginas web profesionales que transmiten confianza y generan contactos'
        description='Diseñamos páginas web profesionales para empresas, negocios locales, clínicas, academias y consultorías que necesitan explicar sus servicios y generar contactos. Presupuesto cerrado antes de empezar.'
        ctaText='Solicitar propuesta'
        onCTAClick={openModal}
        secondaryCTAText='Llamar Ahora'
        secondaryCTAAction={callPhone}
      />

      <SEOProblem
        title='¿Tu Web Corporativa No Está a la Altura de tu Empresa?'
        subtitle='Estos son los desafíos que ayudamos a resolver'
        problems={problems}
      />

      <SEOBenefits
        title='Ventajas de Tener una Web Corporativa Profesional'
        benefits={benefits}
      />

      <SEOFeatures
        title='Qué Incluye tu Web Corporativa'
        subtitle='Todo lo necesario para una presencia digital empresarial de alto nivel'
        features={features}
      />

      <Portfolio />

      <SEOProcess
        title='Un proceso claro desde el primer mensaje'
        steps={process}
      />

      <Testimonials />

      <SEOWhyMe
        title='Por Qué Elegir Nuestros Servicios para tu Empresa'
        subtitle='Experiencia y profesionalidad al servicio de tu negocio'
        reasons={whyMeReasons}
      />

      <SEOFAQ
        title='Preguntas Frecuentes sobre Webs Corporativas'
        faqs={faqs}
      />

      <SEOCTAFinal
        title='¿Listo para Impulsar la Presencia Digital de tu Empresa?'
        subtitle='Solicita una propuesta sin compromiso y descubre cómo una página web profesional puede ayudar a tu negocio a generar más contactos.'
        buttonText='Solicitar propuesta'
        onButtonClick={openModal}
      />

      <ContactForm preselectedPlan='Página Web' />
    </>
  );
};

export default PaginasWebEmpresas;
