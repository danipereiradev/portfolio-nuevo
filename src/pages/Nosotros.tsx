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
import { ABOUT_PATH, SITE_WEB_PATH } from '../config/contact';

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
              name: 'Nosotros',
              item: `${SITE_URL}${ABOUT_PATH}/`,
            },
          ],
        },
        {
          '@type': 'AboutPage',
          name: 'Nosotros | PereiraWeb',
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
        title='Nosotros'
        description='Agencia de diseño web y marketing digital en Madrid. Más de 12 años. Hablas con quien monta la página.'
        buttonText='CONTACTA AHORA'
        buttonHref='#contacto'
        backgroundUrl='/img/web-design-charlesdeluvio.webp'
        hasButton
        hasBackground
        hasReviewBadge={false}
      />

      <TextImage
        label='EL ESTUDIO'
        title='Una agencia joven, con más de una década de experiencia'
        paragraphs={[
          'PereiraWeb es un estudio pequeño en Madrid. Montamos webs y tiendas online para autónomos y empresas de toda España. Sin comercial de por medio: te atiende el equipo que diseña y desarrolla.',
          'Una web lenta o un checkout confuso te cuesta clientes. Por eso el trabajo aquí es claro, con precio y plazos por escrito antes de arrancar. El 50% al aceptar; el resto, al publicar.',
        ]}
        imageSrc='/img/fikret-tozak-rfNLa1HL7eY-unsplash.jpg'
        imageAlt='Equipo de PereiraWeb trabajando en diseño y desarrollo web'
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <TextSection
        label='CÓMO TRABAJAMOS'
        title='Pocos proyectos a la vez. Precio y plazos por escrito.'
        muted
        paragraphs={[
          'Llevamos más de 12 años haciendo páginas web y tiendas online. Seguimos siendo un estudio pequeño a propósito: así no desaparece quien te atendió el primer día. La propuesta llega en 24–48 h laborables, con lo que entra y cuándo está.',
          'El mercado está lleno de plantillas baratas y de agencias que te pasan de un comercial a otro. Aquí diseña y desarrolla el mismo equipo. WordPress o a medida, según el caso. Si lo que necesitas es una plantilla genérica a bajo precio, este no es el servicio.',
          'Madrid es la sede. Los clientes están en toda España. WhatsApp, llamada o el formulario; si estás en Madrid, también podemos vernos.',
        ]}
      />

      <Team
        label='EL EQUIPO'
        title='La montamos nosotros. Tú hablas con quien la hace.'
        paragraphs={[
          'Diseño, desarrollo y publicación. Estudio en Madrid, proyectos en remoto con negocios de toda España. Si estás en Madrid, también podemos vernos.',
        ]}
      />

      <Portfolio />
      <Testimonials />

      <HeroCta
        title='Cuéntanos el caso'
        description='Nos cuentas qué haces y qué tiene que hacer la web o la tienda. Te devolvemos propuesta en 24–48 h, con precio y plazos. Si no encaja, lo dices y no pasa nada.'
        buttonText='PEDIR PROPUESTA'
        buttonHref={SITE_WEB_PATH}
        heroType='form'
        hasButton={false}
        formTitle='Te llamamos'
        formDescription='Propuesta en 24–48 h. Sin compromiso.'
        formSectionInfo='Nosotros CTA'
        hasBackground={false}
        hasReviewBadge
        formId='contacto'
      />
    </>
  );
};

export default Nosotros;
