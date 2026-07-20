import React, { createContext, useContext, ReactNode } from 'react';

interface LanguageContextType {
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Solo contenido en español
const translations = {
  // Header
  'nav.home': 'Inicio',
  'nav.about': 'Sobre el Estudio',
  'nav.services': 'Servicios',
  'nav.portfolio': 'Trabajos',
  'nav.clients': 'Clientes',
  'nav.contact': 'Contacto',

  // Hero
  'hero.title': 'Estudio web en Madrid para empresas y negocios',
  'hero.subtitle':
    'Diseñamos y desarrollamos páginas web profesionales, tiendas online y soluciones digitales claras, rápidas y preparadas para captar contactos.',
  'hero.trustline':
    'Base en Torrejón de Ardoz · Proyectos en toda España · Presupuesto cerrado antes de empezar',
  'hero.cta.whatsapp': 'Escríbenos por WhatsApp',
  'hero.cta.pricing': 'Solicitar propuesta',
  'hero.cta.portfolio': 'Ver trabajos',

  // Services
  'services.title':
    'Servicios web para negocios que necesitan una presencia online profesional',
  'services.description':
    'Diseñamos, desarrollamos y mantenemos webs pensadas para transmitir confianza, explicar mejor lo que haces y facilitar que tus clientes contacten o compren.',
  'services.corporate.title': 'Web a Medida',
  'services.corporate.desc':
    'Diseño y desarrollo web a medida para proyectos con funcionalidades, estructura o integraciones específicas.',
  'services.ecommerce.title': 'Tienda online',
  'services.ecommerce.desc':
    'Tiendas online y catálogos digitales para vender productos o servicios con una experiencia cuidada y fácil de gestionar.',
  'services.custom.title': 'Desarrollo web a medida',
  'services.custom.desc':
    'Desarrollamos paneles internos, integraciones y funcionalidades a medida cuando una plantilla ya no es suficiente para tu negocio.',
  'services.design.title': 'Diseño Web',
  'services.design.desc':
    'Diseñamos páginas web a medida, cuidando la identidad de marca y la experiencia de cada visitante.',
  'services.maintenance.title': 'Mantenimiento web',
  'services.maintenance.desc':
    'Soporte, cambios, revisión técnica y mejoras para que tu web siga funcionando correctamente después de publicarla.',
  'services.seo.title': 'Posicionamiento SEO',
  'services.seo.desc':
    'Optimizamos el posicionamiento en Google para aumentar la visibilidad y atraer más clientes a tu negocio.',

  // Portfolio
  'portfolio.title': 'Últimos trabajos en 2026',
  'portfolio.description':
    'Una selección de proyectos publicados: páginas web y tiendas online diseñadas y desarrolladas para negocios reales.',
  'portfolio.view': 'Ver Proyecto',

  // Proyectos específicos
  'portfolio.core.title': 'Core Generator app',
  'portfolio.core.desc':
    'App web para generar vídeos CORE en formato vertical, listos para TikTok, Reels y Shorts.',
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
  'portfolio.hoyviajamos.title': 'Hoy Viajamos',
  'portfolio.hoyviajamos.desc':
    'Blog de viajes con contenido optimizado, galerías fotográficas y monetización mediante afiliados.',
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
    'Páginas web profesionales, tiendas online y mantenimiento web para empresas, autónomos y negocios de toda España.',
  'footer.services_title': 'Servicios',
  'footer.contact_title': 'Contacto',
  'footer.areas_title': 'Áreas de Servicio',
  'footer.areas_desc': 'Desarrollo web profesional en toda España',
  'footer.copyright': 'PereiraWeb. Todos los derechos reservados.',
  'footer.privacy': 'Política de Privacidad',
  'footer.terms': 'Términos de Servicio',
  'footer.cookies': 'Cookies',
  'footer.legal': 'Aviso Legal',
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
