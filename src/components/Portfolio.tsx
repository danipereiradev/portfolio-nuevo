import { ThumbsUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSectionView } from '../hooks/useSectionView';

import { trackViewPortfolioSection } from '../utils/analytics';

interface PortfolioProps {
  /** En /web-profesional: badges de packs y sin proyectos de tienda online. */
  variant?: 'default' | 'web-profesional';
}

const Portfolio = ({ variant = 'default' }: PortfolioProps) => {
  const { t } = useLanguage();

  const sectionRef = useSectionView<HTMLElement>(trackViewPortfolioSection);
  const isPackLanding = variant === 'web-profesional';

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
      exito: 'Primer resultado en google en +100 palabras clave',
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
      exito: 'Incremento del 300% en ventas',
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
      exito: 'Nuevos suscriptores en newsletter.',
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
        className='relative py-20 overflow-hidden flex items-center'
      >
        <div className=' mx-auto relative z-10 container px-6 md:px-12 '>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-4'>
              {t('portfolio.title')}
            </h2>
            {!isPackLanding && (
              <p className='text-xl text-gray-600    mx-auto'>
                {t('portfolio.description')}
              </p>
            )}
          </div>

          <div
            className={
              projects.length === 1
                ? 'flex justify-center mx-auto'
                : isPackLanding
                  ? 'grid md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8   mx-auto'
                  : 'grid md:grid-cols-3 gap-6 md:gap-8    mx-auto'
            }
          >
            {projects.map((project, index) => (
              <div
                key={index}
                /* onClick={() => openProjectModal(index)}
                onMouseEnter={() =>
                  project.headerImage && preloadImage(project.headerImage)
                } */
                className={`group cursor-pointer rounded-2xl  bg-white overflow-hidden  ${
                  projects.length === 1 ? 'w-full max-w-md' : ''
                }`}
              >
                <article
                  key={project.title}
                  className='bg-[#141414] text-neutral-300 shadow-xl rounded-2xl overflow-hidden flex flex-col '
                >
                  <a
                    className='block bg-gray-100'
                    tabIndex={-1}
                    aria-hidden='true'
                  >
                    <img
                      src={project.headerImage}
                      alt={project.title}
                      width={800}
                      height={600}
                      className='w-full aspect-[4/3] object-cover '
                      loading='lazy'
                      decoding='async'
                    />
                  </a>

                  <div className='p-5 md:p-6 flex flex-col flex-1 text-center'>
                    <h3 className='text-xl md:text-2xl font-bold text-neutral-300  mb-2'>
                      {project.title}
                    </h3>
                    <p className='text-sm md:text-base text-neutral-300  leading-relaxed mb-5 flex-1'>
                      {project.description}
                    </p>

                    <div className='flex items-center justify-center gap-2'>
                      <ThumbsUp width={20} className='text-accent' />
                      <p className='text-accent text-md'>{project.exito}</p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
