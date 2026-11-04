// Rediseño 36web: catálogo único de servicios.
// Lo usan el menú, la home, el footer y las páginas /servicios/:slug.

export type Service = {
  slug: string;
  num: string;
  name: string;
  area: string;
  short: string;
  href: string;
  /** Solo para los servicios que usan la página genérica /servicios/:slug */
  page?: {
    title: string[];
    intro: string;
    includes: { t: string; d: string }[];
    forWho: string[];
    faq: { q: string; a: string }[];
    steps?: { t: string; d: string }[];
    image?: string;
  };
};

export const SERVICES_PATH = '/servicios';

export const SERVICES: Service[] = [
  {
    slug: 'diseno-web',
    num: '01',
    name: 'Diseño web',
    area: 'Presencia',
    short: 'Webs rápidas, claras y pensadas para que te llamen, no solo para que se vean bonitas.',
    href: '/diseno-web',
    page: {
      title: ['WEBS QUE', 'HACEN', 'SONAR EL MÓVIL.'],
      intro:
        'Diseñamos y desarrollamos tu web a medida o con WordPress, según lo que pida tu negocio. Rápida, clara en el móvil y con el contacto siempre a mano para que quien entre acabe llamando o escribiendo.',
      image: '/img/services/paginas-web.png',
      includes: [
        { t: 'Diseño a medida', d: 'Todas las secciones que necesites, con tu marca y pensadas para tu cliente, no una plantilla genérica.' },
        { t: 'Versión móvil', d: 'La mayoría de tus visitas llegan desde el móvil. La diseñamos primero para ellas.' },
        { t: 'Contacto directo', d: 'Formulario, WhatsApp, llamada y mapa siempre visibles, y probados antes de publicar.' },
        { t: 'Base SEO técnica', d: 'Velocidad, títulos, estructura y datos para que Google entienda tu web desde el primer día.' },
        { t: 'Editor sencillo', d: 'Un panel para cambiar textos y fotos sin depender de nadie.' },
        { t: 'Publicación completa', d: 'Hosting, dominio y puesta en marcha. Todo a tu nombre.' },
      ],
      steps: [
        { t: 'Llamada', d: 'Entendemos tu negocio y lo que necesita la web.' },
        { t: 'Propuesta', d: 'Secciones, funciones y plazo por escrito, el mismo día.' },
        { t: 'Diseño', d: 'Te enseñamos la web antes de programarla y ajustamos contigo.' },
        { t: 'Publicación', d: 'La lanzamos, la probamos y te enseñamos a usarla.' },
      ],
      forWho: ['Negocios que todavía no tienen web', 'Empresas con una web antigua que no trae clientes', 'Autónomos que quieren una imagen profesional'],
      faq: [
        { q: '¿WordPress o desarrollo a medida?', a: 'Lo que pida el caso. WordPress si encaja; desarrollo a medida si hace falta. Te lo decimos en la propuesta, sin venderte lo más caro por sistema.' },
        { q: '¿Cuánto se tarda?', a: 'Una web de negocio suele estar en 3 a 8 semanas cuando tenemos textos y fotos. El plazo va por escrito en la propuesta.' },
        { q: '¿Podré cambiar cosas yo?', a: 'Sí. Te dejamos un panel sencillo para textos y fotos. Si prefieres no tocarla, el mantenimiento es opcional.' },
        { q: '¿Rediseñáis webs existentes?', a: 'Sí. Partimos de tu marca, textos y dominio y montamos la web nueva. No es un parche sobre la vieja.' },
        { q: '¿De quién es la web?', a: 'Tuya. Dominio, archivos y accesos a tu nombre, y garantía técnica de 60 días tras publicar.' },
      ],
    },
  },
  {
    slug: 'ecommerce',
    num: '02',
    name: 'eCommerce',
    area: 'Venta',
    short: 'Tiendas online con un proceso de compra corto, pagos rápidos y todo listo para vender desde el móvil.',
    href: '/tiendas-online',
    page: {
      title: ['TIENDAS QUE', 'VENDEN', 'DESDE EL MÓVIL.'],
      intro:
        'Creamos tu tienda online con WooCommerce, Shopify o a medida, con un proceso de compra corto, pagos rápidos y un panel para que gestiones productos, stock y pedidos sin complicarte.',
      image: '/img/services/tiendas-online.png',
      includes: [
        { t: 'Catálogo y fichas', d: 'Fichas de producto claras, con tallas o variantes fáciles de elegir y fotos que venden.' },
        { t: 'Compra en pocos pasos', d: 'Carrito y checkout cortos, compra como invitado y nada de campos que sobran.' },
        { t: 'Pagos rápidos', d: 'Tarjeta, Bizum, PayPal, Apple Pay y Google Pay, según tu pasarela.' },
        { t: 'Envíos', d: 'Zonas, tarifas, recogida en tienda y aviso de envío gratis para subir el ticket medio.' },
        { t: 'Panel de gestión', d: 'Productos, stock y pedidos desde un panel que entiendes.' },
        { t: 'Listo para Google', d: 'Base SEO para que tus productos aparezcan en búsquedas y en Google Shopping.' },
      ],
      steps: [
        { t: 'Revisión', d: 'Catálogo, pagos, envíos y lo que ya tienes.' },
        { t: 'Propuesta', d: 'Plataforma, funciones y plazo por escrito.' },
        { t: 'Construcción', d: 'Diseño, carga de productos y pruebas de compra reales.' },
        { t: 'Lanzamiento', d: 'Publicamos y te formamos para gestionar pedidos.' },
      ],
      forWho: ['Marcas que empiezan a vender online', 'Negocios con tienda física que quieren vender fuera de su barrio', 'Tiendas que hay que rehacer porque no convierten'],
      faq: [
        { q: '¿WooCommerce, Shopify o a medida?', a: 'Lo que pida el caso. Con una plataforma tú llevas el control de la tienda; a medida suele ser para catálogos o procesos más complejos.' },
        { q: '¿Cuánto se tarda?', a: 'Una tienda suele llevar de 4 a 8 semanas cuando tenemos productos, fotos y textos.' },
        { q: '¿Podéis mejorar mi tienda actual?', a: 'Sí. Revisamos dónde se pierden las ventas y te decimos si compensa mejorarla o rehacerla.' },
        { q: '¿De quién es la tienda?', a: 'Tuya. Dominio, archivos y accesos a tu nombre.' },
      ],
    },
  },
  {
    slug: 'seo',
    num: '03',
    name: 'SEO',
    area: 'Visibilidad',
    short: 'Que te encuentren en Google cuando alguien de tu zona busca lo que haces.',
    href: `${SERVICES_PATH}/seo`,
    page: {
      title: ['QUE TE', 'ENCUENTREN', 'EN GOOGLE.'],
      intro:
        'Ordenamos tu web por dentro, escribimos lo que tus clientes buscan y cuidamos tu ficha de Google para que aparezcas antes que la competencia, sobre todo en tu zona.',
      includes: [
        { t: 'Auditoría técnica', d: 'Velocidad, indexación, títulos, enlaces rotos y todo lo que Google mira antes de enseñarte.' },
        { t: 'SEO local', d: 'Ficha de Google optimizada, reseñas, categorías y páginas por zona o barrio.' },
        { t: 'Contenidos', d: 'Páginas y artículos escritos para las búsquedas reales de tus clientes.' },
        { t: 'Autoridad', d: 'Menciones y enlaces de calidad desde directorios y medios del sector.' },
        { t: 'Informe mensual', d: 'Posiciones, visitas y llamadas en un informe que se entiende en dos minutos.' },
      ],
      forWho: ['Negocios locales que dependen de que les encuentren cerca', 'Empresas de servicios que quieren dejar de pagar cada clic', 'Webs que ya existen pero no reciben visitas'],
      faq: [
        { q: '¿Cuánto tarda en notarse?', a: 'Lo técnico se nota en semanas. Subir posiciones en búsquedas con competencia suele llevar de 3 a 6 meses.' },
        { q: '¿Necesito una web nueva?', a: 'No siempre. Primero auditamos la tuya y te decimos con sinceridad si compensa mejorarla o rehacerla.' },
      ],
    },
  },
  {
    slug: 'sem',
    num: '04',
    name: 'SEM',
    area: 'Captación',
    short: 'Campañas en Google Ads que traen clientes desde el primer día, con cada euro medido.',
    href: `${SERVICES_PATH}/sem`,
    page: {
      title: ['CLIENTES', 'DESDE EL', 'PRIMER DÍA.'],
      intro:
        'Montamos y gestionamos tus campañas en Google Ads para que aparezcas justo cuando alguien está buscando lo que vendes, y medimos cada llamada, formulario y venta que llega.',
      includes: [
        { t: 'Estrategia y palabras clave', d: 'Buscamos lo que tu cliente escribe cuando está listo para comprar, no solo para mirar.' },
        { t: 'Anuncios y landings', d: 'Textos, extensiones y páginas de aterrizaje hechas para convertir.' },
        { t: 'Medición real', d: 'Seguimiento de llamadas, WhatsApp y formularios para saber qué campaña funciona.' },
        { t: 'Optimización continua', d: 'Revisamos búsquedas, pujas y anuncios cada semana para bajar el coste por cliente.' },
      ],
      forWho: ['Negocios que necesitan clientes ya', 'Lanzamientos y temporadas', 'Empresas que ya invierten en Ads pero no saben qué les devuelve'],
      faq: [
        { q: '¿Quién paga la inversión a Google?', a: 'Tú, directamente a Google. Nosotros gestionamos la cuenta, que siempre está a tu nombre.' },
        { q: '¿Puedo parar cuando quiera?', a: 'Sí. Las campañas son tuyas y se pueden pausar en cualquier momento.' },
      ],
    },
  },
  {
    slug: 'geo',
    num: '05',
    name: 'GEO',
    area: 'IA',
    short: 'Que ChatGPT, Gemini y las respuestas de IA de Google te recomienden a ti.',
    href: `${SERVICES_PATH}/geo`,
    page: {
      title: ['QUE LA IA', 'TE', 'RECOMIENDE.'],
      intro:
        'Cada vez más gente pregunta a ChatGPT o a Gemini en vez de buscar en Google. Preparamos tu web y tu presencia online para que esas respuestas te nombren a ti.',
      includes: [
        { t: 'Diagnóstico en IA', d: 'Preguntamos a los asistentes lo que preguntarían tus clientes y vemos si sales, y cómo.' },
        { t: 'Contenido citable', d: 'Respuestas claras, datos y preguntas frecuentes que los modelos pueden usar y citar.' },
        { t: 'Datos estructurados', d: 'Schema, fichas y perfiles coherentes para que la IA entienda quién eres y dónde estás.' },
        { t: 'Menciones', d: 'Presencia en las fuentes que los asistentes consultan: directorios, reseñas y medios.' },
      ],
      forWho: ['Negocios que quieren adelantarse a su competencia', 'Empresas con buen SEO que quieren aparecer también en la IA', 'Marcas que venden servicios de confianza'],
      faq: [
        { q: '¿Es lo mismo que el SEO?', a: 'Comparte la base, pero se trabaja distinto: la IA no enseña diez enlaces, recomienda dos o tres nombres.' },
        { q: '¿Se puede medir?', a: 'Sí. Hacemos un seguimiento periódico de las preguntas clave y de si los asistentes te mencionan.' },
      ],
    },
  },
  {
    slug: 'redes-sociales',
    num: '06',
    name: 'Redes sociales',
    area: 'Contenido',
    short: 'Contenido para Instagram y redes que enseña lo que haces y lleva a la gente a escribirte.',
    href: `${SERVICES_PATH}/redes-sociales`,
    page: {
      title: ['REDES QUE', 'TRAEN', 'MENSAJES.'],
      intro:
        'Planificamos, creamos y publicamos contenido que enseña tu trabajo de verdad: reels, carruseles y stories pensados para que te escriban, no solo para sumar likes.',
      includes: [
        { t: 'Estrategia y calendario', d: 'Qué contar, cuándo y en qué formato, pensado para tu tipo de cliente.' },
        { t: 'Reels y carruseles', d: 'Guion, edición y diseño con tu identidad de marca.' },
        { t: 'Perfil optimizado', d: 'Bio, destacadas y enlaces para que quien llegue sepa qué hacer.' },
        { t: 'Informe y mejora', d: 'Qué publicaciones traen mensajes y cuáles no, y qué cambiamos.' },
      ],
      forWho: ['Negocios con un producto o trabajo que se puede enseñar', 'Marcas que publican sin plan y sin resultados', 'Quien no tiene tiempo de grabar y editar'],
      faq: [
        { q: '¿Tengo que salir yo en los vídeos?', a: 'No es obligatorio, aunque funciona mejor. Te ayudamos con guion y grabación para que sea fácil.' },
        { q: '¿En qué redes trabajáis?', a: 'Sobre todo Instagram, TikTok y LinkedIn, según dónde esté tu cliente.' },
      ],
    },
  },
  {
    slug: 'tranquilidad-digital',
    num: '07',
    name: 'Tranquilidad digital',
    area: 'Representación',
    short: 'Estamos de tu lado frente a proveedores, programadores y plataformas. Tú a lo tuyo; lo técnico lo llevamos nosotros.',
    href: '/tranquilidad-digital',
    page: {
      title: ['TÚ A LO TUYO.', 'NOSOTROS,', 'A LO DIGITAL.'],
      intro:
        'Para negocios que saben lo que quieren pero no tienen a nadie técnico de su lado. Nos sentamos en tu silla frente a proveedores, programadores y plataformas: traducimos lo que necesitas, coordinamos a quien lo hace y comprobamos que se entrega bien.',
      image: '/img/services/tranquilidad-digital.webp',
      includes: [
        { t: 'Hablamos por ti', d: 'Hablamos en tu nombre con agencias, programadores, hosting y plataformas, en su idioma.' },
        { t: 'De idea a encargo claro', d: 'Convertimos lo que quieres conseguir en requisitos claros que nadie pueda malinterpretar.' },
        { t: 'Revisión de presupuestos', d: 'Comparamos ofertas y te decimos qué sobra, qué falta y qué precio tiene sentido.' },
        { t: 'Nadie se queda parado', d: 'Calendario, entregas y seguimiento para que el proyecto no se pare.' },
        { t: 'Lo probamos antes que tú', d: 'Probamos lo que se entrega antes de que lo pagues o lo publiques.' },
        { t: 'Un solo interlocutor', d: 'Una persona de referencia que conoce tu negocio y te lo explica claro.' },
      ],
      steps: [
        { t: 'Nos cuentas', d: 'Qué quieres conseguir y qué te preocupa.' },
        { t: 'Lo ponemos por escrito', d: 'Un encargo claro que cualquier proveedor entiende.' },
        { t: 'Lo movemos', d: 'Elegimos con quién y empujamos hasta que esté hecho.' },
        { t: 'Lo comprobamos contigo', d: 'Nada se paga ni se publica sin tu visto bueno.' },
      ],
      forWho: ['Negocios que trabajan con varios proveedores digitales a la vez', 'Quien ha tenido malas experiencias con agencias o programadores', 'Empresas sin perfil técnico que van a invertir en un proyecto digital'],
      faq: [
        { q: '¿Hacéis vosotros el trabajo o lo coordináis?', a: 'Las dos cosas. Si encaja, lo hacemos nosotros; si ya tienes proveedor o conviene otro, actuamos de tu lado y lo coordinamos.' },
        { q: '¿Podéis revisar un presupuesto que ya tengo?', a: 'Sí. Es una de las cosas que más hacemos: te decimos si es razonable y qué preguntar antes de firmar.' },
        { q: '¿Trabajáis con proveedores que no conocéis?', a: 'Sí. Nuestro papel es entendernos con cualquiera y defender tus intereses.' },
        { q: '¿Quién decide al final?', a: 'Siempre tú. Nosotros te damos criterio y opciones claras.' },
      ],
    },
  },
];

// Servicios complementarios: tienen página propia pero no van en el menú principal.
export const EXTRA_SERVICES: Service[] = [
  {
    slug: 'mantenimiento-web',
    num: '+',
    name: 'Mantenimiento web',
    area: 'Soporte',
    short: 'Actualizaciones, copias, seguridad y arreglos para tu web, aunque no la hayamos hecho nosotros.',
    href: '/mantenimiento-web',
    page: {
      title: ['TU WEB,', 'SIEMPRE', 'FUNCIONANDO.'],
      intro:
        'Nos ocupamos de actualizaciones, copias, seguridad e incidencias de tu web o tienda, sea WordPress, WooCommerce, Shopify o desarrollo a medida. Te atiende quien revisa la web, no un call center.',
      image: '/img/services/mantenimiento-web.png',
      includes: [
        { t: 'Actualizaciones', d: 'WordPress, temas y plugins al día, probados antes de aplicarlos.' },
        { t: 'Copias y seguridad', d: 'Copias periódicas, vigilancia y respuesta si algo falla.' },
        { t: 'Arreglos', d: 'Errores, caídas, HTTPS, formularios, integraciones y problemas tras una actualización.' },
        { t: 'Pequeños cambios', d: 'Textos, imágenes, ajustes de móvil y mejoras acotadas, según el plan.' },
        { t: 'Tiendas y apps', d: 'Checkout, pagos, pedidos y aplicaciones a medida: frontend, backend y APIs.' },
        { t: 'Horas claras', d: 'Planes y bonos definidos antes de empezar. Nunca consumimos horas sin tu aprobación.' },
      ],
      forWho: ['Quien quiere olvidarse del mantenimiento', 'Webs hechas por otra empresa que nadie cuida', 'Webs rotas que hay que sanear'],
      faq: [
        { q: '¿Y si la web la hizo otra empresa?', a: 'No pasa nada: la mayoría de incidencias que vemos vienen de webs hechas por otros. Primero la revisamos y te decimos si podemos hacernos cargo.' },
        { q: '¿Qué pasa si mi web ya está rota?', a: 'Empezamos por un bono de horas: revisamos, arreglamos y te decimos qué queda. Luego, si quieres, pasas a mantenimiento.' },
        { q: '¿Qué es un pequeño cambio?', a: 'Un texto, una foto, un horario o un ajuste visual. Una página nueva o una funcionalidad van aparte, con presupuesto antes.' },
        { q: '¿Hay permanencia?', a: 'No. Pago mensual y puedes cancelar. Te dejamos accesos y copias.' },
      ],
    },
  },
  {
    slug: 'aplicaciones',
    num: '+',
    name: 'Aplicaciones',
    area: 'Producto',
    short: 'Aplicaciones web, Android e iOS a medida para empresas y nuevos proyectos.',
    href: '/aplicaciones',
    page: {
      title: ['APPS QUE', 'RESUELVEN', 'ALGO DE VERDAD.'],
      intro:
        'Desarrollamos aplicaciones web y móviles a medida: herramientas internas, plataformas y productos nuevos. Empezamos por una primera versión útil y la hacemos crecer con el proyecto.',
      image: '/img/services/aplicaciones.png',
      includes: [
        { t: 'Definición', d: 'Qué necesita la primera versión y qué puede esperar, por escrito.' },
        { t: 'Diseño de producto', d: 'Pantallas y flujos pensados para quien la va a usar.' },
        { t: 'Datos y lógica', d: 'Usuarios, permisos, paneles y la lógica de tu negocio.' },
        { t: 'Integraciones', d: 'Pagos, mapas, CRM y las herramientas que ya usas.' },
        { t: 'Web, Android e iOS', d: 'La tecnología la elegimos según tu proyecto y tus usuarios.' },
        { t: 'Pruebas y lanzamiento', d: 'Puesta en marcha y acompañamiento en la publicación en tiendas.' },
      ],
      forWho: ['Una idea que quieres poner en marcha', 'Empresas que necesitan una herramienta propia', 'Aplicaciones ya empezadas que necesitan seguir creciendo'],
      faq: [
        { q: '¿Aplicación web o app móvil?', a: 'Lo que pida el caso. Una aplicación web se usa desde el navegador; si necesitas Android e iOS, también la desarrollamos.' },
        { q: '¿Podemos empezar con algo sencillo?', a: 'Sí, y suele ser el mejor punto de partida. Después ampliamos con lo que vaya pidiendo el proyecto.' },
        { q: '¿Trabajáis con apps ya empezadas?', a: 'Sí. Revisamos código, accesos y estado, y te decimos qué se aprovecha y cómo continuar.' },
        { q: '¿De quién es la aplicación?', a: 'Se entrega con su código y accesos, según lo acordado en la propuesta.' },
      ],
    },
  },
];

export const ALL_SERVICES = [...SERVICES, ...EXTRA_SERVICES];
