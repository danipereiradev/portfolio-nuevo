import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, X, Loader2, MessageCircle, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSectionView } from '../hooks/useSectionView';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import {
  trackViewPortfolioSection,
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
} from '../utils/analytics';
import {
  PORTFOLIO_WHATSAPP_MESSAGE,
  buildWhatsAppUrl,
} from '../config/contact';
import { allTestimonials } from '../data/testimonials';
import Button from './Button';

const WHATSAPP_URL = buildWhatsAppUrl(PORTFOLIO_WHATSAPP_MESSAGE);

// Reproduce el resaltado en negrita que Google aplica a ciertas frases
// dentro de las reseñas (mismo criterio que en Testimonials.tsx).
const renderWithBoldPhrase = (content: string, boldPhrase?: string) => {
  if (!boldPhrase) return content;
  const index = content.indexOf(boldPhrase);
  if (index === -1) return content;

  return (
    <>
      {content.slice(0, index)}
      <strong className='font-bold text-gray-900'>{boldPhrase}</strong>
      {content.slice(index + boldPhrase.length)}
    </>
  );
};

interface PortfolioProps {
  /** En /web-profesional: badges de packs y sin proyectos de tienda online. */
  variant?: 'default' | 'web-profesional';
}

const Portfolio = ({ variant = 'default' }: PortfolioProps) => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const sectionRef = useSectionView<HTMLElement>(trackViewPortfolioSection);
  const isPackLanding = variant === 'web-profesional';

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('Portfolio', 'Solicitar ejemplos');
    trackGoogleAdsWhatsAppConversion(WHATSAPP_URL);
  };

  useBodyScrollLock(selectedProject !== null);

  // Orden por fecha de publicación (más reciente primero).
  const projectsRaw = [
    {
      title: t('portfolio.sillysally.title'),
      description: t('portfolio.sillysally.desc'),
      longDescription: `Silly Sally es una banda de Madrid con 15 años de carrera. Querían un one-pager claro: bio, música, dossier para booking, merch y redes, sin marear a promotores ni fans.

Hay Spotify embebido, descarga del dossier, Bandcamp para el merch e Instagram que se actualiza solo. Rápida, directa, mantenible.

Una URL con todo lo que necesitan salas y público.`,
      image: '/img/portfolio/silly-sally-mock.webp',
      headerImage: '/img/portfolio/silly-sally-mock.webp',
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
    },
    {
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
    },
    {
      title: t('portfolio.camisetas.title'),
      description: t('portfolio.camisetas.desc'),
      longDescription: `Camisetas Ahora vende camisetas personalizadas con un catálogo que cambia mucho. Hacía falta filtrar por tags, temas, colores y tallas sin volverse loco.

Montamos búsqueda usable, visualizador con varios ángulos y zoom, y un panel para cargar productos a lo bruto y mirar stock por talla/color. También hay afiliados para quien promociona.

Hoy procesan cientos de pedidos al año.`,
      image: '/img/portfolio/camisetas-ahora.png',
      headerImage: '/img/portfolio/mock-camisetas.png',
      tech: ['WordPress', 'WooCommerce', 'jQuery', 'CSS3'],
      product: 'Tienda Online',
      productHref: '/tiendas-online',
      publishedAt: '18 junio 2026',
      url: 'https://camisetas-ahora.com',
      testimonialName: 'Irene Ibáñez',
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

  // En /web-profesional no mostramos el bloque "Próximamente".

  const openProjectModal = (index: number) => {
    setSelectedProject(index);
    setImageLoading(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  const preloadImage = (imageUrl: string) => {
    const img = new Image();
    img.src = imageUrl;
  };

  return (
    <>
      <section
        id='portfolio'
        ref={sectionRef}
        className='relative py-20 bg-gray-50 overflow-hidden     flex items-center'
      >
        <div className=' mx-auto relative z-10 container px-6 md:px-12 '>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-4'>
              {isPackLanding ? 'Trabajos reales' : t('portfolio.title')}
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
                  ? 'grid md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8   mx-auto'
                  : 'grid md:grid-cols-4 gap-6 md:gap-8    mx-auto'
            }
          >
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => openProjectModal(index)}
                onMouseEnter={() =>
                  project.headerImage && preloadImage(project.headerImage)
                }
                className={`group cursor-pointer rounded-2xl  bg-white overflow-hidden  ${
                  projects.length === 1 ? 'w-full max-w-md' : ''
                }`}
              >
                <article
                  key={project.title}
                  className='bg-ink-dark text-neutral-300 shadow-xl rounded-2xl overflow-hidden flex flex-col '
                >
                  <a
                    href={project.url}
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
                    {/* <a
                  href={service.link}
                  className='inline-flex self-start text-sm font-bold text-ink-dark border-2 border-ink-dark bg-accent px-4 py-2 rounded-lg shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
                >
                  {service.cta}
                </a> */}
                  </div>
                </article>
                {/* <div className='relative overflow-hidden bg-white border-b-2 border-ink-dark'>
                  <img
                    src={project.headerImage}
                    alt={project.title}
                    className='w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.03]'
                    loading='lazy'
                  />
                  <a
                    href={project.productHref}
                    onClick={(e) => e.stopPropagation()}
                    className='absolute top-4 left-4 bg-accent text-ink-dark border-2 border-ink-dark text-xs font-bold px-3 py-1 rotate-[-1deg] hover:bg-accent-hover transition-colors z-10'
                  >
                    {project.product}
                  </a>
                </div>

                <div className='p-5 md:p-6'>
                  {!isPackLanding && (
                    <p className='text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5'>
                      {project.publishedAt}
                    </p>
                  )}
                  <h3 className='text-xl font-bold text-gray-900 mb-1.5'>
                    {project.title}
                  </h3>
                  <p className='text-base text-gray-700 font-medium leading-relaxed line-clamp-2'>
                    {project.description}
                  </p>
                  <span className='inline-block text-sm font-semibold text-accent mt-3 group-hover:underline'>
                    Ver caso completo
                  </span>
                </div> */}
              </div>
            ))}
          </div>

          <div className='   mx-auto mt-[100px] mb-[50px] bg-ink-dark border-2 border-ink-dark rounded-2xl p-8 text-center shadow-[6px_6px_0_0_rgba(20,184,166,0.5)]'>
            <h3 className='text-2xl md:text-3xl font-bold text-white mb-4'>
              ¿Quieres ver proyectos parecidos al que tienes en mente?
            </h3>
            <p className='text-lg text-white/80 font-medium mb-6'>
              Cuéntanos qué tipo de web necesitas y te enviaremos ejemplos de
              trabajos relacionados.
            </p>
            <div className='flex justify-center'>
              <Button onClick={handleWhatsAppClick} variant='primary'>
                Solicitar ejemplos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {selectedProject !== null &&
        createPortal(
          // Renderizado con un portal directamente en <body>: si este modal
          // viviera dentro de la jerarquía normal de la sección (que tiene
          // ancestros con "position: relative" + z-index propio), su z-50
          // quedaría atrapado en ese contexto de apilamiento local y podría
          // renderizarse por DEBAJO del header (también z-50, pero en la
          // raíz de la app), dejando el botón de cerrar oculto e inutilizable.
          <div
            className='fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-0'
            onClick={closeProjectModal}
          >
            <div
              className='bg-white w-full md:w-[85vw] lg:w-[75vw] h-full overflow-y-auto overscroll-contain relative'
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeProjectModal}
                className='fixed top-4 right-4 md:top-8 md:right-8 bg-white border-2 border-ink-dark rounded-full p-2 md:p-3 shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 z-20'
              >
                <X className='w-5 h-5 md:w-6 md:h-6 text-gray-700' />
              </button>

              <div className='bg-white'>
                {projects[selectedProject].headerImage && (
                  <div className='w-full relative'>
                    {imageLoading && (
                      <div className='absolute inset-0 flex items-center justify-center bg-gray-100'>
                        <Loader2 className='w-12 h-12 text-accent animate-spin' />
                      </div>
                    )}
                    <img
                      src={projects[selectedProject].headerImage}
                      alt={projects[selectedProject].title}
                      className='w-full h-auto object-cover'
                      loading='eager'
                      onLoad={() => setImageLoading(false)}
                      style={{ display: imageLoading ? 'none' : 'block' }}
                    />
                  </div>
                )}

                <div className='   mx-auto px-6 md:px-12 py-12 md:py-16'>
                  <h3 className='text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6'>
                    {projects[selectedProject].title}
                  </h3>
                  <p className='text-lg md:text-2xl text-gray-700 font-medium mb-8 md:mb-12 leading-relaxed'>
                    {projects[selectedProject].description}
                  </p>
                  <div className='prose prose-lg md:prose-xl max-w-none mb-8 md:mb-12'>
                    {projects[selectedProject].longDescription
                      .split('\n\n')
                      .map((paragraph, idx) => (
                        <p
                          key={idx}
                          className='text-gray-700 leading-relaxed mb-4 md:mb-6'
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>

                  <div className='mb-8 md:mb-12 pb-8 md:pb-12 border-b border-gray-200'>
                    <h4 className='text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6'>
                      Tecnologías utilizadas
                    </h4>
                    <div className='flex flex-wrap gap-2 md:gap-3'>
                      {projects[selectedProject].tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className='bg-gray-100 text-gray-800 px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm md:text-base font-medium'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {(() => {
                    const review = allTestimonials.find(
                      (t) =>
                        t.name === projects[selectedProject].testimonialName,
                    );
                    if (!review) return null;

                    return (
                      <div className='mb-8 md:mb-12 pb-8 md:pb-12 border-b border-gray-200'>
                        <h4 className='text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6'>
                          Opinión real del cliente
                        </h4>
                        <div className='bg-white rounded-lg p-6 border-2 border-ink-dark shadow-[5px_5px_0_0_#1a1a1a] max-w-2xl'>
                          <div className='flex items-center gap-1 mb-4'>
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className='w-5 h-5 text-yellow-400 fill-current'
                              />
                            ))}
                          </div>

                          <blockquote className='text-base text-gray-700 leading-relaxed mb-4'>
                            "
                            {renderWithBoldPhrase(
                              review.text,
                              review.boldPhrase,
                            )}
                            "
                          </blockquote>

                          {review.highlight && (
                            <div className='bg-gray-50 border-l-4 border-accent p-3 rounded-r-lg mb-4'>
                              <p className='text-sm text-gray-800 font-medium italic'>
                                "
                                {renderWithBoldPhrase(
                                  review.highlight,
                                  review.boldPhrase,
                                )}
                                "
                              </p>
                            </div>
                          )}

                          <div>
                            <h5 className='font-bold text-gray-900 text-base'>
                              {review.name}
                            </h5>
                            {review.company && (
                              <p className='text-accent font-semibold text-sm'>
                                {review.company}
                              </p>
                            )}
                            <a
                              href={review.sourceUrl}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='inline-flex items-center gap-1 text-xs text-gray-400 hover:text-accent transition-colors mt-1.5'
                            >
                              {review.source === 'google'
                                ? 'Reseña de Google'
                                : 'Recomendación en Malt'}
                              <ExternalLink className='w-3 h-3' />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {projects[selectedProject].url && (
                    <div className='text-center'>
                      <a
                        href={projects[selectedProject].url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center justify-center gap-2 md:gap-3 bg-accent text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl border-2 border-ink-dark shadow-[5px_5px_0_0_#1a1a1a] hover:bg-accent-hover hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 text-base md:text-lg font-bold w-full sm:w-auto'
                      >
                        <ExternalLink className='w-5 h-5 md:w-6 md:h-6' />
                        Visitar sitio web
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default Portfolio;
