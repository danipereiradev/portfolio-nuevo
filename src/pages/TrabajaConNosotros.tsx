import { useMemo } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import TalentForm from '../components/TalentForm';
import { SpanishOnlyNotice } from '../redesign/prefs';
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
    <main className='rd rd-page'>
      <section className='relative overflow-hidden pt-[var(--site-header-h)]'>
        <div className='rd-grid-bg pointer-events-none absolute inset-0' />
        <div className='relative mx-auto grid max-w-[1320px] gap-10 px-5 pb-20 pt-20 md:px-8 lg:grid-cols-[1.3fr_1fr] lg:items-end'>
          <div>
            <p className='rd-eyebrow mb-6'>00 — Talento · Trabaja con nosotros</p>
            <h1 className='rd-h1'>
              ÚNETE
              <br />
              <span className='rd-mark'>AL EQUIPO</span>
              <br />
              <span className='text-[#e1f56e]'>DE 36WEB.</span>
            </h1>
          </div>
          <div>
            <p className='text-lg leading-relaxed text-white/65'>
              Estamos ampliando 36web en distintas ciudades de España. Buscamos profesionales de diseño, desarrollo, WordPress, ecommerce y marketing digital para colaborar en proyectos reales de clientes.
            </p>
            <a href='#candidatura' className='rd-btn mt-8'>
              Enviar candidatura ↓
            </a>
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-[1320px] px-5 pb-20 pt-4 md:px-8'>
        <dl className='grid gap-px overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/10 sm:grid-cols-3'>
          {[
            ['Buscamos', 'Portfolio y autonomía', 'Trabajo real que podamos ver'],
            ['Valoramos', 'Buena comunicación', 'Y trabajar con estándares comunes'],
            ['Cómo es', 'Colaboración por proyecto', 'No es una oferta de empleo fijo'],
          ].map(([k, v, d]) => (
            <div key={k} className='bg-[#0b0c0a] p-6'>
              <dt className='font-mono text-xs text-[#e1f56e]'>{k}</dt>
              <dd className='mt-4 text-xl font-black uppercase'>{v}</dd>
              <dd className='mt-2 text-sm text-white/55'>{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id='candidatura' className='rd-light scroll-mt-24'>
        <div className='mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:px-8 lg:grid-cols-[0.8fr_1.2fr]'>
          <div>
            <p className='rd-eyebrow mb-5'>Candidatura</p>
            <h2 className='rd-h2'>
              Cuéntanos <span className='rd-mark'>quién eres.</span>
            </h2>
            <p className='mt-6 max-w-md text-white/60'>
              Si el perfil encaja, te escribimos para hablar de cómo trabajar juntos. Colaborar en proyectos no implica una oferta de empleo fijo.
            </p>
          </div>
          <div className='rounded-[1.5rem] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] md:p-10'>
            <TalentForm />
          </div>
        </div>
      </section>
      <SpanishOnlyNotice />
    </main>
  );
};

export default TrabajaConNosotros;
