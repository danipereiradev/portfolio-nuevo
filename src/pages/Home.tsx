import { useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';

import SEOFAQ from '../components/SEOFAQ';
import { usePageMeta } from '../hooks/usePageMeta';
import { globalFaqs } from '../data/globalFaqs';

import { TextImage } from '../components/TextImage';

import { Team } from '../components/Team';
import TrustBar from '../components/TrustBar';
import HeroCta from '../components/HeroCta';

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
];

/* 
HEADER 
HERO
ABOUT 
CASO DE EXITO
SERVICIOS
PROCESO
CTA (HERO FORM) 
PORQUE PEREIRA WEB
PORTFOLIO
RESEÑAS
EQUIPO
CTA (HERO FORM) 
*/

const Home = () => {
  usePageMeta('/');

  // Permite llegar directamente a una sección vía ancla en la URL
  // (ej. /#portfolio desde un enlace del footer en otra página). El scroll
  // nativo del navegador no funciona de forma fiable en esta SPA porque el
  // elemento con ese id todavía no existe cuando la página carga.
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const timeoutId = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Hero
        title='Agencia de diseño web y marketing digital'
        description='Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        buttonText='CONTACTA AHORA'
        backgroundUrl='/img/web-design-charlesdeluvio.webp'
        hasButton
        hasBackground
        hasReviewBadge={false}
      />
      <TrustBar />
      <TextImage
        label={'PEREIRAWEB'}
        title='Desarrollamos webs pensado en la escalabilidad y el crecimiento de tu
          negocio.'
        paragraphs={[
          'En Pereiraweb somos directos: una web lenta o con errores es una fuga constante de dinero. Por eso, nuestra metodología en el desarrollo de tiendas online combina la arquitectura técnica más avanzada con un enfoque obsesivo en la conversión',
          'Como Agencia de Ecommerce, analizamos tu modelo de negocio para elegir la tecnología que mejor se adapte a tus necesidades, desde Shopify hasta desarrollos a medida',
          'En Pereiraweb somos directos: una web lenta o con errores es una fuga constante de dinero. Por eso, nuestra metodología en el desarrollo de tiendas online combina la arquitectura técnica más avanzada con un enfoque obsesivo en la conversión',
        ]}
      />
      <Services />
      <Team
        label={'CONOCE A TU FUTURO EQUIPO'}
        title='Desarrollamos webs pensado en la escalabilidad y el crecimiento de tu
          negocio.'
        paragraphs={[
          'En Pereiraweb somos directos: una web lenta o con errores es una fuga constante de dinero. Por eso, nuestra metodología en el desarrollo de tiendas online.',
        ]}
      />
      <Portfolio />
      <Testimonials />

      <div id='faq' className='scroll-mt-24'>
        <SEOFAQ title='Te resolvemos todas tus dudas' faqs={globalFaqs} />
      </div>
      <HeroCta
        title='Nos ponemos manos a la obra.'
        description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            quia veritatis voluptatibus, dicta id reprehenderit deserunt culpa
            corporis corrupti accusantium.'
        buttonText='TIENDAS ONLINE'
        backgroundUrl='/img/theme-photos-CGpifH3FjOA-unsplash.jpg'
        heroType='form'
        hasButton={false}
        formTitle='Nosotros te contactámos'
        formDescription='Déjanos tus datos y nos pondremos en contacto.'
        formSectionInfo='Hero CTA 2 Home'
        hasBackground={false}
        hasReviewBadge
      />
    </>
  );
};

export default Home;
