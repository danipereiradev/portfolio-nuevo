// FAQ global de PereiraWeb: preguntas frecuentes válidas para toda la web,
// en tono plural y sin precios concretos (el usuario debe contactar primero
// para recibir una propuesta).
export interface GlobalFaqItem {
  question: string;
  answer: string;
}

export const globalFaqs: GlobalFaqItem[] = [
  {
    question: '¿Trabajáis solo con empresas de Madrid?',
    answer:
      'No. PereiraWeb tiene base en Torrejón de Ardoz, Madrid, pero trabajamos con empresas, autónomos y negocios de toda España. Podemos llevar todo el proceso online mediante llamadas, email y WhatsApp, y también realizar reuniones presenciales con cita previa cuando sea necesario.',
  },
  {
    question: '¿Qué tipo de webs desarrolláis?',
    answer:
      'Diseñamos y desarrollamos páginas web profesionales, webs corporativas, páginas de servicios, tiendas online, catálogos digitales, rediseños web, mantenimiento y herramientas web a medida. Cada proyecto se adapta a lo que necesita el negocio en concreto.',
  },
  {
    question: '¿Cuánto cuesta una página web profesional?',
    answer:
      'El precio depende del alcance, número de secciones, contenidos, funcionalidades y objetivos del proyecto. Por eso no trabajamos con una tarifa única para todos los casos. Primero analizamos qué necesitas y después preparamos una propuesta clara con alcance, plazos, forma de trabajo y precio cerrado antes de empezar.',
  },
  {
    question: '¿Ofrecéis opciones de pago flexible?',
    answer:
      'Sí. Según el tipo de proyecto, podemos trabajar con pago único, pago fraccionado o plan mensual. Las condiciones quedan definidas en la propuesta antes de empezar, para que no haya sorpresas durante el proceso.',
  },
  {
    question: '¿Cuánto tarda en estar lista una web?',
    answer:
      'Depende del alcance y de si los contenidos están preparados. Una web profesional estándar puede estar lista en pocas semanas desde que tenemos definidos los materiales, estructura y objetivos. En proyectos más amplios, tiendas online o desarrollos a medida, los plazos se ajustan en la propuesta.',
  },
  {
    question: '¿Podéis encargaros del diseño y del desarrollo?',
    answer:
      'Sí. Nos encargamos tanto del diseño como del desarrollo, cuidando la estructura, la experiencia de usuario, la adaptación móvil, el rendimiento y la publicación final. El objetivo es que la web no solo se vea bien, sino que sea clara, rápida y funcional.',
  },
  {
    question: '¿La web estará adaptada a móvil?',
    answer:
      'Sí. Todas las webs que desarrollamos se trabajan con diseño responsive para que se vean correctamente en móvil, tablet y ordenador. También cuidamos la velocidad, la claridad del contenido y la facilidad de contacto.',
  },
  {
    question: '¿Incluís SEO?',
    answer:
      'Incluimos una base SEO inicial en la estructura de la web: títulos, metadescripciones, jerarquía de contenidos, URLs limpias cuando aplica y una base técnica correcta. Si el proyecto necesita una estrategia SEO avanzada o contenidos recurrentes, podemos valorarlo aparte.',
  },
  {
    question: '¿Podéis mantener la web después de publicarla?',
    answer:
      'Sí. Ofrecemos mantenimiento web mensual para negocios que necesitan soporte, pequeños cambios, revisión técnica, mejoras de contenido, actualizaciones o acompañamiento después de publicar la web.',
  },
  {
    question: '¿Trabajáis con WordPress, código a medida o tiendas online?',
    answer:
      'Depende del proyecto. Elegimos la solución más adecuada según las necesidades, presupuesto, escalabilidad y facilidad de mantenimiento. Podemos trabajar con webs a medida, WordPress, tiendas online o soluciones específicas si el proyecto lo requiere.',
  },
  {
    question: '¿Podemos pedir una propuesta sin compromiso?',
    answer:
      'Sí. Puedes contarnos qué necesitas y prepararemos una primera orientación. Si el proyecto encaja, enviaremos una propuesta clara con alcance, plazos, forma de trabajo y opciones de pago antes de empezar.',
  },
];
