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
        label='¿QUÉ ES PEREIRAWEB?'
        title='Agencia de diseño web y marketing digital con atención directa.'
        paragraphs={[
          <>
            Somos una agencia{' '}
            <strong className='font-extrabold'>100% online</strong> y trabajamos
            contigo de forma directa. Tendrás{' '}
            <strong className='font-extrabold'>
              contacto directo en todo momento con quien lleva tu proyecto
            </strong>
            : correo, teléfono, videollamada o presencial (si estás en Madrid,
            Galicia o Valencia).
          </>,
          <>
            <strong className='font-extrabold'>Tocamos todos los palos</strong>,
            y eso nos permite elegir la mejor solución para cada proyecto:
          </>,
          <>
            Desarrollo web con{' '}
            <strong className='font-extrabold'>WordPress</strong>, desarrollo{' '}
            <strong className='font-extrabold'>a medida</strong>,{' '}
            <strong className='font-extrabold'>aplicaciones móviles</strong>,{' '}
            <strong className='font-extrabold'>SEO</strong> y{' '}
            <strong className='font-extrabold'>branding</strong>. Todo en
            función de{' '}
            <strong className='font-extrabold'>
              lo que realmente necesitas
            </strong>
            .
          </>,
        ]}
        imageAlt='Equipo de PereiraWeb trabajando en diseño y desarrollo web'
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        imageSrc='/img/fikret-tozak-rfNLa1HL7eY-unsplash.jpg'
      />
      <Services />
      <Team
        label='¿QUIÉN ESTÁ DETRÁS DE PEREIRAWEB?'
        title='Estas somos las personas que vamos a encargarnos de tu proyecto.'
        paragraphs={[
          <>
            Queremos que nos pongas caras. Que puedas ver nuestros portfolios y
            contactar con nosotros para lo que necesites:{' '}
            <strong className='font-extrabold'>siempre contestamos</strong>.
            Sobre todo, que sientas{' '}
            <strong className='font-extrabold'>
              seguridad al confiarnos la parte digital de tu negocio
            </strong>
            . Aunque PereiraWeb acaba de empezar,{' '}
            <strong className='font-extrabold'>
              nosotros llevamos años trabajando en esto
            </strong>
            .
          </>,
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
