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
  'portfolio.camisetas.sector': 'Sector Retail',
  'portfolio.camisetas.result':
    'Catálogo con filtros para vender camisetas personalizadas.',
  'portfolio.camisetas.desc':
    'Tienda de camisetas personalizadas con muchos diseños, filtros y panel de stock.',
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
  'portfolio.vidal.title': 'Web para Clínica Vidal Insua',
  'portfolio.vidal.sector': 'Sector Salud',
  'portfolio.vidal.result':
    'Servicios y citas de la clínica, claros en móvil y escritorio.',
  'portfolio.vidal.desc':
    'Web de clínica: especialidades, equipo y contacto para pedir cita.',
  'portfolio.beachvans.title': 'Web para Beachvans Camper',
  'portfolio.beachvans.sector': 'Sector Reformas',
  'portfolio.beachvans.result':
    'Furgonetas camperizadas a la vista, listas para consultar y pedir.',
  'portfolio.beachvans.desc':
    'Web de camperización: modelos, trabajos y contacto para pedir presupuesto.',
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
  'portfolio.reformas.sector': 'Sector Reformas',
  'portfolio.reformas.result':
    'Imágenes grandes y trabajos claros, listos para mostrar el antes y el después.',
  'portfolio.inmobiliaria.title': 'Web inmobiliaria',
  'portfolio.inmobiliaria.sector': 'Sector Inmobiliaria',
  'portfolio.inmobiliaria.result':
    'Fichas de viviendas y un camino claro para captar propietarios.',
  'portfolio.psicologa.title': 'Web para consulta de psicología',
  'portfolio.psicologa.sector': 'Sector Salud',
  'portfolio.psicologa.result':
    'Tono sereno, autoridad profesional y un botón visible para agendar la primera sesión.',

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
