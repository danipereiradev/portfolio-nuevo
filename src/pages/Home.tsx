import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';

import SEOFAQ from '../components/SEOFAQ';
import { usePageMeta } from '../hooks/usePageMeta';
import { globalFaqs } from '../data/globalFaqs';

import { TextImage } from '../components/TextImage';

import { Team } from '../components/Team';
import HeroCta from '../components/HeroCta';

const Home = () => {
  usePageMeta('/');

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
        formId='contacto'
      />
    </>
  );
};

export default Home;
