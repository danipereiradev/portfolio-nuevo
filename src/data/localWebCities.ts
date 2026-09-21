/**
 * Ciudades de la plantilla SEO local `/diseno-web/{slug}/`.
 *
 * CÓMO AÑADIR UNA CIUDAD (menos de 1 hora)
 * 1. Copia un objeto de `LOCAL_WEB_CITIES` y cambia `slug`, `ciudad`, `provincia`.
 * 2. Reescribe OBLIGATORIAMENTE (no clones otra ciudad cambiando el nombre):
 *    - `title` y `description` (meta únicos)
 *    - `hero_lead`
 *    - `intro_local` (mín. 2 párrafos, nombra la ciudad, habla de ESA plaza)
 *    - `sectores_locales` (mín. 3, reales y distintos: no copies hostelería
 *      de Valencia en A Coruña)
 *    - `faq_local` (mín. 4; al menos una pregunta nombra la ciudad; incluye
 *      alguna pregunta que SOLO tenga sentido ahí, p. ej. gallego)
 *    - `cta_local`
 *    La estructura de la página (hero, proceso, qué montamos) es común.
 *    Google mira el texto. Si dos ciudades solo cambian el topónimo, las
 *    trata como doorway pages.
 * 3. Elige `casos_relevantes` (ids de portfolio) que encajen con esos sectores.
 * 4. Pon `relatedCitySlugs` a otras ciudades YA publicadas (o [] si es la primera).
 * 5. Añade la misma `title`/`description` en `src/seo/pagesMeta.json`
 *    con la clave `/diseno-web/{slug}` (sin esto, el HTML estático no lleva
 *    title/canonical propios).
 * 6. Opcional: copia la entrada de `/diseno-web` en `src/config/heroLcp.json`.
 *
 * El build se encarga del resto: HTML inicial con H1/intro/FAQ/enlaces/schema,
 * entrada en sitemap.xml y enlaces en “Diseño web en España”. Un slug que no
 * esté aquí (p. ej. /diseno-web/sevilla/) es 404 de verdad: no se redirige a
 * /diseno-web/. Solo se redirige una URL antigua concreta, a propósito.
 *
 * NO inventes oficina ni dirección local. El usuario trata con 36web
 * en su ciudad: no expliques Madrid, colaboradores ni cómo se organiza el equipo.
 * NO uses este archivo para 20 ciudades con el mismo texto. Google las
 * trata como doorway pages.
 */

import pagesMeta from '../seo/pagesMeta.json';
import { localWebCityPath } from '../config/contact';

export type LocalWebPortfolioId =
  | 'chicxs'
  | 'hoyviajamos'
  | 'camisetas'
  | 'resilience'
  | 'hatena'
  | 'delish'
  | 'carper'
  | 'micolet'
  | 'alicornio'
  | 'desmundando';

export type LocalWebSector = {
  title: string;
  description: string;
};

export type LocalWebFaq = {
  question: string;
  answer: string;
};

export type LocalWebCity = {
  slug: string;
  ciudad: string;
  provincia: string;
  /** <title> único. Debe coincidir con pagesMeta.json. */
  title: string;
  /** meta description única. Debe coincidir con pagesMeta.json. */
  description: string;
  /** Frase del hero. Distinta por ciudad. */
  hero_lead: string;
  /** Intro local. Obligatoria y única. */
  intro_local: string[];
  /** Sectores reales de esa plaza. Obligatorios y únicos. */
  sectores_locales: LocalWebSector[];
  /** Proyectos del portfolio que encajan con esos sectores. */
  casos_relevantes: LocalWebPortfolioId[];
  casos_note: string;
  /** FAQ local. Obligatoria y única. */
  faq_local: LocalWebFaq[];
  cta_local: {
    title: string;
    description: string;
  };
  relatedCitySlugs: string[];
};

const MIN_INTRO_CHARS = 380;
const MIN_FAQ = 4;
const MIN_SECTORES = 3;

const assertCity = (city: LocalWebCity, allSlugs: Set<string>) => {
  const intro = city.intro_local.join(' ');
  const path = localWebCityPath(city.slug);

  if (!city.slug || !/^[a-z0-9-]+$/.test(city.slug)) {
    throw new Error(`[local-web] slug inválido: "${city.slug}"`);
  }
  if (intro.length < MIN_INTRO_CHARS) {
    throw new Error(
      `[local-web] intro_local de ${city.slug} es demasiado corta. Escribe contenido local, no un párrafo genérico.`,
    );
  }
  if (!intro.includes(city.ciudad)) {
    throw new Error(
      `[local-web] intro_local de ${city.slug} debe nombrar "${city.ciudad}".`,
    );
  }
  if (city.sectores_locales.length < MIN_SECTORES) {
    throw new Error(`[local-web] ${city.slug}: mínimo ${MIN_SECTORES} sectores_locales.`);
  }
  if (city.faq_local.length < MIN_FAQ) {
    throw new Error(`[local-web] ${city.slug}: mínimo ${MIN_FAQ} faq_local.`);
  }
  if (!city.faq_local.some((faq) => faq.question.includes(city.ciudad))) {
    throw new Error(
      `[local-web] ${city.slug}: al menos una pregunta de FAQ debe nombrar "${city.ciudad}".`,
    );
  }
  if (!city.hero_lead.includes(city.ciudad)) {
    throw new Error(`[local-web] hero_lead de ${city.slug} debe nombrar la ciudad.`);
  }
  if (!city.title.includes(city.ciudad) || !city.description.includes(city.ciudad)) {
    throw new Error(
      `[local-web] title y description de ${city.slug} deben ser únicos y nombrar la ciudad.`,
    );
  }
  for (const related of city.relatedCitySlugs) {
    if (!allSlugs.has(related)) {
      throw new Error(
        `[local-web] ${city.slug} apunta a relatedCitySlugs "${related}" que no existe.`,
      );
    }
  }

  const meta = (pagesMeta as Record<string, { title?: string; description?: string }>)[
    path
  ];
  if (!meta) {
    throw new Error(
      `[local-web] Falta "${path}" en src/seo/pagesMeta.json. Sin esa entrada el HTML estático no lleva title/canonical propios.`,
    );
  }
  if (meta.title !== city.title || meta.description !== city.description) {
    throw new Error(
      `[local-web] title/description de ${path} no coinciden con pagesMeta.json. Unifica las dos fuentes.`,
    );
  }
};

/**
 * PERSONALIZA POR CIUDAD: este es el único sitio de contenido local.
 * Valencia: turismo, hostelería, clínicas y servicios locales.
 * Presencia 36web en la ciudad. Sin oficina inventada ni explicación operativa.
 */
const valencia: LocalWebCity = {
  slug: 'valencia',
  ciudad: 'Valencia',
  provincia: 'Valencia',
  title: 'Diseño web en Valencia para autónomos y negocios | 36web',
  description:
    'Diseño web en Valencia para autónomos, emprendedores y pequeños negocios. Atención directa. Precio y plazos por escrito.',
  hero_lead:
    'Webs profesionales para autónomos, emprendedores y pequeños negocios de Valencia.',
  intro_local: [
    'Diseñamos páginas web para negocios de Valencia que necesitan verse profesionales, funcionar bien en móvil y convertir visitas en contactos.',
    'Atención directa en Valencia. Diseño web cercano, profesional y sin intermediarios. Propuesta el mismo día, con precio y plazos por escrito. Si no encaja, lo dices y no pasa nada.',
    'No montamos webs infladas. Si con unas secciones bien hechas vale, no te vendemos doce. Hostelería, clínicas, oficios, marcas: una página clara para que te escriban.',
  ],
  sectores_locales: [
    {
      title: 'Hostelería y turismo',
      description:
        'Restaurantes, alojamientos y negocios que viven de quien busca “cerca de mí” o reserva antes de llegar. Carta, horarios, ubicación y un camino claro para reservar mesa o habitación.',
    },
    {
      title: 'Clínicas y salud',
      description:
        'Fisios, clínicas dentales, centros de estética. Tratamientos y especialidad visibles a la primera, y un flujo sencillo para pedir cita.',
    },
    {
      title: 'Servicios locales y oficios',
      description:
        'Reformas, abogados, asesorías, formación. Qué haces, en qué zona trabajas y ejemplos de encargos. Quien te busca ya viene con una necesidad concreta.',
    },
    {
      title: 'Marcas y ecommerce pequeño',
      description:
        'Si además de presentarte vendes producto, la tienda se presupuesta aparte. No te montamos un ecommerce disfrazado de web de empresa.',
    },
  ],
  casos_relevantes: ['hoyviajamos', 'delish', 'chicxs', 'micolet'],
  casos_note:
    'Proyectos de turismo, producto y marca. Te enseñamos ejemplos parecidos a tu negocio antes de empezar.',
  faq_local: [
    {
      question: '¿Trabajáis con negocios de Valencia?',
      answer:
        'Sí. Trabajamos con autónomos y empresas de Valencia en proyectos de diseño web, ecommerce y mantenimiento.',
    },
    {
      question: '¿Hacéis webs para restaurantes y negocios de turismo en Valencia?',
      answer:
        'Sí. Carta o servicios, fotos, móvil y un contacto que funcione. Si el proyecto es una reserva compleja o una tienda, te lo decimos en la propuesta.',
    },
    {
      question: '¿Cuánto cuesta una web para un autónomo de Valencia?',
      answer:
        'Tenemos opciones desde 349 € + IVA. Si necesitas más personalización o funcionalidades, te damos presupuesto cerrado antes de empezar. Tras hablar contigo, te damos precio cerrado, alcance y plazo por escrito.',
    },
    {
      question: '¿El plazo cuenta desde que os escribo?',
      answer:
        'No. El plazo va por escrito y cuenta desde el arranque pagado, cuando tenemos textos y fotos. Te lo dejamos claro en la propuesta.',
    },
    {
      question: '¿Y si luego quiero una tienda online?',
      answer:
        'Se presupuesta aparte. Una web de presentación y un ecommerce no son el mismo proyecto. Empezamos por lo que necesitas ahora.',
    },
  ],
  cta_local: {
    title: 'Cuéntanos tu negocio. Te llamamos.',
    description:
      'Nombre, teléfono y qué necesitas. Atención directa en Valencia. Precio y plazo por escrito, sin compromiso.',
  },
  relatedCitySlugs: ['a-coruna'],
};

/**
 * PERSONALIZA POR CIUDAD: Galicia. Costa, oficios, clínicas, marcas, gallego.
 * Contenido propio. No clones Valencia. Sin oficina inventada ni explicación operativa.
 */
const aCoruna: LocalWebCity = {
  slug: 'a-coruna',
  ciudad: 'A Coruña',
  provincia: 'A Coruña',
  title: 'Diseño web en A Coruña para autónomos y negocios | 36web',
  description:
    'Diseño web en A Coruña para autónomos, turismo de costa, oficios y marcas de Galicia. Atención directa. Precio y plazos por escrito.',
  hero_lead:
    'Webs profesionales para autónomos, emprendedores y pequeños negocios de A Coruña.',
  intro_local: [
    'Hacemos diseño web en A Coruña para autónomos y negocios que ya facturan y necesitan una web a la altura: clara, en el teléfono y pensada para que les escriban.',
    'Atención directa en A Coruña. Diseño web cercano, profesional y sin intermediarios. Precio y plazos por escrito. Si no encaja, lo dices y no pasa nada.',
    'En Galicia suelen pedir pocas páginas, bien hechas: costa, oficios, clínicas, marcas. Si el proyecto va en gallego, entra en la propuesta desde el principio. No es un extra a mitad de camino.',
  ],
  sectores_locales: [
    {
      title: 'Turismo y costa',
      description:
        'Alojamientos, actividades y negocios de temporada que viven de quien planifica el viaje a Galicia. Fechas, entorno, fotos reales y cómo reservar sin perderse.',
    },
    {
      title: 'Oficios y servicios de la ciudad',
      description:
        'Talleres, reformas, asesorías, despachos. Te buscan por el oficio, no por un eslogan. La web dice qué haces, dónde y con qué tipo de encargo.',
    },
    {
      title: 'Clínicas y bienestar',
      description:
        'Fisioterapia, salud, estética. Nada de plantilla de otra consulta. Texto propio, aspecto serio y cita sin fricción.',
    },
    {
      title: 'Marcas y producto desde Galicia',
      description:
        'Quien vende su trabajo o su marca hacia fuera. Si hay catálogo y cobro online, es tienda y se ve aparte: no disfrazamos un ecommerce de web de presentación.',
    },
  ],
  casos_relevantes: ['alicornio', 'carper', 'resilience', 'hoyviajamos'],
  casos_note:
    'Hay proyectos gallegos, de costa y de marca. Los enseñamos porque se parecen a lo que suele pedir un negocio de aquí.',
  faq_local: [
    {
      question: '¿Trabajáis con negocios de A Coruña?',
      answer:
        'Sí. Trabajamos con autónomos y empresas de A Coruña en diseño web, ecommerce y mantenimiento. Costa, oficios, clínicas y marcas.',
    },
    {
      question: '¿Montáis la web en gallego?',
      answer:
        'Sí, si el negocio lo necesita. El idioma extra es alcance: va en la propuesta, no aparece a mitad de proyecto.',
    },
    {
      question: '¿Cuánto tarda una web para un negocio de A Coruña?',
      answer:
        'El plazo va por escrito. Una web de negocio suele estar en 3 a 8 semanas cuando tenemos textos y fotos. Cuenta desde el arranque pagado, no desde el primer mensaje.',
    },
    {
      question: '¿Cuánto cuesta una web en A Coruña?',
      answer:
        'Tenemos opciones desde 349 € + IVA. Si el proyecto pide más personalización o funciones, te damos presupuesto cerrado antes de empezar. Tras hablar contigo, precio cerrado, alcance y plazo por escrito.',
    },
    {
      question: '¿La web es mía?',
      answer:
        'Tuya. Dominio, accesos y archivos a tu nombre. No te atamos a una plataforma para no poder irte.',
    },
  ],
  cta_local: {
    title: 'Cuéntanos tu negocio. Te llamamos.',
    description:
      'Qué haces en A Coruña y cómo te tienen que encontrar. Atención directa. Precio y plazo por escrito, sin compromiso.',
  },
  relatedCitySlugs: ['valencia'],
};

export const LOCAL_WEB_CITIES: Record<string, LocalWebCity> = {
  valencia,
  'a-coruna': aCoruna,
};

const allSlugs = new Set(Object.keys(LOCAL_WEB_CITIES));

for (const city of Object.values(LOCAL_WEB_CITIES)) {
  assertCity(city, allSlugs);
}

export const LOCAL_WEB_CITY_LIST = Object.values(LOCAL_WEB_CITIES);

export const getLocalWebCity = (slug: string | undefined) =>
  slug ? LOCAL_WEB_CITIES[slug] : undefined;
