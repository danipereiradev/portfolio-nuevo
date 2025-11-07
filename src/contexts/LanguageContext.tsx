import React, { createContext, useContext, ReactNode } from 'react';

interface LanguageContextType {
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Solo contenido en español
const translations = {
  // Header
  'nav.home': 'Inicio',
  'nav.about': 'Sobre Mí',
  'nav.services': 'Servicios',
  'nav.portfolio': 'Portfolio',
  'nav.clients': 'Clientes',
  'nav.contact': 'Contacto',

  // Hero
  'hero.title': 'Desarrollo Web',
  'hero.subtitle': 'DPW',
  'hero.description':
    '+10 años creando experiencias web que transforman negocios.',
  'hero.features': 'Código Limpio • Diseño Moderno • Resultados Reales',
  'hero.cta.quote': 'Solicitar Presupuesto',
  'hero.cta.portfolio': 'Ver Portfolio',

  // Services
  'services.title': 'Servicios Profesionales',
  'services.subtitle': '+10 años de experiencia',
  'services.description':
    'Soluciones web completas adaptadas a las necesidades de tu negocio en todas las comunidades autónomas de España',
  'services.corporate.title': 'Páginas Web Corporativas',
  'services.corporate.desc':
    'Diseño y desarrollo de sitios web profesionales que transmiten confianza y generan resultados.',
  'services.ecommerce.title': 'E-commerce',
  'services.ecommerce.desc':
    'Tiendas online completas con sistemas de pago, gestión de inventario y optimización SEO.',
  'services.webapp.title': 'Aplicaciones Web',
  'services.webapp.desc':
    'Aplicaciones web modernas, rápidas y escalables utilizando las últimas tecnologías.',
  'services.design.title': 'Diseño UX/UI',
  'services.design.desc':
    'Interfaces intuitivas y experiencias de usuario que convierten visitantes en clientes.',
  'services.frontend.title': 'Desarrollo Frontend',
  'services.frontend.desc':
    'Código limpio, optimizado y siguiendo las mejores prácticas de desarrollo moderno.',
  'services.seo.title': 'Optimización SEO',
  'services.seo.desc':
    'Posicionamiento web en buscadores para aumentar tu visibilidad y captar más clientes.',

  // Portfolio
  'portfolio.title': 'Algunos de mis últimos Trabajos',
  'portfolio.description':
    'Una selección de proyectos recientes que demuestran mi experiencia en desarrollo web moderno y diseño innovador',
  'portfolio.view': 'Ver Proyecto',

  // Proyectos específicos
  'portfolio.chicxs.title': 'Chicxsdelacalle',
  'portfolio.chicxs.desc':
    'Tienda online de moda urbana con diseño moderno y sistema de gestión de inventario completo.',
  'portfolio.confusion.title': 'Confusion Wear',
  'portfolio.confusion.desc':
    'E-commerce de moda streetwear con catálogo dinámico y pasarela de pagos integrada.',
  'portfolio.camisetas.title': 'Camisetas Ahora',
  'portfolio.camisetas.desc':
    'Plataforma de personalización de camisetas con herramientas de diseño y sistema de pedidos online.',
  'portfolio.carper.title': 'Carper Sonido',
  'portfolio.carper.desc':
    'Web corporativa para empresa de audio profesional con catálogo de productos y servicios.',
  'portfolio.elefantes.title': 'El Viaje de los Elefantes',
  'portfolio.elefantes.desc':
    'Blog de viajes con galería fotográfica, sistema de publicación y optimización SEO.',
  'portfolio.delish.title': 'Delish Vegan Madrid',
  'portfolio.delish.desc':
    'E-commerce de repostería 100% vegana con tienda online, sistema de pedidos, entrega a domicilio y envío nacional. Uno de los lugares veganos más emblemáticos de Madrid.',
  'portfolio.alicornio.title': 'O Alicornio - Casa Rural',
  'portfolio.alicornio.desc':
    'Web para casa rural en O Courel, Lugo. Desarrollada con WordPress y Elementor. Gracias a su excelente posicionamiento orgánico SEO, la casa está llena toda la primavera y verano.',

  // Categorías de contacto
  'contact.project.ecommerce': 'E-commerce',
  'contact.project.corporate': 'Página Corporativa',

  // Footer
  'footer.description':
    'Desarrollador web especializado en crear experiencias digitales excepcionales. Transformo ideas en soluciones web modernas y efectivas.',
  'footer.services_title': 'Servicios',
  'footer.contact_title': 'Contacto',
  'footer.areas_title': 'Áreas de Servicio',
  'footer.areas_desc': 'Desarrollo web profesional en toda España',
  'footer.copyright':
    'Desarrollo Web DPW. Todos los derechos reservados.',
  'footer.privacy': 'Política de Privacidad',
  'footer.terms': 'Términos de Servicio',
  'footer.cookies': 'Cookies',
  'footer.legal': 'Aviso Legal',

  // About Me Modal
  'about.title': 'Sobre Mí',
  'about.curriculum': 'Mi currículum completo lo encontrarás en mi LinkedIn:',
  'about.linkedin': 'Ver LinkedIn',
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const t = (key: string): string => {
    return (translations as { [key: string]: string })[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
