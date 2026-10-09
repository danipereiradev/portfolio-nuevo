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
  'portfolio.title': 'Algunos de los últimos proyectos que hemos desarrollado.',
  'portfolio.description':
    'Estos son ejemplos de webs, tiendas online y aplicaciones desarrolladas por nuestro equipo.',
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
    'Web médica con servicios claros y acceso directo a la reserva de citas desde móvil y ordenador.',
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
  'portfolio.mhin.title': 'Web para MH Projects',
  'portfolio.mhin.sector': 'Sector Inmobiliaria · Cliente real',
  'portfolio.mhin.desc':
    'Web de servicios inmobiliarios desde Lleida: presentación de la marca, lo que hacen y un contacto directo para empezar el proyecto.',
  'portfolio.psicologa.title': 'Web para consulta de psicología',
  'portfolio.psicologa.sector': 'Sector Psicología · Ejemplo sectorial',
  'portfolio.psicologa.desc':
    'Diseño estratégico con tono sereno y de autoridad profesional. Incluye una arquitectura pensada exclusivamente para profesionales de la salud que necesitan agendar primeras sesiones de forma automática.',
  'portfolio.bonobo.title': 'Estudo Bonobo',
  'portfolio.bonobo.sector': 'Sector Escuela de artes',
  'portfolio.bonobo.desc':
    'Web de escuela de artes: cursos, taller y una identidad visual propia.',
  'portfolio.detectives.title': 'Beta Detectives',
  'portfolio.detectives.sector': 'Sector Investigación privada',
  'portfolio.detectives.desc':
    'Web de detectives: servicios claros y un contacto directo para consultar el caso.',
  'portfolio.mcauto.title': 'McAuto Lleida Classic',
  'portfolio.mcauto.sector': 'Sector Eventos y motor',
  'portfolio.mcauto.desc':
    'Web de eventos de motor clásico: agenda, fotos y un contacto directo.',
  'portfolio.somatica.title': 'Psicoterapia Somática',
  'portfolio.somatica.sector': 'Sector Salud y bienestar',
  'portfolio.somatica.desc':
    'Web de consulta: enfoque, sesiones y un camino sencillo para pedir cita.',
  'portfolio.itzalak.title': 'Itzalak Psicología',
  'portfolio.itzalak.sector': 'Sector Psicología',
  'portfolio.itzalak.desc':
    'Web de consulta de psicología: servicios, enfoque y contacto para primera sesión.',
  'portfolio.noma.title': 'Noma Abogados',
  'portfolio.noma.sector': 'Sector Servicios jurídicos',
  'portfolio.noma.desc':
    'Web de despacho: áreas de práctica y un contacto directo para consultar el caso.',
  'portfolio.obrador.title': 'L’Obrador de Ponent',
  'portfolio.obrador.sector': 'Sector Alimentación artesanal',
  'portfolio.obrador.desc':
    'Web de obrador: productos, historia y un pedido o contacto sin rodeos.',
  'portfolio.noemi.title': 'Noemí Bonet Psicología',
  'portfolio.noemi.sector': 'Sector Psicología deportiva',
  'portfolio.noemi.desc':
    'Web de psicología deportiva: método, servicios y un contacto para empezar.',

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
