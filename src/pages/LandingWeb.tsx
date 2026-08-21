import { FileCheck, Handshake, LayoutTemplate } from 'lucide-react';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import SEOBenefits from '../components/SEOBenefits';
import SEOFAQ from '../components/SEOFAQ';
import Services from '../components/Services';
import { Team } from '../components/Team';
import Testimonials from '../components/Testimonials';
import { TextImage } from '../components/TextImage';
import TrustBar from '../components/TrustBar';
import SEOProcess from '../components/SEOProcess';
import HeroCta from '../components/HeroCta';

const LandingWeb = () => {
  /* const problems = [
    'Solo redes: cuando Instagram cambia el algoritmo, desapareces.',
    'Web vieja o confusa: el cliente entra y se va en diez segundos.',
    'Presupuestos hinchados con cosas que no vas a usar.',
    'Quieres saber precio, plazos y qué entra… antes de pagar.',
  ];

  const deliverables = [
    'Web publicada con tu dominio',
    'Diseño propio, no plantilla genérica',
    'Revisada en móvil',
    'Formulario y WhatsApp listos',
    'Hosting y dominio incluidos',
    'Base para que Google la encuentre',
    'Estadísticas de visitas',
    'Propuesta con precio y alcance por escrito',
  ];

  const sectors = [
    {
      icon: Stethoscope,
      title: 'Clínicas y salud',
      description: 'Servicios, equipo, horarios y cómo contactar.',
    },
    {
      icon: Smile,
      title: 'Dentistas',
      description: 'Tratamientos y pedir cita sin laberinto.',
    },
    {
      icon: Brain,
      title: 'Psicólogos',
      description: 'Especialidades y un primer contacto sencillo.',
    },
    {
      icon: Scale,
      title: 'Abogados',
      description: 'Áreas de práctica y contacto discreto.',
    },
    {
      icon: Hammer,
      title: 'Reformas y oficios',
      description: 'Trabajos, zona y pedir presupuesto.',
    },
    {
      icon: GraduationCap,
      title: 'Academias',
      description: 'Cursos, horarios e inscripción.',
    },
    {
      icon: Dumbbell,
      title: 'Gimnasios',
      description: 'Actividades, horarios y altas.',
    },
    {
      icon: Sparkles,
      title: 'Estética',
      description: 'Tratamientos y reserva de cita.',
    },
    {
      icon: UtensilsCrossed,
      title: 'Hostelería',
      description: 'Carta, dónde estás y cómo llamar.',
    },
    {
      icon: Store,
      title: 'Autónomos y pymes',
      description: 'Una web que diga qué haces y cómo te escriben.',
    },
  ];

  const features = [
    {
      title: 'Bien en cualquier pantalla',
      description: 'La miramos en móvil, tablet y ordenador antes de publicar.',
    },
    {
      title: 'Que no se eternice cargando',
      description: 'Páginas e imágenes ligeras. Nadie espera 8 segundos.',
    },
    {
      title: 'Lista para Google',
      description:
        'Títulos y estructura en orden para que el buscador la entienda.',
    },
    {
      title: 'Formulario y WhatsApp',
      description: 'El cliente elige cómo escribirte.',
    },
    {
      title: 'HTTPS desde el día uno',
      description: 'Publicación con conexión segura.',
    },
    {
      title: 'Hosting y dominio incluidos',
      description:
        'Tu dominio, tu alojamiento. Sin subdominios raros ni marcas ajenas.',
    },
  ];

  const processSteps = [
    {
      number: '1',
      title: 'Nos cuentas el caso',
      description:
        'Qué haces, a quién te diriges y qué quieres que haga la web.',
    },
    {
      number: '2',
      title: 'Te mandamos la propuesta',
      description: 'Precio, plazos, lo incluido. Por escrito.',
    },
    {
      number: '3',
      title: 'La montamos',
      description:
        'Con tu marca, tus textos y tus fotos (o te ayudamos a ordenarlos).',
    },
    {
      number: '4',
      title: 'Revisas y sale online',
      description: 'Afinamos, conectamos el dominio y listo.',
    },
  ]; */

  /*  const features = [
    {
      title: 'Bien en cualquier pantalla',
      description: 'La miramos en móvil, tablet y ordenador antes de publicar.',
    },
    {
      title: 'Que no se eternice cargando',
      description: 'Páginas e imágenes ligeras. Nadie espera 8 segundos.',
    },
    {
      title: 'Lista para Google',
      description:
        'Títulos y estructura en orden para que el buscador la entienda.',
    },
    {
      title: 'Formulario y WhatsApp',
      description: 'El cliente elige cómo escribirte.',
    },
    {
      title: 'HTTPS desde el día uno',
      description: 'Publicación con conexión segura.',
    },
    {
      title: 'Hosting y dominio incluidos',
      description:
        'Tu dominio, tu alojamiento. Sin subdominios raros ni marcas ajenas.',
    },
  ]; */

  /*  const processSteps = [
    {
      number: '1',
      title: 'Nos cuentas qué necesitas',
      description:
        'WhatsApp, email, llamada o videollamada. Si estás en Madrid, también podemos vernos. Nos dices qué haces y qué te falta.',
    },
    {
      number: '2',
      title: 'Te enviamos una propuesta',
      description:
        'Alcance, plazos, precio y cómo se paga. Por escrito, antes de empezar.',
    },
    {
      number: '3',
      title: 'Montamos la web o la tienda',
      description:
        'Estructura, textos, móvil y lo que hayas pedido. Sin agencia de 40 personas en medio.',
    },
    {
      number: '4',
      title: 'Publicamos y te dejamos usándola',
      description:
        'Dominio, hosting y un repaso contigo. Si quieres, luego hay mantenimiento mensual.',
    },
  ]; */

  const processSteps = [
    {
      number: '1',
      title: 'Nos cuentas el caso',
      description:
        'Formulario, WhatsApp o llamada. Qué haces y qué tiene que hacer la web. Aún no hay nada que pagar.',
    },
    {
      number: '2',
      title: 'Te mandamos la propuesta',
      description:
        'Precio, plazos y qué entra. Por escrito. Si no encaja, lo dices y no pasa nada.',
    },
    {
      number: '3',
      title: 'La montamos',
      description:
        'Con tu marca, tus textos y tus fotos. Si falta algo, te decimos qué necesitamos. Tú revisas.',
    },
    {
      number: '4',
      title: 'Se publica y queda tuya',
      description:
        'Conectamos el dominio, se ve bien en el móvil y te pueden escribir. La web es tuya.',
    },
  ];

  const problems = [
    {
      icon: FileCheck,
      title: 'Precio y plazos, por escrito',
      description:
        'Antes de empezar: qué entra, cuánto sale y cuándo está. Sin packs hinchados ni “ya te digo”.',
    },
    {
      icon: LayoutTemplate,
      title: 'Una web tuya, no una plantilla',
      description:
        'Diseño a medida con tu marca, tus textos y tus fotos. Si buscas la de 79 € igual para todos, no somos eso.',
    },
    {
      icon: Handshake,
      title: 'Hablas con quien la monta',
      description:
        'Estudio pequeño. Te atiende el equipo que diseña y desarrolla, no un comercial que luego desaparece.',
    },
  ];

  const faqs = [
    {
      question: '¿Es una plantilla igual para todos?',
      answer:
        'No. Se adapta a tu imagen, textos y fotos. Si solo quieres una plantilla barata, hay sitios mejores para eso.',
    },
    {
      question: '¿Cuánto cuesta?',
      answer:
        'Orientación: muchas webs entre 400 € y 3.000 € + IVA. Te damos un número concreto tras hablar contigo.',
    },
    {
      question: '¿Quién prepara textos e imágenes?',
      answer:
        'Tú nos mandas lo que tengas. Lo ordenamos y lo metemos en la web. Redactar todo desde cero se valora aparte.',
    },
    {
      question: '¿Puedo usar mi dominio?',
      answer:
        'Sí, es tuyo. Lo configuramos o te ayudamos a registrar uno nuevo.',
    },
    {
      question: '¿El hosting está incluido?',
      answer: 'Sí, para publicar la web. Lo confirmamos en la propuesta.',
    },
    {
      question: '¿Cuánto tarda?',
      answer:
        'Depende del alcance. El plazo de la propuesta cuenta desde que tenemos lo necesario, no desde el primer “hola”.',
    },
    {
      question: '¿Y si quiero vender productos?',
      answer: 'Eso es tienda online. Te pasamos a esa propuesta.',
    },
  ];

  return (
    <>
      <HeroCta
        title='La página web a medida que siempre has necesitado'
        description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
      quia veritatis voluptatibus, dicta id reprehenderit deserunt culpa
      corporis corrupti accusantium.'
        buttonText='CONTACTA AHORA'
        backgroundUrl='/img/web-design-charlesdeluvio.webp'
        heroType='form'
        hasButton
        formTitle='Nosotros te contactámos'
        formDescription='Déjanos tus datos y nos pondremos en contacto.'
        formSectionInfo='Hero 1 Home'
        hasBackground
        hasReviewBadge
        isTopHero
      />
      <TrustBar />
      <SEOBenefits
        title='Si estás contratando una web, esto es lo que te llevas'
        subtitle='Precio cerrado, diseño a medida y trato directo. Lo que buscas cuando escribes “agencia de diseño web”.'
        benefits={problems}
      />
      <SEOProcess
        title='Así se contrata la web'
        subtitle='Cuatro pasos. Sabes precio y plazos antes de empezar, y la web queda a tu nombre.'
        steps={processSteps}
      />

      <HeroCta
        title='¿ Nos ponemos manos a la obra ?'
        description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
      quia veritatis voluptatibus, dicta id reprehenderit deserunt culpa
      corporis corrupti accusantium.'
        buttonText='TIENDAS ONLINE'
        heroType='form'
        hasButton
        formTitle='Nosotros te contactámos'
        formDescription='Déjanos tus datos y nos pondremos en contacto.'
        formSectionInfo='Hero CTA 2 Home'
        hasBackground={false}
        hasReviewBadge={false}
      />

      <Team
        label={'TUS EXPERTOS EN DISEÑO WEB'}
        title='Desarrollamos webs pensado en la escalabilidad y el crecimiento de tu
          negocio.'
        paragraphs={[
          'En Pereiraweb somos directos: una web lenta o con errores es una fuga constante de dinero. Por eso, nuestra metodología en el desarrollo de tiendas online.',
        ]}
      />
      <Portfolio contained />
      <Testimonials />

      <div id='faq' className='scroll-mt-24'>
        <SEOFAQ title='Te resolvemos todas tus dudas' faqs={faqs} />
      </div>
      <HeroCta
        title='¿ Nos ponemos manos a la obra ?'
        description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
      quia veritatis voluptatibus, dicta id reprehenderit deserunt culpa
      corporis corrupti accusantium.'
        buttonText='TIENDAS ONLINE'
        heroType='form'
        hasButton
        formTitle='Nosotros te contactámos'
        formDescription='Déjanos tus datos y nos pondremos en contacto.'
        formSectionInfo='Hero CTA 2 Home'
        hasBackground={false}
        hasReviewBadge
      />
    </>
  );
};

export default LandingWeb;
