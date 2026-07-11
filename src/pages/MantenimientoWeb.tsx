import {
  Shield,
  RefreshCw,
  Zap,
  Lock,
  TrendingUp,
  HeadphonesIcon,
  Clock,
  Target,
  Award,
} from 'lucide-react';
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
import SEOProblem from '../components/SEOProblem';
import SEOBenefits from '../components/SEOBenefits';
import SEOFeatures from '../components/SEOFeatures';
import SEOProcess from '../components/SEOProcess';
import SEOWhyMe from '../components/SEOWhyMe';
import SEOFAQ from '../components/SEOFAQ';
import SEOCTAFinal from '../components/SEOCTAFinal';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';

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

  const problems = [
    { text: 'Tu web está lenta y tarda en cargar, perdiendo visitantes' },
    {
      text: 'No tienes copias de seguridad y temes perder toda tu información',
    },
    {
      text: 'Tu web muestra errores o funcionalidades que han dejado de funcionar',
    },
    {
      text: 'No sabes si tu web es segura frente a ataques o hackeos',
    },
    {
      text: 'Necesitas hacer cambios pero no tienes tiempo o conocimientos técnicos',
    },
    {
      text: 'Tu web está desactualizada y no cumple con los estándares modernos',
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Seguridad Garantizada',
      description:
        'Monitorizamos tu web 24/7 y aplicamos parches de seguridad inmediatamente para protegerte de vulnerabilidades y ataques.',
    },
    {
      icon: RefreshCw,
      title: 'Actualizaciones Automáticas',
      description:
        'Mantenemos tu web, plugins y sistema actualizados sin que tengas que preocuparte por nada, evitando incompatibilidades.',
    },
    {
      icon: Zap,
      title: 'Optimización Continua',
      description:
        'Mejoramos constantemente la velocidad y rendimiento de tu web para ofrecer la mejor experiencia a tus usuarios.',
    },
    {
      icon: Lock,
      title: 'Copias de Seguridad Diarias',
      description:
        'Realizamos backups automáticos diarios de tu web para que nunca pierdas información importante y puedas recuperarla rápidamente.',
    },
    {
      icon: TrendingUp,
      title: 'Monitoreo y Reporting',
      description:
        'Te enviamos informes mensuales sobre el estado de tu web, métricas de rendimiento y las mejoras implementadas.',
    },
    {
      icon: HeadphonesIcon,
      title: 'Soporte Técnico Prioritario',
      description:
        'Acceso directo a soporte técnico profesional para resolver cualquier incidencia o duda de forma rápida y eficiente.',
    },
  ];

  const features = [
    {
      title: 'Actualizaciones de CMS y Plugins',
      description:
        'Mantenemos WordPress, WooCommerce y todos los plugins actualizados a las últimas versiones estables.',
    },
    {
      title: 'Monitorización 24/7',
      description:
        'Vigilancia continua de disponibilidad, tiempo de carga y posibles errores en tu sitio web.',
    },
    {
      title: 'Copias de Seguridad Automáticas',
      description:
        'Backups diarios completos almacenados en la nube con retención de 30 días.',
    },
    {
      title: 'Optimización de Velocidad',
      description:
        'Limpieza de base de datos, caché, compresión de imágenes y optimización de código.',
    },
    {
      title: 'Seguridad y Protección',
      description:
        'Escaneo de malware, firewall, certificado SSL y protección contra ataques DDoS.',
    },
    {
      title: 'Cambios y Actualizaciones',
      description:
        'Modificaciones de contenido, textos, imágenes o pequeños ajustes de diseño incluidos cada mes.',
    },
    {
      title: 'Informes Mensuales',
      description:
        'Reportes detallados con métricas de rendimiento, seguridad y acciones realizadas.',
    },
    {
      title: 'Soporte Técnico Ilimitado',
      description:
        'Asistencia técnica por email o WhatsApp con respuesta en máximo 2 horas.',
    },
  ];

  const process = [
    {
      number: '1',
      title: 'Auditoría Inicial',
      description:
        'Analizamos el estado actual de tu web: seguridad, velocidad, SEO y posibles vulnerabilidades. Te entregamos un informe completo.',
    },
    {
      number: '2',
      title: 'Configuración del Servicio',
      description:
        'Instalamos herramientas de monitorización, configuramos copias de seguridad automáticas y optimizamos la web.',
    },
    {
      number: '3',
      title: 'Mantenimiento Continuo',
      description:
        'Realizamos actualizaciones, optimizaciones y monitorizamos tu web constantemente sin que tengas que hacer nada.',
    },
    {
      number: '4',
      title: 'Reporting Mensual',
      description:
        'Te enviamos un informe cada mes con todas las acciones realizadas, métricas de rendimiento y recomendaciones de mejora.',
    },
  ];

  const whyMeReasons = [
    {
      icon: Clock,
      title: '+12 Años de Experiencia',
      description:
        'Más de una década manteniendo webs de todo tipo, desde blogs hasta grandes tiendas online.',
    },
    {
      icon: Target,
      title: 'Enfoque Proactivo',
      description:
        'No esperamos a que surjan problemas. Identificamos y resolvemos incidencias antes de que afecten a tu negocio.',
    },
    {
      icon: Award,
      title: 'Servicio Personalizado',
      description:
        'No llevamos decenas de webs a la vez. Cada cliente tiene un contacto directo y una forma de trabajar acordada entre los dos.',
    },
    {
      icon: HeadphonesIcon,
      title: 'Soporte Humano Real',
      description:
        'Hablas directamente con nuestro equipo, sin intermediarios ni bots. Respondemos todas tus dudas de forma clara y cercana.',
    },
    {
      icon: Shield,
      title: 'Transparencia Total',
      description:
        'Informes mensuales detallados de todo lo que hacemos. Sabrás exactamente en qué invertimos el tiempo.',
    },
    {
      icon: TrendingUp,
      title: 'Mejora Continua',
      description:
        'No solo mantenemos, también optimizamos constantemente tu web para mejorar velocidad, SEO y conversiones.',
    },
  ];

  const faqs = [
    {
      question: '¿Qué incluye el servicio de mantenimiento web?',
      answer:
        'Nuestro servicio incluye actualizaciones de CMS y plugins, copias de seguridad diarias, monitorización 24/7, optimización de velocidad, escaneo de seguridad, cambios mensuales de contenido, informes detallados y soporte técnico ilimitado.',
    },
    {
      question: '¿Cuánto cuesta el mantenimiento web mensual?',
      answer:
        'Los planes de mantenimiento se contratan de forma mensual, sin permanencia. El precio varía según el tamaño de tu web, tecnologías utilizadas y nivel de soporte requerido. Preparamos un presupuesto personalizado sin compromiso.',
    },
    {
      question: '¿Qué pasa si mi web tiene un problema urgente?',
      answer:
        'Respondemos a incidencias urgentes en máximo 2 horas durante horario laboral. Para emergencias críticas fuera de horario, ofrecemos soporte prioritario 24/7 en planes premium.',
    },
    {
      question: '¿Hacéis copias de seguridad de mi web?',
      answer:
        'Sí, realizamos copias de seguridad automáticas diarias de toda tu web (archivos y base de datos) que almacenamos en la nube con retención de 30 días. Puedes solicitar restauraciones en cualquier momento.',
    },
    {
      question: '¿Puedo cancelar el servicio cuando quiera?',
      answer:
        'Sí, no hay permanencia. Puedes cancelar el servicio con un preaviso de 30 días. Antes de irte, te entregamos una copia completa de tu web actualizada.',
    },
    {
      question: '¿Trabajáis con cualquier tipo de web?',
      answer:
        'Sí, trabajamos con WordPress, WooCommerce, Shopify, webs personalizadas en PHP, React, Vue y otras tecnologías. Si tu web usa una tecnología específica, consúltanos para confirmar compatibilidad.',
    },
    {
      question: '¿Qué tipo de cambios puedo solicitar cada mes?',
      answer:
        'Puedes solicitar cambios de textos, imágenes, añadir páginas simples, modificar formularios, actualizar productos, etc. Los cambios más complejos se presupuestan aparte.',
    },
    {
      question: '¿Me enviaréis informes de lo que hacéis?',
      answer:
        'Sí, cada mes recibes un informe detallado con todas las actualizaciones realizadas, métricas de velocidad y disponibilidad, acciones de seguridad y recomendaciones de mejora.',
    },
  ];

  return (
    <>
      <SEOLandingHero
        title='Mantenimiento Web Profesional'
        subtitle='Soporte mensual, seguridad y tranquilidad para tu web'
        description='Ofrecemos mantenimiento web recurrente: mejoras técnicas, seguridad, copias de seguridad, cambios de contenido y soporte continuo para que tu web funcione siempre bien.'
        ctaText='Solicitar orientación'
        onCTAClick={openModal}
        secondaryCTAText='Llamar Ahora'
        secondaryCTAAction={callPhone}
      />

      <SEOProblem
        title='¿Tu Web Te Está Dando Problemas?'
        subtitle='Estos son los problemas más comunes que solucionamos'
        problems={problems}
      />

      <SEOBenefits
        title='Beneficios del Mantenimiento Web Profesional'
        benefits={benefits}
      />

      <SEOFeatures
        title='Qué Incluye Nuestro Servicio de Mantenimiento'
        subtitle='Todo lo que necesitas para mantener tu web segura, rápida y actualizada'
        features={features}
      />

      <SEOProcess
        title='Un proceso claro desde el primer mensaje'
        steps={process}
      />

      <Testimonials />

      <SEOWhyMe
        title='Por Qué Elegir Nuestro Servicio de Mantenimiento'
        subtitle='+12 años de experiencia cuidando webs como la tuya'
        reasons={whyMeReasons}
      />

      <SEOFAQ
        title='Preguntas Frecuentes sobre Mantenimiento Web'
        faqs={faqs}
      />

      <SEOCTAFinal
        title='¿Listo para Olvidarte de los Problemas Técnicos?'
        subtitle='Nos encargamos del mantenimiento de tu web mientras tú te centras en hacer crecer tu negocio. Sin permanencia, sin sorpresas.'
        buttonText='Solicitar orientación'
        onButtonClick={openModal}
      />

      <div className='text-center pb-16'>
        <button
          onClick={handleWhatsAppClick}
          className='inline-flex items-center gap-1.5 text-sm text-green-600 font-semibold hover:underline'
        >
          O escríbenos directo por WhatsApp
        </button>
      </div>

      <ContactForm preselectedPlan='Mantenimiento Web' />
    </>
  );
};

export default MantenimientoWeb;
