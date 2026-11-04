// Casos de éxito del rediseño.
// Cada caso tiene su página en /casos-de-exito/:slug y se muestra en la home.
// Los resultados son los que ha contado cada cliente: no añadir cifras que no
// estén confirmadas.

export const CASES_PATH = '/casos-de-exito';

export type CaseItem = {
  slug: string;
  name: string;
  sector: string;
  city: string;
  services: string[];
  /** Titular en tres líneas: la del medio va en bloque lima */
  title: [string, string, string];
  /** Resultado en una línea para tarjetas */
  result: string;
  image: string;
  url: string;
  before: string;
  after: string;
  challenge: string;
  work: { t: string; d: string }[];
  outcomes: { k: string; v: string }[];
  quote?: { text: string; author: string; role: string };
};

export const CASES: CaseItem[] = [
  {
    slug: 'camisetas-ahora',
    name: 'Camisetas Ahora',
    sector: 'Serigrafía y textil personalizado',
    city: 'Logroño',
    services: ['eCommerce', 'Diseño web'],
    title: ['DE TALLER LOCAL', 'A TODA', 'ESPAÑA.'],
    result: 'De taller de serigrafía en Logroño a vender camisetas personalizadas en toda España.',
    image: '/img/portfolio/new/camisetas.webp',
    url: 'https://camisetas-ahora.com',
    before: 'Un taller de serigrafía que vendía a clientes de Logroño y alrededores.',
    after: 'Una tienda online que vende prendas personalizadas en toda España.',
    challenge:
      'Camisetas Ahora tenía el oficio, pero su mercado acababa donde acababa la ciudad. Sus clientes eran de Logroño y alrededores, y cada encargo personalizado pasaba por hablar con el taller. Para crecer necesitaban que cualquiera, desde cualquier punto de España, pudiera diseñar su prenda y comprarla solo.',
    work: [
      {
        t: 'Personalizador online',
        d: 'El cliente elige la prenda, el color y la talla, sube su diseño y ve cómo queda antes de comprar. Sin emails ni presupuestos de ida y vuelta.',
      },
      {
        t: 'Tienda pensada para comprar',
        d: 'Catálogo con filtros por sector para que empresas, bandas o eventos encuentren su prenda en segundos.',
      },
      {
        t: 'Pedido de principio a fin',
        d: 'Carrito, pago y envíos a toda España en un proceso corto, cómodo desde el móvil.',
      },
      {
        t: 'Panel para el taller',
        d: 'Los pedidos llegan con el diseño y los detalles listos para producir, sin perseguir a nadie.',
      },
    ],
    outcomes: [
      { k: 'Antes', v: 'Clientes de Logroño' },
      { k: 'Ahora', v: 'Pedidos de toda España' },
      { k: 'Cómo se compra', v: 'Online, sin presupuestos' },
    ],
    quote: {
      text: 'Entendió perfectamente el rollo que buscaba.',
      author: 'Irene Ibáñez',
      role: 'Camisetas Ahora · reseña en Google',
    },
  },
  {
    slug: 'hatena',
    name: 'Hatena',
    sector: 'Clínica veterinaria',
    city: 'Ourense',
    services: ['Diseño web', 'SEO'],
    title: ['DE NO SALIR', 'EN GOOGLE', 'A AGENDA LLENA.'],
    result: 'De no aparecer en Google a tener la agenda prácticamente llena todos los días.',
    image: '/img/portfolio/new/hatena.webp',
    url: 'https://hatena.es',
    before: 'Una clínica que no aparecía en Google.',
    after: 'Una agenda prácticamente llena todos los días.',
    challenge:
      'Hatena tenía un buen equipo y todo listo para atender en Ourense, pero en internet no existía. Quien buscaba un veterinario cerca encontraba a otras clínicas. Sin visibilidad, la agenda dependía del boca a boca.',
    work: [
      {
        t: 'Web a medida',
        d: 'Servicios, equipo y formas de contacto claros, con la petición de cita a un toque desde el móvil.',
      },
      {
        t: 'SEO local',
        d: 'Estructura, textos y datos pensados para las búsquedas de veterinario en Ourense.',
      },
      {
        t: 'Ficha de Google',
        d: 'Perfil de empresa optimizado para salir en el mapa cuando alguien busca cerca.',
      },
      {
        t: 'Rápida y fácil',
        d: 'Carga optimizada para que nadie se vaya antes de ver cómo pedir cita.',
      },
    ],
    outcomes: [
      { k: 'Antes', v: 'Sin presencia en Google' },
      { k: 'Ahora', v: 'Agenda casi llena a diario' },
      { k: 'Cómo llegan', v: 'Desde Google y el mapa' },
    ],
  },
  {
    slug: 'carper-sonido',
    name: 'Carper Sonido',
    sector: 'Sonido profesional y eventos',
    city: 'Vigo',
    services: ['Diseño web', 'SEO'],
    title: ['EL SONIDO', 'QUE SUENA', 'EN VIGO.'],
    result: 'Posicionada en Google como empresa de sonido en Vigo en numerosas búsquedas.',
    image: '/img/portfolio/new/carper.webp',
    url: 'https://carpersonido.com',
    before: 'Una empresa de sonido que dependía de los contactos de siempre.',
    after: 'Una referencia en Google para sonido y eventos en Vigo.',
    challenge:
      'En el sector del sonido y los eventos, quien no sale en Google cuando alguien organiza una boda, un concierto o un evento de empresa, no existe. Carper Sonido tenía experiencia y equipo; le faltaba aparecer cuando alguien de Vigo buscaba sonido para su evento.',
    work: [
      {
        t: 'Web de presentación',
        d: 'Servicios, equipo técnico y tipos de evento explicados para que el cliente vea en segundos si encajan.',
      },
      {
        t: 'SEO por servicio',
        d: 'Una página trabajada para cada servicio y cada búsqueda importante en Vigo.',
      },
      {
        t: 'Contenido que posiciona',
        d: 'Textos escritos con las palabras que usa quien busca sonido para su evento.',
      },
      {
        t: 'Contacto directo',
        d: 'Presupuesto y WhatsApp siempre a mano para no perder a quien llega con prisa.',
      },
    ],
    outcomes: [
      { k: 'Antes', v: 'Poca visibilidad en Google' },
      { k: 'Ahora', v: 'Arriba en numerosas búsquedas' },
      { k: 'Dónde', v: 'Sonido y eventos en Vigo' },
    ],
  },
];
