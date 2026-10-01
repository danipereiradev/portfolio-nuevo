import { useEffect, useState, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSectionView } from '../hooks/useSectionView';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
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
import { localWebDemoImage } from '../data/localWebDemos';

export type ProjectId =
  | 'chicxs'
  | 'hoyviajamos'
  | 'camisetas'
  | 'hatena'
  | 'delish'
  | 'carper'
  | 'alicornio'
  | 'desmundando'
  | 'elefantes'
  | 'silly'
  | 'beachvans'
  | 'vidal'
  | 'reformas'
  | 'inmobiliaria'
  | 'mhin'
  | 'psicologa'
  | 'bonobo'
  | 'detectives'
  | 'mcauto'
  | 'somatica'
  | 'itzalak'
  | 'noma'
  | 'obrador'
  | 'noemi';

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
  /** Muestra el portfolio de N en N, con anteriores/siguientes. Sin carrusel. */
  pageSize?: number;
}

/** Fila 1: clientes reales. Fila 2: demos de sector. */
const ALL_ORDER: ProjectId[] = [
  'beachvans',
  'vidal',
  'camisetas',
  'reformas',
  'inmobiliaria',
  'psicologa',
];
const SHOP_ORDER: ProjectId[] = ['camisetas'];
const CASOS_ORDER: ProjectId[] = ['chicxs', 'hoyviajamos', 'camisetas'];

/** Clientes reales de diseño web (no tiendas, no demos de sector). */
export const REAL_WEB_PROJECT_IDS: readonly ProjectId[] = [
  'beachvans',
  'vidal',
  'hatena',
  'carper',
  'alicornio',
  'hoyviajamos',
  'elefantes',
  'silly',
];

/** Mockups WebP de escritorio, tableta y móvil en /img/portfolio/new. */
export const ALL_SHOWCASE_PROJECT_IDS: readonly ProjectId[] = [
  'beachvans',
  'vidal',
  'hatena',
  'carper',
  'alicornio',
  'hoyviajamos',
  'elefantes',
  'silly',
  'desmundando',
  'mhin',
  'chicxs',
  'camisetas',
  'delish',
  'bonobo',
  'detectives',
  'mcauto',
  'somatica',
  'itzalak',
  'noma',
  'obrador',
  'noemi',
];

export const pickRandomProjectIds = (
  pool: readonly ProjectId[],
  count: number,
): ProjectId[] => {
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

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
          className='aspect-square h-auto w-full object-contain'
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

function CaptureLightbox({
  title,
  image,
  onClose,
}: {
  title: string;
  image: string;
  onClose: () => void;
}) {
  useBodyScrollLock(true);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className='fixed inset-0 z-[9999] flex items-center justify-center p-4'
      role='dialog'
      aria-modal='true'
      aria-label={title}
      onClick={onClose}
    >
      <div className='absolute inset-0 bg-black/80 backdrop-blur-sm' />
      <button
        type='button'
        onClick={onClose}
        className='absolute right-4 top-4 z-10 rounded-full border-2 border-ink-dark bg-white p-2 shadow-[3px_3px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_0_#1a1a1a]'
        aria-label='Cerrar captura'
      >
        <X className='h-6 w-6 text-ink-dark' />
      </button>
      <div
        className='relative max-h-[90vh] w-full max-w-6xl'
        onClick={(event) => event.stopPropagation()}
      >
        <PictureImg
          src={image}
          alt={title}
          width={1536}
          height={1024}
          className='mx-auto max-h-[90vh] w-auto object-contain'
        />
      </div>
    </div>
  );
}

function ShowcaseCard({
  sector,
  title,
  description,
  image,
  ctaLabel,
  onOpen,
}: {
  sector: string;
  title: string;
  description: string;
  image: string;
  ctaLabel: string;
  onOpen: () => void;
}) {
  return (
    <article className={cardClass}>
      <button
        type='button'
        onClick={onOpen}
        className='bg-ink-dark'
        aria-label={`${ctaLabel}: ${title}`}
      >
        <PictureImg
          src={image}
          alt={`Mockup de escritorio, tableta y móvil de ${title}`}
          width={1536}
          height={1024}
          className='h-auto w-full object-contain'
          loading='lazy'
          decoding='async'
          draggable={false}
        />
      </button>
      <div className='flex flex-1 flex-col items-center gap-2 p-content-pad text-center'>
        <p className='text-sm font-extrabold uppercase tracking-wide text-accent'>
          {sector}
        </p>
        <h3 className='text-xl font-extrabold text-ink-dark md:text-2xl'>
          {title}
        </h3>
        <p className='text-base leading-snug text-ink-dark md:text-lg'>
          {description}
        </p>
        <button
          type='button'
          onClick={onOpen}
          className='mt-auto inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-extrabold uppercase text-white hover:bg-accent-hover md:text-base'
        >
          {ctaLabel}
        </button>
      </div>
    </article>
  );
}

const Portfolio = ({
  variant = 'default',
  casos = false,
  ids,
  images,
  titles,
  onProjectClick,
  headingLabel,
  headingTitle,
  headingDescription,
  note,
  ctaText = 'Quiero resultados como estos',
  ctaHref = '#contacto',
  pageSize,
}: PortfolioProps) => {
  const { t } = useLanguage();
  const [page, setPage] = useState(0);

  const sectionRef = useSectionView<HTMLElement>(trackViewPortfolioSection);
  const isPackLanding = variant === 'web-profesional';
  const isCasos = casos || isPackLanding;
  const [lightbox, setLightbox] = useState<{
    title: string;
    image: string;
  } | null>(null);

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
      image: '/img/portfolio/new/chicxs.webp',
      product: SITE_SHOP_LABEL,
      productHref: SITE_SHOP_PATH,
      url: 'https://chicxsdelacalle.com',
      nofollow: true,
      exito: '+300% ventas. La tienda carga más rápido.',
    },
    hoyviajamos: {
      title: t('portfolio.hoyviajamos.title'),
      description: t('portfolio.hoyviajamos.desc'),
      image: '/img/portfolio/new/hoyviajamos.webp',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://hoyviajamosweb.com',
      nofollow: true,
      exito: 'Más suscriptores. El blog carga de verdad.',
    },
    camisetas: {
      title: t('portfolio.camisetas.title'),
      description: t('portfolio.camisetas.desc'),
      image: '/img/portfolio/new/camisetas.webp',
      product: SITE_SHOP_LABEL,
      productHref: SITE_SHOP_PATH,
      nofollow: true,
      exito: t('portfolio.camisetas.desc'),
      sector: t('portfolio.camisetas.sector'),
    },
    hatena: {
      title: t('portfolio.hatena.title'),
      description: t('portfolio.hatena.desc'),
      image: '/img/portfolio/new/hatena.webp',
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
      image: '/img/portfolio/new/carper.webp',
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
      image: '/img/portfolio/new/clinica-vidal.webp',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      nofollow: true,
      exito: t('portfolio.vidal.desc'),
      sector: t('portfolio.vidal.sector'),
    },
    beachvans: {
      title: t('portfolio.beachvans.title'),
      description: t('portfolio.beachvans.desc'),
      image: '/img/portfolio/new/beachvans.webp',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      nofollow: true,
      exito: t('portfolio.beachvans.desc'),
      sector: t('portfolio.beachvans.sector'),
    },
    delish: {
      title: t('portfolio.delish.title'),
      description: t('portfolio.delish.desc'),
      image: '/img/portfolio/new/delish.webp',
      product: SITE_SHOP_LABEL,
      productHref: SITE_SHOP_PATH,
      url: 'https://delishvegan.com/',
      nofollow: true,
      exito: t('portfolio.delish.desc'),
    },
    alicornio: {
      title: t('portfolio.alicornio.title'),
      description: t('portfolio.alicornio.desc'),
      image: '/img/portfolio/new/casa-rural-oalicornio.webp',
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
      image: '/img/portfolio/new/desmundando.webp',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      exito: t('portfolio.desmundando.desc'),
    },
    elefantes: {
      title: t('portfolio.elefantes.title'),
      description: t('portfolio.elefantes.desc'),
      image: '/img/portfolio/new/elefantes.webp',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://elviajedeloselefantes.com',
      nofollow: true,
      exito: t('portfolio.elefantes.desc'),
    },
    silly: {
      title: t('portfolio.silly.title'),
      description: t('portfolio.silly.desc'),
      image: '/img/portfolio/new/silly.webp',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      exito: t('portfolio.silly.desc'),
    },
    reformas: {
      title: t('portfolio.reformas.title'),
      description: t('portfolio.reformas.desc'),
      image: localWebDemoImage('reformas.webp'),
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      sector: t('portfolio.reformas.sector'),
      exito: t('portfolio.reformas.desc'),
      kind: 'demo',
    },
    inmobiliaria: {
      title: t('portfolio.inmobiliaria.title'),
      description: t('portfolio.inmobiliaria.desc'),
      image: localWebDemoImage('inmobiliaria.webp'),
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      sector: t('portfolio.inmobiliaria.sector'),
      exito: t('portfolio.inmobiliaria.desc'),
      kind: 'demo',
    },
    mhin: {
      title: t('portfolio.mhin.title'),
      description: t('portfolio.mhin.desc'),
      image: '/img/portfolio/new/mhin.webp',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://mhinprojects.com/',
      nofollow: true,
      sector: t('portfolio.mhin.sector'),
      exito: t('portfolio.mhin.desc'),
    },
    psicologa: {
      title: t('portfolio.psicologa.title'),
      description: t('portfolio.psicologa.desc'),
      image: localWebDemoImage('psicologa.webp'),
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      sector: t('portfolio.psicologa.sector'),
      exito: t('portfolio.psicologa.desc'),
      kind: 'demo',
    },
    bonobo: {
      title: t('portfolio.bonobo.title'),
      description: t('portfolio.bonobo.desc'),
      image: '/img/portfolio/new/escuela-estudio-bonobo.webp',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://www.estudobonobo.com/',
      nofollow: true,
      sector: t('portfolio.bonobo.sector'),
      exito: t('portfolio.bonobo.desc'),
    },
    detectives: {
      title: t('portfolio.detectives.title'),
      description: t('portfolio.detectives.desc'),
      image: '/img/portfolio/new/detectives-vigo.webp',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://www.betadetectives.com/',
      nofollow: true,
      sector: t('portfolio.detectives.sector'),
      exito: t('portfolio.detectives.desc'),
    },
    mcauto: {
      title: t('portfolio.mcauto.title'),
      description: t('portfolio.mcauto.desc'),
      image: '/img/portfolio/new/mcauto.webp',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://mcautoclassic.com/',
      nofollow: true,
      sector: t('portfolio.mcauto.sector'),
      exito: t('portfolio.mcauto.desc'),
    },
    somatica: {
      title: t('portfolio.somatica.title'),
      description: t('portfolio.somatica.desc'),
      image: '/img/portfolio/new/somatica.webp',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://psicoterapiasomatica.es/',
      nofollow: true,
      sector: t('portfolio.somatica.sector'),
      exito: t('portfolio.somatica.desc'),
    },
    itzalak: {
      title: t('portfolio.itzalak.title'),
      description: t('portfolio.itzalak.desc'),
      image: '/img/portfolio/new/itzalak.webp',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://itzalakpsicologia.com/',
      nofollow: true,
      sector: t('portfolio.itzalak.sector'),
      exito: t('portfolio.itzalak.desc'),
    },
    noma: {
      title: t('portfolio.noma.title'),
      description: t('portfolio.noma.desc'),
      image: '/img/portfolio/new/noma.webp',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://nomaabogados.com/',
      nofollow: true,
      sector: t('portfolio.noma.sector'),
      exito: t('portfolio.noma.desc'),
    },
    obrador: {
      title: t('portfolio.obrador.title'),
      description: t('portfolio.obrador.desc'),
      image: '/img/portfolio/new/obrador.webp',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://lobradordeponent.com/',
      nofollow: true,
      sector: t('portfolio.obrador.sector'),
      exito: t('portfolio.obrador.desc'),
    },
    noemi: {
      title: t('portfolio.noemi.title'),
      description: t('portfolio.noemi.desc'),
      image: '/img/portfolio/new/noemi.webp',
      product: SITE_WEB_LABEL,
      productHref: SITE_WEB_PATH,
      url: 'https://noemibonetpsicologia.com/',
      nofollow: true,
      sector: t('portfolio.noemi.sector'),
      exito: t('portfolio.noemi.desc'),
    },
  };

  const fallbackOrder = variant === 'tiendas' ? SHOP_ORDER : ALL_ORDER;
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

  const size = pageSize && pageSize > 0 ? pageSize : projects.length;
  const pageCount = Math.max(1, Math.ceil(projects.length / size));
  const currentPage = Math.min(page, pageCount - 1);
  const pageStart = currentPage * size;
  const visibleProjects = projects.slice(pageStart, pageStart + size);

  const goToPage = (nextPage: number) => {
    setPage(nextPage);
    document.getElementById('portfolio')?.scrollIntoView({ block: 'start' });
  };

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
    visibleProjects.length === 1
      ? 'mx-auto grid w-full max-w-3xl grid-cols-1 gap-page-gap'
      : visibleProjects.length <= 2
      ? 'mx-auto grid w-full max-w-5xl grid-cols-1 items-stretch gap-page-gap md:grid-cols-2'
      : visibleProjects.length === 4
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
              {visibleProjects.map((project, index) => (
                <RevealOnScroll
                  key={project.id}
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
              {visibleProjects.map((project, index) => (
                <RevealOnScroll
                  key={project.id}
                  className='h-full'
                  delayMs={index * 90}
                >
                  <ShowcaseCard
                    sector={project.sector ?? ''}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    ctaLabel={
                      project.kind === 'demo'
                        ? 'Ver diseño base'
                        : 'Ver captura completa'
                    }
                    onOpen={() => {
                      trackPortfolioClick(project.title);
                      onProjectClick?.(project.id);
                      setLightbox({
                        title: project.title,
                        image: project.image,
                      });
                    }}
                  />
                </RevealOnScroll>
              ))}
            </div>
          )}

          {pageCount > 1 ? (
            <div className='mx-auto flex w-full max-w-3xl flex-col items-center gap-3 sm:flex-row sm:justify-center'>
              <Button
                type='button'
                variant='outline'
                className='!mx-0 !mt-0'
                disabled={currentPage === 0}
                onClick={() => goToPage(currentPage - 1)}
              >
                Anterior
              </Button>
              <Button
                type='button'
                variant='outline'
                className='!mx-0 !mt-0'
                disabled={currentPage >= pageCount - 1}
                onClick={() => goToPage(currentPage + 1)}
              >
                Siguiente
              </Button>
            </div>
          ) : null}

          {note || ctaHref ? (
            <div className='mx-auto flex max-w-3xl flex-col items-center gap-4 text-center'>
              {note ? (
                <p className='text-xl text-ink-dark md:text-2xl'>{note}</p>
              ) : null}
              {ctaHref && ctaText ? (
                <Button
                  href={ctaHref}
                  className='!mt-2'
                  target={ctaHref.startsWith('http') ? '_blank' : undefined}
                  rel={
                    ctaHref.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  allowAdsOutbound={ctaHref.startsWith('http')}
                  onClick={() => trackCtaClick(ctaText, 'LaunchPortfolio')}
                >
                  {ctaText}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
      {lightbox ? (
        <CaptureLightbox
          title={lightbox.title}
          image={lightbox.image}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </>
  );
};

export default Portfolio;
