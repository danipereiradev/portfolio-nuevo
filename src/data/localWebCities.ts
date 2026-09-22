/**
 * Ciudades de la plantilla SEO local `/diseno-web/{slug}/`.
 *
 * CÓMO AÑADIR UNA CIUDAD (menos de 1 hora)
 * 1. Copia un objeto de `LOCAL_WEB_CITIES` y cambia `slug`, `ciudad`,
 *    `provincia`, `comunidad`.
 * 2. Reescribe OBLIGATORIAMENTE (no clones otra ciudad cambiando el nombre):
 *    - `title` y `description` (meta únicos)
 *    - `hero_lead`
 *    - `intro_local` (mín. 2 párrafos, nombra la ciudad, habla de ESA plaza)
 *    - `contexto_local` (area, zonas, municipios, tejido, rasgos)
 *    - `sectores_locales` (mín. 3, reales y distintos)
 *    - `necesidades_locales` (mín. 3, title + description de ESA plaza)
 *    - `faq_local` (mín. 2; solo preguntas de ESA ciudad; las generales están
 *      en LOCAL_WEB_COMMON_FAQS)
 *    - `cta_local`, `presencia_local`, `verified_at`
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

import {
  assertCity,
  warnSimilarLocalWebCities,
} from './localWebCityValidate';
import type { LocalWebCity } from './localWebCityTypes';

export type {
  LocalWebCity,
  LocalWebContexto,
  LocalWebFaq,
  LocalWebNeed,
  LocalWebPortfolioId,
  LocalWebPresencia,
  LocalWebPresenciaTipo,
  LocalWebSector,
} from './localWebCityTypes';
export {
  LOCAL_WEB_COMMON_FAQS,
  getPublishedLocalWebFaqs,
} from './localWebCityTypes';
export { getLocalGeoContext } from './localWebCityUi';
export { scoreLocalWebCitySimilarity } from './localWebCityValidate';

/**
 * PERSONALIZA POR CIUDAD: Corredor del Henares y capital.
 * Presencia 36web en la ciudad. Sin oficina inventada ni dirección en schema.
 */
const madrid: LocalWebCity = {
  slug: 'madrid',
  ciudad: 'Madrid',
  provincia: 'Madrid',
  comunidad: 'Comunidad de Madrid',
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
  contexto_local: {
    area: 'Madrid capital',
    zonas: ['Chamberí', 'Usera', 'Salamanca', 'Vallecas', 'centro'],
    municipios_cercanos: [
      'Torrejón de Ardoz',
      'Alcalá de Henares',
      'Coslada',
    ],
    tejido_empresarial:
      'Autónomos y pymes: despachos, clínicas, hostelería de barrio y marcas de producto.',
    rasgos_locales: [
      'Madrid capital',
      'barrios y varias sedes',
      'consultas, restaurantes, despachos y marcas',
    ],
  },
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
  necesidades_locales: [
    {
      title: 'Página profesional usable en el teléfono',
      description: 'A la altura de un negocio que ya factura.',
    },
    {
      title: 'Convertir visitas en llamadas o WhatsApp',
      description: 'No en un folleto.',
    },
    {
      title: 'Dejar claro el barrio o si hay varias sedes',
      description: 'Y cómo encargar un asunto o pedir cita.',
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
  ],
  cta_local: {
    title: 'Cuéntanos tu negocio en Madrid. Te llamamos.',
    description:
      'Nombre, teléfono y qué necesitas. Atención directa. Precio y plazo por escrito, sin compromiso.',
  },
  presencia_local: {
    tipo: 'estudio',
    mostrar: false,
  },
  fuentes_locales: [],
  verified_at: '2026-09-22',
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
  comunidad: 'Comunidad de Madrid',
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
  contexto_local: {
    area: 'Corredor del Henares',
    zonas: ['polígono', 'comercio local'],
    municipios_cercanos: [
      'Alcalá de Henares',
      'San Fernando de Henares',
      'Coslada',
      'Madrid',
    ],
    tejido_empresarial:
      'Oficios y reformas, comercio y hostelería local, empresas de polígono y clínicas de barrio.',
    rasgos_locales: [
      'Corredor del Henares',
      'oficios, comercios y empresas de polígono',
    ],
  },
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
  necesidades_locales: [
    {
      title: 'Verse profesionales',
      description: 'Sin montar un proyecto inflado.',
    },
    {
      title: 'Que te encuentre quien ya te busca',
      description: 'Por oficio o por zona del Corredor.',
    },
    {
      title: 'Pocas secciones, bien hechas',
      description: 'Y un WhatsApp o formulario a la vista.',
    },
  ],
  casos_relevantes: ['carper', 'hatena', 'camisetas', 'resilience'],
  casos_note:
    'Proyectos de oficios, producto y clínicas. Los enseñamos porque se parecen a lo que pide un negocio del Corredor.',
  faq_local: [
    {
      question: '¿Hacéis webs en Torrejón de Ardoz para empresas del Corredor del Henares?',
      answer:
        'Sí. Si tus clientes están en Torrejón, Alcalá, Coslada o San Fernando, la web lo deja escrito: zona, servicio y cómo encargarte el trabajo.',
    },
    {
      question: '¿La web sirve si también trabajo en Madrid capital?',
      answer:
        'Sí. La página dice dónde operas. No hace falta una web distinta por cada municipio; el alcance lo vemos contigo.',
    },
  ],
  cta_local: {
    title: 'Cuéntanos tu negocio en Torrejón. Te llamamos.',
    description:
      'Qué haces en Torrejón de Ardoz y a quién te tiene que encontrar. Precio y plazo por escrito, sin compromiso.',
  },
  presencia_local: {
    tipo: 'atencion_directa',
    mostrar: false,
  },
  fuentes_locales: [],
  verified_at: '2026-09-22',
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
  comunidad: 'Comunidad de Madrid',
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
  contexto_local: {
    area: 'Corredor del Henares',
    zonas: ['casco histórico', 'universidad', 'polígono'],
    municipios_cercanos: ['Torrejón de Ardoz', 'San Fernando de Henares'],
    tejido_empresarial:
      'Comercio y hostelería del casco, profesionales y formación, clínicas y servicios locales.',
    rasgos_locales: [
      'casco histórico y universidad',
      'comercio de toda la vida y empresas del Corredor',
    ],
  },
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
  necesidades_locales: [
    {
      title: 'Página seria que se entiende en el móvil',
      description: 'Y deja un contacto a un toque.',
    },
    {
      title: 'Que hable del casco, la universidad o el polígono',
      description: 'No de una plantilla de Madrid este.',
    },
    {
      title: 'Fotos reales, horarios y reserva',
      description: 'O formulario para quien pasea el centro o estudia aquí.',
    },
  ],
  casos_relevantes: ['hoyviajamos', 'hatena', 'desmundando', 'chicxs'],
  casos_note:
    'Hay proyectos de turismo, clínicas y marca. Te enseñamos algo parecido a tu negocio de Alcalá antes de empezar.',
  faq_local: [
    {
      question: '¿Sirve para un negocio del casco histórico o cerca de la universidad?',
      answer:
        'Sí. Si te encuentran quienes visitan el centro o estudian aquí, la web enseña ubicación, horarios y un contacto que funciona en el móvil.',
    },
    {
      question: '¿En Alcalá de Henares montáis la misma web que en Madrid este?',
      answer:
        'No. Alcalá no es un barrio más del mapa. Casco histórico, universidad, comercio de toda la vida y empresas del Corredor. La web habla de tu plaza.',
    },
  ],
  cta_local: {
    title: 'Cuéntanos tu negocio en Alcalá. Te llamamos.',
    description:
      'Casco, universidad o polígono: qué haces y cómo te tienen que encontrar. Precio y plazo por escrito.',
  },
  presencia_local: {
    tipo: 'atencion_directa',
    mostrar: false,
  },
  fuentes_locales: [],
  verified_at: '2026-09-22',
  relatedCitySlugs: ['torrejon-de-ardoz', 'san-fernando-de-henares'],
};

/**
 * San Fernando de Henares: municipio pequeño del Corredor, polígono, autónomos.
 */
const sanFernando: LocalWebCity = {
  slug: 'san-fernando-de-henares',
  ciudad: 'San Fernando de Henares',
  provincia: 'Madrid',
  comunidad: 'Comunidad de Madrid',
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
  contexto_local: {
    area: 'Corredor del Henares',
    zonas: ['polígono', 'comercio local'],
    municipios_cercanos: ['Coslada', 'Torrejón de Ardoz', 'Alcalá de Henares'],
    tejido_empresarial:
      'Autónomos y comercio local, polígono e industria ligera, oficios del Corredor y consultas pequeñas.',
    rasgos_locales: [
      'municipio pequeño del Corredor',
      'naves de polígono y oficios de zona',
    ],
  },
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
  necesidades_locales: [
    {
      title: 'Verse claros online y que les escriban',
      description: 'Sin inflar el proyecto.',
    },
    {
      title: 'Una web de negocio aunque el municipio sea pequeño',
      description: 'Aunque no esté en Madrid capital.',
    },
    {
      title: 'Móvil y un WhatsApp a la vista',
      description: 'Si es polígono, actividad, zona y presupuesto.',
    },
  ],
  casos_relevantes: ['carper', 'resilience', 'camisetas', 'hatena'],
  casos_note:
    'Proyectos de oficios, producto y consultas. Encajan con lo que suele pedir un negocio de San Fernando.',
  faq_local: [
    {
      question: '¿Hacéis webs si el negocio es pequeño y no está en Madrid capital?',
      answer:
        'Sí. El tamaño del municipio no cambia el trabajo: una página clara, móvil y un contacto que funcione. El precio va por el alcance.',
    },
    {
      question: '¿Sirve para una empresa de polígono en San Fernando de Henares?',
      answer:
        'Sí. Actividad, zona, fotos de verdad y un formulario o teléfono a la vista. Si hace falta catálogo o área privada, te lo decimos en la propuesta.',
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
  presencia_local: {
    tipo: 'atencion_directa',
    mostrar: false,
  },
  fuentes_locales: [],
  verified_at: '2026-09-22',
  relatedCitySlugs: ['coslada', 'torrejon-de-ardoz', 'alcala-de-henares'],
};

/**
 * Coslada: logística, aeropuerto, comercio de barrio.
 */
const coslada: LocalWebCity = {
  slug: 'coslada',
  ciudad: 'Coslada',
  provincia: 'Madrid',
  comunidad: 'Comunidad de Madrid',
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
  contexto_local: {
    area: 'Corredor del Henares',
    zonas: ['aeropuerto', 'polígonos', 'comercio de barrio'],
    municipios_cercanos: ['San Fernando de Henares', 'Madrid', 'Torrejón de Ardoz'],
    tejido_empresarial:
      'Logística y transporte, comercio de barrio, oficios y clínicas locales.',
    rasgos_locales: [
      'logística cerca del aeropuerto',
      'polígonos y tiendas de toda la vida',
    ],
  },
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
  necesidades_locales: [
    {
      title: 'Explicar qué hacen',
      description:
        'Logística, comercio, oficio o consulta, y un camino para escribirles.',
    },
    {
      title: 'Una web al grano',
      description:
        'Polígonos y operadores, no un microsite de aeropuerto si no hace falta.',
    },
    {
      title: 'Horarios, cómo llegar y WhatsApp',
      description: 'Para quien te busca en el barrio.',
    },
  ],
  casos_relevantes: ['camisetas', 'carper', 'hatena', 'delish'],
  casos_note:
    'Hay proyectos de producto, oficios y clínicas. Te enseñamos algo parecido a un negocio de Coslada antes de empezar.',
  faq_local: [
    {
      question: '¿Montáis webs para empresas de logística cerca del aeropuerto?',
      answer:
        'Sí. Una página que explique el servicio, la zona y cómo contactaros. Si el proyecto es un portal con tracking o área de clientes, te lo decimos en la propuesta: no es la misma web.',
    },
    {
      question: '¿Y si vendo también a empresas de Madrid desde Coslada?',
      answer:
        'La web puede hablar de Coslada y de la zona que cubres. No hace falta inflarla con “toda España” si no es verdad.',
    },
  ],
  cta_local: {
    title: 'Cuéntanos tu negocio en Coslada. Te llamamos.',
    description:
      'Logística, barrio u oficio. Atención directa. Precio y plazo por escrito, sin compromiso.',
  },
  presencia_local: {
    tipo: 'atencion_directa',
    mostrar: false,
  },
  fuentes_locales: [],
  verified_at: '2026-09-22',
  relatedCitySlugs: ['san-fernando-de-henares', 'madrid', 'torrejon-de-ardoz'],
};

/**
 * Vigo: área metropolitana, industria, puerto y automoción.
 * Sin oficina inventada ni LocalBusiness en schema.
 */
const vigo: LocalWebCity = {
  slug: 'vigo',
  ciudad: 'Vigo',
  provincia: 'Pontevedra',
  comunidad: 'Galicia',
  title: 'Diseño web en Vigo para empresas y autónomos | 36web',
  description:
    'Diseño web en Vigo para empresas, profesionales, comercios e industria. Webs claras, rápidas y pensadas para captar contactos.',
  hero_lead:
    'Diseño web en Vigo para negocios que necesitan explicar bien lo que hacen y convertir visitas en contactos.',
  intro_local: [
    'Diseñamos páginas web para empresas y profesionales de Vigo que necesitan presentar bien sus servicios, generar contactos y tener una presencia online a la altura de su negocio.',
    'Vigo tiene un tejido empresarial muy distinto al de una ciudad puramente comercial: industria, automoción, logística, actividad portuaria, comercio y servicios conviven en una misma plaza. La web tiene que adaptarse al tipo de cliente que buscas, no seguir una plantilla genérica.',
    'Trabajamos tanto con negocios que venden directamente al público como con empresas B2B que necesitan explicar servicios técnicos, proyectos, zonas de trabajo o formas de solicitar presupuesto.',
  ],
  contexto_local: {
    area: 'Área de Vigo',
    zonas: ['Balaídos', 'Bouzas', 'Parque Tecnológico y Logístico de Vigo'],
    municipios_cercanos: ['Redondela', 'Mos', 'O Porriño', 'Nigrán'],
    tejido_empresarial:
      'Automoción, industria, logística, sector marítimo, comercio y servicios profesionales.',
    rasgos_locales: [
      'fuerte peso industrial y empresarial',
      'actividad vinculada al puerto y la logística',
      'presencia destacada del sector de automoción',
      'actividad económica que se extiende por el área metropolitana',
    ],
  },
  sectores_locales: [
    {
      title: 'Industria y automoción',
      description:
        'Empresas auxiliares, fabricación, ingeniería y servicios vinculados al entorno industrial de Vigo. Webs pensadas para explicar capacidad, especialización y facilitar contactos comerciales.',
    },
    {
      title: 'Logística y empresas B2B',
      description:
        'Operadores, transporte, distribución y servicios a empresas. Una web clara para explicar qué haces, dónde operas y cómo solicitar información o presupuesto.',
    },
    {
      title: 'Comercio y hostelería',
      description:
        'Tiendas, restauración y negocios locales que necesitan horarios, ubicación, servicios y un contacto cómodo desde el móvil.',
    },
    {
      title: 'Profesionales y clínicas',
      description:
        'Despachos, consultas y servicios profesionales que necesitan transmitir confianza, explicar su especialidad y facilitar la cita o el contacto.',
    },
  ],
  necesidades_locales: [
    {
      title: 'Explicar servicios técnicos sin complicar la web',
      description:
        'Muchas empresas de Vigo trabajan en industria, logística o servicios B2B. Organizamos la información para que un cliente entienda rápidamente qué hacéis y cómo pediros presupuesto.',
    },
    {
      title: 'Captar clientes en Vigo y su entorno',
      description:
        'Si trabajas también en Redondela, Mos, O Porriño o Nigrán, la web puede explicar de forma natural el ámbito geográfico del servicio.',
    },
    {
      title: 'Convertir visitas en contactos comerciales',
      description:
        'Formularios, teléfono y WhatsApp visibles. La web debe facilitar que quien ya está interesado pueda hablar contigo sin buscar el contacto.',
    },
    {
      title: 'Presentar una empresa B2B con credibilidad',
      description:
        'Servicios, instalaciones, sectores, proyectos y capacidades bien ordenados para que un posible cliente pueda valorar rápidamente si encajáis.',
    },
  ],
  casos_relevantes: ['carper', 'camisetas', 'hatena', 'delish'],
  casos_note:
    'Proyectos de producto, servicios y negocios con necesidades similares. Te enseñamos ejemplos que encajen con tu sector antes de empezar.',
  faq_local: [
    {
      question: '¿Hacéis diseño web para empresas de Vigo?',
      answer:
        'Sí. Trabajamos con autónomos, profesionales y empresas de Vigo en proyectos de diseño web, ecommerce y mantenimiento.',
    },
    {
      question: '¿Trabajáis con empresas industriales o de automoción de Vigo?',
      answer:
        'Sí. Podemos plantear webs B2B para empresas industriales, auxiliares, ingeniería o servicios técnicos que necesiten explicar capacidades, sectores y proyectos de forma clara.',
    },
    {
      question: '¿Puede la web dirigirse también a clientes del área de Vigo?',
      answer:
        'Sí. Si trabajas en Vigo y también en municipios como Redondela, Mos, O Porriño o Nigrán, la web puede reflejar esas zonas de servicio sin convertir cada municipio en una página innecesaria.',
    },
    {
      question: '¿Hacéis webs para empresas de logística o servicios portuarios de Vigo?',
      answer:
        'Sí. Para este tipo de negocio priorizamos servicios, ámbito de trabajo, capacidades y una vía directa para solicitar información o presupuesto.',
    },
    {
      question: '¿La web puede estar en castellano y gallego?',
      answer:
        'Sí. En Vigo, si tu negocio necesita trabajar ambos idiomas, se puede plantear una versión multilingüe dentro del alcance del proyecto.',
    },
  ],
  cta_local: {
    title: 'Cuéntanos tu negocio en Vigo. Te llamamos.',
    description:
      'Industria, comercio, servicios o actividad B2B. Cuéntanos qué haces y qué necesitas conseguir con la web.',
  },
  presencia_local: {
    tipo: 'atencion_directa',
    mostrar: false,
  },
  fuentes_locales: [
    'Consorcio Zona Franca de Vigo - contexto económico e industrial',
    'Consorcio Zona Franca de Vigo - Parque de Balaídos',
    'Consorcio Zona Franca de Vigo - Parque Tecnológico y Logístico',
    'Turismo de Vigo - Puerto de Vigo',
  ],
  verified_at: '2026-09-22',
  relatedCitySlugs: [],
};

/**
 * Logroño: comercio, vino, gastronomía e industria en La Portalada.
 * Sin oficina inventada ni LocalBusiness en schema.
 */
const logrono: LocalWebCity = {
  slug: 'logrono',
  ciudad: 'Logroño',
  provincia: 'La Rioja',
  comunidad: 'La Rioja',
  title: 'Diseño web en Logroño para empresas y autónomos | 36web',
  description:
    'Diseño web en Logroño para empresas, comercios, bodegas y profesionales. Webs claras, rápidas y pensadas para captar contactos.',
  hero_lead:
    'Diseño web en Logroño para negocios que quieren explicar bien lo que hacen y convertir visitas en clientes.',
  intro_local: [
    'Diseñamos páginas web para empresas, autónomos y negocios de Logroño que necesitan presentar bien sus servicios, generar contactos y tener una web que funcione de verdad en móvil.',
    'Logroño combina comercio local, servicios profesionales, industria y una actividad muy vinculada al vino, la gastronomía y el turismo. Por eso no planteamos igual la web de una bodega, un despacho, un comercio del centro o una empresa de La Portalada.',
    'La estructura se adapta a cómo compra tu cliente: reservar, pedir presupuesto, conocer tus servicios, localizar el negocio o contactar directamente contigo.',
  ],
  contexto_local: {
    area: 'Logroño y su entorno',
    zonas: ['Centro de Logroño', 'Casco Antiguo', 'La Portalada'],
    municipios_cercanos: [
      'Lardero',
      'Villamediana de Iregua',
      'Fuenmayor',
      'Navarrete',
    ],
    tejido_empresarial:
      'Comercio, vino y enoturismo, agroalimentación, industria, hostelería y servicios profesionales.',
    rasgos_locales: [
      'fuerte relación entre actividad empresarial, vino y gastronomía',
      'peso relevante del comercio local',
      'presencia de actividad industrial y empresarial en La Portalada',
      'negocios que prestan servicio tanto en Logroño como en municipios próximos',
    ],
  },
  sectores_locales: [
    {
      title: 'Bodegas, vino y enoturismo',
      description:
        'Bodegas, experiencias, tiendas especializadas y negocios relacionados con el vino. Una web que enseñe bien la propuesta, facilite reservas o contactos y funcione para público local y visitante.',
    },
    {
      title: 'Comercio y hostelería',
      description:
        'Tiendas, restaurantes, bares y negocios de calle. Horarios, ubicación, servicios y una forma rápida de reservar o escribir desde el móvil.',
    },
    {
      title: 'Industria y empresas de servicios',
      description:
        'Empresas de La Portalada y del entorno de Logroño que necesitan explicar actividad, capacidades y servicios sin llenar la web de lenguaje corporativo.',
    },
    {
      title: 'Profesionales y clínicas',
      description:
        'Despachos, consultas, asesorías y servicios profesionales que necesitan transmitir confianza y facilitar una llamada, cita o solicitud de información.',
    },
  ],
  necesidades_locales: [
    {
      title: 'Convertir visitas en reservas o contactos',
      description:
        'Para hostelería, vino, turismo y comercio, la web debe facilitar que quien ya está interesado pueda reservar, llamar, escribir o llegar al negocio sin fricción.',
    },
    {
      title: 'Explicar bien una empresa industrial o B2B',
      description:
        'Si tu negocio trabaja con otras empresas, organizamos servicios, capacidades, sectores y proyectos para que un posible cliente entienda rápidamente qué podéis hacer.',
    },
    {
      title: 'Captar clientes en Logroño y municipios cercanos',
      description:
        'Si trabajas también en Lardero, Villamediana de Iregua, Fuenmayor o Navarrete, la web puede reflejar esas zonas de servicio de forma natural.',
    },
    {
      title: 'Transmitir producto y marca sin perder claridad',
      description:
        'En vino, gastronomía o comercio la imagen importa, pero también que el usuario encuentre rápido producto, experiencia, horario, reserva o contacto.',
    },
  ],
  casos_relevantes: ['delish', 'camisetas', 'hatena', 'chicxs'],
  casos_note:
    'Proyectos de producto, hostelería y servicios. Te enseñamos ejemplos que encajen con tu sector antes de empezar.',
  faq_local: [
    {
      question: '¿Hacéis diseño web para negocios de Logroño?',
      answer:
        'Sí. Trabajamos con autónomos, comercios, profesionales y empresas de Logroño y su entorno en proyectos de diseño web, ecommerce y mantenimiento.',
    },
    {
      question:
        '¿Hacéis páginas web para bodegas o negocios relacionados con el vino en Logroño?',
      answer:
        'Sí. Podemos plantear webs para bodegas, enoturismo, tiendas especializadas o marcas vinculadas al vino, adaptando el proyecto a si necesitas presentación, reservas, catálogo o venta online.',
    },
    {
      question: '¿Trabajáis con empresas de La Portalada?',
      answer:
        'Sí. Para empresas industriales o B2B priorizamos explicar actividad, servicios, capacidades y una vía clara para solicitar información o presupuesto.',
    },
    {
      question:
        '¿Puede mi web dirigirse también a clientes de municipios cercanos a Logroño?',
      answer:
        'Sí. Si prestas servicio en Logroño y también en municipios como Lardero, Villamediana, Navarrete o Fuenmayor, la web puede reflejar ese ámbito de trabajo.',
    },
    {
      question: '¿Una web para hostelería en Logroño puede incluir reservas o carta?',
      answer:
        'Sí. Dependiendo del proyecto podemos integrar carta, reservas, horarios, ubicación y sistemas de contacto. El alcance se define antes de empezar.',
    },
  ],
  cta_local: {
    title: 'Cuéntanos tu negocio en Logroño. Te llamamos.',
    description:
      'Comercio, vino, industria o servicios. Cuéntanos qué haces y qué necesitas conseguir con la web.',
  },
  presencia_local: {
    tipo: 'atencion_directa',
    mostrar: false,
  },
  fuentes_locales: [
    'Ayuntamiento de Logroño - Comercio y Turismo',
    'Ayuntamiento de Logroño - Logroño Ciudad Comercial',
    'Gobierno de La Rioja / ADER - sector agroalimentario',
    'Gobierno de La Rioja - actividad empresarial en La Portalada',
  ],
  verified_at: '2026-09-22',
  relatedCitySlugs: [],
};

export const LOCAL_WEB_CITIES: Record<string, LocalWebCity> = {
  madrid,
  'torrejon-de-ardoz': torrejon,
  'alcala-de-henares': alcala,
  'san-fernando-de-henares': sanFernando,
  coslada,
  vigo,
  logrono,
};

const allSlugs = new Set(Object.keys(LOCAL_WEB_CITIES));

for (const city of Object.values(LOCAL_WEB_CITIES)) {
  assertCity(city, allSlugs);
}

warnSimilarLocalWebCities(Object.values(LOCAL_WEB_CITIES));

export const LOCAL_WEB_CITY_LIST = Object.values(LOCAL_WEB_CITIES);

export const getLocalWebCity = (slug: string | undefined) =>
  slug ? LOCAL_WEB_CITIES[slug] : undefined;

export const getRelatedCities = (city: LocalWebCity) =>
  city.relatedCitySlugs
    .map((slug) => LOCAL_WEB_CITIES[slug])
    .filter((item): item is LocalWebCity => Boolean(item));
