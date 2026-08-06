export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  faqs: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    id: 'general',
    title: 'General',
    faqs: [
      {
        question: '¿Qué es PereiraWeb?',
        answer:
          'PereiraWeb es un estudio de diseño y desarrollo web con sede en Galicia/Madrid. Trabajamos con empresas y autónomos de toda España para crear webs profesionales, tiendas online, proyectos a medida y mantenimiento web, con trato directo y propuestas claras antes de empezar.',
      },
      {
        question: '¿Trabajáis solo con empresas de Madrid?',
        answer:
          'No. Tenemos sede en Galicia/Madrid, pero trabajamos con clientes de toda España. El proceso se gestiona online (llamadas, email y WhatsApp) y también podemos hacer reuniones presenciales con cita previa cuando haga falta.',
      },
      {
        question: '¿Con qué tipo de negocios trabajáis?',
        answer:
          'Trabajamos con autónomos, pymes y empresas de distintos sectores: servicios profesionales, restauración, salud, comercio, turismo, industria creativa y más. Lo importante es que necesiten una web clara, profesional y orientada a conseguir contactos o ventas.',
      },
      {
        question: '¿Podemos pedir una propuesta sin compromiso?',
        answer:
          'Sí. Puedes contarnos qué necesitas y te damos una primera orientación. Si el proyecto encaja, enviamos una propuesta con alcance, plazos, forma de trabajo y precio cerrado antes de empezar.',
      },
      {
        question: '¿Cómo os contacto?',
        answer:
          'Puedes escribirnos por el formulario de contacto, por email a hola@pereiraweb.es, por teléfono o por WhatsApp. Respondemos con la mayor rapidez posible para orientarte y, si encaja, preparar la propuesta.',
      },
      {
        question: '¿Habláis en nombre de una agencia grande o sois un estudio?',
        answer:
          'Somos un estudio con trato directo. No hay capas comerciales intermedias: hablas con quien entiende el proyecto y puede definir alcance, diseño y desarrollo con claridad.',
      },
    ],
  },
  {
    id: 'servicios',
    title: 'Servicios y planes',
    faqs: [
      {
        question: '¿Qué tipo de webs desarrolláis?',
        answer:
          'Páginas web profesionales, webs corporativas, páginas de servicios, landings, tiendas online, catálogos, rediseños, mantenimiento y herramientas o paneles web a medida. Cada proyecto se adapta a lo que necesita el negocio.',
      },
      {
        question: '¿Cómo sé qué servicio necesito?',
        answer:
          'Si necesitas presentar tu negocio y captar contactos, normalmente encaja una web profesional (Web Profesional 360 o Web a Medida). Si quieres vender online, una tienda online. Si ya tienes web y quieres cuidarla, mantenimiento. Si tienes dudas, cuéntanos tu caso y te orientamos.',
      },
      {
        question: '¿Qué diferencia hay entre Web Profesional 360 y Web a Medida?',
        answer:
          'Web Profesional 360 es un plan con precio y proceso claros. Web a Medida es para negocios que necesitan funciones especiales, conexión con otras herramientas o zonas privadas, con presupuesto según el proyecto.',
      },
      {
        question: '¿Qué diferencia hay entre una web profesional y una tienda online?',
        answer:
          'Una web profesional presenta servicios, transmite confianza y genera contactos. Una tienda online añade catálogo, carrito, pagos, pedidos y configuración comercial para vender por internet.',
      },
      {
        question: '¿Es Web Profesional 360 una plantilla igual para todos?',
        answer:
          'No. Partimos de una base técnica optimizada, pero cada proyecto adapta marca, contenidos, fotografías, composición y llamadas a la acción a tu negocio.',
      },
      {
        question: '¿Qué diferencia hay entre 360 Presencia y 360 Gestión?',
        answer:
          '360 Presencia incluye una web completa que mantenemos nosotros. 360 Gestión añade un panel sencillo para que puedas actualizar ciertos contenidos (servicios, equipo, testimonios o artículos) sin depender de nosotros para esos cambios.',
      },
      {
        question: '¿Podéis mejorar o rediseñar una web que ya existe?',
        answer:
          'Sí. Revisamos la web actual y planteamos mejoras de diseño, estructura, velocidad, contenido, contacto o conversión. En unos casos conviene un rediseño completo; en otros, mejoras concretas.',
      },
      {
        question: '¿Desarrolláis aplicaciones o paneles internos?',
        answer:
          'Sí, cuando el proyecto lo requiere: paneles, herramientas internas, dashboards o desarrollos a medida con alcance y presupuesto definidos en la propuesta.',
      },
    ],
  },
  {
    id: 'precios',
    title: 'Precios y pagos',
    faqs: [
      {
        question: '¿Cuánto cuesta una página web profesional?',
        answer:
          'Depende del alcance, secciones, contenidos, funcionalidades y objetivos. No usamos una tarifa única para todos. Primero analizamos qué necesitas y después enviamos una propuesta con precio cerrado.',
      },
      {
        question: '¿El presupuesto incluye IVA?',
        answer:
          'Los precios se indican según lo acordado en cada propuesta. El IVA se aplica cuando corresponda y queda reflejado de forma clara en la propuesta y en la facturación.',
      },
      {
        question: '¿Ofrecéis pago fraccionado?',
        answer:
          'Sí. En la mayoría de proyectos web se trabaja con un 50% al inicio y el 50% restante antes de la publicación definitiva. En proyectos a medida el fraccionamiento puede adaptarse a hitos si así se acuerda.',
      },
      {
        question: '¿Hay que pagar todo antes de empezar?',
        answer:
          'No. Habitualmente se inicia con el pago inicial (normalmente el 50%) y el resto se abona antes de publicar la versión definitiva.',
      },
      {
        question: '¿Qué formas de pago aceptáis?',
        answer:
          'Principalmente transferencia bancaria y, cuando se acuerda, PayPal u otras opciones indicadas en la propuesta.',
      },
      {
        question: '¿Hay costes ocultos?',
        answer:
          'No. Lo incluido y lo excluido queda definido en la propuesta. Si surge un cambio de alcance (nuevas páginas, funcionalidades o rediseños fuera de lo acordado), se presupuesta aparte antes de hacerlo.',
      },
      {
        question: '¿Puedo cancelar el proyecto a mitad?',
        answer:
          'Las condiciones de cancelación se recogen en la propuesta y en los términos de contratación. El trabajo ya realizado y el pago inicial se gestionan según lo acordado en esos documentos.',
      },
    ],
  },
  {
    id: 'proceso',
    title: 'Proceso, plazos y revisiones',
    faqs: [
      {
        question: '¿Cómo es el proceso de trabajo?',
        answer:
          'Briefing y propuesta → arranque con pago inicial → diseño y desarrollo → revisiones dentro de las rondas incluidas → pago final y publicación. El detalle está en la página de condiciones del proyecto.',
      },
      {
        question: '¿Cuánto tarda en estar lista una web?',
        answer:
          'Depende del alcance y de cuándo recibamos los contenidos. Una web profesional de alcance cerrado suele estar lista en unas 2-3 semanas con la información completa. Proyectos a medida o tiendas online pueden requerir más tiempo, definido en la propuesta.',
      },
      {
        question: '¿Qué necesito entregar para empezar?',
        answer:
          'Información de tu negocio, textos o ideas de contenido, logo e imágenes si los tienes, y datos de contacto. Si te falta algo, te ayudamos a organizarlo o lo preparamos dentro del alcance acordado.',
      },
      {
        question: '¿Quién escribe los textos de la web?',
        answer:
          'Puedes aportar tú la información y nosotros la organizamos y redactamos con claridad. Si no tienes tiempo o textos, podemos encargarnos de la redacción dentro de lo acordado en la propuesta.',
      },
      {
        question: '¿Cuántas rondas de cambios incluye?',
        answer:
          'En planes de alcance cerrado (como Web Profesional 360) se incluyen dos rondas de cambios sobre el diseño. En proyectos a medida, el número de revisiones se define en la propuesta.',
      },
      {
        question: '¿Qué pasa si pido cambios fuera del alcance?',
        answer:
          'Se valoran y se presupuestan aparte antes de ejecutarlos, para que el precio y el plazo sigan siendo claros.',
      },
      {
        question: '¿Qué ocurre si me retraso al enviar contenidos?',
        answer:
          'El calendario se ajusta. Los retrasos en materiales por parte del cliente pueden desplazar la fecha de publicación prevista.',
      },
    ],
  },
  {
    id: 'tecnico',
    title: 'Diseño, móvil y tecnología',
    faqs: [
      {
        question: '¿La web estará adaptada a móvil?',
        answer:
          'Sí. Todas las webs se desarrollan con diseño responsive para móvil, tablet y ordenador, cuidando claridad, velocidad y facilidad de contacto.',
      },
      {
        question: '¿Os encargáis del diseño y del desarrollo?',
        answer:
          'Sí. Cubrimos diseño, desarrollo, estructura, experiencia de usuario, rendimiento y publicación. El objetivo es una web que se vea bien y funcione de verdad.',
      },
      {
        question: '¿Trabajáis con WordPress o con código a medida?',
        answer:
          'Dependiendo del proyecto. Elegimos la solución más adecuada según necesidades, presupuesto, escalabilidad y facilidad de mantenimiento: webs a medida, WordPress, tiendas online u otras tecnologías si hace falta.',
      },
      {
        question: '¿La web será rápida?',
        answer:
          'Sí. Optimizamos rendimiento, peso de imágenes, estructura y buenas prácticas técnicas para que la web cargue bien y ofrezca una buena experiencia.',
      },
      {
        question: '¿Puedo editar yo mismo la web?',
        answer:
          'Depende del plan o del proyecto. En algunas soluciones hay panel de edición para ciertos contenidos; en otras, los cambios se hacen mediante mantenimiento. Lo dejamos claro en la propuesta.',
      },
      {
        question: '¿Puedo ampliar la web más adelante?',
        answer:
          'Sí. Se pueden añadir páginas, funcionalidades, reservas, tienda u otras mejoras con un presupuesto adicional según el alcance.',
      },
    ],
  },
  {
    id: 'dominio-hosting',
    title: 'Dominio, hosting y mantenimiento',
    faqs: [
      {
        question: '¿Puedo usar mi propio dominio?',
        answer:
          'Sí. El dominio es tuyo. Podemos ayudarte a configurarlo y, si lo deseas, a gestionar renovaciones, pero la titularidad sigue siendo tuya.',
      },
      {
        question: '¿El hosting está incluido?',
        answer:
          'En muchos planes el alojamiento está incluido en la publicación y, si contratas mantenimiento, en su gestión continua. En proyectos a medida se indica expresamente en la propuesta.',
      },
      {
        question: '¿Incluye el dominio el precio de la web?',
        answer:
          'Depende del plan y de si ya tienes dominio. Si hay que registrar uno nuevo o transferirlo, se indica en la propuesta para que no haya sorpresas.',
      },
      {
        question: '¿El mantenimiento es obligatorio?',
        answer:
          'No es obligatorio, pero sí recomendable para seguridad, actualizaciones, copias de seguridad, soporte y pequeños cambios. Sin mantenimiento, la web sigue siendo tuya y puede seguir online.',
      },
      {
        question: '¿Qué incluye el mantenimiento web?',
        answer:
          'Suele incluir soporte, actualizaciones, revisión técnica, copias de seguridad y un cupo de cambios o mejoras según el plan. El detalle concreto se define en cada plan o propuesta.',
      },
      {
        question: '¿Podéis mantener una web que no habéis creado vosotros?',
        answer:
          'Sí, en muchos casos. Primero revisamos el estado técnico y el alcance del soporte posible, y después te proponemos un plan de mantenimiento adecuado.',
      },
      {
        question: '¿Qué pasa si cancelo el mantenimiento?',
        answer:
          'Tu web sigue siendo tuya. Dejas de recibir actualizaciones, backups y minutos de cambios del plan, pero la web no se retira por cancelar el mantenimiento.',
      },
      {
        question: '¿Qué ocurre si necesito un cambio urgente?',
        answer:
          'Con mantenimiento priorizamos las incidencias según el plan. Sin mantenimiento, podemos valorar cambios puntuales con presupuesto aparte.',
      },
    ],
  },
  {
    id: 'seo',
    title: 'SEO y captación',
    faqs: [
      {
        question: '¿Incluís SEO en la web?',
        answer:
          'Incluimos una base SEO inicial: títulos, metadescripciones, jerarquía de contenidos, URLs limpias cuando aplica y una base técnica correcta. El SEO mensual de contenidos o estrategias avanzadas se presupuestan aparte.',
      },
      {
        question: '¿La web saldrá en la primera posición de Google?',
        answer:
          'Ningún proveedor serio puede garantizar la primera posición. Lo que sí hacemos es dejar la web bien preparada técnicamente y, si contratas SEO continuo, trabajar de forma sostenida para mejorar visibilidad y tráfico cualificado.',
      },
      {
        question: '¿Cuánto tarda en verse el SEO?',
        answer:
          'El SEO orgánico suele necesitar semanas o meses según competencia, sector y punto de partida. No es publicidad de resultados inmediatos; es una inversión a medio plazo.',
      },
      {
        question: '¿Hacéis Google Ads o solo SEO?',
        answer:
          'El foco principal del estudio es diseño, desarrollo y base SEO. Si necesitas publicidad de pago u otras acciones de captación, lo valoramos según el caso o te orientamos sobre la mejor vía.',
      },
      {
        question: '¿La web incluye formularios y WhatsApp?',
        answer:
          'Sí, cuando encaja con el proyecto. Dejamos vías claras de contacto (formulario, teléfono, WhatsApp u otras) para que la web ayude a generar consultas reales.',
      },
    ],
  },
  {
    id: 'tiendas',
    title: 'Tiendas online',
    faqs: [
      {
        question: '¿Cuánto tarda una tienda online?',
        answer:
          'Depende del catálogo, funcionalidades e integraciones. El plazo se define en la propuesta cuando tenemos claro el alcance y los contenidos de producto.',
      },
      {
        question: '¿Cuántos productos puedo cargar?',
        answer:
          'Depende de la plataforma y del alcance contratado. Lo importante es definir bien la estructura del catálogo; el volumen concreto se acuerda en la propuesta.',
      },
      {
        question: '¿Qué pasarela de pago usáis?',
        answer:
          'Integramos las pasarelas adecuadas al proyecto (por ejemplo Stripe, PayPal u otras según mercado y plataforma). La elección se define en la propuesta.',
      },
      {
        question: '¿Me enseñáis a gestionar la tienda?',
        answer:
          'Sí. Incluimos acompañamiento para que puedas gestionar productos, pedidos y contenidos básicos sin depender de nosotros para el día a día.',
      },
      {
        question: '¿Sirve para WooCommerce, Shopify u otras plataformas?',
        answer:
          'Podemos trabajar con distintas soluciones según el caso. Elegimos la plataforma en función de catálogo, operativa, presupuesto y mantenimiento.',
      },
    ],
  },
  {
    id: 'legal-propiedad',
    title: 'Propiedad y publicación',
    faqs: [
      {
        question: '¿La web es mía cuando termine el proyecto?',
        answer:
          'Sí. Una vez abonado el proyecto íntegramente, adquieres los derechos de uso de la web entregada según lo indicado en la propuesta y en los términos de contratación.',
      },
      {
        question: '¿Podéis mostrar mi proyecto en el portfolio?',
        answer:
          'Salvo acuerdo en contrario, PereiraWeb puede mostrar el proyecto en su portfolio como muestra de trabajo. Si necesitas confidencialidad, indícalo antes de empezar.',
      },
      {
        question: '¿Cuándo se publica la web?',
        answer:
          'Tras la validación de la última revisión incluida y el pago final. Entonces conectamos el dominio (si aplica) y dejamos la web online.',
      },
      {
        question: '¿Hay garantía después de la entrega?',
        answer:
          'Sí. Se contempla un periodo de garantía para corrección de errores de programación según los términos de contratación. No incluye cambios de diseño o nuevas funcionalidades fuera de lo acordado.',
      },
      {
        question: '¿Dónde puedo ver las condiciones del proyecto?',
        answer:
          'En la página Condiciones del proyecto encontrarás pagos, revisiones, plazos y publicación explicados con claridad. El marco legal está en Términos y condiciones.',
      },
    ],
  },
];

export const allFaqItems: FaqItem[] = faqCategories.flatMap(
  (category) => category.faqs
);
