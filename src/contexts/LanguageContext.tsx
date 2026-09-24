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
  'nav.about': '36web',
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
  'services.title': 'Diseño y desarrollo según lo que necesites',
  'services.description':
    'Desde una web corporativa hasta una tienda online o una solución a medida. Elegimos las herramientas y la estrategia en función de lo que necesite tu proyecto.',
  'services.webdesign.title': 'Diseño web',
  'services.webdesign.desc':
    'Cuando hace falta una estructura concreta, reservas, zona privada o conexión con lo que ya usas.',
  'services.wordpress.title': 'Web con Wordpress',
  'services.wordpress.desc':
    'Cuando hace falta una estructura concreta, reservas, zona privada o conexión con lo que ya usas.',

  'services.ecommerce.title': 'E-commerce a medida',
  'services.ecommerce.desc':
    'Catálogo, cobro con tarjeta, envíos y un panel para que tú subas productos y gestiones pedidos.',
  'services.ecommercePlantilla.title': 'Woocommerce o Shopify',
  'services.ecommercePlantilla.desc':
    'Catálogo, cobro con tarjeta, envíos y un panel para que tú subas productos y gestiones pedidos.',
  'services.seo.title': 'Posicionamiento web',
  'services.seo.desc':
    'Actualizaciones, copias, cambios de textos y fotos, y soporte cuando algo se rompe.',
  'services.maintenance.title': 'Mantenimiento web',
  'services.maintenance.desc':
    'Actualizaciones, copias, cambios de textos y fotos, y soporte cuando algo se rompe.',
  'services.branding.title': 'Diseño gráfico y branding',
  'services.branding.desc':
    'Actualizaciones, copias, cambios de textos y fotos, y soporte cuando algo se rompe.',

  // Portfolio
  'portfolio.title': 'Clientes reales y demos de sector',
  'portfolio.description':
    'Estos son ejemplos de clientes reales y demos de lo que podría ser tu web.',
  'portfolio.upcoming.title': 'Próximamente',
  'portfolio.upcoming.description':
    'Proyectos que estamos terminando y publicaremos en breve.',
  'portfolio.view': 'Ver Proyecto',

  // Proyectos específicos
  'portfolio.chicxs.title': 'Chicxsdelacalle',
  'portfolio.chicxs.desc':
    'Tienda de merch de bandas de música: catálogo, stock y pedidos.',
  'portfolio.micolet.title': 'Micolet',
  'portfolio.micolet.desc':
    'Moda de segunda mano y outlet con catálogo amplio y compra online.',
  'portfolio.camisetas.title': 'Tienda online Camisetas Ahora',
  'portfolio.camisetas.sector': 'Sector Retail y Moda · Cliente real',
  'portfolio.camisetas.desc':
    'Creamos un comercio electrónico ligero y rápido utilizando WordPress y WooCommerce. Implementamos un sistema de filtros avanzados por sectores para que los clientes encuentren y compren camisetas personalizadas sin fricciones.',
  'portfolio.hoyviajamos.title': 'Hoy Viajamos',
  'portfolio.hoyviajamos.desc':
    'Blog de viajes con galerías, categorías, afiliados y servicio de guías de viaje por suscripción.',
  'portfolio.hatena.title': 'Web para Clínica Veterinaria Hatena',
  'portfolio.hatena.sector': 'Sector Veterinaria',
  'portfolio.hatena.result':
    'Equipo, servicios y formulario de citas en una sola web.',
  'portfolio.hatena.desc':
    'Web de clínica: servicios, equipo y formulario de citas integrado.',
  'portfolio.carper.title': 'Web para Carper Sonido',
  'portfolio.carper.sector': 'Sector Servicios',
  'portfolio.carper.result':
    'Presentación profesional para cerrar trabajos de sonido y eventos.',
  'portfolio.carper.desc':
    'Web de presentación para un negocio de sonido y eventos.',
  'portfolio.vidal.title': 'Web corporativa para Clínica Vidal Insua',
  'portfolio.vidal.sector': 'Sector Salud y Bienestar · Cliente real',
  'portfolio.vidal.desc':
    'Desarrollamos una web médica enfocada a la confianza y la claridad. Priorizamos la visibilidad de los servicios y creamos un sistema directo para incentivar la reserva de citas tanto en ordenadores como en pantallas móviles.',
  'portfolio.beachvans.title': 'Web catálogo para Beachvans Camper',
  'portfolio.beachvans.sector': 'Sector Automoción y Ocio · Cliente real',
  'portfolio.beachvans.desc':
    'Diseñamos una interfaz limpia y optimizada para móviles, logrando que su catálogo de furgonetas camperizadas sea fácil de consultar. Estructuramos la navegación para que el usuario pueda solicitar un presupuesto en menos de 3 clics.',
  'portfolio.resilience.title': 'Resilience Shop',
  'portfolio.resilience.desc':
    'Tienda de equipamiento ciclista: catálogo claro y compra sencilla.',
  'portfolio.elefantes.title': 'El Viaje de los Elefantes',
  'portfolio.elefantes.desc':
    'Blog de viajes con galería y estructura pensada para buscadores.',
  'portfolio.delish.title': 'Delish Vegan Madrid',
  'portfolio.delish.desc':
    'Repostería vegana con pedidos online y envío nacional. Local conocido en Madrid.',
  'portfolio.alicornio.title': 'Web para Casa Rural O Alicornio',
  'portfolio.alicornio.sector': 'Sector Turismo',
  'portfolio.alicornio.result': 'Temporada alta llena por búsquedas en Google.',
  'portfolio.alicornio.desc':
    'Casa rural en O Courel (Lugo). WordPress. En temporada alta suele ir llena por búsquedas orgánicas.',
  'portfolio.desmundando.title': 'Desmundando',
  'portfolio.desmundando.desc':
    'Blog de viajes: relatos, países y la ruta de la seda.',
  'portfolio.silly.title': 'Silly Sally',
  'portfolio.silly.desc':
    'Web de banda: bio, música, entradas, noticias y merch.',
  'portfolio.reformas.title': 'Web de reformas y oficios',
  'portfolio.reformas.sector': 'Sector Reformas · Ejemplo sectorial',
  'portfolio.reformas.desc':
    'Diseño pensado para oficios que viven de la foto: imágenes grandes, trabajos claros y un recorrido sencillo para pedir visita. Así un reformista enseña el antes y el después y captura encargos sin rodeos.',
  'portfolio.inmobiliaria.title': 'Web inmobiliaria',
  'portfolio.inmobiliaria.sector': 'Sector Inmobiliaria · Ejemplo sectorial',
  'portfolio.inmobiliaria.desc':
    'Estructura clara de fichas de viviendas y un camino directo para captar propietarios. Pensada para que una inmobiliaria muestre cartera y reciba consultas desde el móvil.',
  'portfolio.psicologa.title': 'Web para consulta de psicología',
  'portfolio.psicologa.sector': 'Sector Psicología · Ejemplo sectorial',
  'portfolio.psicologa.desc':
    'Diseño estratégico con tono sereno y de autoridad profesional. Incluye una arquitectura pensada exclusivamente para profesionales de la salud que necesitan agendar primeras sesiones de forma automática.',

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
  'footer.copyright': '36web. Todos los derechos reservados.',
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
