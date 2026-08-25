import { useLanguage } from '../contexts/LanguageContext';
import { useSectionView } from '../hooks/useSectionView';

import {
  trackPortfolioClick,
  trackViewPortfolioSection,
} from '../utils/analytics';
import {
  SITE_SHOP_LABEL,
  SITE_SHOP_PATH,
  SITE_WEB_LABEL,
  SITE_WEB_PATH,
} from '../config/contact';

type ProjectId =
  | 'carper'
  | 'chicxs'
  | 'hoyviajamos'
  | 'camisetas'
  | 'resilience'
  | 'hatena';

interface PortfolioProps {
  /** En /web-profesional: badges de packs y sin proyectos de tienda online. */
  variant?: 'default' | 'web-profesional' | 'web' | 'tiendas';
  /** Landings de ads: casos de éxito con métricas. */
  casos?: boolean;
  /** Landings de ads: la card no es un enlace; hay un «Ver la web» en pestaña nueva. */
  contained?: boolean;
}

const CASOS_ORDER: ProjectId[] = ['carper', 'chicxs', 'hoyviajamos'];
const WEB_ORDER: ProjectId[] = ['hoyviajamos', 'carper', 'hatena'];
const SHOP_ORDER: ProjectId[] = ['chicxs', 'camisetas', 'resilience'];
const DEFAULT_ORDER: ProjectId[] = ['carper', 'chicxs', 'hoyviajamos'];

const Portfolio = ({
  variant = 'default',
  casos = false,
}: PortfolioProps) => {
  const { t } = useLanguage();

  const sectionRef = useSectionView<HTMLElement>(trackViewPortfolioSection);
  const isPackLanding = variant === 'web-profesional';
  const isCasos = casos || isPackLanding;

  const projectsById: Record<
    ProjectId,
    {
      title: string;
      description: string;
      image: string;
      product: string;
      productHref: string;
      url?: string;
      urlSoon?: boolean;
      exito: string;
    }
  > = {
    carper: {
      title: t('portfolio.carper.title'),
      description: t('portfolio.carper.desc'),
      image: '/img/portfolio/mock-carper.png',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://carpersonido.com',
      exito: '1º en Google en +30 búsquedas. +400% llamadas.',
    },
    chicxs: {
      title: t('portfolio.chicxs.title'),
      description: t('portfolio.chicxs.desc'),
      image: '/img/portfolio/mock-chicxs.png',
      product: SITE_SHOP_LABEL,
      productHref: SITE_SHOP_PATH,
      url: 'https://chicxsdelacalle.com',
      exito: '+300% ventas. La tienda carga más rápido.',
    },
    hoyviajamos: {
      title: t('portfolio.hoyviajamos.title'),
      description: t('portfolio.hoyviajamos.desc'),
      image: '/img/portfolio/mock-viajamos.png',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://hoyviajamosweb.com',
      exito: 'Más suscriptores. El blog carga de verdad.',
    },
    camisetas: {
      title: t('portfolio.camisetas.title'),
      description: t('portfolio.camisetas.desc'),
      image: '/img/portfolio/mock-camisetas.png',
      product: SITE_SHOP_LABEL,
      productHref: SITE_SHOP_PATH,
      url: 'https://camisetas-ahora.com',
      exito: t('portfolio.camisetas.desc'),
    },
    resilience: {
      title: t('portfolio.resilience.title'),
      description: t('portfolio.resilience.desc'),
      image: '/img/portfolio/resilience-mock.webp',
      product: SITE_SHOP_LABEL,
      productHref: SITE_SHOP_PATH,
      url: 'https://shopresilience.es/',
      exito: t('portfolio.resilience.desc'),
    },
    hatena: {
      title: t('portfolio.hatena.title'),
      description: t('portfolio.hatena.desc'),
      image: '/img/portfolio/hatena-mock.webp',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      urlSoon: true,
      exito: t('portfolio.hatena.desc'),
    },
  };

  const order = isCasos
    ? CASOS_ORDER
    : variant === 'web' || variant === 'web-profesional'
      ? WEB_ORDER
      : variant === 'tiendas'
        ? SHOP_ORDER
        : DEFAULT_ORDER;

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

  const projects = order.map((id) => mapPackBadge(projectsById[id]));

  const heading = isCasos
    ? {
        label: 'Casos de éxito',
        title: t('portfolio.title'),
        description: t('portfolio.description'),
      }
    : variant === 'web' || variant === 'tiendas'
      ? {
          label: 'Hemos empezado fuerte',
          title: t('portfolio.title'),
          description: t('portfolio.description'),
        }
      : {
          label: 'Trabajos',
          title: 'Algunos proyectos que hemos publicado',
          description:
            'Webs y tiendas. Entras, las ves y te haces una idea.',
        };

  return (
    <>
      <section id='portfolio' ref={sectionRef} className='page-section'>
        <div className='container mx-auto flex flex-col gap-page-gap'>
          <div className='page-title-block mx-auto max-w-5xl text-center'>
            <span className='text-md uppercase rounded-lg font-extrabold text-accent underline'>
              {heading.label}
            </span>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink-dark'>
              {heading.title}
            </h2>
            <p className='text-xl md:text-2xl text-ink-dark'>
              {heading.description}
            </p>
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
                  src={project.image}
                  alt={`Mock de ${project.title}`}
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
                    {isCasos ? project.exito : project.description}
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
                  ) : project.urlSoon ? (
                    <span className='mt-3 inline-block cursor-default text-sm font-extrabold uppercase tracking-wide text-brand-light underline decoration-2 underline-offset-4 md:text-base'>
                      Ver la web
                    </span>
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
