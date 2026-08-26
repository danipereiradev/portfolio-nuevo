import { useMemo } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import Hero from '../components/Hero';
import { TextImage } from '../components/TextImage';
import { TextSection } from '../components/TextSection';
import { Team } from '../components/Team';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import HeroCta from '../components/HeroCta';
import {
  ABOUT_LABEL,
  ABOUT_PATH,
  SITE_MAINTENANCE_LABEL,
  SITE_SHOP_LABEL,
  SITE_WEB_LABEL,
  SITE_WEB_PATH,
} from '../config/contact';

const SITE_URL = 'https://36web.es';

const Nosotros = () => {
  usePageMeta(ABOUT_PATH);

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: `${SITE_URL}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: ABOUT_LABEL,
              item: `${SITE_URL}${ABOUT_PATH}/`,
            },
          ],
        },
        {
          '@type': 'AboutPage',
          name: `${ABOUT_LABEL} | 36web`,
          url: `${SITE_URL}${ABOUT_PATH}/`,
          description:
            'Agencia de diseño web y marketing digital en Madrid. Más de 12 años montando webs y tiendas online para negocios de toda España.',
          mainEntity: {
            '@type': 'ProfessionalService',
            name: '36web',
            url: `${SITE_URL}/`,
            areaServed: { '@type': 'Country', name: 'España' },
          },
        },
      ],
    }),
    [],
  );

  useJsonLd('jsonld-nosotros', jsonLd);

  return (
    <>
      <Hero
        title={'Nuestra Agencia'}
        description='Somos una agencia de diseño web y marketing digital joven. Te contamos quiénes somos y cómo trabajamos.'
        buttonText='CONTACTA AHORA'
        buttonHref='#contacto'
        backgroundUrl='/img/web-design-charlesdeluvio.webp'
        hasButton
        hasBackground
        hasReviewBadge={false}
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
            <strong className='font-extrabold'>SEO</strong> y{' '}
            <strong className='font-extrabold'>branding</strong>. Todo en
            función de{' '}
            <strong className='font-extrabold'>
              lo que realmente necesitas
            </strong>
            .
          </>,
        ]}
        imageAlt='Equipo de 36web trabajando en diseño y desarrollo web'
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        imageSrc='/img/fikret-tozak-rfNLa1HL7eY-unsplash.jpg'
      />

      <TextSection
        id='about2'
        label='QUEREMOS SER TU FUTURO EQUIPO'
        title='Una agencia joven formada por profesionales con más de una década de experiencia.'
        paragraphs={[
          <>
            Detrás de 36web hay diseñadores y desarrolladores que venimos de{' '}
            <strong className='font-extrabold'>
              grandes consultoras, startups y proyectos reales
            </strong>
            . Somos un{' '}
            <strong className='font-extrabold'>equipo todoterreno</strong>:
            cubrimos diseño web, tiendas online, aplicaciones web y móviles y
            diseño gráfico.
          </>,
          <>
            Desarrollamos páginas web y tiendas online{' '}
            <strong className='font-extrabold'>a medida</strong> o, cuando tiene
            más sentido por presupuesto, plazos o facilidad de gestión, con{' '}
            <strong className='font-extrabold'>
              WordPress, WooCommerce o Shopify
            </strong>
            .
          </>,
          <>
            Te explicamos las opciones, sus ventajas y sus límites.{' '}
            <strong className='font-extrabold'>Después decides tú.</strong>
          </>,
        ]}
      />

      <Team
        label='¿QUIÉN ESTÁ DETRÁS DE 36WEB?'
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
            . Aunque 36web acaba de empezar,{' '}
            <strong className='font-extrabold'>
              nosotros llevamos años trabajando en esto
            </strong>
            .
          </>,
        ]}
      />

      <Portfolio />
      <Testimonials />

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
        buttonText='PEDIR PROPUESTA'
        buttonHref={SITE_WEB_PATH}
        heroType='form'
        hasButton={false}
        showProjectType
        projectTypes={[
          SITE_WEB_LABEL,
          SITE_SHOP_LABEL,
          SITE_MAINTENANCE_LABEL,
          'Todavía no lo tengo claro',
        ]}
        formTitle='Te llamamos'
        formDescription='Propuesta en 24–48 h. Sin compromiso.'
        formSectionInfo='La Agencia CTA'
        hasBackground={false}
        hasReviewBadge
        formId='contacto'
      />
    </>
  );
};

export default Nosotros;
