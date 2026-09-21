import { useMemo } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import TalentForm from '../components/TalentForm';
import { TALENT_PATH } from '../config/contact';

const SITE_URL = 'https://36web.es';

const TrabajaConNosotros = () => {
  usePageMeta(TALENT_PATH);

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
              name: 'Trabaja con nosotros',
              item: `${SITE_URL}${TALENT_PATH}/`,
            },
          ],
        },
        {
          '@type': 'WebPage',
          name: 'Únete al equipo de 36web',
          url: `${SITE_URL}${TALENT_PATH}/`,
          description:
            '36web amplía equipo en distintas ciudades de España. Candidaturas de diseño, desarrollo, WordPress, ecommerce y marketing digital.',
        },
      ],
    }),
    [],
  );

  useJsonLd('jsonld-trabaja-con-nosotros', jsonLd);

  return (
    <section className='page-section pt-[calc(var(--site-header-h)+var(--page-hero-offset)+1rem)]'>
      <div className='container mx-auto max-w-3xl'>
        <header className='page-title-block mx-auto mb-page-gap text-center'>
          <h1 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
            Únete al equipo de 36web
          </h1>
          <p className='text-lg text-ink-dark md:text-xl'>
            Estamos ampliando 36web en distintas ciudades de España. Buscamos
            profesionales con experiencia en diseño, desarrollo, WordPress,
            ecommerce y marketing digital para colaborar en proyectos reales de
            clientes.
          </p>
          <p className='text-lg text-ink-dark md:text-xl'>
            Valoramos especialmente perfiles con portfolio, autonomía, buena
            comunicación y capacidad para trabajar con estándares comunes de
            36web.
          </p>
          <p className='text-base text-ink-medium md:text-lg'>
            Colaborar en proyectos no implica una oferta de empleo fijo. Si el
            perfil encaja, hablamos de cómo trabajar juntos.
          </p>
        </header>
        <TalentForm />
      </div>
    </section>
  );
};

export default TrabajaConNosotros;
