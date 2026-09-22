import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useSectionView } from '../hooks/useSectionView';
import { PictureImg } from './PictureImg';
import RevealOnScroll from './RevealOnScroll';
import Button from './Button';

import {
  trackCtaClick,
  trackPortfolioClick,
  trackViewPortfolioSection,
} from '../utils/analytics';
import {
  isAdsLandingPath,
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
  | 'delish'
  | 'carper'
  | 'micolet'
  | 'alicornio'
  | 'desmundando';

interface PortfolioProps {
  /** En /web-profesional: badges de packs y sin proyectos de tienda online. */
  variant?: 'default' | 'web-profesional' | 'web' | 'tiendas';
  /** Landings de ads: casos de éxito con métricas. */
  casos?: boolean;
  /** Landings de ads: la card no es un enlace. */
  contained?: boolean;
  /** Orden concreto de proyectos. Si no se pasa, usa el de la variante. */
  ids?: ProjectId[];
  /** Sustituye la imagen de un proyecto (p. ej. mocks de la oferta). */
  images?: Partial<Record<ProjectId, string>>;
  /** Enlaces propios. Si se pasan, se respetan aunque la página sea de ads. */
  urls?: Partial<Record<ProjectId, string>>;
  onProjectClick?: (id: ProjectId) => void;
  headingLabel?: ReactNode;
  headingTitle?: ReactNode;
  headingDescription?: ReactNode;
  /** Texto bajo la parrilla (landings). */
  note?: ReactNode;
  /** Bloque de sector + CTA al formulario de la misma página. */
  sectorPrompt?: string;
  sectorCtaText?: string;
  sectorCtaHref?: string;
}

/** Proyectos visibles. Cambiar este array para rotar los mocks. */
const ALL_ORDER: ProjectId[] = ['chicxs', 'resilience', 'micolet', 'delish'];
const WEB_ORDER: ProjectId[] = [
  'hoyviajamos',
  'alicornio',
  'carper',
  'desmundando',
];
const SHOP_ORDER: ProjectId[] = ALL_ORDER;
const CASOS_ORDER: ProjectId[] = ['chicxs', 'hoyviajamos', 'camisetas'];

const cardClass = 'group relative block h-full';

function CasosCard({
  title,
  image,
  exito,
}: {
  title: string;
  image: string;
  exito: string;
}) {
  return (
    <article className='group relative flex h-full flex-col overflow-hidden rounded-lg bg-ink-dark shadow-xl'>
      <PictureImg
        src={image}
        alt={`Web de ${title}`}
        width={1254}
        height={1254}
        className='aspect-square w-full object-contain'
        loading='lazy'
        decoding='async'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-ink-dark via-ink-dark/70 to-transparent' />
      <div className='absolute inset-x-4 bottom-5 z-10 flex flex-col items-center text-center'>
        <h3 className='text-2xl font-extrabold text-white md:text-3xl'>
          {title}
        </h3>
        <span className='mt-2 block h-1 w-10 bg-brand' />
        <p className='mt-3 text-base font-bold leading-snug text-white md:text-lg'>
          {exito}
        </p>
      </div>
    </article>
  );
}

function PortfolioCard({
  title,
  image,
  url,
  nofollow = false,
  onClick,
}: {
  title: string;
  image: string;
  url?: string;
  nofollow?: boolean;
  onClick?: () => void;
}) {
  const visual = (
    <PictureImg
      src={image}
      alt={`Web de ${title}`}
      width={1254}
      height={1254}
      className='aspect-square w-full object-contain'
      loading='lazy'
      decoding='async'
      draggable={false}
    />
  );

  if (url) {
    return (
      <a
        href={url}
        target='_blank'
        rel={nofollow ? 'nofollow noopener noreferrer' : 'noopener noreferrer'}
        aria-label={`Ver la web de ${title}`}
        onClick={() => {
          trackPortfolioClick(title);
          onClick?.();
        }}
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
  ids,
  images,
  urls,
  onProjectClick,
  headingLabel,
  headingTitle,
  headingDescription,
  note,
  sectorPrompt,
  sectorCtaText,
  sectorCtaHref,
}: PortfolioProps) => {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const hideOutboundLinks = isAdsLandingPath(pathname);

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
      nofollow?: boolean;
      urlSoon?: boolean;
      exito: string;
    }
  > = {
    chicxs: {
      title: t('portfolio.chicxs.title'),
      description: t('portfolio.chicxs.desc'),
      image: '/img/portfolio/chicxs-empty.png',
      product: SITE_SHOP_LABEL,
      productHref: SITE_SHOP_PATH,
      url: 'https://chicxsdelacalle.com',
      exito: '+300% ventas. La tienda carga más rápido.',
    },
    hoyviajamos: {
      title: t('portfolio.hoyviajamos.title'),
      description: t('portfolio.hoyviajamos.desc'),
      image: '/img/portfolio/hoyviajamos-empty.png',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://hoyviajamosweb.com',
      exito: 'Más suscriptores. El blog carga de verdad.',
    },
    camisetas: {
      title: t('portfolio.camisetas.title'),
      description: t('portfolio.camisetas.desc'),
      image: '/img/portfolio/camisetas-empty.png',
      product: SITE_SHOP_LABEL,
      productHref: SITE_SHOP_PATH,
      url: 'https://camisetas-ahora.com',
      exito: t('portfolio.camisetas.desc'),
    },
    resilience: {
      title: t('portfolio.resilience.title'),
      description: t('portfolio.resilience.desc'),
      image: '/img/portfolio/resilience-empty.png',
      product: SITE_SHOP_LABEL,
      productHref: SITE_SHOP_PATH,
      url: 'https://shopresilience.es/',
      exito: t('portfolio.resilience.desc'),
    },
    hatena: {
      title: t('portfolio.hatena.title'),
      description: t('portfolio.hatena.desc'),
      image: '/img/portfolio/alicornio-empty.png',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      urlSoon: true,
      exito: t('portfolio.hatena.desc'),
    },
    carper: {
      title: t('portfolio.carper.title'),
      description: t('portfolio.carper.desc'),
      image: '/img/portfolio/carper-empty.png',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      exito: t('portfolio.carper.desc'),
    },
    delish: {
      title: t('portfolio.delish.title'),
      description: t('portfolio.delish.desc'),
      image: '/img/portfolio/delish-empty.png',
      product: SITE_SHOP_LABEL,
      productHref: SITE_SHOP_PATH,
      url: 'https://delishvegan.com/',
      nofollow: true,
      exito: t('portfolio.delish.desc'),
    },
    micolet: {
      title: t('portfolio.micolet.title'),
      description: t('portfolio.micolet.desc'),
      image: '/img/portfolio/moclet-empty.png',
      product: SITE_SHOP_LABEL,
      productHref: SITE_SHOP_PATH,
      url: 'https://www.micolet.com/',
      nofollow: true,
      exito: t('portfolio.micolet.desc'),
    },
    alicornio: {
      title: t('portfolio.alicornio.title'),
      description: t('portfolio.alicornio.desc'),
      image: '/img/portfolio/alicornio-empty.png',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://oalicornio.com',
      exito: t('portfolio.alicornio.desc'),
    },
    desmundando: {
      title: t('portfolio.desmundando.title'),
      description: t('portfolio.desmundando.desc'),
      image: '/img/portfolio/desmundando-empty.png',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      exito: t('portfolio.desmundando.desc'),
    },
  };

  const fallbackOrder =
    variant === 'web'
      ? WEB_ORDER
      : variant === 'tiendas'
        ? SHOP_ORDER
        : ALL_ORDER;
  const order = ids ?? (isCasos ? CASOS_ORDER : fallbackOrder);

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

  const projects = order.map((id) =>
    mapPackBadge({
      ...projectsById[id],
      id,
      image: images?.[id] ?? projectsById[id].image,
    }),
  );

  const defaultHeading = isCasos
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
          description: 'Webs y tiendas que ya están recibiendo visitas.',
        };

  const heading = {
    label: headingLabel ?? defaultHeading.label,
    title: headingTitle ?? defaultHeading.title,
    description: headingDescription ?? defaultHeading.description,
  };

  const gridClass =
    projects.length <= 2
      ? 'mx-auto grid w-full max-w-5xl grid-cols-1 items-stretch gap-page-gap md:grid-cols-2'
      : projects.length === 3
        ? 'mx-auto grid grid-cols-1 items-stretch gap-page-gap md:grid-cols-2 lg:grid-cols-3'
        : 'mx-auto grid grid-cols-1 items-stretch gap-page-gap md:grid-cols-2 lg:grid-cols-4';

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

          {isCasos ? (
            <div className={gridClass}>
              {projects.map((project, index) => (
                <RevealOnScroll
                  key={project.title}
                  className='h-full'
                  delayMs={index * 90}
                >
                  <CasosCard
                    title={project.title}
                    image={project.image}
                    exito={project.exito}
                  />
                </RevealOnScroll>
              ))}
            </div>
          ) : (
            <div className={gridClass}>
              {projects.map((project, index) => (
                <RevealOnScroll
                  key={project.title}
                  className='h-full'
                  delayMs={index * 90}
                >
                  <PortfolioCard
                    title={project.title}
                    image={project.image}
                    url={
                      urls?.[project.id] ??
                      (hideOutboundLinks ? undefined : project.url)
                    }
                    nofollow={project.nofollow}
                    onClick={
                      onProjectClick
                        ? () => onProjectClick(project.id)
                        : undefined
                    }
                  />
                </RevealOnScroll>
              ))}
            </div>
          )}

          {note || sectorPrompt ? (
            <div className='mx-auto flex max-w-3xl flex-col items-center gap-4 text-center'>
              {note ? (
                <p className='text-xl text-ink-dark md:text-2xl'>{note}</p>
              ) : null}
              {sectorPrompt ? (
                <p className='text-xl font-extrabold text-ink-dark md:text-2xl'>
                  {sectorPrompt}
                </p>
              ) : null}
              {sectorCtaHref && sectorCtaText ? (
                <Button
                  href={sectorCtaHref}
                  className='!mt-2'
                  onClick={() =>
                    trackCtaClick(sectorCtaText, 'LaunchPortfolio')
                  }
                >
                  {sectorCtaText}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default Portfolio;
