import { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Portfolio = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      title: t('portfolio.camisetas.title'),
      description: t('portfolio.camisetas.desc'),
      longDescription: `Camisetas Ahora es un proyecto de e-commerce especializado en camisetas personalizadas y diseños exclusivos. El cliente necesitaba una plataforma que permitiera gestionar un catálogo amplio y cambiante de diseños.

El desarrollo se enfocó en crear una experiencia de usuario excepcional para la búsqueda y filtrado de productos. Se implementó un sistema de búsqueda por tags, temas, colores y tallas que permite a los usuarios encontrar exactamente lo que buscan entre cientos de opciones.

Una característica destacada es el visualizador de productos que muestra las camisetas desde múltiples ángulos y permite hacer zoom para apreciar los detalles de cada diseño. También se integró un sistema de recomendaciones basado en las preferencias de navegación.

El backend incluye un panel de administración personalizado que facilita la carga masiva de productos, gestión de inventario por talla y color, y seguimiento detallado de las ventas por categoría. Esto ha permitido al equipo tomar decisiones informadas sobre qué diseños producir.

La tienda también cuenta con un programa de afiliados que ha generado una red de promotores que generan ventas adicionales mediante comisiones. El proyecto ha sido un éxito comercial, procesando miles de pedidos mensuales.`,
      image: '/img/portfolio/camisetas-ahora.png',
      tech: ['WordPress', 'WooCommerce', 'jQuery', 'CSS3'],
      category: 'Tienda Online',
      url: 'https://camisetas-ahora.com',
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
      tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
      category: 'Página Web',
      url: 'https://hoyviajamos.com',
    },
    {
      title: t('portfolio.carper.title'),
      description: t('portfolio.carper.desc'),
      longDescription: `Carper Sonido es una empresa consolidada en el sector del audio profesional que necesitaba actualizar su presencia digital para reflejar su experiencia y profesionalismo en el mercado.

El proyecto comenzó con un análisis exhaustivo de sus competidores y del sector audiovisual. Se diseñó una web corporativa que transmite confianza y experiencia, con un portfolio visual de sus instalaciones más destacadas en teatros, auditorios y espacios corporativos.

La arquitectura de información se estructuró para facilitar el acceso a los diferentes servicios que ofrecen: instalación de sistemas de sonido, alquiler de equipos, mantenimiento y consultoría técnica. Cada servicio tiene su propia landing page optimizada para conversión.

Se implementó un formulario de contacto inteligente que pre-califica los leads según el tipo de proyecto, permitiendo al equipo comercial priorizar las oportunidades más relevantes. También se integró un sistema de presupuestos online para proyectos estándar.

La web ha mejorado significativamente la captación de clientes corporativos y ha posicionado a Carper como referente en el sector del audio profesional en su región.`,
      image: '/img/portfolio/carper.png',
      tech: ['WordPress', 'HTML5', 'CSS3', 'JavaScript'],
      category: 'Página Web',
      url: 'https://carpersonido.com',
    },
    {
      title: t('portfolio.chicxs.title'),
      description: t('portfolio.chicxs.desc'),
      longDescription: `Chicxs de la Calle es una marca de streetwear que nació en redes sociales y necesitaba una tienda online que mantuviera ese espíritu urbano y auténtico mientras escalaba su operación comercial.

El proyecto requirió un equilibrio delicado entre estética urbana y funcionalidad comercial. Se desarrolló un diseño oscuro y atrevido que refleja la identidad de la marca, con tipografías bold y un layout que prioriza el impacto visual de las prendas.

La implementación técnica incluyó características avanzadas como un sistema de lanzamientos de colecciones limitadas con cuenta regresiva, gestión de tallas y stock en tiempo real, y un sistema de notificaciones push para alertar a los clientes cuando sus productos favoritos vuelven a estar disponibles.

Se integró Instagram directamente en la web para mostrar cómo los clientes reales usan las prendas, generando prueba social y aumentando la confianza en la marca. El checkout se optimizó para mobile, donde la marca recibe el 80% de su tráfico.

Desde el lanzamiento, la tienda ha procesado miles de pedidos y ha permitido a la marca expandirse internacionalmente, enviando productos a más de 15 países.`,
      image: '/img/portfolio/chicxs.png',
      tech: ['WordPress', 'WooCommerce', 'CSS3', 'JavaScript'],
      category: 'Tienda Online',
      url: 'https://chicxsdelacalle.com',
    },
    {
      title: t('portfolio.delish.title'),
      description: t('portfolio.delish.desc'),
      longDescription: `Este proyecto para Delish Vegan representó un desafío apasionante en el mundo del e-commerce vegano. La tienda necesitaba reflejar los valores de sostenibilidad y respeto por los animales de la marca, mientras proporcionaba una experiencia de compra fluida y moderna.

El desarrollo se centró en crear una plataforma WooCommerce completamente personalizada, con un diseño limpio que permite que los productos hablen por sí mismos. Se implementó un sistema de filtrado avanzado que permite a los usuarios encontrar fácilmente productos según sus necesidades dietéticas específicas.

Una de las características más destacadas es el sistema de suscripción mensual para cajas sorpresa, que automatiza la gestión de pedidos recurrentes y facilita la fidelización de clientes. También se integró un blog con recetas veganas que genera tráfico orgánico constante.

El proyecto incluyó optimización SEO específica para búsquedas relacionadas con productos veganos, lo que ha resultado en un incremento significativo del tráfico orgánico. La tienda procesa actualmente cientos de pedidos mensuales y continúa creciendo.`,
      image: '/img/portfolio/delish.png',
      tech: ['WordPress', 'WooCommerce', 'PHP', 'JavaScript', 'CSS3'],
      category: 'Tienda Online',
      url: 'https://delishvegann.com',
    },
  ];

  const openModal = (index: number) => {
    setSelectedProject(index);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id='portfolio' className='py-20 bg-white'>
      <div className='container mx-auto px-6'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            {t('portfolio.title')}
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            {t('portfolio.description')}
          </p>
        </div>

        {/* Grid de 3 columnas - Cards simplificadas */}
        <div className='grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => openModal(index)}
              className='cursor-pointer transform hover:-translate-y-2 transition-all duration-300'
            >
              {/* Project Image - Imagen completa */}
              <div className='relative overflow-hidden rounded-lg mb-4'>
                <img
                  src={project.image}
                  alt={project.title}
                  className='w-full h-auto object-contain'
                />
                <div className='absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300'></div>
              </div>

              {/* Solo Título */}
              <h3 className='text-xl font-bold text-gray-900 text-center'>
                {project.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedProject !== null && (
          <div
            className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-0'
            onClick={closeModal}
          >
            <div
              className='bg-white w-[75vw] h-screen overflow-y-auto relative'
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón cerrar */}
              <button
                onClick={closeModal}
                className='fixed top-8 right-8 bg-white rounded-full p-3 shadow-xl hover:bg-gray-100 transition-colors duration-200 z-20'
              >
                <X className='w-6 h-6 text-gray-700' />
              </button>

              {/* Contenido tipo blog */}
              <div className='bg-white'>
                <div className='max-w-4xl mx-auto px-12 py-16'>
                  {/* Título */}
                  <h3 className='text-5xl font-bold text-gray-900 mb-6'>
                    {projects[selectedProject].title}
                  </h3>
                  <p className='text-xl text-gray-600 mb-12 leading-relaxed'>
                    {projects[selectedProject].description}
                  </p>
                  {/* Descripción larga */}
                  <div className='prose prose-lg max-w-none mb-12'>
                    {projects[selectedProject].longDescription
                      .split('\n\n')
                      .map((paragraph, idx) => (
                        <p
                          key={idx}
                          className='text-gray-700 leading-relaxed mb-6'
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>

                  {/* Tech Stack */}
                  <div className='mb-12 pb-12 border-b border-gray-200'>
                    <h4 className='text-2xl font-bold text-gray-900 mb-6'>
                      Tecnologías utilizadas
                    </h4>
                    <div className='flex flex-wrap gap-3'>
                      {projects[selectedProject].tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className='bg-gray-100 text-gray-800 px-4 py-3 rounded-lg text-base font-medium'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className='text-center'>
                    <a
                      href={projects[selectedProject].url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center justify-center gap-3 bg-accent text-white px-8 py-4 rounded-xl hover:bg-accent-hover transition-colors duration-200 text-lg font-semibold'
                    >
                      <ExternalLink className='w-6 h-6' />
                      Visitar sitio web
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
