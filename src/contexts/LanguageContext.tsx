import React, { createContext, useContext, ReactNode } from 'react';

interface LanguageContextType {
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

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
  'hero.subtitle': 'Dani Pereira',
  'hero.description': '+10 años creando experiencias web que transforman negocios.',
  'hero.features': 'Código Limpio • Diseño Moderno • Resultados Reales',
  'hero.cta.quote': 'Solicitar Presupuesto',
  'hero.cta.portfolio': 'Ver Portfolio',

  // Services
  'services.title': 'Servicios Profesionales',
  'services.subtitle': '+10 años de experiencia',
  'services.description': 'Soluciones web completas adaptadas a las necesidades de tu negocio en todas las comunidades autónomas de España',
  'services.corporate.title': 'Páginas Web Corporativas',
  'services.corporate.desc': 'Diseño y desarrollo de sitios web profesionales que transmiten confianza y generan resultados.',
  'services.ecommerce.title': 'E-commerce',
  'services.ecommerce.desc': 'Tiendas online completas con sistemas de pago, gestión de inventario y optimización SEO.',
  'services.webapp.title': 'Aplicaciones Web',
  'services.webapp.desc': 'Aplicaciones web modernas, rápidas y escalables utilizando las últimas tecnologías.',
  'services.design.title': 'Diseño UX/UI',
  'services.design.desc': 'Interfaces intuitivas y experiencias de usuario que convierten visitantes en clientes.',
  'services.frontend.title': 'Desarrollo Frontend',
  'services.frontend.desc': 'Código limpio, optimizado y siguiendo las mejores prácticas de desarrollo moderno.',
  'services.seo.title': 'Optimización SEO',
  'services.seo.desc': 'Posicionamiento web en buscadores para aumentar tu visibilidad y captar más clientes.',

  // Portfolio
  'portfolio.title': 'Portfolio de Proyectos',
  'portfolio.description': 'Una selección de proyectos que demuestran mi experiencia en desarrollo web moderno y diseño innovador',
  'portfolio.view': 'Ver Proyecto',
  'portfolio.details': 'Detalles',

  // Footer
  'footer.description': 'Desarrollador web especializado en crear experiencias digitales excepcionales. Transformo ideas en soluciones web modernas y efectivas.',
  'footer.services_title': 'Servicios',
  'footer.contact_title': 'Contacto',
  'footer.areas_title': 'Áreas de Servicio',
  'footer.areas_desc': 'Desarrollo web profesional en toda España',
  'footer.copyright': 'Desarrollo Web Dani Pereira. Todos los derechos reservados.',
  'footer.privacy': 'Política de Privacidad',
  'footer.terms': 'Términos de Servicio',
  'footer.cookies': 'Cookies',
  'footer.legal': 'Aviso Legal',

  // About Me Modal
  'about.title': 'Sobre Mí',
  'about.curriculum': 'Mi currículum completo lo encontrarás en mi LinkedIn:',
  'about.linkedin': 'Ver LinkedIn',
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const t = (key: string): string => {
    return translations[key] || key;
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