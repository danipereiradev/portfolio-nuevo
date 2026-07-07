import {
  Search,
  TrendingUp,
  Target,
  FileText,
  BarChart,
  Award,
  Clock,
  Shield,
  Headphones,
  Zap,
  Users,
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
import ContactForm from '../components/ContactForm';
import Testimonials from '../components/Testimonials';
import Portfolio from '../components/Portfolio';

const ServicioSEO = () => {
  const { openModal } = useContactModal();

  usePageMeta({
    title: 'Posicionamiento SEO | Optimización Web para Google | Dani Pereira',
    description:
      'Servicios de posicionamiento SEO en España. Mejora tu ranking en Google, aumenta el tráfico orgánico y consigue más clientes. Consultoría SEO profesional.',
    path: '/posicionamiento-web-seo',
  });

  const callPhone = () => {
    trackPhoneClick('ServicioSEOHero');
    window.location.href = 'tel:+34644669828';
  };

  const problems = [
    {
      text: 'Tu web no aparece en Google cuando buscan tus servicios o productos',
    },
    {
      text: 'Tu competencia está por encima de ti en los resultados de búsqueda',
    },
    { text: 'Recibes poco tráfico orgánico y dependes de publicidad de pago' },
    { text: 'No sabes qué palabras clave te interesan ni cómo posicionarte' },
    {
      text: 'Tu web tiene problemas técnicos que perjudican el posicionamiento',
    },
    { text: 'Inviertes en SEO pero no ves resultados claros ni mejoras' },
  ];

  const benefits = [
    {
      icon: Search,
      title: 'Más Visibilidad en Google',
      description:
        'Mejoro tu posición en los resultados de búsqueda de Google para que tus clientes potenciales te encuentren fácilmente.',
    },
    {
      icon: TrendingUp,
      title: 'Aumento de Tráfico Orgánico',
      description:
        'Incremento las visitas cualificadas a tu web desde buscadores, atrayendo usuarios realmente interesados en tus productos o servicios.',
    },
    {
      icon: Target,
      title: 'Captación de Clientes Cualificados',
      description:
        'Optimizo para keywords comerciales que atraen visitantes con intención de compra, generando más oportunidades de negocio.',
    },
    {
      icon: FileText,
      title: 'Contenido Optimizado',
      description:
        'Creo y optimizo contenidos que responden a las búsquedas de tu audiencia y posicionan tu web como referente del sector.',
    },
    {
      icon: BarChart,
      title: 'Informes y Seguimiento',
      description:
        'Te proporciono informes detallados con métricas de posicionamiento, tráfico y conversiones para medir resultados reales.',
    },
    {
      icon: Award,
      title: 'SEO Ético y Duradero',
      description:
        'Aplico técnicas white hat SEO que aseguran resultados sostenibles a largo plazo sin riesgo de penalizaciones.',
    },
  ];

  const features = [
    {
      title: 'Auditoría SEO Completa',
      description:
        'Análisis exhaustivo de tu web, competencia y oportunidades de posicionamiento con informe detallado.',
    },
    {
      title: 'Investigación de Palabras Clave',
      description:
        'Estudio de keywords relevantes con volumen de búsqueda y baja competencia para tu sector.',
    },
    {
      title: 'Optimización On-Page',
      description:
        'Mejora de títulos, meta descriptions, encabezados, contenido y estructura interna.',
    },
    {
      title: 'SEO Técnico',
      description:
        'Optimización de velocidad, mobile-first, Core Web Vitals, schema markup y aspectos técnicos.',
    },
    {
      title: 'Creación de Contenido SEO',
      description:
        'Redacción y optimización de contenidos que atraen tráfico cualificado y convierten.',
    },
    {
      title: 'Link Building Ético',
      description:
        'Estrategia de enlaces de calidad desde sitios relevantes y autorizados de tu sector.',
    },
    {
      title: 'SEO Local',
      description:
        'Optimización para búsquedas locales, Google My Business y posicionamiento geográfico.',
    },
    {
      title: 'Informes Mensuales',
      description:
        'Reportes con evolución de posiciones, tráfico, conversiones y acciones realizadas.',
    },
  ];

  const whyMeReasons = [
    {
      icon: Clock,
      title: '+12 Años en SEO',
      description:
        'Experiencia posicionando webs de diferentes sectores con resultados medibles y duraderos.',
    },
    {
      icon: Target,
      title: 'Enfoque en ROI',
      description:
        'Me centro en keywords que generan negocio real, no solo tráfico. Busco conversiones, no visitas.',
    },
    {
      icon: Shield,
      title: 'SEO White Hat',
      description:
        'Solo técnicas éticas y seguras. Sin atajos ni trucos que puedan penalizar tu web.',
    },
    {
      icon: Headphones,
      title: 'Comunicación Transparente',
      description:
        'Informes claros mensuales. Siempre sabrás qué estoy haciendo y qué resultados estoy consiguiendo.',
    },
    {
      icon: Zap,
      title: 'Resultados Medibles',
      description:
        'Implemento seguimiento detallado de posiciones, tráfico, leads y ventas generadas por SEO.',
    },
    {
      icon: Users,
      title: 'Atención Personalizada',
      description:
        'Trabajo directamente contigo sin intermediarios. Adapto la estrategia a tu negocio específico.',
    },
  ];

  const process = [
    {
      number: '1',
      title: 'Auditoría SEO Completa',
      description:
        'Analizo tu web actual, estudios de competencia y palabras clave para identificar oportunidades de mejora y definir una estrategia SEO efectiva.',
    },
    {
      number: '2',
      title: 'Optimización On-Page',
      description:
        'Optimizo títulos, descripciones, encabezados, contenidos, imágenes y estructura interna de tu web para mejorar el posicionamiento.',
    },
    {
      number: '3',
      title: 'Optimización Técnica',
      description:
        'Mejoro velocidad de carga, adaptabilidad móvil, estructura de URLs, robots.txt, sitemap y otros aspectos técnicos clave para el SEO.',
    },
    {
      number: '4',
      title: 'Creación de Contenido SEO',
      description:
        'Desarrollo contenidos optimizados para keywords estratégicas que atraen tráfico cualificado y responden a las búsquedas de tu audiencia.',
    },
    {
      number: '5',
      title: 'Seguimiento y Mejora Continua',
      description:
        'Monitorizo posiciones, tráfico y conversiones, ajustando la estrategia para mantener y mejorar resultados mes a mes.',
    },
  ];

  const faqs = [
    {
      question: '¿Cuánto tiempo se tarda en ver resultados de SEO?',
      answer:
        'Los resultados de SEO suelen empezar a verse entre 3-6 meses. El posicionamiento orgánico es un proceso gradual que requiere tiempo para que Google reconozca las mejoras. Sin embargo, algunos cambios técnicos pueden mostrar mejoras más rápidas.',
    },
    {
      question: '¿Cuánto cuesta un servicio de posicionamiento SEO?',
      answer:
        'Los servicios SEO suelen ofrecerse con tarifas mensuales que varían según el alcance del proyecto. Desde consultoría puntual por proyecto hasta planes mensuales desde 500€ IVA incluido. El precio depende de la competitividad del sector y objetivos.',
    },
    {
      question: '¿Qué diferencia hay entre SEO y SEM/Google Ads?',
      answer:
        'El SEO es posicionamiento orgánico gratuito que se mantiene en el tiempo, mientras que SEM/Google Ads son anuncios de pago que desaparecen al dejar de invertir. El SEO requiere más tiempo pero ofrece resultados duraderos y rentabilidad a largo plazo.',
    },
    {
      question: '¿Garantizan la primera posición en Google?',
      answer:
        'Ningún profesional SEO serio puede garantizar la primera posición, ya que depende del algoritmo de Google. Lo que sí garantizo es aplicar las mejores prácticas SEO, trabajo constante y mejoras medibles en posiciones y tráfico orgánico.',
    },
    {
      question: '¿El SEO funciona para cualquier tipo de negocio?',
      answer:
        'Sí, el SEO beneficia a cualquier negocio con presencia online: tiendas online, empresas locales, servicios profesionales, blogs, marketplaces, etc. Adapto la estrategia SEO a las características y objetivos específicos de cada negocio.',
    },
    {
      question: '¿Qué incluye un servicio de SEO?',
      answer:
        'Nuestro servicio SEO incluye auditoría inicial, investigación de keywords, optimización on-page y técnica, creación de contenidos optimizados, link building ético, informes mensuales de seguimiento y consultoría continua para alcanzar objetivos.',
    },
  ];

  return (
    <>
      <SEOLandingHero
        title='Posicionamiento SEO en Google'
        subtitle='Mejora tu Visibilidad y Atrae Más Clientes'
        description='Optimizo tu web para que aparezca en las primeras posiciones de Google, generando tráfico cualificado que se convierte en clientes reales.'
        ctaText='Solicita auditoría SEO'
        onCTAClick={openModal}
        secondaryCTAText='Llamar Ahora'
        secondaryCTAAction={callPhone}
      />

      <SEOProblem
        title='¿Tu Web No Aparece en Google?'
        subtitle='Estos son los problemas SEO más comunes que resuelvo'
        problems={problems}
      />

      <SEOBenefits
        title='Beneficios del Posicionamiento SEO para tu Negocio'
        benefits={benefits}
      />

      <SEOFeatures
        title='Qué Incluye Nuestro Servicio de SEO'
        subtitle='Estrategia SEO completa para posicionar tu web en Google'
        features={features}
      />

      <Portfolio />

      <SEOProcess title='Nuestra Metodología de Trabajo SEO' steps={process} />

      <Testimonials />

      <SEOWhyMe
        title='Por Qué Confiar en Mis Servicios de SEO'
        subtitle='Experiencia, ética y resultados en posicionamiento web'
        reasons={whyMeReasons}
      />

      <SEOFAQ title='Preguntas Frecuentes sobre SEO' faqs={faqs} />

      <SEOCTAFinal
        title='¿Listo para Dominar los Resultados de Google?'
        subtitle='Solicita tu auditoría SEO gratuita y descubre el potencial de posicionamiento de tu web. Te muestro qué mejoras implementar para superar a tu competencia.'
        buttonText='Solicita auditoría SEO'
        onButtonClick={openModal}
      />

      <ContactForm preselectedPlan='Posicionamiento SEO' />
    </>
  );
};

export default ServicioSEO;
