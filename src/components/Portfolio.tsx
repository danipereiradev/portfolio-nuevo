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

const Portfolio = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const sectionRef = useSectionView<HTMLElement>(trackViewPortfolioSection);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('Portfolio', 'Solicitar ejemplos');
    trackGoogleAdsWhatsAppConversion(WHATSAPP_URL);
  };

  useBodyScrollLock(selectedProject !== null);

  const projects = [
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
      category: 'Aplicación Web',
      url: 'https://coregeneratorapp.vercel.app/',
    },
    {
      title: t('portfolio.camisetas.title'),
      description: t('portfolio.camisetas.desc'),
      longDescription: `Camisetas Ahora es un proyecto de e-commerce especializado en camisetas personalizadas y diseños exclusivos. El cliente necesitaba una plataforma que permitiera gestionar un catálogo amplio y cambiante de diseños.

El desarrollo se enfocó en crear una experiencia de usuario excepcional para la búsqueda y filtrado de productos. Se implementó un sistema de búsqueda por tags, temas, colores y tallas que permite a los usuarios encontrar exactamente lo que buscan entre cientos de opciones.

Una característica destacada es el visualizador de productos que muestra las camisetas desde múltiples ángulos y permite hacer zoom para apreciar los detalles de cada diseño. También se integró un sistema de recomendaciones basado en las preferencias de navegación.

El backend incluye un panel de administración personalizado que facilita la carga masiva de productos, gestión de inventario por talla y color, y seguimiento detallado de las ventas por categoría. Esto ha permitido al equipo tomar decisiones informadas sobre qué diseños producir.

La tienda también cuenta con un programa de afiliados que ha generado una red de promotores que generan ventas adicionales mediante comisiones. El proyecto ha sido un éxito comercial, procesando miles de pedidos mensuales.`,
      image: '/img/portfolio/camisetas-ahora.png',
      headerImage: '/img/portfolio/mock-camisetas.png',
      tech: ['WordPress', 'WooCommerce', 'jQuery', 'CSS3'],
      category: 'Tienda Online',
      url: 'https://camisetas-ahora.com',
      testimonialName: 'Irene Ibáñez',
    },
    {
      title: t('portfolio.hoyviajamos.title'),
      description: t('portfolio.hoyviajamos.desc'),
      longDescription: `Hoy Viajamos es un blog de viajes que documenta las aventuras de una pareja de viajeros por el mundo. El proyecto necesitaba una plataforma que permitiera compartir historias, fotografías y consejos de viaje de manera atractiva.

El diseño se centró en la experiencia de lectura, con tipografía cuidadosamente seleccionada y espacios generosos que permiten que el contenido respire. Las imágenes de alta calidad son el protagonista, con un sistema de galerías optimizado que mantiene los tiempos de carga rápidos.

Se implementó una estructura de contenido compleja con múltiples categorías: destinos, guías de viaje, consejos prácticos, y experiencias gastronómicas. Cada artículo está optimizado para SEO con rich snippets que mejoran la visibilidad en buscadores.

El blog incluye funcionalidades interactivas como mapas de destinos visitados, calculadoras de presupuesto de viaje, y un sistema de comentarios que fomenta la comunidad de viajeros. También se integró una newsletter que ha crecido a miles de suscriptores.

La monetización se logró mediante publicidad estratégica, enlaces de afiliados a booking y productos de viaje, y colaboraciones con marcas del sector turístico. El blog genera actualmente ingresos pasivos consistentes.`,
      image: '/img/portfolio/hoyviajamos.png',
      headerImage: '/img/portfolio/mock-viajamos.png',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
      category: 'Página Web',
      url: 'https://hoyviajamosweb.com',
      testimonialName: 'Juanvi Raga',
    },
  ];

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
        className='relative py-20 bg-white overflow-hidden'
      >
        <div className='container mx-auto px-6 relative z-10'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-4'>
              {t('portfolio.title')}
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              {t('portfolio.description')}
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto'>
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => openProjectModal(index)}
                onMouseEnter={() =>
                  project.headerImage && preloadImage(project.headerImage)
                }
                className='group cursor-pointer rounded-xl border-2 border-ink-dark bg-white overflow-hidden shadow-[6px_6px_0_0_#1a1a1a] hover:shadow-[3px_3px_0_0_#1a1a1a] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200'
              >
                <div className='relative overflow-hidden bg-white border-b-2 border-ink-dark'>
                  <img
                    src={project.headerImage}
                    alt={project.title}
                    className='w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.03]'
                    loading='lazy'
                  />
                  <span className='absolute top-4 left-4 bg-accent text-ink-dark border-2 border-ink-dark text-xs font-bold px-3 py-1 rotate-[-1deg]'>
                    {project.category}
                  </span>
                </div>

                <div className='p-5 md:p-6'>
                  <h3 className='text-xl font-bold text-gray-900 mb-1.5'>
                    {project.title}
                  </h3>
                  <p className='text-base text-gray-700 font-medium leading-relaxed line-clamp-2'>
                    {project.description}
                  </p>
                  <span className='inline-block text-sm font-semibold text-accent mt-3 group-hover:underline'>
                    Ver caso completo
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className='max-w-3xl mx-auto mt-10 md:mt-12 bg-ink-dark border-2 border-ink-dark rounded-xl p-8 text-center shadow-[6px_6px_0_0_rgba(20,184,166,0.5)]'>
            <h3 className='text-2xl md:text-3xl font-bold text-white mb-4'>
              ¿Quieres ver proyectos parecidos al que tienes en mente?
            </h3>
            <p className='text-lg text-white/80 font-medium mb-6'>
              Cuéntanos qué tipo de web necesitas y te enviaré ejemplos de
              trabajos relacionados.
            </p>
            <div className='flex justify-center'>
              <Button onClick={handleWhatsAppClick} variant='primary'>
                <MessageCircle className='w-4 h-4 md:w-5 md:h-5' />
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

                <div className='max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16'>
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

                  <div className='text-center'>
                    <a
                      href={projects[selectedProject].url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center justify-center gap-2 md:gap-3 bg-accent text-white px-6 md:px-8 py-3 md:py-4 rounded-xl border-2 border-ink-dark shadow-[5px_5px_0_0_#1a1a1a] hover:bg-accent-hover hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 text-base md:text-lg font-bold w-full sm:w-auto'
                    >
                      <ExternalLink className='w-5 h-5 md:w-6 md:h-6' />
                      Visitar sitio web
                    </a>
                  </div>
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
