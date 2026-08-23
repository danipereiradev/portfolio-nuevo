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
import { ABOUT_LABEL, ABOUT_PATH, SITE_WEB_PATH } from '../config/contact';

const SITE_URL = 'https://pereiraweb.es';

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
          name: `${ABOUT_LABEL} | PereiraWeb`,
          url: `${SITE_URL}${ABOUT_PATH}/`,
          description:
            'Agencia de diseño web y marketing digital en Madrid. Más de 12 años montando webs y tiendas online para negocios de toda España.',
          mainEntity: {
            '@type': 'ProfessionalService',
            name: 'PereiraWeb',
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
        title={'Conoce nuestra agencia'}
        description='Somos una agencia de diseño web y marketing digital joven. Te contamos un poco más abajo'
        buttonText='CONTACTA AHORA'
        buttonHref='#contacto'
        backgroundUrl='/img/web-design-charlesdeluvio.webp'
        hasButton
        hasBackground
        hasReviewBadge={false}
      />

      <TextImage
        label='¿QUE ES PEREIRAWEB?'
        title='Agencia de diseño web y marketing digital online.'
        paragraphs={[
          'Somos una agencia 100% online que ofrece un servicio de atención 1 a 1, es decir, no te atiende un comercial con el que luego no vuelves a tratar. Tendrás contacto directo en todo momento con la persona encargada de tu proyecto a través de mail, teléfono, videollamada o presencial (Si te encuentras en Madrid, Galicia o Valencia).',
          'Creemos que una de las cosas mas importantes que nos diferencia del resto de agencias es que tocamos todos los palos:',
          'Desarrollo web con wordpress, desarrollo web a medida con lenguajes de programación moderno, aplicaciones moviles, Posicionamiento SEO y branding. Todo en función de lo que realmente necesitas.',
        ]}
        imageAlt='Equipo de PereiraWeb trabajando en diseño y desarrollo web'
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        imageSrc='/img/fikret-tozak-rfNLa1HL7eY-unsplash.jpg'
      />

      <TextSection
        label='QUEREMOS SER TU FUTURO EQUIPO'
        title='Una agencia joven con mas de una década diseñando y desarrollando software.'
        paragraphs={[
          'Pereiraweb lo formamos un equipo de profesionales del sector del diseño y desarrollo de software. Contamos con experiencia en grandes consultoras y clientes como en startups modernas así que somos un equipo todo-terreno. Cubrimos diseño web, desarrollo de tiendas online, desarrollo de aplicaciones web y aplicaciones móviles y diseño gráfico',
          'Desarrollamos páginas web y tiendas online a medida o si lo necesitas por plazos y comodidad con plantillas de wordpress, woocommerce o shopify. Todo en función de lo que necesites y quieras invertir. Tu tienes la última palabra.',
        ]}
      />

      <Team
        label='¿QUIEN ESTÁ DETRÁS DE PEREIRAWEB?'
        title='Estás somos las personas que vamos a encargarnos de tu proyecto.'
        paragraphs={[
          'Queremos que nos pongas caras. Que puedas ver nuestros portfolios y repositorios o contactar con nosotros para lo que necesites, siempre contestamos, pero sobretodo que sientas seguridad en confiarnos la parte digital de tu negocio. Estás en buenas manos. 12 años de experiencia nos avalan.',
        ]}
      />

      <Portfolio />
      <Testimonials />

      <HeroCta
        title='¿Necesitas que te contemos mas?'
        description='Déjanos tu email y teléfono y nosotros mismos nos ponemos en contacto contigo en menos que canta un gallo. Podemos conocernos y charlar un poco de tu idea, tu proyecto o resolverte cualquier duda.'
        buttonText='PEDIR PROPUESTA'
        buttonHref={SITE_WEB_PATH}
        heroType='form'
        hasButton={false}
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
