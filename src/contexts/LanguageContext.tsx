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
  'nav.about': 'Pereiraweb',
  'nav.services': 'Servicios',
  'nav.portfolio': 'Portfolio',
  'nav.clients': 'Clientes',
  'nav.exito': 'Casos de éxito',
  'nav.contact': 'Contacto',
  'nav.blog': 'Blog',

  // Hero
  'hero.title': 'Webs que explican lo que haces.',
  'hero.subtitle':
    'Sin plantillas de moda. Te hacemos la página, la tienda o el mantenimiento, con precio cerrado y trato directo.',
  'hero.trustline': 'Precio y alcance por escrito antes de empezar',
  'hero.cta.whatsapp': 'Escríbenos por WhatsApp',
  'hero.cta.pricing': 'Solicitar propuesta',
  'hero.cta.portfolio': 'Ver trabajos',

  // Services
  'services.title': 'Más de 12 años haciendo webs para negocios reales',
  'services.description':
    'Tres cosas: web a medida, tienda online o mantenimiento. Eliges según lo que necesites ahora, no según un catálogo hinchado.',
  'services.corporate.title': 'Web a Medida',
  'services.corporate.desc':
    'Cuando hace falta una estructura concreta, reservas, zona privada o conexión con lo que ya usas.',
  'services.ecommerce.title': 'Tienda online',
  'services.ecommerce.desc':
    'Catálogo, cobro con tarjeta, envíos y un panel para que tú subas productos y gestiones pedidos.',
  'services.maintenance.title': 'Mantenimiento web',
  'services.maintenance.desc':
    'Actualizaciones, copias, cambios de textos y fotos, y soporte cuando algo se rompe.',

  // Portfolio
  'portfolio.title': 'Últimos trabajos en 2026',
  'portfolio.description':
    'Más de 200 webs hechas. Aquí van algunas publicadas en los últimos meses.',
  'portfolio.upcoming.title': 'Próximamente',
  'portfolio.upcoming.description':
    'Proyectos que estamos terminando y publicaremos en breve.',
  'portfolio.view': 'Ver Proyecto',

  // Proyectos específicos
  'portfolio.core.title': 'Core Generator app',
  'portfolio.core.desc':
    'App web para generar vídeos CORE en vertical, listos para TikTok, Reels y Shorts.',
  'portfolio.chicxs.title': 'Chicxsdelacalle',
  'portfolio.chicxs.desc':
    'Tienda de moda urbana: catálogo, stock y pedidos sin líos.',
  'portfolio.confusion.title': 'Confusion Wear',
  'portfolio.confusion.desc':
    'Streetwear con catálogo vivo y pago con tarjeta.',
  'portfolio.camisetas.title': 'Camisetas Ahora',
  'portfolio.camisetas.desc':
    'Tienda de camisetas personalizadas con muchos diseños, filtros y panel de stock.',
  'portfolio.carper.title': 'Carper Sonido',
  'portfolio.carper.desc':
    'Web de audio profesional con catálogo de productos y servicios.',
  'portfolio.hoyviajamos.title': 'Hoy Viajamos',
  'portfolio.hoyviajamos.desc':
    'Blog de viajes con galerías, categorías y afiliados.',
  'portfolio.sillysally.title': 'Silly Sally',
  'portfolio.sillysally.desc':
    'One-pager de una banda de Madrid: bio, Spotify, dossier, merch e Instagram.',
  'portfolio.hatena.title': 'Clínica Veterinaria Hatena',
  'portfolio.hatena.desc':
    'Web de clínica: servicios, equipo y cómo pedir cita sin marear al dueño.',
  'portfolio.resilience.title': 'Resilience Shop',
  'portfolio.resilience.desc':
    'Tienda de ciclismo: catálogo claro y compra sin rodeos.',
  'portfolio.elefantes.title': 'El Viaje de los Elefantes',
  'portfolio.elefantes.desc':
    'Blog de viajes con galería y estructura pensada para buscadores.',
  'portfolio.delish.title': 'Delish Vegan Madrid',
  'portfolio.delish.desc':
    'Repostería vegana con pedidos online y envío nacional. Local conocido en Madrid.',
  'portfolio.alicornio.title': 'O Alicornio - Casa Rural',
  'portfolio.alicornio.desc':
    'Casa rural en O Courel (Lugo). WordPress. En temporada alta suele ir llena por búsquedas orgánicas.',

  // Categorías de contacto
  'contact.project.ecommerce': 'E-commerce',
  'contact.project.corporate': 'Página Corporativa',

  // Footer
  'footer.description':
    'Webs, tiendas y mantenimiento. Trabajamos online con clientes de toda España.',
  'footer.services_title': 'Servicios',
  'footer.contact_title': 'Contacto',
  'footer.areas_title': 'Áreas de Servicio',
  'footer.areas_desc': 'Proyectos en toda España',
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
