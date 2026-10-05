export type PortfolioPageCategory = 'web' | 'shop';

export type PortfolioPageProject = {
  id: string;
  category: PortfolioPageCategory;
  name: string;
  sector: string;
  description: string;
  image: string;
  url: string;
};

export const PORTFOLIO_PROJECT_LINK_REL =
  'nofollow noopener noreferrer';

/** Proyectos reales con URL pública. Sin demos de sector. */
export const PORTFOLIO_PAGE_PROJECTS: readonly PortfolioPageProject[] = [
  {
    id: 'beachvans',
    category: 'web',
    name: 'Beachvans',
    sector: 'Viajes y aventura',
    description:
      'Catálogo de furgonetas camperizadas, fácil de consultar en el móvil, con un camino corto para pedir presupuesto.',
    image: '/img/portfolio/new/beachvans.webp',
    url: 'https://beachvanscamper.com/',
  },
  {
    id: 'vidal',
    category: 'web',
    name: 'Clínica Vidal',
    sector: 'Salud',
    description:
      'Web médica con servicios claros y reserva de citas desde el móvil y el ordenador.',
    image: '/img/portfolio/new/clinica-vidal.webp',
    url: 'https://clinicavidalinsua.com/',
  },
  {
    id: 'hatena',
    category: 'web',
    name: 'Hatena',
    sector: 'Clínica veterinaria',
    description:
      'Servicios, equipo y formulario de citas en una sola web.',
    image: '/img/portfolio/new/hatena.webp',
    url: 'https://hatena.es',
  },
  {
    id: 'carper',
    category: 'web',
    name: 'Carper Sonido',
    sector: 'Sonido profesional',
    description:
      'Web de presentación para un negocio de sonido y eventos.',
    image: '/img/portfolio/new/carper.webp',
    url: 'https://carpersonido.com',
  },
  {
    id: 'alicornio',
    category: 'web',
    name: 'O Alicornio',
    sector: 'Turismo rural',
    description:
      'Casa rural en O Courel. WordPress. En temporada alta suele llenarse por búsquedas en Google.',
    image: '/img/portfolio/new/casa-rural-oalicornio.webp',
    url: 'https://oalicornio.com',
  },
  {
    id: 'hoyviajamos',
    category: 'web',
    name: 'Hoy Viajamos',
    sector: 'Viajes',
    description:
      'Blog de viajes con galerías, categorías y guías por suscripción.',
    image: '/img/portfolio/new/hoyviajamos.webp',
    url: 'https://hoyviajamosweb.com',
  },
  {
    id: 'elefantes',
    category: 'web',
    name: 'El Viaje de los Elefantes',
    sector: 'Viajes',
    description:
      'Blog de viajes con galería y estructura pensada para buscadores.',
    image: '/img/portfolio/new/elefantes.webp',
    url: 'https://elviajedeloselefantes.com',
  },
  {
    id: 'bonobo',
    category: 'web',
    name: 'Estudo Bonobo',
    sector: 'Escuela de artes',
    description:
      'Web de escuela de artes: cursos, taller y una identidad visual propia.',
    image: '/img/portfolio/new/escuela-estudio-bonobo.webp',
    url: 'https://www.estudobonobo.com/',
  },
  {
    id: 'detectives',
    category: 'web',
    name: 'Beta Detectives',
    sector: 'Investigación privada',
    description:
      'Servicios claros y un contacto directo para consultar el caso.',
    image: '/img/portfolio/new/detectives-vigo.webp',
    url: 'https://www.betadetectives.com/',
  },
  {
    id: 'mhin',
    category: 'web',
    name: 'MH Projects',
    sector: 'Servicios inmobiliarios',
    description:
      'Presentación de la marca, lo que hacen y un contacto directo desde Lleida.',
    image: '/img/portfolio/new/mhin.webp',
    url: 'https://mhinprojects.com/',
  },
  {
    id: 'mcauto',
    category: 'web',
    name: 'McAuto Lleida Classic',
    sector: 'Eventos y motor',
    description:
      'Agenda, fotos y un contacto directo para eventos de motor clásico.',
    image: '/img/portfolio/new/mcauto.webp',
    url: 'https://mcautoclassic.com/',
  },
  {
    id: 'somatica',
    category: 'web',
    name: 'Psicoterapia Somática',
    sector: 'Salud y bienestar',
    description:
      'Web de consulta: enfoque, servicios y un camino claro para pedir información.',
    image: '/img/portfolio/new/somatica.webp',
    url: 'https://psicoterapiasomatica.es/',
  },
  {
    id: 'itzalak',
    category: 'web',
    name: 'Itzalak Psicología',
    sector: 'Psicología',
    description:
      'Presencia profesional para el centro: servicios, equipo y contacto.',
    image: '/img/portfolio/new/itzalak.webp',
    url: 'https://itzalakpsicologia.com/',
  },
  {
    id: 'noma',
    category: 'web',
    name: 'Noma Abogados',
    sector: 'Servicios jurídicos',
    description:
      'Despacho con servicios claros y un contacto directo para consultar el caso.',
    image: '/img/portfolio/new/noma.webp',
    url: 'https://nomaabogados.com/',
  },
  {
    id: 'obrador',
    category: 'web',
    name: 'L’Obrador de Ponent',
    sector: 'Alimentación artesanal',
    description:
      'Identidad y catálogo de obrador artesanal, con un contacto sencillo.',
    image: '/img/portfolio/new/obrador.webp',
    url: 'https://lobradordeponent.com/',
  },
  {
    id: 'noemi',
    category: 'web',
    name: 'Noemí Bonet Psicología',
    sector: 'Psicología deportiva',
    description:
      'Método, servicios y un contacto para empezar.',
    image: '/img/portfolio/new/noemi.webp',
    url: 'https://noemibonetpsicologia.com/',
  },
  {
    id: 'chicxs',
    category: 'shop',
    name: 'Chicxs de la Calle',
    sector: 'Tienda online',
    description:
      'Tienda de merch de bandas: catálogo, stock y pedidos.',
    image: '/img/portfolio/new/chicxs.webp',
    url: 'https://chicxsdelacalle.com',
  },
  {
    id: 'camisetas',
    category: 'shop',
    name: 'Camisetas Ahora',
    sector: 'Tienda online',
    description:
      'Ecommerce con WooCommerce y filtros por sector para encontrar y comprar sin fricción.',
    image: '/img/portfolio/new/camisetas.webp',
    url: 'https://camisetas-ahora.com',
  },
  {
    id: 'delish',
    category: 'shop',
    name: 'Delish Vegan',
    sector: 'Alimentación',
    description:
      'Repostería vegana con pedidos online y envío nacional.',
    image: '/img/portfolio/new/delish.webp',
    url: 'https://delishvegan.com/',
  },
];

export const PORTFOLIO_WEB_PROJECTS = PORTFOLIO_PAGE_PROJECTS.filter(
  (project) => project.category === 'web',
);

export const PORTFOLIO_SHOP_PROJECTS = PORTFOLIO_PAGE_PROJECTS.filter(
  (project) => project.category === 'shop',
);
