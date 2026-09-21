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
 * 4. Pon `relatedCitySlugs` a 2–3 ciudades YA publicadas (máx. 3; [] si es la
 *    primera). En la landing solo se enlazan esas, no el listado entero.
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
const MAX_RELATED = 3;

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
  if (city.relatedCitySlugs.length > MAX_RELATED) {
    throw new Error(
      `[local-web] ${city.slug}: relatedCitySlugs máximo ${MAX_RELATED}. No listes todas las ciudades.`,
    );
  }
  if (new Set(city.relatedCitySlugs).size !== city.relatedCitySlugs.length) {
    throw new Error(`[local-web] ${city.slug}: relatedCitySlugs repetidos.`);
  }
  if (city.relatedCitySlugs.includes(city.slug)) {
    throw new Error(`[local-web] ${city.slug}: no te enlaces a ti misma.`);
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
 * PERSONALIZA POR CIUDAD: Corredor del Henares y capital.
 * Presencia 36web en la ciudad. Sin oficina inventada ni dirección en schema.
 */
const madrid: LocalWebCity = {
  slug: 'madrid',
  ciudad: 'Madrid',
  provincia: 'Madrid',
  title: 'Diseño web en Madrid para autónomos y pymes | 36web',
  description:
    'Diseño web en Madrid para autónomos, despachos, clínicas y negocios de barrio. Atención directa. Precio y plazos por escrito.',
  hero_lead:
    'Una web clara para tu negocio en Madrid: se entiende en el móvil y deja un camino para que te escriban.',
  intro_local: [
    'Hacemos diseño web en Madrid para autónomos y pymes que ya facturan y necesitan una página a la altura: profesional, usable en el teléfono y pensada para convertir visitas en llamadas o WhatsApp.',
    'Atención directa en Madrid. Propuesta el mismo día, con precio y plazos por escrito. Si no encaja, lo dices y no pasa nada.',
    'En Madrid hay de todo: consultas, restaurantes, despachos, marcas. Montamos lo que hace falta para que te encuentren. Si con unas secciones bien hechas vale, no te vendemos doce.',
  ],
  sectores_locales: [
    {
      title: 'Despachos y profesionales',
      description:
        'Abogados, asesorías, arquitectos, consultores. Quiénes sois, en qué os especializáis y cómo encargaros un asunto. Sin jerga de agencia.',
    },
    {
      title: 'Clínicas y consultas',
      description:
        'Dental, fisioterapia, estética, psicología. Tratamientos visibles a la primera y un flujo sencillo para pedir cita desde el móvil.',
    },
    {
      title: 'Hostelería de barrio',
      description:
        'Restaurantes, cafeterías y grupos con varias salas. Carta, horarios, ubicación y reserva o contacto. No una web de “concepto” que nadie usa.',
    },
    {
      title: 'Marcas y producto',
      description:
        'Si vendes online, la tienda se presupuesta aparte. Aquí va la web de presentación: marca, catálogo de entrada y un contacto que funcione.',
    },
  ],
  casos_relevantes: ['delish', 'hatena', 'chicxs', 'micolet'],
  casos_note:
    'Hay proyectos de Madrid, clínicas y marca. Te enseñamos ejemplos parecidos a tu negocio antes de empezar.',
  faq_local: [
    {
      question: '¿Hacéis diseño web para negocios de Madrid capital?',
      answer:
        'Sí. Trabajamos con autónomos y empresas de Madrid en diseño web, ecommerce y mantenimiento. Barrio, centro o varias sedes: lo vemos en la propuesta.',
    },
    {
      question: '¿Es más cara una web por estar en Madrid?',
      answer:
        'No hay recargo de capital. Tenemos opciones desde 349 € + IVA. El precio va por el alcance, no por el código postal. Tras hablar, presupuesto cerrado por escrito.',
    },
    {
      question: '¿Hacéis webs para un barrio concreto de Madrid?',
      answer:
        'Sí. Si tus clientes te buscan por zona —Chamberí, Usera, Salamanca, Vallecas— la web lo deja claro: qué haces, dónde y cómo contactarte.',
    },
    {
      question: '¿El plazo cuenta desde que os escribo?',
      answer:
        'No. El plazo va por escrito y cuenta desde el arranque pagado, cuando tenemos textos y fotos.',
    },
    {
      question: '¿Y si luego quiero una tienda online?',
      answer:
        'Se presupuesta aparte. Una web de presentación y un ecommerce no son el mismo proyecto.',
    },
  ],
  cta_local: {
    title: 'Cuéntanos tu negocio en Madrid. Te llamamos.',
    description:
      'Nombre, teléfono y qué necesitas. Atención directa. Precio y plazo por escrito, sin compromiso.',
  },
  relatedCitySlugs: ['torrejon-de-ardoz', 'alcala-de-henares', 'coslada'],
};

/**
 * Torrejón de Ardoz: Corredor del Henares, comercio local, polígono.
 * Sin dirección pública ni LocalBusiness en schema.
 */
const torrejon: LocalWebCity = {
  slug: 'torrejon-de-ardoz',
  ciudad: 'Torrejón de Ardoz',
  provincia: 'Madrid',
  title: 'Diseño web en Torrejón de Ardoz para negocios | 36web',
  description:
    'Diseño web en Torrejón de Ardoz para autónomos, comercios y empresas del Corredor del Henares. Precio y plazos por escrito.',
  hero_lead:
    'Diseño web para autónomos y empresas de Torrejón de Ardoz. Clara, en el móvil y con un contacto que funciona.',
  intro_local: [
    'Diseñamos páginas web para negocios de Torrejón de Ardoz que necesitan verse profesionales sin montar un proyecto inflado: oficios, comercios, clínicas y empresas del Corredor.',
    'Atención directa en Torrejón de Ardoz. Propuesta el mismo día, precio y plazos por escrito. Si no encaja, lo dices y no pasa nada.',
    'Aquí la web sirve para que te encuentren quien ya te busca por oficio o por zona. Pocas secciones, bien hechas, y un WhatsApp o formulario a la vista.',
  ],
  sectores_locales: [
    {
      title: 'Oficios y reformas',
      description:
        'Reformas, electricidad, climatización, talleres. Qué haces, en qué zonas del Corredor trabajas y ejemplos de encargos reales.',
    },
    {
      title: 'Comercio y hostelería local',
      description:
        'Tiendas, cafeterías y negocios de calle. Horarios, cómo llegar y un contacto que se use de verdad en el teléfono.',
    },
    {
      title: 'Empresas de polígono',
      description:
        'Distribución, almacén, servicios a empresas. Una página que explique a qué os dedicáis y cómo pediros presupuesto, sin postureo.',
    },
    {
      title: 'Clínicas de barrio',
      description:
        'Fisio, dental, estética. Especialidad a la primera y cita sin fricción. Nada de plantilla de otra consulta.',
    },
  ],
  casos_relevantes: ['carper', 'hatena', 'camisetas', 'resilience'],
  casos_note:
    'Proyectos de oficios, producto y clínicas. Los enseñamos porque se parecen a lo que pide un negocio del Corredor.',
  faq_local: [
    {
      question: '¿Trabajáis con negocios de Torrejón de Ardoz?',
      answer:
        'Sí. Autónomos, comercios y empresas de Torrejón de Ardoz en diseño web, ecommerce y mantenimiento.',
    },
    {
      question: '¿Hacéis webs para empresas del Corredor del Henares?',
      answer:
        'Sí. Si tus clientes están en Torrejón, Alcalá, Coslada o San Fernando, la web lo deja escrito: zona, servicio y cómo encargarte el trabajo.',
    },
    {
      question: '¿Cuánto cuesta una web en Torrejón de Ardoz?',
      answer:
        'Opciones desde 349 € + IVA. Si el proyecto pide más, presupuesto cerrado antes de empezar. Precio y plazo por escrito.',
    },
    {
      question: '¿La web sirve si también trabajo en Madrid capital?',
      answer:
        'Sí. La página dice dónde operas. No hace falta una web distinta por cada municipio; el alcance lo vemos contigo.',
    },
    {
      question: '¿El plazo cuenta desde el primer mensaje?',
      answer:
        'No. Cuenta desde el arranque pagado, con textos y fotos. Te lo dejamos claro en la propuesta.',
    },
  ],
  cta_local: {
    title: 'Cuéntanos tu negocio en Torrejón. Te llamamos.',
    description:
      'Qué haces en Torrejón de Ardoz y a quién te tiene que encontrar. Precio y plazo por escrito, sin compromiso.',
  },
  relatedCitySlugs: [
    'alcala-de-henares',
    'san-fernando-de-henares',
    'coslada',
  ],
};

/**
 * Alcalá de Henares: casco, universidad, comercio local.
 * Sin oficina inventada.
 */
const alcala: LocalWebCity = {
  slug: 'alcala-de-henares',
  ciudad: 'Alcalá de Henares',
  provincia: 'Madrid',
  title: 'Diseño web en Alcalá de Henares para negocios | 36web',
  description:
    'Diseño web en Alcalá de Henares para autónomos, comercio del casco, clínicas y profesionales. Precio y plazos por escrito.',
  hero_lead:
    'Webs para negocios de Alcalá de Henares: casco, universidad o polígono. Claras y pensadas para que te escriban.',
  intro_local: [
    'Hacemos diseño web en Alcalá de Henares para autónomos y negocios que necesitan una página seria: se entiende en el móvil y deja un contacto a un toque.',
    'Atención directa en Alcalá de Henares. Precio y plazos por escrito. Si no encaja, lo dices y no pasa nada.',
    'Alcalá no es un barrio más del mapa. Casco histórico, universidad, comercio de toda la vida y empresas del Corredor. La web habla de tu plaza, no de una plantilla genérica de “Madrid este”.',
  ],
  sectores_locales: [
    {
      title: 'Comercio y hostelería del casco',
      description:
        'Tiendas, bares y alojamientos que viven de quien pasea el centro o busca dónde comer. Fotos reales, horarios y cómo reservar o escribirte.',
    },
    {
      title: 'Profesionales y formación',
      description:
        'Despachos, academias, coaches, servicios a estudiantes y empresas. Qué ofreces, para quién y un formulario que se use.',
    },
    {
      title: 'Clínicas y salud',
      description:
        'Consultas que necesitan verse serias en el teléfono. Tratamientos, equipo y cita, sin copiar la web de otra ciudad.',
    },
    {
      title: 'Servicios locales',
      description:
        'Reformas, abogados, asesorías. Zona de trabajo y tipo de encargo. Quien te busca en Alcalá ya viene con una necesidad concreta.',
    },
  ],
  casos_relevantes: ['hoyviajamos', 'hatena', 'desmundando', 'chicxs'],
  casos_note:
    'Hay proyectos de turismo, clínicas y marca. Te enseñamos algo parecido a tu negocio de Alcalá antes de empezar.',
  faq_local: [
    {
      question: '¿Hacéis diseño web en Alcalá de Henares?',
      answer:
        'Sí. Trabajamos con autónomos y empresas de Alcalá de Henares en diseño web, ecommerce y mantenimiento.',
    },
    {
      question: '¿Sirve para un negocio del casco histórico o cerca de la universidad?',
      answer:
        'Sí. Si te encuentran quienes visitan el centro o estudian aquí, la web enseña ubicación, horarios y un contacto que funciona en el móvil.',
    },
    {
      question: '¿Cuánto tarda una web para un negocio de Alcalá de Henares?',
      answer:
        'El plazo va por escrito. Una web de negocio suele estar en 3 a 8 semanas con textos y fotos. Cuenta desde el arranque pagado.',
    },
    {
      question: '¿Cuánto cuesta una web en Alcalá?',
      answer:
        'Desde 349 € + IVA. Si pides más personalización o funciones, presupuesto cerrado antes de empezar.',
    },
    {
      question: '¿La web es mía?',
      answer:
        'Tuya. Dominio, accesos y archivos a tu nombre. No te atamos a una plataforma para no poder irte.',
    },
  ],
  cta_local: {
    title: 'Cuéntanos tu negocio en Alcalá. Te llamamos.',
    description:
      'Casco, universidad o polígono: qué haces y cómo te tienen que encontrar. Precio y plazo por escrito.',
  },
  relatedCitySlugs: ['torrejon-de-ardoz', 'san-fernando-de-henares'],
};

/**
 * San Fernando de Henares: municipio pequeño del Corredor, polígono, autónomos.
 */
const sanFernando: LocalWebCity = {
  slug: 'san-fernando-de-henares',
  ciudad: 'San Fernando de Henares',
  provincia: 'Madrid',
  title: 'Diseño web en San Fernando de Henares | 36web',
  description:
    'Diseño web en San Fernando de Henares para autónomos, comercios y empresas de polígono. Atención directa. Precio por escrito.',
  hero_lead:
    'Una web profesional para tu negocio en San Fernando de Henares. Sin inflarla y con precio cerrado.',
  intro_local: [
    'Diseñamos webs para autónomos y empresas de San Fernando de Henares: comercios, oficios y naves del polígono que necesitan verse claros online y que les escriban.',
    'Atención directa en San Fernando de Henares. Propuesta el mismo día, precio y plazos por escrito. Si no encaja, no pasa nada.',
    'No hace falta ser una multinacional de Coslada ni un despacho de Madrid. Con unas secciones bien hechas, móvil y un WhatsApp a la vista, ya tienes una web de negocio.',
  ],
  sectores_locales: [
    {
      title: 'Autónomos y comercio local',
      description:
        'Tiendas, servicios a domicilio, pequeños negocios de calle. Qué haces, horarios y cómo pedirte el trabajo desde el teléfono.',
    },
    {
      title: 'Polígono e industria ligera',
      description:
        'Talleres, almacenes, proveedores. Una página que diga a qué os dedicáis y cómo solicitar presupuesto, sin recargarla.',
    },
    {
      title: 'Oficios del Corredor',
      description:
        'Reformas, instalaciones, mantenimiento. Zona de trabajo: San Fernando, Coslada, Torrejón. Ejemplos de encargos, no eslóganes.',
    },
    {
      title: 'Salud y bienestar',
      description:
        'Consultas pequeñas que necesitan verse serias. Texto propio y cita fácil. Nada de plantilla de clínica de capital.',
    },
  ],
  casos_relevantes: ['carper', 'resilience', 'camisetas', 'hatena'],
  casos_note:
    'Proyectos de oficios, producto y consultas. Encajan con lo que suele pedir un negocio de San Fernando.',
  faq_local: [
    {
      question: '¿Trabajáis con negocios de San Fernando de Henares?',
      answer:
        'Sí. Autónomos, comercios y empresas de San Fernando de Henares en diseño web, ecommerce y mantenimiento.',
    },
    {
      question: '¿Hacéis webs si el negocio es pequeño y no está en Madrid capital?',
      answer:
        'Sí. El tamaño del municipio no cambia el trabajo: una página clara, móvil y un contacto que funcione. El precio va por el alcance.',
    },
    {
      question: '¿Sirve para una empresa de polígono?',
      answer:
        'Sí. Actividad, zona, fotos de verdad y un formulario o teléfono a la vista. Si hace falta catálogo o área privada, te lo decimos en la propuesta.',
    },
    {
      question: '¿Cuánto cuesta una web en San Fernando de Henares?',
      answer:
        'Desde 349 € + IVA. Tras hablar, precio cerrado, alcance y plazo por escrito.',
    },
    {
      question: '¿Y si también cubro Coslada o Torrejón?',
      answer:
        'La web puede decir las zonas donde trabajas. No montamos una landing por cada pueblo si no hace falta.',
    },
  ],
  cta_local: {
    title: 'Cuéntanos tu negocio en San Fernando. Te llamamos.',
    description:
      'Comercio, oficio o polígono. Atención directa. Precio y plazo por escrito, sin compromiso.',
  },
  relatedCitySlugs: ['coslada', 'torrejon-de-ardoz', 'alcala-de-henares'],
};

/**
 * Coslada: logística, aeropuerto, comercio de barrio.
 */
const coslada: LocalWebCity = {
  slug: 'coslada',
  ciudad: 'Coslada',
  provincia: 'Madrid',
  title: 'Diseño web en Coslada para autónomos y empresas | 36web',
  description:
    'Diseño web en Coslada para logística, comercios de barrio, oficios y clínicas. Atención directa. Precio y plazos por escrito.',
  hero_lead:
    'Diseño web en Coslada para quien factura cerca del aeropuerto o en el barrio. Clara, móvil y con contacto a la vista.',
  intro_local: [
    'Hacemos diseño web en Coslada para autónomos y empresas que necesitan una página que explique qué hacen —logística, comercio, oficio o consulta— y deje un camino para escribirles.',
    'Atención directa en Coslada. Precio y plazos por escrito. Si no encaja, lo dices y no pasa nada.',
    'Coslada no se cuenta igual que Madrid centro: polígonos, operadores, tiendas de toda la vida. La web va al grano. Si con unas secciones vale, no te vendemos un microsite de aeropuerto.',
  ],
  sectores_locales: [
    {
      title: 'Logística y transporte',
      description:
        'Operadores, almacenes, mensajería. Actividad, zona y cómo pediros un servicio o un presupuesto. Sin relleno corporativo.',
    },
    {
      title: 'Comercio de barrio',
      description:
        'Tiendas, hostelería y servicios de calle. Horarios, cómo llegar y WhatsApp. Pensada para quien te busca cerca, no para un catálogo nacional.',
    },
    {
      title: 'Oficios y mantenimiento',
      description:
        'Reformas, instalaciones, talleres. Dónde trabajáis —Coslada, San Fernando, Madrid este— y ejemplos de encargos.',
    },
    {
      title: 'Clínicas locales',
      description:
        'Salud y estética de Coslada. Tratamientos, aspecto serio y cita en el móvil. Texto vuestro, no el de otra consulta.',
    },
  ],
  casos_relevantes: ['camisetas', 'carper', 'hatena', 'delish'],
  casos_note:
    'Hay proyectos de producto, oficios y clínicas. Te enseñamos algo parecido a un negocio de Coslada antes de empezar.',
  faq_local: [
    {
      question: '¿Hacéis diseño web en Coslada?',
      answer:
        'Sí. Trabajamos con autónomos y empresas de Coslada en diseño web, ecommerce y mantenimiento. Logística, comercio, oficios y clínicas.',
    },
    {
      question: '¿Montáis webs para empresas de logística cerca del aeropuerto?',
      answer:
        'Sí. Una página que explique el servicio, la zona y cómo contactaros. Si el proyecto es un portal con tracking o área de clientes, te lo decimos en la propuesta: no es la misma web.',
    },
    {
      question: '¿Cuánto cuesta una web para un comercio de Coslada?',
      answer:
        'Opciones desde 349 € + IVA. Si necesitas más, presupuesto cerrado antes de empezar. Precio y plazo por escrito.',
    },
    {
      question: '¿El plazo cuenta desde que os escribo?',
      answer:
        'No. Cuenta desde el arranque pagado, con textos y fotos.',
    },
    {
      question: '¿Y si vendo también a empresas de Madrid?',
      answer:
        'La web puede hablar de Coslada y de la zona que cubres. No hace falta inflarla con “toda España” si no es verdad.',
    },
  ],
  cta_local: {
    title: 'Cuéntanos tu negocio en Coslada. Te llamamos.',
    description:
      'Logística, barrio u oficio. Atención directa. Precio y plazo por escrito, sin compromiso.',
  },
  relatedCitySlugs: ['san-fernando-de-henares', 'madrid', 'torrejon-de-ardoz'],
};

export const LOCAL_WEB_CITIES: Record<string, LocalWebCity> = {
  madrid,
  'torrejon-de-ardoz': torrejon,
  'alcala-de-henares': alcala,
  'san-fernando-de-henares': sanFernando,
  coslada,
};

const allSlugs = new Set(Object.keys(LOCAL_WEB_CITIES));

for (const city of Object.values(LOCAL_WEB_CITIES)) {
  assertCity(city, allSlugs);
}

export const LOCAL_WEB_CITY_LIST = Object.values(LOCAL_WEB_CITIES);

export const getLocalWebCity = (slug: string | undefined) =>
  slug ? LOCAL_WEB_CITIES[slug] : undefined;

export const getRelatedCities = (city: LocalWebCity) =>
  city.relatedCitySlugs
    .map((slug) => LOCAL_WEB_CITIES[slug])
    .filter((item): item is LocalWebCity => Boolean(item));
