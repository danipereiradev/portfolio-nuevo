import { useLanguage } from '../contexts/LanguageContext';
import { useSectionView } from '../hooks/useSectionView';
import RevealOnScroll from './RevealOnScroll';

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
  | 'chicxs'
  | 'hoyviajamos'
  | 'camisetas'
  | 'resilience'
  | 'hatena'
  | 'delish';

interface PortfolioProps {
  /** En /web-profesional: badges de packs y sin proyectos de tienda online. */
  variant?: 'default' | 'web-profesional' | 'web' | 'tiendas';
  /** Landings de ads: casos de éxito con métricas. */
  casos?: boolean;
  /** Landings de ads: la card no es un enlace; hay un «Ver la web» en pestaña nueva. */
  contained?: boolean;
}

const ALL_ORDER: ProjectId[] = [
  'chicxs',
  'hoyviajamos',
  'camisetas',
  'resilience',
  'hatena',
  'delish',
];
const CASOS_ORDER: ProjectId[] = ['chicxs', 'hoyviajamos', 'camisetas'];

const cardClass =
  'group relative block h-full overflow-hidden rounded-lg bg-ink-dark shadow-xl';

function CasosCard({
  title,
  image,
  url,
  urlSoon,
  exito,
}: {
  title: string;
  image: string;
  url?: string;
  urlSoon?: boolean;
  exito: string;
}) {
  return (
    <article className='group relative flex h-full flex-col overflow-hidden rounded-lg shadow-xl'>
      <img
        src={image}
        alt={`Web de ${title}`}
        width={800}
        height={600}
        className='aspect-[4/3] w-full object-cover'
        loading='lazy'
        decoding='async'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-ink-dark via-ink-dark/75 to-ink-dark/25' />
      <div className='absolute inset-x-4 bottom-5 z-10 flex flex-col items-center text-center'>
        <h3 className='text-2xl font-extrabold text-white md:text-3xl'>
          {title}
        </h3>
        <span className='mt-2 block h-1 w-10 bg-brand' />
        <p className='mt-3 text-base font-bold leading-snug text-white md:text-lg'>
          {exito}
        </p>
        {url ? (
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            onClick={() => trackPortfolioClick(title)}
            className='mt-3 inline-block text-sm font-extrabold uppercase tracking-wide text-brand-light underline decoration-2 underline-offset-4 hover:text-white md:text-base'
          >
            Ver la web
          </a>
        ) : urlSoon ? (
          <span className='mt-3 inline-block cursor-default text-sm font-extrabold uppercase tracking-wide text-brand-light underline decoration-2 underline-offset-4 md:text-base'>
            Ver la web
          </span>
        ) : null}
      </div>
    </article>
  );
}

function PortfolioCard({
  title,
  image,
  url,
}: {
  title: string;
  image: string;
  url?: string;
}) {
  const visual = (
    <>
      <img
        src={image}
        alt={`Web de ${title}`}
        width={800}
        height={600}
        className='aspect-[4/3] w-full object-contain'
        loading='lazy'
        decoding='async'
      />
      <div className='absolute inset-0 bg-ink-dark/40 transition-colors duration-300 group-hover:bg-ink-dark/25' />
    </>
  );

  if (url) {
    return (
      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`Ver la web de ${title}`}
        onClick={() => trackPortfolioClick(title)}
        className={cardClass}
      >
        {visual}
      </a>
    );
  }

  return <div className={cardClass}>{visual}</div>;
}

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
    chicxs: {
      title: t('portfolio.chicxs.title'),
      description: t('portfolio.chicxs.desc'),
      image: '/img/portfolio/mock-chicxs.webp',
      product: SITE_SHOP_LABEL,
      productHref: SITE_SHOP_PATH,
      url: 'https://chicxsdelacalle.com',
      exito: '+300% ventas. La tienda carga más rápido.',
    },
    hoyviajamos: {
      title: t('portfolio.hoyviajamos.title'),
      description: t('portfolio.hoyviajamos.desc'),
      image: '/img/portfolio/mock-viajamos.webp',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://hoyviajamosweb.com',
      exito: 'Más suscriptores. El blog carga de verdad.',
    },
    camisetas: {
      title: t('portfolio.camisetas.title'),
      description: t('portfolio.camisetas.desc'),
      image: '/img/portfolio/mock-camisetas.webp',
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
    delish: {
      title: t('portfolio.delish.title'),
      description: t('portfolio.delish.desc'),
      image: '/img/portfolio/mock-delish.webp',
      product: SITE_SHOP_LABEL,
      productHref: SITE_SHOP_PATH,
      exito: t('portfolio.delish.desc'),
    },
  };

  const order = isCasos ? CASOS_ORDER : ALL_ORDER;

  const mapPackBadge = <
    T extends { product: string; productHref: string; url?: string },
  >(
    project: T,
  ): T => {
    if (!isPackLanding) return project;
    return {
      ...project,
      product: 'Web Profesional',
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
          label: 'Proyectos que ya están dando resultados',
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

          <div className='mx-auto grid grid-cols-1 items-stretch gap-page-gap md:grid-cols-2 lg:grid-cols-3'>
            {projects.map((project, index) => (
              <RevealOnScroll
                key={project.title}
                className='h-full'
                delayMs={index * 90}
              >
                {isCasos ? (
                  <CasosCard
                    title={project.title}
                    image={project.image}
                    url={project.url}
                    urlSoon={project.urlSoon}
                    exito={project.exito}
                  />
                ) : (
                  <PortfolioCard
                    title={project.title}
                    image={project.image}
                    url={project.url}
                  />
                )}
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
