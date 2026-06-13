import { useEffect } from 'react';
import {
  Palette,
  Smartphone,
  Zap,
  TrendingUp,
  Users,
  Award,
  Clock,
  Target,
  HeadphonesIcon,
} from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
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
import Portfolio from '../components/Portfolio';

const DisenoWeb = () => {
  const { openModal } = useContactModal();

  useEffect(() => {
    document.title =
      'Diseño Web Profesional | Páginas Web Modernas | Dani Pereira';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Diseño web profesional en Madrid. Creamos páginas web modernas, atractivas y optimizadas que convierten visitantes en clientes. Presupuesto gratuito.',
      );
    }
  }, []);

  const callPhone = () => {
    window.location.href = 'tel:+34644669828';
  };

  const problems = [
    {
      text: 'Tu web actual parece anticuada y no refleja la calidad de tu negocio',
    },
    {
      text: 'No consigues captar la atención de los visitantes ni convertirlos en clientes',
    },
    {
      text: 'Tu web no se ve bien en móviles y pierdes oportunidades de negocio',
    },
    { text: 'La competencia tiene mejores webs y te están quitando clientes' },
    { text: 'Necesitas una web profesional pero no sabes por dónde empezar' },
    {
      text: 'Inviertes en marketing pero tu web no convierte las visitas en ventas',
    },
  ];

  const benefits = [
    {
      icon: Palette,
      title: 'Diseño Personalizado',
      description:
        'Creamos un diseño único que refleja la identidad de tu marca y se adapta perfectamente a tus necesidades específicas.',
    },
    {
      icon: Smartphone,
      title: 'Responsive y Moderno',
      description:
        'Tu web se verá perfecta en todos los dispositivos: móviles, tablets y ordenadores, con tecnologías web de última generación.',
    },
    {
      icon: Zap,
      title: 'Rápida y Optimizada',
      description:
        'Desarrollamos webs ultrarrápidas optimizadas para ofrecer la mejor experiencia de usuario y mejorar tu posicionamiento en Google.',
    },
    {
      icon: TrendingUp,
      title: 'Orientada a Conversión',
      description:
        'Diseñamos cada elemento pensando en convertir visitantes en clientes, con llamadas a la acción estratégicamente ubicadas.',
    },
    {
      icon: Users,
      title: 'Experiencia de Usuario',
      description:
        'Interfaces intuitivas y navegación fluida que facilitan que tus usuarios encuentren lo que buscan rápidamente.',
    },
    {
      icon: Award,
      title: 'Soporte Continuo',
      description:
        'Te acompañamos después del lanzamiento con soporte técnico, actualizaciones y mejoras continuas de tu web.',
    },
  ];

  const process = [
    {
      number: '1',
      title: 'Análisis y Estrategia',
      description:
        'Estudiamos tu negocio, competencia y objetivos para definir la mejor estrategia de diseño web que se adapte a tus necesidades.',
    },
    {
      number: '2',
      title: 'Diseño Visual',
      description:
        'Creamos mockups y prototipos del diseño visual de tu web, asegurando que refleje tu marca y sea atractivo para tu audiencia.',
    },
    {
      number: '3',
      title: 'Desarrollo Web',
      description:
        'Programamos tu web con código limpio y tecnologías modernas, garantizando rapidez, seguridad y facilidad de mantenimiento.',
    },
    {
      number: '4',
      title: 'Pruebas y Ajustes',
      description:
        'Realizamos pruebas exhaustivas en diferentes dispositivos y navegadores, ajustando cada detalle antes del lanzamiento.',
    },
    {
      number: '5',
      title: 'Lanzamiento y Formación',
      description:
        'Publicamos tu web y te formamos para que puedas gestionar contenidos de forma autónoma y aprovechar al máximo tu nueva página.',
    },
  ];

  const faqs = [
    {
      question: '¿Cuánto cuesta el diseño de una página web profesional?',
      answer:
        'El precio del diseño web depende de las funcionalidades que necesites. Una web corporativa básica desde 800 euros, mientras que proyectos más complejos pueden costar más. Te ofrecemos un presupuesto personalizado sin compromiso adaptado a tu presupuesto.',
    },
    {
      question: '¿Cuánto tiempo se tarda en diseñar y desarrollar una web?',
      answer:
        'Una web corporativa estándar suele estar lista en 2-3 semanas. Proyectos más complejos pueden requerir 4-6 semanas. El plazo exacto lo definimos en la reunión inicial según tus requisitos y disponibilidad de contenidos.',
    },
    {
      question: '¿Incluye el diseño web el hosting y dominio?',
      answer:
        'Sí, todos nuestros proyectos incluyen el primer año de hosting gratuito. El dominio también está incluido en el precio. A partir del segundo año, los costes de mantenimiento son muy económicos.',
    },
    {
      question: '¿Podré actualizar yo mismo el contenido de mi web?',
      answer:
        'Por supuesto. Desarrollamos tu web con un panel de administración intuitivo y te damos formación personalizada para que puedas actualizar textos, imágenes y contenidos sin conocimientos técnicos.',
    },
    {
      question: '¿El diseño será optimizado para móviles?',
      answer:
        'Sí, todas nuestras webs son responsive y se adaptan perfectamente a móviles, tablets y ordenadores. Más del 60% del tráfico web proviene de móviles, por lo que es fundamental que tu web se vea perfecta en todos los dispositivos.',
    },
    {
      question: '¿Qué pasa si necesito cambios después del lanzamiento?',
      answer:
        'Incluimos hasta 2 revisiones durante el desarrollo. Después del lanzamiento, ofrecemos soporte continuo para cualquier ajuste, actualización o mejora que necesites, con tarifas muy competitivas.',
    },
  ];

  const features = [
    {
      title: 'Diseño Responsive Profesional',
      description:
        'Tu web se verá perfecta en todos los dispositivos: móviles, tablets y ordenadores de escritorio, adaptándose automáticamente.',
    },
    {
      title: 'Diseño UX/UI Optimizado',
      description:
        'Interfaces intuitivas y navegación fluida diseñada para que tus usuarios encuentren lo que buscan rápidamente.',
    },
    {
      title: 'Optimización SEO Incluida',
      description:
        'Tu web estará optimizada para aparecer en Google desde el primer día con estructura SEO profesional.',
    },
    {
      title: 'Velocidad de Carga Optimizada',
      description:
        'Webs ultrarrápidas con tiempos de carga inferiores a 3 segundos para mejorar la experiencia y el SEO.',
    },
    {
      title: 'Panel de Administración',
      description:
        'Gestiona tu contenido fácilmente con un panel intuitivo sin necesidad de conocimientos técnicos.',
    },
    {
      title: 'Formularios de Contacto',
      description:
        'Formularios personalizados con protección anti-spam para que recibas consultas de calidad.',
    },
    {
      title: 'Integración con RRSS',
      description:
        'Conexión con tus redes sociales y widgets para aumentar tu presencia online.',
    },
    {
      title: 'Hosting y Dominio Incluido',
      description:
        'Primer año de alojamiento web profesional y dominio incluido en el precio.',
    },
  ];

  const technologies = [
    {
      name: 'React',
      icon: '⚛️',
      description: 'Framework moderno para interfaces dinámicas',
    },
    {
      name: 'WordPress',
      icon: '🔧',
      description: 'CMS flexible y fácil de gestionar',
    },
    {
      name: 'Tailwind CSS',
      icon: '🎨',
      description: 'Diseño moderno y personalizado',
    },
    {
      name: 'Next.js',
      icon: '▲',
      description: 'Framework para webs ultrarrápidas',
    },
    { name: 'PHP', icon: '🐘', description: 'Desarrollo backend robusto' },
    { name: 'MySQL', icon: '🗄️', description: 'Base de datos confiable' },
    {
      name: 'Figma',
      icon: '🎭',
      description: 'Diseño de prototipos profesionales',
    },
    { name: 'Git', icon: '📚', description: 'Control de versiones' },
  ];

  const whyMeReasons = [
    {
      icon: Clock,
      title: '+12 Años de Experiencia',
      description:
        'Más de una década diseñando webs exitosas para empresas de todos los tamaños y sectores.',
    },
    {
      icon: Target,
      title: 'Enfoque en Resultados',
      description:
        'No solo diseño webs bonitas, diseño webs que convierten visitantes en clientes y generan resultados reales.',
    },
    {
      icon: Award,
      title: 'Atención Personalizada',
      description:
        'Trabajo directamente contigo sin intermediarios. Cada proyecto recibe mi atención personal y dedicada.',
    },
    {
      icon: HeadphonesIcon,
      title: 'Soporte Continuo',
      description:
        'No te abandono después del lanzamiento. Te acompaño con soporte, formación y mejoras continuas.',
    },
    {
      icon: Palette,
      title: 'Diseños Únicos',
      description:
        'Cada web es única y personalizada. No uso plantillas genéricas, creo diseños adaptados a tu marca.',
    },
    {
      icon: TrendingUp,
      title: 'Transparencia Total',
      description:
        'Sin costes ocultos ni sorpresas. Presupuesto claro desde el principio y comunicación constante.',
    },
  ];

  return (
    <>
      <SEOLandingHero
        title='Diseño Web Profesional'
        subtitle='Páginas Web que Impactan y Convierten'
        description='Creamos sitios web modernos, atractivos y optimizados que reflejan la esencia de tu marca y generan resultados reales para tu negocio.'
        ctaText='Solicitar Presupuesto Gratuito'
        onCTAClick={openModal}
        secondaryCTAText='Llamar Ahora'
        secondaryCTAAction={callPhone}
      />

      <SEOProblem
        title='¿Tu Web Actual No Te Está Dando Resultados?'
        subtitle='Estos son los problemas más comunes que solucionamos'
        problems={problems}
      />

      <SEOBenefits
        title='¿Por Qué Elegir Nuestro Servicio de Diseño Web?'
        benefits={benefits}
      />

      <SEOFeatures
        title='Qué Incluye Nuestro Servicio de Diseño Web'
        subtitle='Todo lo que necesitas para tener una web profesional y efectiva'
        features={features}
      />

      <Portfolio />

      <SEOProcess title='Nuestro Proceso de Diseño Web' steps={process} />

      <Testimonials />

      <SEOWhyMe
        title='Por Qué Trabajar Conmigo'
        subtitle='Más de 10 años creando webs que generan resultados'
        reasons={whyMeReasons}
      />

      <SEOFAQ title='Preguntas Frecuentes sobre Diseño Web' faqs={faqs} />

      <SEOCTAFinal
        title='¿Listo para Tener la Web que Tu Negocio Merece?'
        subtitle='No esperes más para destacar frente a tu competencia. Solicita tu presupuesto personalizado sin compromiso y descubre cómo podemos ayudarte.'
        buttonText='Solicitar Presupuesto Gratuito'
        onButtonClick={openModal}
      />

      <ContactForm preselectedPlan='Diseño Web' />
    </>
  );
};

export default DisenoWeb;
