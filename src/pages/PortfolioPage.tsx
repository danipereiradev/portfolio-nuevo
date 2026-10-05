import { useMemo } from 'react';
import HeroCta from '../components/HeroCta';
import { PictureImg } from '../components/PictureImg';
import RevealOnScroll from '../components/RevealOnScroll';
import { useJsonLd } from '../hooks/useJsonLd';
import { usePageMeta } from '../hooks/usePageMeta';
import { PORTFOLIO_PATH } from '../config/contact';
import {
  PORTFOLIO_PROJECT_LINK_REL,
  PORTFOLIO_SHOP_PROJECTS,
  PORTFOLIO_WEB_PROJECTS,
  type PortfolioPageProject,
} from '../data/portfolioPage';
import { trackPortfolioClick } from '../utils/analytics';

const SITE_URL = 'https://36web.es';

const categoryLinks = [
  { href: '#paginas-web', label: 'Páginas web' },
  { href: '#tiendas-online', label: 'Tiendas online' },
  { href: '#aplicaciones', label: 'Aplicaciones web/móvil' },
] as const;

const ProjectCard = ({
  project,
  index,
}: {
  project: PortfolioPageProject;
  index: number;
}) => (
  <RevealOnScroll className='h-full' delayMs={index * 60}>
    <article className='flex h-full flex-col overflow-hidden rounded-lg border-2 border-ink-dark bg-white'>
      <a
        href={project.url}
        target='_blank'
        rel={PORTFOLIO_PROJECT_LINK_REL}
        aria-label={`Visitar ${project.name}`}
        className='bg-ink-dark'
        onClick={() => trackPortfolioClick(project.name)}
      >
        <PictureImg
          src={project.image}
          alt={`Mockup de escritorio, tableta y móvil de ${project.name}`}
          width={1536}
          height={1024}
          className='h-auto w-full object-contain'
          loading='lazy'
          decoding='async'
        />
      </a>
      <div className='flex flex-1 flex-col items-center gap-2 p-content-pad text-center'>
        <p className='text-sm font-extrabold uppercase tracking-wide text-accent'>
          {project.sector}
        </p>
        <h3 className='text-xl font-extrabold text-ink-dark md:text-2xl'>
          {project.name}
        </h3>
        <p className='text-base leading-snug text-ink-dark md:text-lg'>
          {project.description}
        </p>
        <a
          href={project.url}
          target='_blank'
          rel={PORTFOLIO_PROJECT_LINK_REL}
          className='mt-auto inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-extrabold uppercase text-white hover:bg-accent-hover md:text-base'
          onClick={() => trackPortfolioClick(project.name)}
        >
          Visitar web
        </a>
      </div>
    </article>
  </RevealOnScroll>
);

const ProjectGrid = ({ projects }: { projects: readonly PortfolioPageProject[] }) => (
  <div className='grid grid-cols-1 items-stretch gap-page-gap md:grid-cols-2 lg:grid-cols-3'>
    {projects.map((project, index) => (
      <ProjectCard key={project.id} project={project} index={index} />
    ))}
  </div>
);

const PortfolioPage = () => {
  usePageMeta(PORTFOLIO_PATH);

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
              name: 'Portfolio',
              item: `${SITE_URL}${PORTFOLIO_PATH}/`,
            },
          ],
        },
        {
          '@type': 'CollectionPage',
          name: 'Portfolio de webs y tiendas online | 36web',
          url: `${SITE_URL}${PORTFOLIO_PATH}/`,
          description:
            'Webs y tiendas online reales. Entra en cada proyecto y recórrelo.',
        },
      ],
    }),
    [],
  );

  useJsonLd('jsonld-portfolio', jsonLd);

  return (
    <>
      <header className='page-hero-compact'>
        <div className='container mx-auto flex max-w-5xl flex-col items-center gap-page-gap text-center'>
          <div className='page-title-block'>
            <span className='text-md rounded-lg font-extrabold uppercase text-accent underline'>
              Portfolio
            </span>
            <h1 className='text-3xl font-extrabold text-ink-dark md:text-5xl lg:text-6xl'>
              Proyectos reales, para entrar y recorrerlos.
            </h1>
            <p className='text-xl text-ink-dark md:text-2xl'>
              Webs y tiendas online que ya están publicadas. Cada tarjeta abre
              el sitio en otra pestaña. Las apps, un poco más adelante.
            </p>
          </div>
          <nav aria-label='Categorías del portfolio'>
            <ul className='flex flex-wrap items-center justify-center gap-3'>
              {categoryLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className='inline-flex min-h-12 items-center rounded-lg border-2 border-ink-dark bg-white px-4 py-2 text-sm font-extrabold uppercase text-ink-dark hover:bg-ink-dark hover:text-white md:text-base'
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <section id='paginas-web' className='page-section'>
        <div className='container mx-auto flex flex-col gap-page-gap'>
          <div className='page-title-block mx-auto max-w-5xl text-center'>
            <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
              Páginas web
            </h2>
            <p className='text-xl text-ink-dark md:text-2xl'>
              Sitios de presentación, catálogo y contacto. Entra y recorre cada
              uno.
            </p>
          </div>
          <ProjectGrid projects={PORTFOLIO_WEB_PROJECTS} />
        </div>
      </section>

      <section id='tiendas-online' className='page-section'>
        <div className='container mx-auto flex flex-col gap-page-gap'>
          <div className='page-title-block mx-auto max-w-5xl text-center'>
            <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
              Tiendas online
            </h2>
            <p className='text-xl text-ink-dark md:text-2xl'>
              Ecommerce publicados: catálogo, pedido y pago.
            </p>
          </div>
          <ProjectGrid projects={PORTFOLIO_SHOP_PROJECTS} />
        </div>
      </section>

      <section id='aplicaciones' className='page-section'>
        <div className='container mx-auto flex flex-col gap-page-gap'>
          <div className='page-title-block mx-auto max-w-5xl text-center'>
            <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
              Aplicaciones web/móvil
            </h2>
            <p className='text-xl text-ink-dark md:text-2xl'>Próximamente</p>
          </div>
          <div className='mx-auto max-w-3xl rounded-lg border-2 border-ink-dark bg-white p-8 text-center md:p-12'>
            <p className='text-xl font-extrabold text-ink-dark md:text-2xl'>
              Estamos preparando casos de apps web y móvil.
            </p>
            <p className='mt-3 text-base text-ink-dark md:text-lg'>
              Si lo que necesitas es una aplicación, cuéntanoslo y lo vemos en
              la propuesta. Sin compromiso.
            </p>
          </div>
        </div>
      </section>

      <HeroCta
        title='¿Quieres una web así para tu negocio?'
        description={
          <>
            Déjanos nombre y teléfono.{' '}
            <strong className='font-extrabold'>Te llamamos</strong> y te
            decimos precio y plazos por escrito,{' '}
            <strong className='font-extrabold'>antes de cobrar nada</strong>.
          </>
        }
        heroType='form'
        hasButton={false}
        formTitle='Hablemos de tu proyecto'
        formDescription='Propuesta en el mismo día. Sin compromiso.'
        formSectionInfo='Portfolio'
        formSubmitLabel='Quiero hablar de mi proyecto'
        hasBackground={false}
        hasReviewBadge
        formId='contacto'
      />
    </>
  );
};

export default PortfolioPage;
