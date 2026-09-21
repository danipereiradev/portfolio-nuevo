import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';

import SEOFAQ from '../components/SEOFAQ';
import { usePageMeta } from '../hooks/usePageMeta';
import { globalFaqs } from '../data/globalFaqs';

import { TextImage } from '../components/TextImage';
import HeroCta from '../components/HeroCta';
import { TalentRecruitStrip } from '../components/TalentRecruitStrip';

const Home = () => {
  usePageMeta('/');

  return (
    <>
      <Hero
        title='Agencia de diseño web y marketing digital'
        description={
          <>
            Ayudamos a pequeñas empresas a construir y hacer funcionar su
            presencia digital
          </>
        }
        buttonText='CONTACTA AHORA'
        buttonHref='#contacto'
        videoUrl='/video/video-hero-36web-corto.mp4'
        backgroundUrl='/video/hero-home-2.jpg'
        overlay='none'
        hasButton
        hasBackground
        hasReviewBadge={false}
        cinematic
      />
      <TextImage
        label='¿QUÉ ES 36WEB?'
        title='Agencia de diseño web y marketing digital con atención directa.'
        paragraphs={[
          <>
            Somos una agencia{' '}
            <strong className='font-extrabold'>100% online</strong> y trabajamos
            contigo de tu a tu. Tendrás{' '}
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
            <strong className='font-extrabold'>
              Posicionamiento en Google
            </strong>{' '}
            y <strong className='font-extrabold'>branding</strong>. Todo en
            función de{' '}
            <strong className='font-extrabold'>
              lo que realmente necesitas
            </strong>
            .
          </>,
        ]}
        imageAlt='Setup de 36web'
        buttonText='LEER MÁS'
        buttonHref='/sobre-36web#about2'
        imageSrc='/img/sections/setup-dani-36web-milo-front.webp'
      />
      <Services
        description={
          <>
            Desde una{' '}
            <strong className='font-extrabold'>web corporativa</strong> hasta
            una <strong className='font-extrabold'>tienda online</strong> o una{' '}
            <strong className='font-extrabold'>solución a medida</strong>.
            Elegimos las herramientas y la estrategia en función de lo que
            necesite tu proyecto.
          </>
        }
      />
      <Portfolio />
      <Testimonials />

      <TalentRecruitStrip />

      <div id='faq'>
        <SEOFAQ
          title='No te quedes con la duda'
          faqs={globalFaqs}
          ctaHref='#contacto'
        />
      </div>
      <HeroCta
        label='Te lo ponemos fácil'
        title='¿Necesitas que te contemos más?'
        description={
          <>
            Déjanos tu email y teléfono y{' '}
            <strong className='font-extrabold'>
              nosotros mismos nos ponemos en contacto contigo
            </strong>{' '}
            en menos que canta un gallo. Podemos conocernos y charlar un poco
            sobre tu proyecto o resolverte cualquier duda{' '}
            <strong className='font-extrabold'>
              antes de que decidas nada
            </strong>
            .
          </>
        }
        heroType='form'
        hasButton={false}
        formTitle='Te llamamos'
        formDescription='Propuesta en el mismo día. Sin compromiso.'
        formSectionInfo='La Agencia CTA'
        hasBackground={false}
        hasReviewBadge
        formId='contacto'
      />
    </>
  );
};

export default Home;
