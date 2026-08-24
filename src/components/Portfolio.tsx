import { useLanguage } from '../contexts/LanguageContext';
import { useSectionView } from '../hooks/useSectionView';

import {
  trackPortfolioClick,
  trackViewPortfolioSection,
} from '../utils/analytics';
import { SITE_WEB_PATH, SITE_WEB_LABEL } from '../config/contact';

interface PortfolioProps {
  /** En /web-profesional: badges de packs y sin proyectos de tienda online. */
  variant?: 'default' | 'web-profesional';
  /** Landings de ads: la card no es un enlace; hay un «Ver la web» en pestaña nueva. */
  contained?: boolean;
}

const Portfolio = ({ variant = 'default' }: PortfolioProps) => {
  const { t } = useLanguage();

  const sectionRef = useSectionView<HTMLElement>(trackViewPortfolioSection);
  const isPackLanding = variant === 'web-profesional';

  const projectsRaw = [
    {
      title: t('portfolio.carper.title'),
      description: t('portfolio.carper.desc'),
      longDescription: `Carper Sonido vende audio profesional. La web tiene que mostrar catálogo y servicios y que quien busca les llame.

Montamos estructura clara, fichas de producto y una base para Google. Hoy aparecen los primeros en un montón de búsquedas y el teléfono suena más.`,
      image: '/img/portfolio/mock-carper.png',
      headerImage: '/img/portfolio/mock-carper.png',
      tech: ['React', 'Vite', 'TypeScript', 'Tailwind CSS'],
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      publishedAt: '3 agosto 2026',
      url: 'https://carpersonido.com',
      exito: '1º en Google en +30 búsquedas. +400% llamadas.',
    },
    {
      title: t('portfolio.chicxs.title'),
      description: t('portfolio.chicxs.desc'),
      longDescription: `Chicxs de la Calle es moda urbana con catálogo que cambia. Hacía falta filtrar, ver stock y pedir sin líos.

Hoy procesan cientos de pedidos al año y la tienda va más rápida.`,
      image: '/img/portfolio/chicxs.png',
      headerImage: '/img/portfolio/mock-chicxs.png',
      tech: ['WordPress', 'WooCommerce', 'jQuery', 'CSS3'],
      product: 'Tienda Online',
      productHref: '/tiendas-online',
      publishedAt: '18 junio 2026',
      url: 'https://chicxsdelacalle.com',
      testimonialName: 'Irene Ibáñez',
      exito: '+300% ventas. La tienda carga más rápido.',
    },
    {
      title: t('portfolio.hoyviajamos.title'),
      description: t('portfolio.hoyviajamos.desc'),
      longDescription: `Hoy Viajamos es el blog de una pareja que cuenta viajes. Prioridad: que se lean las historias y se vean las fotos sin que la página se arrastre.

Hay categorías, galerías ligeras y newsletter.`,
      image: '/img/portfolio/hoyviajamos.png',
      headerImage: '/img/portfolio/mock-viajamos.png',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      publishedAt: '24 junio 2026',
      url: 'https://hoyviajamosweb.com',
      testimonialName: 'Juanvi Raga',
      exito: 'Más suscriptores. El blog carga de verdad.',
    },
  ];

  const mapPackBadge = <
    T extends { product: string; productHref: string; url?: string },
  >(
    project: T,
  ): T => {
    if (!isPackLanding) return project;
    const isEsencial = project.url?.includes('sillysally') ?? false;
    return {
      ...project,
      product: isEsencial ? 'Web Esencial' : 'Web Profesional',
      productHref: '#incluye',
    };
  };

  const projects = (
    isPackLanding
      ? projectsRaw.filter((project) => project.product !== 'Tienda Online')
      : projectsRaw
  ).map(mapPackBadge);

  return (
    <>
      <section id='portfolio' ref={sectionRef} className='page-section'>
        <div className='container mx-auto flex flex-col gap-page-gap'>
          <div className='page-title-block mx-auto max-w-5xl text-center'>
            <span className='text-md uppercase rounded-lg font-extrabold text-accent underline'>
              Hemos empezado fuerte
            </span>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink-dark'>
              {t('portfolio.title')}
            </h2>
            {!isPackLanding && (
              <p className='text-xl md:text-2xl text-ink-dark'>
                {t('portfolio.description')}
              </p>
            )}
          </div>

          <div className='mx-auto grid grid-cols-1 gap-page-gap md:grid-cols-2 lg:grid-cols-3'>
            {projects.map((project) => (
              <article
                key={project.title}
                className={`group relative overflow-hidden rounded-lg shadow-xl ${
                  projects.length === 1 ? 'w-full max-w-md' : ''
                }`}
              >
                <img
                  src={project.headerImage}
                  alt={project.title}
                  width={800}
                  height={600}
                  className='aspect-[4/3] w-full object-cover'
                  loading='lazy'
                  decoding='async'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-ink-dark via-ink-dark/75 to-ink-dark/25' />
                <div className='absolute inset-x-4 bottom-5 z-10 flex flex-col items-center text-center'>
                  <h3 className='text-2xl font-extrabold text-white md:text-3xl'>
                    {project.title}
                  </h3>
                  <span className='mt-2 block h-1 w-10 bg-brand' />
                  <p className='mt-3 text-base font-bold leading-snug text-white md:text-lg'>
                    {project.exito}
                  </p>
                  {project.url ? (
                    <a
                      href={project.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={() => trackPortfolioClick(project.title)}
                      className='mt-3 inline-block text-sm font-extrabold uppercase tracking-wide text-brand-light underline decoration-2 underline-offset-4 hover:text-white md:text-base'
                    >
                      Ver la web
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
