export type LocalWebSector = {
  title: string;
  description: string;
};

export type LocalWebNeed = {
  title: string;
  description: string;
};

export type LocalWebFaq = {
  question: string;
  answer: string;
};

/** Cómo está 36web en esa plaza. Sin dirección: no hay campo de calle a propósito. */
export type LocalWebPresenciaTipo = 'estudio' | 'atencion_directa' | 'cobertura';

export type LocalWebPresencia = {
  tipo: LocalWebPresenciaTipo;
  /** Si es true, hace falta `nombre`. No mostrar ficha con dirección inventada. */
  mostrar: boolean;
  nombre?: string;
  especialidad?: string;
};

export type LocalWebContexto = {
  /** Plaza o comarca (p. ej. Corredor del Henares, Madrid capital). */
  area: string;
  zonas: string[];
  municipios_cercanos: string[];
  tejido_empresarial: string;
  rasgos_locales: string[];
};

export type LocalWebCity = {
  slug: string;
  ciudad: string;
  provincia: string;
  comunidad: string;
  /** <title> único. Debe coincidir con pagesMeta.json. */
  title: string;
  /** meta description única. Debe coincidir con pagesMeta.json. */
  description: string;
  /** Frase del hero. Distinta por ciudad. */
  hero_lead: string;
  /** Intro local. Obligatoria y única. */
  intro_local: string[];
  contexto_local: LocalWebContexto;
  /** Sectores reales de esa plaza. Obligatorios y únicos. */
  sectores_locales: LocalWebSector[];
  /** Qué pide un negocio de ESA plaza a una web. Mín. 3. */
  necesidades_locales: LocalWebNeed[];
  /** Solo preguntas ligadas a la ciudad. Las generales van en LOCAL_WEB_COMMON_FAQS. */
  faq_local: LocalWebFaq[];
  cta_local: {
    title: string;
    description: string;
  };
  presencia_local: LocalWebPresencia;
  /** Citas o notas de apoyo. Vacío si no hay fuente; no inventar URLs. */
  fuentes_locales: string[];
  /** Fecha ISO `YYYY-MM-DD` de la última revisión del contenido local. */
  verified_at: string;
  relatedCitySlugs: string[];
};

export const LOCAL_WEB_PRESENCIA_TIPOS: readonly LocalWebPresenciaTipo[] = [
  'estudio',
  'atencion_directa',
  'cobertura',
] as const;

/**
 * Preguntas de proyecto que no dependen de la plaza.
 * La landing publica `faq_local` + estas, en ese orden.
 */
export const LOCAL_WEB_COMMON_FAQS: LocalWebFaq[] = [
  {
    question: '¿Cuánto cuesta una web?',
    answer:
      'Opciones desde 349 € + IVA. Si el proyecto pide más, presupuesto cerrado antes de empezar. Precio y plazo por escrito.',
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
  {
    question: '¿La web es mía?',
    answer:
      'Tuya. Dominio, accesos y archivos a tu nombre. No te atamos a una plataforma para no poder irte.',
  },
];

export const getPublishedLocalWebFaqs = (city: LocalWebCity): LocalWebFaq[] => [
  ...city.faq_local,
  ...LOCAL_WEB_COMMON_FAQS,
];
