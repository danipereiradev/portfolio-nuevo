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
          'PereiraWeb es un estudio de diseño y desarrollo web que trabaja online con empresas y autónomos de toda España. Creamos webs profesionales, tiendas online, proyectos a medida y mantenimiento web, con trato directo y un precio cerrado antes de empezar.',
      },
      {
        question: '¿Trabajáis solo con clientes de Madrid?',
        answer:
          'No. Trabajamos online con empresas y autónomos de toda España. Podemos hablar por teléfono, videollamada, correo o WhatsApp, según te resulte más cómodo.',
      },
      {
        question: '¿Con quién hablaré durante el proyecto?',
        answer:
          'Tendrás trato directo con la persona que lleva tu web. No pasarás por comerciales ni por varios departamentos para resolver una duda.',
      },
      {
        question: '¿Podemos pedir una propuesta sin compromiso?',
        answer:
          'Sí. Cuéntanos qué necesitas y te orientamos. Si el proyecto encaja, te enviamos una propuesta clara con plazos, forma de trabajo y precio cerrado antes de empezar.',
      },
      {
        question: '¿Cómo os contacto?',
        answer:
          'Puedes escribirnos por email a hola@pereiraweb.es, llamarnos, usar WhatsApp o concertar una videollamada. Si estás en Madrid, también podemos desplazarnos. Respondemos muy rápido para orientarte y, si encaja, preparar la propuesta.',
      },
    ],
  },
  {
    id: 'servicios',
    title: 'Servicios',
    faqs: [
      {
        question: '¿Cómo sé qué servicio necesito?',
        answer:
          'Si quieres presentar tu negocio y recibir contactos, normalmente encaja Web Profesional 360 o Web a Medida. Si quieres vender productos online, una tienda. Si ya tienes web y quieres mantenerla al día, mantenimiento. También hacemos rediseños. Si no lo tienes claro, cuéntanos tu caso y te orientamos.',
      },
      {
        question: '¿Qué diferencia hay entre Web Profesional 360 y Web a Medida?',
        answer:
          'Web Profesional 360 es una web profesional con precio y proceso claros: 1.090 € + IVA. Web a Medida es para cuando necesitas algo más concreto, como reservas, calculadoras, conexión con otras herramientas o zonas privadas. En ese caso el precio se calcula según el proyecto y se cierra antes de empezar.',
      },
      {
        question:
          '¿Qué diferencia hay entre 360 Start, 360 Presencia y 360 Gestión?',
        answer:
          '360 Start es la opción más sencilla (545 € + IVA), con alcance cerrado y una sola ronda de cambios. 360 Presencia (1.090 € + IVA) y 360 Gestión (1.590 € + IVA) son la base profesional más completa: con Presencia nos ocupamos nosotros de los cambios; con Gestión, además, tienes un panel sencillo para actualizar ciertos contenidos tú mismo.',
      },
      {
        question: '¿Podéis mejorar o rediseñar una web que ya existe?',
        answer:
          'Sí. Revisamos tu web actual y te proponemos qué conviene: un rediseño completo o mejoras concretas de diseño, textos, contacto o velocidad. El precio se cierra antes de empezar.',
      },
      {
        question: '¿Hacéis webs con funciones especiales o paneles privados?',
        answer:
          'Sí, cuando el proyecto lo necesita. Por ejemplo, reservas, formularios avanzados, conexión con herramientas que ya usas o paneles privados para clientes o equipo. Eso entra dentro de Web a Medida y se presupuesta según lo que haga falta.',
      },
    ],
  },
  {
    id: 'precios',
    title: 'Precios y pagos',
    faqs: [
      {
        question: '¿Cuánto cuesta Web Profesional 360?',
        answer:
          'Hay tres opciones: 360 Start (545 € + IVA), 360 Presencia (1.090 € + IVA) y 360 Gestión (1.590 € + IVA). Antes de empezar confirmamos por escrito el precio y todo lo incluido.'
      },
      {
        question: '¿Cómo se presupuestan Web a Medida y Tienda Online?',
        answer:
          'Según lo que necesite cada proyecto. Primero vemos qué quieres conseguir y qué tiene que hacer la web o la tienda. Después te enviamos un precio cerrado antes de empezar.',
      },
      {
        question: '¿Ofrecéis pago fraccionado?',
        answer:
          'Sí. No hay que pagar todo al inicio. En la mayoría de proyectos se paga un 50% para empezar y el 50% restante antes de publicar la web definitiva. También se puede acordar pago único si lo prefieres.',
      },
      {
        question: '¿Hay costes ocultos?',
        answer:
          'No. Antes de empezar dejamos por escrito el precio y todo lo que incluye. Si más adelante quieres añadir algo que no estaba previsto, te diremos cuánto cuesta antes de hacerlo.',
      },
    ],
  },
  {
    id: 'proceso',
    title: 'Proceso y contenidos',
    faqs: [
      {
        question: '¿Cómo es el proceso de trabajo?',
        answer:
          'Primero hablamos de lo que necesitas y te enviamos una propuesta. Si encaja, arrancamos con el pago inicial, diseñamos y construimos la web, revisamos contigo los cambios incluidos y, cuando todo está listo y abonado, la publicamos. El detalle está en Condiciones del proyecto.',
      },
      {
        question: '¿Cuánto tarda en estar lista una web?',
        answer:
          'Una Web Profesional 360 suele estar lista en 2–3 semanas si nos envías a tiempo la información necesaria. Si los materiales llegan tarde, la fecha prevista también se retrasa. Una Web a Medida o una tienda online puede necesitar más tiempo, y ese plazo se indica en la propuesta.',
      },
      {
        question: '¿Qué necesito entregar para empezar?',
        answer:
          'La información de tu negocio, los textos o ideas que tengas, fotografías, logo y datos de contacto. Si te falta algo, te ayudamos a ordenarlo con lo que tengas disponible.',
      },
      {
        question: '¿Quién prepara los textos?',
        answer:
          'Tú nos das la información y los materiales que tengas. Nosotros te ayudamos a ordenarlos y los adaptamos a la web. Si necesitas que redactemos todos los textos desde cero, lo valoramos aparte.',
      },
      {
        question: '¿Cuántas rondas de cambios incluye?',
        answer:
          'En Web Profesional 360 se incluyen dos rondas de cambios sobre el diseño. Eso sirve para corregir y afinar lo ya incluido. Si quieres añadir páginas o funciones nuevas, eso se presupuesta aparte. En proyectos a medida, las revisiones se definen en la propuesta.',
      },
    ],
  },
  {
    id: 'diseno',
    title: 'Diseño y funcionamiento',
    faqs: [
      {
        question: '¿La web se verá bien en el móvil?',
        answer:
          'Sí. Se verá bien en móvil, tablet y ordenador, con una navegación clara y fácil de usar.',
      },
      {
        question: '¿La web será rápida?',
        answer:
          'Sí. Cuidamos el peso de las imágenes y la forma en que está construida para que cargue bien y no se haga pesada de usar.',
      },
      {
        question: '¿Puedo editar yo mismo la web?',
        answer:
          'Depende de la modalidad contratada. En 360 Gestión puedes actualizar ciertos contenidos desde un panel sencillo. En otras opciones, los cambios se hacen a través del mantenimiento. Lo dejamos claro en la propuesta. Más adelante también se pueden ampliar páginas o funciones; te diremos el precio antes de hacerlas.',
      },
    ],
  },
  {
    id: 'dominio',
    title: 'Dominio y mantenimiento',
    faqs: [
      {
        question: '¿El dominio es mío? ¿Y el alojamiento está incluido?',
        answer:
          'El dominio pertenece siempre al cliente. Podemos ayudarte a registrarlo, configurarlo o transferirlo, pero la titularidad es tuya. Si el dominio o el alojamiento están incluidos depende del servicio y de si ya tienes dominio; lo aclaramos en cada propuesta.',
      },
      {
        question: '¿El mantenimiento es obligatorio?',
        answer:
          'No. Es opcional, aunque recomendable para mantener la web segura, actualizada y con soporte cuando haga falta. Sin mantenimiento, la web sigue siendo tuya y puede seguir online.',
      },
      {
        question: '¿Qué incluye el mantenimiento web?',
        answer:
          'Suele incluir actualizaciones de seguridad, copias de seguridad, revisión de que la web siga funcionando, pequeños cambios de textos o imágenes y soporte cuando tengas un problema. El detalle concreto se indica en cada plan o propuesta.',
      },
      {
        question: '¿Qué pasa si cancelo el mantenimiento?',
        answer:
          'Tu web sigue siendo tuya y no se retira. Dejas de recibir las actualizaciones, las copias de seguridad, el soporte y los cambios incluidos en el plan.',
      },
      {
        question: '¿Podéis mantener una web que no habéis creado vosotros?',
        answer:
          'Sí, en muchos casos. Primero revisamos cómo está hecha y qué se puede cuidar bien, y después te proponemos un plan de mantenimiento adecuado.',
      },
    ],
  },
  {
    id: 'google',
    title: 'Google y posicionamiento',
    faqs: [
      {
        question: '¿La web estará preparada para aparecer en Google?',
        answer:
          'Sí. Entregamos la web con una configuración inicial para que Google pueda entenderla y mostrarla: títulos claros, estructura ordenada y una base técnica correcta. Eso no es lo mismo que un trabajo continuo de posicionamiento.',
      },
      {
        question: '¿Garantizáis la primera posición en Google?',
        answer:
          'No. Nadie puede garantizar la primera posición. Lo que sí hacemos es dejar la web bien preparada desde el principio.',
      },
      {
        question: '¿El posicionamiento continuo está incluido?',
        answer:
          'No. Mejorar posiciones de forma continua, con contenidos y seguimiento mes a mes, es un servicio aparte. Si te interesa, lo valoramos en una propuesta.',
      },
    ],
  },
  {
    id: 'tiendas',
    title: 'Tiendas online',
    faqs: [
      {
        question: '¿Qué incluye una tienda online?',
        answer:
          'Una tienda para mostrar tus productos, cobrar online, recibir pedidos y gestionar las ventas desde un panel sencillo. El detalle de productos, envíos y opciones se define en la propuesta según tu negocio. El plazo habitual es de 4 a 6 semanas.',
      },
      {
        question: '¿Cómo cobran los clientes?',
        answer:
          'Con tarjeta de forma segura, mediante un sistema de pago online. La opción concreta se elige según tu negocio, tu banco y tus clientes, y se indica en la propuesta.',
      },
      {
        question: '¿Me enseñáis a gestionar la tienda?',
        answer:
          'Sí. Incluimos formación para que puedas gestionar productos, pedidos y lo básico del día a día sin depender de nosotros para cada cambio.',
      },
    ],
  },
  {
    id: 'propiedad',
    title: 'Propiedad y publicación',
    faqs: [
      {
        question: '¿La web es mía cuando termine el proyecto?',
        answer:
          'El cliente adquiere los derechos de uso del proyecto una vez abonado íntegramente. El código fuente y las metodologías desarrolladas son propiedad de PereiraWeb, según los términos de contratación.',
      },
      {
        question: '¿Podéis mostrar mi proyecto en el portfolio?',
        answer:
          'PereiraWeb se reserva el derecho a mostrar el proyecto en su portfolio. Si necesitas confidencialidad, indícalo antes de empezar.',
      },
      {
        question: '¿Cuándo se publica la web?',
        answer:
          'Cuando hayas validado la última revisión incluida y esté abonado el pago final. Entonces dejamos la web online con tu dominio.',
      },
      {
        question: '¿Hay garantía después de la entrega?',
        answer:
          'Sí. Durante el periodo de garantía corregimos gratis errores de programación del trabajo entregado. No incluye cambios de diseño ni funciones nuevas que no estuvieran acordadas.',
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
