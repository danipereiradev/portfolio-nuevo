export type TestimonialSource = 'google' | 'malt';

export interface Testimonial {
  name: string;
  company?: string;
  website?: string;
  date: string;
  text: string;
  highlight?: string;
  // Frase que Google resalta en negrita dentro de la reseña original. Puede
  // estar dentro de "text" o de "highlight".
  boldPhrase?: string;
  rating: number;
  avatar: string;
  source: TestimonialSource;
  sourceUrl: string;
}

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?sa=X&sca_esv=5e96d5e0bf8ebf29&hl=es&authuser=0&biw=1192&bih=593&sxsrf=APpeQnsDm8NS9Z3dkZuru3opsjKau09VJg:1784101247771&q=opiniones%20de%20dani%20pereira%20web%20torrej%C3%B3n%20de%20ardoz&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDeyNDQxNzQ0sDA1NjMztjQxNNjAyPiK0SC_IDMvMz8vtVghJVUhJTEvU6EgtSg1syhRoTw1SaEkv6goNevw5jyQbGJRSn7VIlaStQAAR2og-IEAAAA&rldimm=17291471108536639410&tbm=lcl&ved=0CAgQ5foLahcKEwiIgaeJl9SVAxUAAAAAHQAAAAAQCQ#lkt=LocalPoiReviews&arid=Ci9DQUlRQUNvZENodHljRjlvT2psd2IxWmxSalZGZEdGTFpFSnJjRmRxZWtjeGJIYxAB';

const MALT_PROFILE_URL = 'https://www.malt.es/profile/danipereiragesteiro';

// Únicamente reseñas reales y verificables: 4 reseñas de Google y 1
// recomendación de Malt. Este listado se usa igual en la home y en todas
// las landings, para que la reseña mostrada y la valoración media sean
// siempre coherentes en cualquier página del sitio.
export const allTestimonials: Testimonial[] = [
  {
    name: 'Victor Raposo',
    company: 'Casa Rural O Alicornio',
    website: 'https://oalicornio.com',
    date: '16/07/2026',
    text: ' Profesional...muy profesional como diría Manquiña, un trabajo bien hecho en toda su extensión',
    highlight: 'Un saludo a Daniel',
    rating: 5,
    avatar: 'V',
    source: 'google',
    sourceUrl: GOOGLE_REVIEWS_URL,
  },
  {
    name: 'Irene Ibáñez',
    company: 'Camisetas ahora & chicxsdelacalle',
    website: 'https://camisetas-ahora.com',
    date: 'Hace 3 semanas',
    text: 'Tengo una tienda online de merchandising de bandas y Dani me hizo la web desde cero. Entendió perfectamente el rollo que buscaba.',
    highlight:
      'Siempre que necesito algo, me atiende al momento. Nunca me he quedado tirada, y eso en este negocio es ORO. Le doy 5 estrellas porqué no hay más!',
    boldPhrase: 'Le doy 5 estrellas porqué no hay más!',
    rating: 5,
    avatar: 'II',
    source: 'google',
    sourceUrl: GOOGLE_REVIEWS_URL,
  },
  {
    name: 'Ingrid Martín-Macho',
    company: 'Flamingo plugs (Joyería)',
    date: 'Hace 3 semanas',
    text: 'Profesionalidad y eficacia siempre!! Muchas gracias!!!',
    rating: 5,
    avatar: 'IM',
    source: 'google',
    sourceUrl: GOOGLE_REVIEWS_URL,
  },
  {
    name: 'Bruno Tomás',
    company: 'El viaje de los elefantes (blog de viajes)',
    website: 'https://elviajedeloselefantes.com',
    date: 'Hace 4 semanas',
    text: 'Daniel es un gran profesional. Me ha hecho dos páginas webs para mis dos proyectos profesionales los cuales son de campos totalmente diferentes. Y en ambos he quedado muy satisfecho, pues entendió mi idea para plasmarla en cada página. Además también me dio ideas para que fueran más atractivas.',
    highlight:
      'Estoy muy contento con el resultado. Volvería a trabajar con él sin ninguna duda.',
    boldPhrase: 'Daniel es un gran profesional.',
    rating: 5,
    avatar: 'BT',
    source: 'google',
    sourceUrl: GOOGLE_REVIEWS_URL,
  },
  {
    name: 'Juanvi Raga',
    company: 'Hoy Viajamos (Blog de viajes)',
    website: 'https://hoyviajamosweb.com',
    date: 'Hace 4 semanas',
    text: 'Trabajar con Dani ha sido una experiencia excepcional. Le encargué la programación y optimización de mi blog, y el cambio ha sido increíble: ahora carga rapidísimo, funciona de forma fluida y está mucho mejor organizado a nivel técnico. Además, el servicio fue rapidísimo y siempre estuvo disponible para resolver dudas y ajustar detalles.',
    highlight:
      'Lo que más valoro de Dani no es solo su conocimiento, sino su trato humano. No tengo experiencia en desarrollo web y aun así consiguió explicarme cada paso con una paciencia enorme, haciéndome sentir acompañado en todo momento.',
    rating: 5,
    avatar: 'JR',
    source: 'google',
    sourceUrl: GOOGLE_REVIEWS_URL,
  },
  {
    name: 'Arantxa',
    company: 'Mobile One2One, S.L.',
    website: 'https://www.o2ods.com/',
    date: '27/11/2025',
    text: 'Durante el tiempo que ha durado la colaboración con Daniel, ha quedado en evidencia que es un desarrollador altamente competente, con un enfoque claro en la excelencia técnica y la experiencia de usuario.',
    highlight:
      'Ha demostrado un dominio sobresaliente de frameworks modernos, una gran sensibilidad por el diseño y un compromiso constante con la calidad.',
    rating: 5,
    avatar: 'A',
    source: 'malt',
    sourceUrl: MALT_PROFILE_URL,
  },
];
