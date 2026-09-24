import { useState, type ReactNode } from 'react';
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
  SITE_SHOP_LABEL,
  SITE_SHOP_PATH,
  SITE_WEB_LABEL,
  SITE_WEB_PATH,
} from '../config/contact';
import {
  localWebDemoHref,
  localWebDemoImage,
} from '../data/localWebDemos';

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
  | 'desmundando'
  | 'elefantes'
  | 'silly'
  | 'beachvans'
  | 'vidal'
  | 'reformas'
  | 'inmobiliaria'
  | 'psicologa';

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
  /** Sustituye el título visible. */
  titles?: Partial<Record<ProjectId, string>>;
  onProjectClick?: (id: ProjectId) => void;
  headingLabel?: ReactNode;
  headingTitle?: ReactNode;
  headingDescription?: ReactNode;
  /** Texto bajo la parrilla (landings). */
  note?: ReactNode;
  /** CTA bajo el grid. Por defecto: Quiero resultados como estos. */
  ctaText?: string;
  ctaHref?: string;
}

/** Pool de clientes reales. En cada carga se eligen 3 al azar. */
const REAL_CLIENTS: ProjectId[] = [
  'hatena',
  'carper',
  'alicornio',
  'beachvans',
  'vidal',
  'camisetas',
];
const DEMO_ORDER: ProjectId[] = ['reformas', 'inmobiliaria', 'psicologa'];
const SHOP_ORDER: ProjectId[] = ['camisetas'];
const CASOS_ORDER: ProjectId[] = ['chicxs', 'hoyviajamos', 'camisetas'];

function pickRandomIds(pool: ProjectId[], count: number): ProjectId[] {
  const next = [...pool];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next.slice(0, count);
}

const cardClass =
  'flex h-full flex-col overflow-hidden rounded-lg border-2 border-ink-dark bg-white';

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

const DEMO_CITY_SLUG = 'tu-ciudad';

function ShowcaseCard({
  badge,
  sector,
  title,
  result,
  image,
  url,
  ctaLabel,
  nofollow = false,
  onClick,
}: {
  badge: string;
  sector: string;
  title: string;
  result?: string;
  image: string;
  url?: string;
  ctaLabel: string;
  nofollow?: boolean;
  onClick?: () => void;
}) {
  return (
    <article className={cardClass}>
      <div className='relative bg-ink-dark'>
        <PictureImg
          src={image}
          alt={`Web de ${title}`}
          width={1536}
          height={1024}
          className='w-full object-contain'
          loading='lazy'
          decoding='async'
          draggable={false}
        />
        <span className='pointer-events-none absolute left-3 top-3 z-10 rounded-md bg-white px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide text-ink-dark'>
          {badge}
        </span>
      </div>
      <div className='flex flex-1 flex-col items-center gap-2 p-content-pad text-center'>
        <p className='text-sm font-extrabold uppercase tracking-wide text-accent'>
          {sector}
        </p>
        <h3 className='text-xl font-extrabold text-ink-dark md:text-2xl'>
          {title}
        </h3>
        {result ? (
          <p className='text-base font-bold text-ink-dark md:text-lg'>
            {result}
          </p>
        ) : null}
        {url ? (
          <a
            href={url}
            target='_blank'
            rel={
              nofollow
                ? 'nofollow noopener noreferrer'
                : 'noopener noreferrer'
            }
            aria-label={`${ctaLabel} de ${title}`}
            onClick={() => {
              trackPortfolioClick(title);
              onClick?.();
            }}
            className='mt-auto inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-extrabold uppercase text-white hover:bg-accent-hover md:text-base'
          >
            {ctaLabel}
          </a>
        ) : null}
      </div>
    </article>
  );
}

const Portfolio = ({
  variant = 'default',
  casos = false,
  ids,
  images,
  urls,
  titles,
  onProjectClick,
  headingLabel,
  headingTitle,
  headingDescription,
  note,
  ctaText = 'Quiero resultados como estos',
  ctaHref = '#contacto',
}: PortfolioProps) => {
  const { t } = useLanguage();

  const sectionRef = useSectionView<HTMLElement>(trackViewPortfolioSection);
  const isPackLanding = variant === 'web-profesional';
  const isCasos = casos || isPackLanding;
  const [randomReals] = useState(() => pickRandomIds(REAL_CLIENTS, 3));

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
      sector?: string;
      result?: string;
      kind?: 'real' | 'demo';
    }
  > = {
    chicxs: {
      title: t('portfolio.chicxs.title'),
      description: t('portfolio.chicxs.desc'),
      image: '/img/portfolio/chicxs-empty.png',
      product: SITE_SHOP_LABEL,
      productHref: SITE_SHOP_PATH,
      url: 'https://chicxsdelacalle.com',
      nofollow: true,
      exito: '+300% ventas. La tienda carga más rápido.',
    },
    hoyviajamos: {
      title: t('portfolio.hoyviajamos.title'),
      description: t('portfolio.hoyviajamos.desc'),
      image: '/img/portfolio/new/hoyviajamos.png',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://hoyviajamosweb.com',
      nofollow: true,
      exito: 'Más suscriptores. El blog carga de verdad.',
    },
    camisetas: {
      title: t('portfolio.camisetas.title'),
      description: t('portfolio.camisetas.desc'),
      image: '/img/portfolio/new/camisetas.png',
      product: SITE_SHOP_LABEL,
      productHref: SITE_SHOP_PATH,
      url: 'https://camisetas-ahora.com',
      nofollow: true,
      exito: t('portfolio.camisetas.desc'),
      sector: t('portfolio.camisetas.sector'),
      result: t('portfolio.camisetas.result'),
    },
    resilience: {
      title: t('portfolio.resilience.title'),
      description: t('portfolio.resilience.desc'),
      image: '/img/portfolio/resilience-empty.png',
      product: SITE_SHOP_LABEL,
      productHref: SITE_SHOP_PATH,
      url: 'https://shopresilience.es/',
      nofollow: true,
      exito: t('portfolio.resilience.desc'),
    },
    hatena: {
      title: t('portfolio.hatena.title'),
      description: t('portfolio.hatena.desc'),
      image: '/img/portfolio/new/hatena.png',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://hatena.es',
      nofollow: true,
      exito: t('portfolio.hatena.desc'),
      sector: t('portfolio.hatena.sector'),
      result: t('portfolio.hatena.result'),
    },
    carper: {
      title: t('portfolio.carper.title'),
      description: t('portfolio.carper.desc'),
      image: '/img/portfolio/new/carper.png',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://carpersonido.com',
      nofollow: true,
      exito: t('portfolio.carper.desc'),
      sector: t('portfolio.carper.sector'),
      result: t('portfolio.carper.result'),
    },
    vidal: {
      title: t('portfolio.vidal.title'),
      description: t('portfolio.vidal.desc'),
      image: '/img/portfolio/new/clinica-vidal.png',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://clinicavidalinsua.com',
      nofollow: true,
      exito: t('portfolio.vidal.desc'),
      sector: t('portfolio.vidal.sector'),
      result: t('portfolio.vidal.result'),
    },
    beachvans: {
      title: t('portfolio.beachvans.title'),
      description: t('portfolio.beachvans.desc'),
      image: '/img/portfolio/new/beachvans.png',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://beachvanscamper.com',
      nofollow: true,
      exito: t('portfolio.beachvans.desc'),
      sector: t('portfolio.beachvans.sector'),
      result: t('portfolio.beachvans.result'),
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
      image: '/img/portfolio/new/casa-rural-oalicornio.png',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://oalicornio.com',
      nofollow: true,
      exito: t('portfolio.alicornio.desc'),
      sector: t('portfolio.alicornio.sector'),
      result: t('portfolio.alicornio.result'),
    },
    desmundando: {
      title: t('portfolio.desmundando.title'),
      description: t('portfolio.desmundando.desc'),
      image: '/img/portfolio/desmundando-empty.png',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      exito: t('portfolio.desmundando.desc'),
    },
    elefantes: {
      title: t('portfolio.elefantes.title'),
      description: t('portfolio.elefantes.desc'),
      image: '/img/portfolio/new/elefantes.png',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://elviajedeloselefantes.com',
      nofollow: true,
      exito: t('portfolio.elefantes.desc'),
    },
    silly: {
      title: t('portfolio.silly.title'),
      description: t('portfolio.silly.desc'),
      image: '/img/portfolio/new/silly.png',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      exito: t('portfolio.silly.desc'),
    },
    reformas: {
      title: t('portfolio.reformas.title'),
      description: t('portfolio.reformas.result'),
      image: localWebDemoImage('reformas.webp'),
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: localWebDemoHref('reparaciones', DEMO_CITY_SLUG),
      sector: t('portfolio.reformas.sector'),
      result: t('portfolio.reformas.result'),
      exito: t('portfolio.reformas.result'),
      kind: 'demo',
    },
    inmobiliaria: {
      title: t('portfolio.inmobiliaria.title'),
      description: t('portfolio.inmobiliaria.result'),
      image: localWebDemoImage('inmobiliaria.webp'),
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: localWebDemoHref('inmobiliaria', DEMO_CITY_SLUG),
      sector: t('portfolio.inmobiliaria.sector'),
      result: t('portfolio.inmobiliaria.result'),
      exito: t('portfolio.inmobiliaria.result'),
      kind: 'demo',
    },
    psicologa: {
      title: t('portfolio.psicologa.title'),
      description: t('portfolio.psicologa.result'),
      image: localWebDemoImage('psicologa.webp'),
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: localWebDemoHref('psicologia', DEMO_CITY_SLUG),
      sector: t('portfolio.psicologa.sector'),
      result: t('portfolio.psicologa.result'),
      exito: t('portfolio.psicologa.result'),
      kind: 'demo',
    },
  };

  const showcaseOrder = [...randomReals, ...DEMO_ORDER];
  const fallbackOrder = variant === 'tiendas' ? SHOP_ORDER : showcaseOrder;
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
      title: titles?.[id] ?? projectsById[id].title,
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
          label: 'Portfolio',
          title: t('portfolio.title'),
          description: t('portfolio.description'),
        };

  const heading = {
    label: headingLabel ?? defaultHeading.label,
    title: headingTitle ?? defaultHeading.title,
    description: headingDescription ?? defaultHeading.description,
  };

  const gridClass =
    projects.length <= 2
      ? 'mx-auto grid w-full max-w-5xl grid-cols-1 items-stretch gap-page-gap md:grid-cols-2'
      : projects.length === 4
        ? 'mx-auto grid grid-cols-1 items-stretch gap-page-gap md:grid-cols-2 lg:grid-cols-4'
        : 'mx-auto grid grid-cols-1 items-stretch gap-page-gap md:grid-cols-2 lg:grid-cols-3';

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
                  <ShowcaseCard
                    badge={
                      project.kind === 'demo'
                        ? 'Plantilla / Demo en vivo'
                        : 'Cliente real'
                    }
                    sector={project.sector ?? ''}
                    title={project.title}
                    result={project.result}
                    image={project.image}
                    url={urls?.[project.id] ?? project.url}
                    ctaLabel={
                      project.kind === 'demo' ? 'Ver demo' : 'Ver web real'
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

          {note || ctaHref ? (
            <div className='mx-auto flex max-w-3xl flex-col items-center gap-4 text-center'>
              {note ? (
                <p className='text-xl text-ink-dark md:text-2xl'>{note}</p>
              ) : null}
              {ctaHref && ctaText ? (
                <Button
                  href={ctaHref}
                  className='!mt-2'
                  onClick={() => trackCtaClick(ctaText, 'LaunchPortfolio')}
                >
                  {ctaText}
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
