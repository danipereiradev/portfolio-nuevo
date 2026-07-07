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
import { trackPhoneClick } from '../utils/analytics';
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

const MantenimientoWeb = () => {
  const { openModal } = useContactModal();

  usePageMeta('/mantenimiento-web');

  const callPhone = () => {
    trackPhoneClick('MantenimientoWebHero');
    window.location.href = 'tel:+34644669828';
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
        'Monitorizo tu web 24/7 y aplico parches de seguridad inmediatamente para protegerte de vulnerabilidades y ataques.',
    },
    {
      icon: RefreshCw,
      title: 'Actualizaciones Automáticas',
      description:
        'Mantengo tu web, plugins y sistema actualizado sin que tengas que preocuparte por nada, evitando incompatibilidades.',
    },
    {
      icon: Zap,
      title: 'Optimización Continua',
      description:
        'Mejoro constantemente la velocidad y rendimiento de tu web para ofrecer la mejor experiencia a tus usuarios.',
    },
    {
      icon: Lock,
      title: 'Copias de Seguridad Diarias',
      description:
        'Realizo backups automáticos diarios de tu web para que nunca pierdas información importante y puedas recuperarla rápidamente.',
    },
    {
      icon: TrendingUp,
      title: 'Monitoreo y Reporting',
      description:
        'Te envío informes mensuales sobre el estado de tu web, métricas de rendimiento y las mejoras implementadas.',
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
        'Mantengo WordPress, WooCommerce y todos los plugins actualizados a las últimas versiones estables.',
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
        'Hasta 2 horas mensuales de modificaciones de contenido, textos, imágenes o pequeños ajustes de diseño.',
    },
    {
      title: 'Informes Mensuales',
      description:
        'Reportes detallados con métricas de rendimiento, seguridad y acciones realizadas.',
    },
    {
      title: 'Soporte Técnico Ilimitado',
      description:
        'Asistencia técnica por email o WhatsApp con respuesta en menos de 24 horas.',
    },
  ];

  const process = [
    {
      number: '1',
      title: 'Auditoría Inicial',
      description:
        'Analizo el estado actual de tu web: seguridad, velocidad, SEO y posibles vulnerabilidades. Te entrego un informe completo.',
    },
    {
      number: '2',
      title: 'Configuración del Servicio',
      description:
        'Instalo herramientas de monitorización, configuro copias de seguridad automáticas y optimizo la web.',
    },
    {
      number: '3',
      title: 'Mantenimiento Continuo',
      description:
        'Realizo actualizaciones, optimizaciones y monitoreo tu web constantemente sin que tengas que hacer nada.',
    },
    {
      number: '4',
      title: 'Reporting Mensual',
      description:
        'Te envío un informe cada mes con todas las acciones realizadas, métricas de rendimiento y recomendaciones de mejora.',
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
        'No espero a que surjan problemas. Identifico y resuelvo incidencias antes de que afecten a tu negocio.',
    },
    {
      icon: Award,
      title: 'Servicio Personalizado',
      description:
        'No soy una agencia masiva. Cada cliente recibe atención directa y personalizada adaptada a sus necesidades específicas.',
    },
    {
      icon: HeadphonesIcon,
      title: 'Soporte Humano Real',
      description:
        'Hablas directamente conmigo, sin intermediarios ni bots. Respondo todas tus dudas de forma clara y cercana.',
    },
    {
      icon: Shield,
      title: 'Transparencia Total',
      description:
        'Informes mensuales detallados de todo lo que hago. Sabrás exactamente en qué invierto el tiempo.',
    },
    {
      icon: TrendingUp,
      title: 'Mejora Continua',
      description:
        'No solo mantengo, también optimizo constantemente tu web para mejorar velocidad, SEO y conversiones.',
    },
  ];

  const faqs = [
    {
      question: '¿Qué incluye el servicio de mantenimiento web?',
      answer:
        'Nuestro servicio incluye actualizaciones de CMS y plugins, copias de seguridad diarias, monitorización 24/7, optimización de velocidad, escaneo de seguridad, hasta 2 horas de cambios mensuales, informes detallados y soporte técnico ilimitado.',
    },
    {
      question: '¿Cuánto cuesta el mantenimiento web mensual?',
      answer:
        'Los planes de mantenimiento comienzan desde 60€/mes para webs básicas. El precio varía según el tamaño de tu web, tecnologías utilizadas y nivel de soporte requerido. Te ofrezco un presupuesto personalizado sin compromiso.',
    },
    {
      question: '¿Qué pasa si mi web tiene un problema urgente?',
      answer:
        'Respondo a incidencias urgentes en menos de 2 horas durante horario laboral. Para emergencias críticas fuera de horario, ofrezco soporte prioritario 24/7 en planes premium.',
    },
    {
      question: '¿Hacéis copias de seguridad de mi web?',
      answer:
        'Sí, realizo copias de seguridad automáticas diarias de toda tu web (archivos y base de datos) que almaceno en la nube con retención de 30 días. Puedes solicitar restauraciones en cualquier momento.',
    },
    {
      question: '¿Puedo cancelar el servicio cuando quiera?',
      answer:
        'Sí, no hay permanencia. Puedes cancelar el servicio con un preaviso de 30 días. Antes de irte, te entrego una copia completa de tu web actualizada.',
    },
    {
      question: '¿Trabajáis con cualquier tipo de web?',
      answer:
        'Sí, trabajo con WordPress, WooCommerce, Shopify, webs personalizadas en PHP, React, Vue y otras tecnologías. Si tu web usa una tecnología específica, consúltame para confirmar compatibilidad.',
    },
    {
      question: '¿Qué tipo de cambios puedo solicitar cada mes?',
      answer:
        'Puedes solicitar cambios de textos, imágenes, añadir páginas simples, modificar formularios, actualizar productos, etc. Incluimos hasta 2 horas mensuales. Cambios más complejos se presupuestan aparte.',
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
        subtitle='Protege, Actualiza y Optimiza tu Sitio Web'
        description='Servicio completo de mantenimiento web: seguridad, actualizaciones, copias de seguridad y soporte técnico para que tu web funcione perfectamente 24/7.'
        ctaText='Revisar mi web'
        onCTAClick={openModal}
        secondaryCTAText='Llamar Ahora'
        secondaryCTAAction={callPhone}
      />

      <SEOProblem
        title='¿Tu Web Te Está Dando Problemas?'
        subtitle='Estos son los problemas más comunes que soluciono'
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

      <SEOProcess title='Cómo Funciona Nuestro Servicio' steps={process} />

      <Testimonials />

      <SEOWhyMe
        title='Por Qué Elegir Mi Servicio de Mantenimiento'
        subtitle='+12 años de experiencia cuidando webs como la tuya'
        reasons={whyMeReasons}
      />

      <SEOFAQ
        title='Preguntas Frecuentes sobre Mantenimiento Web'
        faqs={faqs}
      />

      <SEOCTAFinal
        title='¿Listo para Olvidarte de los Problemas Técnicos?'
        subtitle='Déjame encargarme del mantenimiento de tu web mientras tú te centras en hacer crecer tu negocio. Sin permanencia, sin sorpresas.'
        buttonText='Pedir presupuesto'
        onButtonClick={openModal}
      />

      <ContactForm preselectedPlan='Mantenimiento Web' />
    </>
  );
};

export default MantenimientoWeb;
