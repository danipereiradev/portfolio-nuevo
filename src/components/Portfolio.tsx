import { useLanguage } from '../contexts/LanguageContext';
import { useSectionView } from '../hooks/useSectionView';

import { trackViewPortfolioSection } from '../utils/analytics';

interface PortfolioProps {
  /** En /web-profesional: badges de packs y sin proyectos de tienda online. */
  variant?: 'default' | 'web-profesional';
  /** Landings de ads: el caso de éxito se lee en la card y no se sale de la página. */
  contained?: boolean;
}

const Portfolio = ({
  variant = 'default',
  contained = false,
}: PortfolioProps) => {
  const { t } = useLanguage();

  const sectionRef = useSectionView<HTMLElement>(trackViewPortfolioSection);
  const isPackLanding = variant === 'web-profesional';
  const stayOnPage = contained || isPackLanding;

  const projectsRaw = [
    {
      title: t('portfolio.carper.title'),
      description: t('portfolio.sillysally.desc'),
      longDescription: `Silly Sally es una banda de Madrid con 15 años de carrera. Querían un one-pager claro: bio, música, dossier para booking, merch y redes, sin marear a promotores ni fans.

Hay Spotify embebido, descarga del dossier, Bandcamp para el merch e Instagram que se actualiza solo. Rápida, directa, mantenible.

Una URL con todo lo que necesitan salas y público.`,
      image: '/img/portfolio/mock-carper.png',
      headerImage: '/img/portfolio/mock-carper.png',
      tech: [
        'React',
        'Vite',
        'TypeScript',
        'Tailwind CSS',
        'Spotify Embed',
        'Bandcamp',
        'Instagram Feed',
      ],
      product: 'Web a Medida',
      productHref: '/web-profesional-a-medida',
      publishedAt: '3 agosto 2026',
      url: 'https://sillysallyband.com',
      exito:
        'Primer resultado en google en +100 palabras clave aumento del 400% en llamadas a la empresa',
    },
    /* {
      title: t('portfolio.core.title'),
      description: t('portfolio.core.desc'),
      longDescription: `CoreGenerator es una aplicación web creada como experimento de producto alrededor del trend de los vídeos "CORE" en redes sociales.

La herramienta permite al usuario subir varios clips de vídeo, ordenarlos y generar automáticamente una versión final en formato vertical, lista para compartir en TikTok, Instagram Reels o YouTube Shorts. Durante el procesamiento, la app une los clips, añade una transición sonora entre cortes y superpone el texto "CORE" en el vídeo final.

El objetivo del proyecto fue construir un MVP funcional en poco tiempo, validando una idea ligada a un trend real y explorando una parte más técnica del desarrollo web: el procesamiento de vídeo desde backend.

Además del desarrollo de la interfaz, el proyecto incluye una API propia para gestionar la subida de archivos, procesar los vídeos con FFmpeg, generar el resultado final y eliminar los archivos temporales después del procesamiento.

Este proyecto me permitió trabajar el flujo completo de una aplicación real: frontend, backend, despliegue, gestión de archivos, procesamiento multimedia, analítica y validación inicial de producto.

Características técnicas: subida múltiple de vídeos, validación de archivos, procesamiento de vídeo en backend, conversión a formato vertical, unión de clips, inserción de audio de transición, inserción de texto sobre vídeo, descarga del vídeo final en MP4, limpieza de archivos temporales, API REST y control básico de errores.`,
      image: '/img/portfolio/core.png',
      headerImage: '/img/portfolio/mock-core.png',
      tech: [
        'React',
        'Vite',
        'TypeScript',
        'CSS',
        'Node.js',
        'Express',
        'Multer',
        'FFmpeg',
        'Vercel',
        'Railway',
        'GitHub',
        'Google Analytics 4',
      ],
      product: 'Web a Medida',
      productHref: '/web-profesional-a-medida',
      publishedAt: '3 julio 2026',
      url: 'https://coregeneratorapp.vercel.app/',
      exito: '+1000 usuarios en los 3 primeros meses.',
    }, */
    {
      title: t('portfolio.camisetas.title'),
      description: t('portfolio.camisetas.desc'),
      longDescription: `Camisetas Ahora vende camisetas personalizadas con un catálogo que cambia mucho. Hacía falta filtrar por tags, temas, colores y tallas sin volverse loco.

Montamos búsqueda usable, visualizador con varios ángulos y zoom, y un panel para cargar productos a lo bruto y mirar stock por talla/color. También hay afiliados para quien promociona.

Hoy procesan cientos de pedidos al año.`,
      image: '/img/portfolio/chicxs.png',
      headerImage: '/img/portfolio/mock-chicxs.png',
      tech: ['WordPress', 'WooCommerce', 'jQuery', 'CSS3'],
      product: 'Tienda Online',
      productHref: '/tiendas-online',
      publishedAt: '18 junio 2026',
      url: 'https://camisetas-ahora.com',
      testimonialName: 'Irene Ibáñez',
      exito:
        'Incremento del 300% en ventas y mejora notable en velocidad de la tienda. Mejoría notable.',
    },
    {
      title: t('portfolio.hoyviajamos.title'),
      description: t('portfolio.hoyviajamos.desc'),
      longDescription: `Hoy Viajamos es el blog de una pareja que cuenta viajes. Prioridad: que se lean bien las historias y se vean las fotos sin que la página se arrastre.

Hay categorías (destinos, guías, tips, comida), galerías ligeras, mapas de sitios visitados y newsletter. Monetizan con afiliados y alguna colaboración. Nada de inventar un “ecosistema digital”: una web que aguanta el contenido.`,
      image: '/img/portfolio/hoyviajamos.png',
      headerImage: '/img/portfolio/mock-viajamos.png',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
      product: 'Web a Medida',
      productHref: '/web-profesional-a-medida',
      publishedAt: '24 junio 2026',
      url: 'https://hoyviajamosweb.com',
      testimonialName: 'Juanvi Raga',
      exito:
        'Nuevos suscriptores en newsletter y mejora en la optimización y carga del blog.',
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
      <section
        id='portfolio'
        ref={sectionRef}
        className='page-section'
      >
        <div className='container mx-auto flex flex-col gap-page-gap'>
          <div className='page-title-block mx-auto max-w-3xl text-center'>
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
            {projects.map((project) => {
              const cardClass = `group relative block overflow-hidden rounded-2xl shadow-xl ${
                projects.length === 1 ? 'w-full max-w-md' : ''
              }`;
              const cardBody = (
                <>
                  <img
                    src={project.headerImage}
                    alt={project.title}
                    width={800}
                    height={600}
                    className='aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110'
                    loading='lazy'
                    decoding='async'
                  />
                  <div className='absolute inset-0 bg-ink-dark/60 transition-colors duration-300 group-hover:bg-ink-dark/85' />
                  <div className='absolute inset-x-4 bottom-6 z-10 text-center'>
                    <h3 className='text-2xl font-extrabold text-white md:text-3xl'>
                      {project.title}
                    </h3>
                    {stayOnPage ? (
                      <p className='mt-2 text-sm font-medium leading-snug text-white/90 md:text-base'>
                        {project.exito}
                      </p>
                    ) : null}
                  </div>
                </>
              );

              if (stayOnPage) {
                return (
                  <article key={project.title} className={cardClass}>
                    {cardBody}
                  </article>
                );
              }

              return (
                <a
                  key={project.title}
                  href={project.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cardClass}
                >
                  {cardBody}
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
