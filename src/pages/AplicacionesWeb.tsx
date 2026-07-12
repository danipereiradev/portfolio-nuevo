import {
  Smartphone,
  Code,
  Database,
  Zap,
  Shield,
  Layers,
  Clock,
  Target,
  Award,
  Headphones,
  TrendingUp,
  Users,
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

const AplicacionesWeb = () => {
  const { openModal } = useContactModal();

  usePageMeta('/desarrollo-aplicaciones-web');

  const callPhone = () => {
    trackPhoneClick('AplicacionesWebHero');
    window.location.href = PHONE_TEL_LINK;
  };

  const problems = [
    {
      text: 'Necesitas una solución web personalizada que no existe en el mercado',
    },
    {
      text: 'Los procesos de tu empresa son complejos y necesitan automatización',
    },
    {
      text: 'Quieres digitalizar y modernizar tu negocio pero no sabes por dónde empezar',
    },
    {
      text: 'Las soluciones estándar no se adaptan a tus necesidades específicas',
    },
    {
      text: 'Necesitas integrar diferentes sistemas y herramientas en una sola plataforma',
    },
    {
      text: 'Tu competencia ya tiene apps web y te está superando en eficiencia',
    },
  ];

  const benefits = [
    {
      icon: Smartphone,
      title: 'Multiplataforma',
      description:
        'Desarrollamos apps web que funcionan perfectamente en navegadores, móviles y tablets, con una sola base de código.',
    },
    {
      icon: Code,
      title: 'Código Limpio y Escalable',
      description:
        'Utilizamos las mejores prácticas de desarrollo para crear aplicaciones mantenibles que pueden crecer con tu negocio.',
    },
    {
      icon: Database,
      title: 'Base de Datos Robusta',
      description:
        'Implementamos sistemas de base de datos seguros y eficientes que gestionan tu información de forma óptima.',
    },
    {
      icon: Zap,
      title: 'Alto Rendimiento',
      description:
        'Aplicaciones rápidas y eficientes optimizadas para ofrecer la mejor experiencia de usuario posible.',
    },
    {
      icon: Shield,
      title: 'Seguridad Avanzada',
      description:
        'Protegemos tu aplicación con autenticación robusta, encriptación de datos y cumplimiento de normativas de seguridad.',
    },
    {
      icon: Layers,
      title: 'Integraciones API',
      description:
        'Conectamos tu aplicación con servicios externos y APIs para ampliar sus funcionalidades y automatizar procesos.',
    },
  ];

  const features = [
    {
      title: 'Diseño UX/UI Personalizado',
      description:
        'Interfaces intuitivas y atractivas diseñadas específicamente para tu caso de uso y usuarios.',
    },
    {
      title: 'Desarrollo Frontend Avanzado',
      description:
        'Aplicaciones con React, Vue o Angular para experiencias de usuario fluidas y modernas.',
    },
    {
      title: 'Backend Robusto y Escalable',
      description:
        'API y lógica de negocio con Node.js, Python o PHP preparadas para alto rendimiento.',
    },
    {
      title: 'Base de Datos Optimizada',
      description:
        'Diseño e implementación de bases de datos SQL o NoSQL según tus necesidades.',
    },
    {
      title: 'Sistema de Autenticación',
      description:
        'Login seguro, gestión de usuarios, roles y permisos adaptados a tu organización.',
    },
    {
      title: 'Panel de Administración',
      description:
        'Dashboard completo para gestionar usuarios, contenido y funcionalidades de tu app.',
    },
    {
      title: 'Integraciones y APIs',
      description:
        'Conectamos tu app con servicios de terceros, CRMs, ERPs y otras herramientas.',
    },
    {
      title: 'Despliegue en Cloud',
      description:
        'Alojamiento en AWS, Google Cloud o Azure con alta disponibilidad y escalabilidad.',
    },
  ];

  const whyMeReasons = [
    {
      icon: Clock,
      title: '+12 Años Desarrollando Apps',
      description:
        'Experiencia creando aplicaciones web de diferentes complejidades y para diversos sectores.',
    },
    {
      icon: Target,
      title: 'Enfoque en Soluciones',
      description:
        'No solo programamos, entendemos tu negocio y creamos soluciones que resuelven problemas reales.',
    },
    {
      icon: Award,
      title: 'Código de Calidad',
      description:
        'Desarrollamos con mejores prácticas, código limpio, documentado y fácil de mantener.',
    },
    {
      icon: Headphones,
      title: 'Comunicación Directa',
      description:
        'Trabajamos directamente contigo sin intermediarios, entendiendo cada requisito a fondo.',
    },
    {
      icon: TrendingUp,
      title: 'Escalabilidad Garantizada',
      description:
        'Arquitecturas preparadas para crecer con tu negocio sin necesidad de rehacer el proyecto.',
    },
    {
      icon: Users,
      title: 'Formación y Soporte',
      description:
        'Te formamos en el uso de la aplicación y ofrecemos soporte continuo para cualquier necesidad.',
    },
  ];

  const process = [
    {
      number: '1',
      title: 'Definición del Proyecto',
      description:
        'Analizamos tu idea, objetivos y necesidades para definir el alcance, funcionalidades y tecnologías más adecuadas para tu aplicación web.',
    },
    {
      number: '2',
      title: 'Prototipado y Diseño UX/UI',
      description:
        'Creamos prototipos interactivos y diseñamos la experiencia de usuario, asegurando que la interfaz sea intuitiva y atractiva.',
    },
    {
      number: '3',
      title: 'Desarrollo Frontend y Backend',
      description:
        'Programamos el frontend con React o Vue y el backend con Node.js o Python, integrando base de datos y lógica de negocio.',
    },
    {
      number: '4',
      title: 'Testing y Optimización',
      description:
        'Realizamos pruebas exhaustivas de funcionalidad, rendimiento y seguridad, optimizando cada aspecto de tu aplicación.',
    },
    {
      number: '5',
      title: 'Despliegue y Mantenimiento',
      description:
        'Publicamos tu aplicación en servidores cloud seguros y ofrecemos mantenimiento continuo, actualizaciones y soporte técnico.',
    },
  ];

  const faqs = [
    {
      question:
        '¿Qué es una aplicación web y en qué se diferencia de una web normal?',
      answer:
        'Una aplicación web es una solución interactiva que permite a los usuarios realizar acciones complejas, gestionar datos y procesos. A diferencia de una web informativa, las apps web incluyen funcionalidades avanzadas como sistemas de login, paneles de usuario, procesamiento de datos en tiempo real y flujos de trabajo personalizados.',
    },
    {
      question: '¿Cuánto cuesta desarrollar una aplicación web a medida?',
      answer:
        'El coste depende de la complejidad, funcionalidades e integraciones necesarias. Preparamos una propuesta a medida y cerrada tras analizar tus necesidades específicas, con opciones de pago flexible.',
    },
    {
      question: '¿Qué tecnologías utilizáis para desarrollar aplicaciones web?',
      answer:
        'Utilizamos tecnologías modernas y probadas como React, Vue.js o Angular para el frontend, Node.js, Python o PHP para el backend, y bases de datos como PostgreSQL o MongoDB. Elegimos el stack tecnológico más adecuado para cada proyecto.',
    },
    {
      question: '¿Cuánto tiempo lleva desarrollar una aplicación web?',
      answer:
        'El tiempo de desarrollo varía según la complejidad. Una aplicación web básica puede estar lista en 8-12 semanas, mientras que proyectos más complejos pueden requerir 3-6 meses. Te proporcionamos un cronograma detallado en la fase de planificación.',
    },
    {
      question: '¿Puedo escalar mi aplicación web en el futuro?',
      answer:
        'Sí, desarrollamos aplicaciones preparadas para crecer. La arquitectura modular permite añadir nuevas funcionalidades, integrar servicios adicionales o ampliar capacidades sin necesidad de rehacer el proyecto desde cero.',
    },
    {
      question: '¿Ofrecéis mantenimiento después del lanzamiento?',
      answer:
        'Sí, ofrecemos planes de mantenimiento que incluyen actualizaciones de seguridad, corrección de bugs, optimizaciones de rendimiento, backups automáticos y soporte técnico continuo para garantizar que tu aplicación funcione perfectamente.',
    },
  ];

  return (
    <>
      <SEOLandingHero
        title='Desarrollo Web a Medida'
        subtitle='Aplicaciones y herramientas web para negocios con necesidades técnicas concretas'
        description='Desarrollamos aplicaciones web, paneles internos y herramientas a medida para automatizar procesos y resolver problemas concretos. Presupuesto cerrado antes de empezar.'
        ctaText='Solicitar propuesta'
        onCTAClick={openModal}
        secondaryCTAText='Llamar Ahora'
        secondaryCTAAction={callPhone}
        secondaryCTAIcon='phone'
      />

      <SEOProblem
        title='¿Necesitas una Aplicación Web Personalizada?'
        subtitle='Estos son los desafíos que resolvemos con apps web a medida'
        problems={problems}
      />

      <SEOBenefits
        title='Ventajas de una Aplicación Web Personalizada'
        benefits={benefits}
      />

      <SEOFeatures
        title='Qué Incluye el Desarrollo de tu App Web'
        subtitle='Todo lo necesario para una aplicación web profesional y escalable'
        features={features}
      />

      <Portfolio />

      <SEOProcess
        title='Un proceso claro desde el primer mensaje'
        steps={process}
      />

      <Testimonials />

      <SEOWhyMe
        title='Por Qué Desarrollar tu App Web con Nosotros'
        subtitle='Experiencia, calidad y resultados en desarrollo web'
        reasons={whyMeReasons}
      />

      <SEOFAQ title='Preguntas Frecuentes sobre Aplicaciones Web' faqs={faqs} />

      <SEOCTAFinal
        title='¿Tienes un Proyecto Digital Más Técnico?'
        subtitle='Cuéntanos sobre tu proyecto. Te ayudamos a definir requisitos, elegir tecnologías y crear una hoja de ruta clara para desarrollar tu solución a medida.'
        buttonText='Solicitar propuesta'
        onButtonClick={openModal}
      />

      <ContactForm preselectedPlan='Desarrollo a Medida' />
    </>
  );
};

export default AplicacionesWeb;
