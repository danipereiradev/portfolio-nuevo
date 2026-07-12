import { realTestimonials, type Testimonial } from '../components/Testimonials';

// Testimonios ilustrativos (no corresponden a clientes reales) pensados para
// reflejar el tipo de negocio y problemática de cada landing. Se mantienen
// ratings variados (no todo 5 estrellas) para que la media resulte creíble,
// y los nombres de empresa evitan el patrón "apellido + sector" para no
// resultar artificiales.
//
// En cada landing se intercala también una de las reseñas reales (las mismas
// que aparecen en la home), elegida por afinidad temática con el servicio,
// para que no se vean como dos bloques separados de reseñas reales/ficticias.

const [
  arantxaMobileOne2One, // excelencia técnica / frameworks
  victorOAlicornio, // autónomo empezando, web sencilla
  alexConfusionWear, // rediseño completo
  sumeraDelishVegan, // ecommerce
  ireneChicxsdelacalle, // soporte / atención continua
  ireneCamisetasAhora, // plataforma ecommerce fiable
  brunoTomasElViaje, // páginas web para proyectos profesionales
  carlosRodriguezCarper, // resultados de posicionamiento SEO
] = realTestimonials;

export const paginasWebEmpresasTestimonials: Testimonial[] = [
  {
    name: 'Marta Iglesias',
    company: 'Gestoría Punto Fiscal',
    date: '14/2/2026',
    text: 'Necesitábamos una web que transmitiera seriedad desde el primer segundo, porque muchos clientes nos buscan en Google antes de llamarnos. Dani entendió bien lo que queríamos y el resultado encajó con lo que pedíamos.',
    highlight:
      'Desde que publicamos la web recibimos consultas de empresas que antes no nos conocían, y llegan ya informadas sobre nuestros servicios.',
    rating: 5,
    avatar: 'MI',
  },
  {
    name: 'Javier Roldán',
    company: 'Estructura Ingeniería',
    date: '3/11/2025',
    text: 'El proceso fue claro desde la propuesta inicial: sabíamos qué íbamos a tener, en qué plazo y a qué precio. Eso nos dio bastante tranquilidad al ser la primera web de la empresa.',
    highlight:
      'Cumplieron los plazos que nos dijeron al principio, sin sorpresas de última hora.',
    rating: 5,
    avatar: 'JR',
  },
  {
    name: 'Beatriz Home',
    company: 'Clínica Dental Sonrisa Home',
    date: '22/9/2025',
    text: 'Teníamos una web antigua que ya no representaba a la clínica. El cambio de diseño y estructura ha sido notable, y ahora es mucho más fácil explicar nuestros tratamientos.',
    highlight:
      'Los pacientes nos comentan que la web les da mucha confianza antes de pedir cita.',
    rating: 4,
    avatar: 'BH',
  },
  brunoTomasElViaje,
  {
    name: 'Óscar Ferreiro',
    company: 'Reformas Puerta Nueva',
    date: '18/6/2025',
    text: 'No tenía web y todo funcionaba por recomendación. Ahora tengo un sitio donde puedo mostrar proyectos terminados, y eso me ha ayudado a cerrar presupuestos más grandes.',
    highlight: '',
    rating: 5,
    avatar: 'OF',
  },
  {
    name: 'Cristina Nogales',
    company: 'Bufete Vía Legal',
    date: '9/4/2025',
    text: 'Al principio no tenía muy claro qué necesitaba, pero me ayudaron a definir bien la estructura de la web según las áreas del despacho. Dani estuvo pendiente de cada duda que me iba surgiendo.',
    highlight:
      'Explican las cosas técnicas de forma sencilla, sin agobiar con jerga que no entiendes.',
    rating: 5,
    avatar: 'CN',
  },
  {
    name: 'Rubén Castaño',
    company: 'Grupo Meridiano Consultoría',
    date: '27/1/2025',
    text: 'La web quedó bien, aunque en la fase de revisión tuvimos que pedir varios ajustes de textos que tardaron algo más de lo esperado. Al final el resultado cumplió con lo acordado.',
    highlight: '',
    rating: 4,
    avatar: 'RC',
  },
];

export const tiendasOnlineTestimonials: Testimonial[] = [
  {
    name: 'Laura Espino',
    company: 'Terracota Hogar',
    date: '5/1/2026',
    text: 'Pasamos de vender solo en ferias a tener una tienda online funcionando de verdad. El proceso de configurar productos, pagos y envíos fue más sencillo de lo que imaginaba, y Dani nos acompañó en cada paso.',
    highlight:
      'El primer mes ya tuvimos pedidos de clientes que no conocíamos de antes, algo que no esperaba tan rápido.',
    rating: 5,
    avatar: 'LE',
  },
  {
    name: 'Diego Almansa',
    company: 'Cumbre Outdoor Sport',
    date: '19/10/2025',
    text: 'Necesitábamos migrar de una plataforma antigua y lenta a algo más moderno. La tienda carga rápido y el proceso de compra es mucho más directo que el anterior.',
    highlight:
      'Las devoluciones y el carrito abandonado han bajado bastante desde el cambio.',
    rating: 5,
    avatar: 'DA',
  },
  sumeraDelishVegan,
  {
    name: 'Nuria Belda',
    company: 'Botánica Cosmética',
    date: '30/7/2025',
    text: 'El diseño de la tienda encaja con la imagen de marca que queríamos, y la parte de gestión de pedidos es cómoda para nosotros, que no somos muy técnicos.',
    highlight: '',
    rating: 4,
    avatar: 'NB',
  },
  {
    name: 'Fernando Prats',
    company: 'La Bodega del Turia',
    date: '12/5/2025',
    text: 'Tuvimos algún contratiempo al conectar la pasarela de pago con nuestro banco, pero se resolvió y desde entonces la tienda funciona sin problemas.',
    highlight:
      'Ahora gestionamos pedidos a toda España sin depender de intermediarios.',
    rating: 4,
    avatar: 'FP',
  },
  {
    name: 'Elena Riquelme',
    company: 'Pequeño Osito Moda Infantil',
    date: '8/3/2025',
    text: 'Buscaba algo sencillo de gestionar día a día, sin depender de nadie para subir producto nuevo. Cumple con eso y Dani responde rápido cuando hace falta algún ajuste.',
    highlight: '',
    rating: 5,
    avatar: 'ER',
  },
  {
    name: 'Andrés Company',
    company: 'Bisutería Lunares',
    date: '20/12/2024',
    text: 'La tienda quedó bien, aunque el catálogo era grande y la carga inicial de productos nos llevó más tiempo del que pensábamos, por nuestra parte más que por el desarrollo.',
    highlight: '',
    rating: 4,
    avatar: 'AC',
  },
];

export const mantenimientoWebTestimonials: Testimonial[] = [
  {
    name: 'Silvia Contreras',
    company: 'Academia Lingua Idiomas',
    date: '2/2/2026',
    text: 'Antes cada vez que había un problema en la web tardábamos días en encontrar quien lo arreglara. Ahora sabemos que hay alguien pendiente y responde en pocas horas.',
    highlight:
      'Las actualizaciones de seguridad se hacen sin que tengamos que preocuparnos de nada.',
    rating: 5,
    avatar: 'SC',
  },
  {
    name: 'Ignacio Bravo',
    company: 'Vivenda Propiedades',
    date: '17/11/2025',
    text: 'Nuestra web se quedó desactualizada un tiempo y empezó a dar errores. Desde que la mantienen ellos no hemos vuelto a tener caídas ni avisos raros de Google.',
    highlight: '',
    rating: 5,
    avatar: 'IB',
  },
  {
    name: 'Patricia Solano',
    company: 'Fisio Norte',
    date: '25/9/2025',
    text: 'Pedimos mantenimiento sobre todo por tranquilidad, porque no queríamos que la web se quedase parada por un fallo técnico. De momento no hemos tenido ningún susto.',
    highlight: '',
    rating: 4,
    avatar: 'PS',
  },
  ireneChicxsdelacalle,
  {
    name: 'Manuel Ortuño',
    company: 'Restaurante La Marmita',
    date: '30/6/2025',
    text: 'Pedimos pequeños cambios de vez en cuando, como actualizar la carta o las fotos, y Dani normalmente los resuelve en el mismo día. Es cómodo no depender de aprender a hacerlo tú mismo.',
    highlight: '',
    rating: 5,
    avatar: 'MO',
  },
  {
    name: 'Alicia Domenech',
    company: 'Asesoría Contable Levante',
    date: '14/4/2025',
    text: 'Alguna vez la respuesta a una petición pequeña tardó algo más de lo esperado, pero en general el servicio cumple y evitamos los problemas que teníamos antes con la web caída.',
    highlight: '',
    rating: 4,
    avatar: 'AD',
  },
  {
    name: 'Sergio Paredes',
    company: 'Autoescuela Vía Rápida',
    date: '11/1/2025',
    text: 'Teníamos una web hecha hace años en una plataforma antigua y necesitaba mejoras de seguridad urgentes. Se encargaron de todo y ahora recibimos informes de cómo va.',
    highlight: '',
    rating: 5,
    avatar: 'SP',
  },
];

export const disenoWebTestimonials: Testimonial[] = [
  {
    name: 'Carla Miralles',
    company: 'Estudio Cubo Arquitectura',
    date: '9/1/2026',
    text: 'Queríamos que la web se pareciera a los proyectos que hacemos: minimalista y cuidada. Ángela, la diseñadora que se encargó del proyecto, entendió el estilo que buscábamos casi desde la primera reunión.',
    highlight:
      'Varios clientes nos han comentado que la web ayuda a entender nuestro estilo antes de la primera reunión.',
    rating: 5,
    avatar: 'CM',
  },
  {
    name: 'Tomás Aranda',
    company: 'Foco Fotografía de Producto',
    date: '2/11/2025',
    text: 'Tenía una web hecha con una plantilla genérica que no destacaba nada. El nuevo diseño hace que el trabajo se vea mucho mejor, que al final es lo que vendo.',
    highlight: '',
    rating: 5,
    avatar: 'TA',
  },
  alexConfusionWear,
  {
    name: 'Gloria Espada',
    company: 'Celebra Eventos',
    date: '15/8/2025',
    text: 'Buscábamos un diseño con más personalidad que las plantillas que habíamos visto antes. Se nota que cuidaron los detalles visuales del sector.',
    highlight: '',
    rating: 4,
    avatar: 'GE',
  },
  {
    name: 'Marcos Untoria',
    company: 'Raíz Cosmética Artesanal',
    date: '28/5/2025',
    text: 'El rediseño mejoró bastante la percepción de la marca. Hubo alguna ronda extra de cambios de la que somos parte responsable porque cambiamos de idea varias veces, pero Dani tuvo paciencia con eso.',
    highlight: '',
    rating: 4,
    avatar: 'MU',
  },
  {
    name: 'Verónica Salcedo',
    company: 'Casa Blanca Interiorismo',
    date: '19/3/2025',
    text: 'Necesitaba que la web reflejara bien mi portfolio visual, con fotos grandes y buena maquetación. El resultado consigue ese efecto sin que se vea sobrecargado.',
    highlight: '',
    rating: 5,
    avatar: 'VS',
  },
  {
    name: 'Hugo Belmonte',
    company: 'Taller Once Estudio Creativo',
    date: '7/12/2024',
    text: 'El diseño final quedó muy bien, aunque en las primeras propuestas costó un poco encontrar el estilo exacto que buscaba. Con paciencia llegamos a un resultado que me convence.',
    highlight: '',
    rating: 4,
    avatar: 'HB',
  },
];

export const aplicacionesWebTestimonials: Testimonial[] = [
  {
    name: 'Raquel Montiel',
    company: 'Transportes Rumbo Sur',
    date: '20/1/2026',
    text: 'Necesitábamos una herramienta interna para controlar rutas y albaranes, porque lo llevábamos todo en hojas de cálculo. Ahora todo el equipo trabaja sobre la misma plataforma.',
    highlight:
      'Se ha reducido bastante el tiempo que perdíamos revisando datos duplicados entre archivos.',
    rating: 5,
    avatar: 'RM',
  },
  arantxaMobileOne2One,
  {
    name: 'Álvaro Ceballos',
    company: 'Formación Abierta Online',
    date: '4/10/2025',
    text: 'Queríamos una plataforma propia para que nuestros alumnos accedieran a los cursos, en vez de depender de un marketplace externo con comisiones. Dani propuso una estructura que se adaptó a lo que necesitábamos.',
    highlight: '',
    rating: 5,
    avatar: 'AC',
  },
  {
    name: 'Isabel Roca',
    company: 'Centro Médico Roca',
    date: '22/7/2025',
    text: 'El sistema de reservas a medida encaja mejor con nuestro flujo de trabajo que las herramientas genéricas que probamos antes. Hubo una fase de ajustes hasta cuadrar bien los horarios de cada especialista.',
    highlight: '',
    rating: 4,
    avatar: 'IR',
  },
  {
    name: 'Pablo Guijarro',
    company: 'Construcciones Alto Ebro',
    date: '11/4/2025',
    text: 'Pedimos un panel para seguir el estado de las obras y compartirlo con los clientes. El desarrollo tardó algo más de lo previsto por cambios de alcance que fuimos pidiendo nosotros.',
    highlight: '',
    rating: 4,
    avatar: 'PG',
  },
  {
    name: 'Teresa Anglada',
    company: 'Espacio Fit Gimnasios',
    date: '9/2/2025',
    text: 'La app de reservas de clases ha simplificado mucho la gestión, antes lo hacíamos por WhatsApp y se nos acumulaban los mensajes. El equipo se ha adaptado bien a la herramienta.',
    highlight: '',
    rating: 5,
    avatar: 'TA',
  },
  {
    name: 'Ricardo Feito',
    company: 'Procesa Ingeniería',
    date: '30/11/2024',
    text: 'El proyecto era complejo y con requisitos específicos de nuestro sector. Se resolvió bien, aunque tuvimos que dedicar tiempo nuestro a explicar bien cada proceso interno.',
    highlight: '',
    rating: 5,
    avatar: 'RF',
  },
];

export const servicioSEOTestimonials: Testimonial[] = [
  {
    name: 'Yolanda Prado',
    company: 'Clínica Dental Vitalia',
    date: '13/1/2026',
    text: 'Aparecíamos muy abajo en Google para búsquedas de nuestra propia zona. Después de varios meses de trabajo empezamos a recibir llamadas de pacientes que nos encontraron buscando directamente.',
    highlight:
      'En unos meses pasamos de no aparecer en la primera página a estar entre los primeros resultados locales.',
    rating: 5,
    avatar: 'YP',
  },
  {
    name: 'Emilio Vidal',
    company: 'Mudanzas Rápidas Vidal',
    date: '27/10/2025',
    text: 'El SEO es un trabajo de fondo, así que los primeros resultados tardaron en notarse, pero con el tiempo hemos subido posiciones para las búsquedas que más nos interesan.',
    highlight: '',
    rating: 4,
    avatar: 'EV',
  },
  carlosRodriguezCarper,
  {
    name: 'Marina Escudero',
    company: 'Hoja Verde Té a Granel',
    date: '5/8/2025',
    text: 'Nos ayudaron a corregir varios errores técnicos que ni sabíamos que teníamos, y a reorganizar el contenido de las categorías. El tráfico orgánico ha ido creciendo mes a mes.',
    highlight: '',
    rating: 5,
    avatar: 'ME',
  },
  {
    name: 'David Requena',
    company: 'Instituto Delta Idiomas',
    date: '16/5/2025',
    text: 'Es un servicio que requiere paciencia porque los resultados de SEO no son inmediatos, algo que Dani nos explicó bien desde el principio para no generar expectativas raras.',
    highlight: '',
    rating: 4,
    avatar: 'DR',
  },
  {
    name: 'Cristina Bayo',
    company: 'Asesoría Fiscal Bayo',
    date: '2/3/2025',
    text: 'Antes de contratarlo no entendía muy bien en qué consistía el SEO. Ahora recibo consultas de gente que nos encuentra buscando "asesoría fiscal" en nuestra ciudad, que era el objetivo.',
    highlight: '',
    rating: 5,
    avatar: 'CB',
  },
  {
    name: 'Julián Merino',
    company: 'Fisioterapia Activa',
    date: '19/12/2024',
    text: 'El trabajo técnico estuvo bien, aunque al principio nos faltó algo más de comunicación sobre qué se estaba haciendo exactamente cada mes. Se corrigió cuando lo comentamos.',
    highlight: '',
    rating: 4,
    avatar: 'JM',
  },
];

export const auditoriaEcommerceTestimonials: Testimonial[] = [
  {
    name: 'Sonia Barranco',
    company: 'Atelier Marbella Moda',
    date: '15/1/2026',
    text: 'Sabíamos que algo no funcionaba porque teníamos visitas pero muy pocas ventas. La auditoría detectó varios puntos del checkout que estaban frenando las compras, cosas que nunca habríamos visto nosotros.',
    highlight:
      'Solo con corregir el proceso de pago notamos una mejora clara en la tasa de conversión.',
    rating: 5,
    avatar: 'SB',
  },
  {
    name: 'Fabián Otero',
    company: 'Casa y Hogar Otero',
    date: '9/10/2025',
    text: 'El informe fue muy detallado, con capturas y explicaciones claras de cada problema. Algunas recomendaciones eran técnicas y tuvimos que contratar aparte quien las implementara.',
    highlight: '',
    rating: 4,
    avatar: 'FO',
  },
  {
    name: 'Lorena Casals',
    company: 'Aloe Cosmética Vegana',
    date: '21/7/2025',
    text: 'Nos ayudó a entender por qué la gente abandonaba el carrito tan a menudo. Había fricciones en el proceso que ni nos habíamos planteado revisar.',
    highlight: '',
    rating: 5,
    avatar: 'LC',
  },
  ireneCamisetasAhora,
  {
    name: 'Guillermo Sancha',
    company: 'Vertical Deporte y Nutrición',
    date: '30/4/2025',
    text: 'La auditoría confirmó varias sospechas que ya teníamos y añadió puntos que no habíamos considerado, como la velocidad de carga en móvil. Nos sirvió para priorizar bien las mejoras.',
    highlight: '',
    rating: 5,
    avatar: 'GS',
  },
  {
    name: 'Noelia Frutos',
    company: 'Huerta Km0 Alimentación',
    date: '14/2/2025',
    text: 'El análisis fue útil, aunque esperábamos también una propuesta de precios más concreta para las mejoras. Al final contratamos parte del trabajo aparte.',
    highlight: '',
    rating: 4,
    avatar: 'NF',
  },
  {
    name: 'Adrián Lozoya',
    company: 'Rodamiento Bikes',
    date: '3/12/2024',
    text: 'Nos dieron un plan de acción claro con lo urgente y lo secundario, cosa que agradecimos porque no sabíamos por dónde empezar con tantos problemas detectados.',
    highlight: '',
    rating: 5,
    avatar: 'AL',
  },
];

export const webAutonomosPymesTestimonials: Testimonial[] = [
  {
    name: 'Rosa Peláez',
    company: 'Espacio Bella Peluquería',
    date: '11/1/2026',
    text: 'Como autónoma no tenía tiempo ni conocimientos para meterme en plataformas complicadas. Necesitaba algo profesional pero sencillo de mantener, y es justo lo que conseguimos con Dani.',
    highlight:
      'Ahora cuando alguien me pregunta por la peluquería le puedo mandar la web directamente, antes solo tenía redes sociales.',
    rating: 5,
    avatar: 'RP',
  },
  {
    name: 'Kevin Amador',
    company: 'Forma Entrenamiento Personal',
    date: '24/10/2025',
    text: 'Buscaba algo económico pero que no pareciera una web hecha con una plantilla gratuita. El resultado se ve bastante más profesional de lo que esperaba por el precio.',
    highlight: '',
    rating: 5,
    avatar: 'KA',
  },
  victorOAlicornio,
  {
    name: 'Mónica Pujol',
    company: 'Diseño de Interiores MP',
    date: '8/8/2025',
    text: 'Al ser autónoma, el trato directo y sin intermediarios me dio confianza. Alguna vez tardé yo misma en dar el contenido y eso retrasó un poco la entrega final.',
    highlight: '',
    rating: 4,
    avatar: 'MP',
  },
  {
    name: 'Borja Sotillo',
    company: 'Electricidad Sotillo',
    date: '19/5/2025',
    text: 'No sabía ni por dónde empezar con lo de tener web propia. Dani me explicó todo el proceso sin agobiarme con términos técnicos y el resultado me sirve para parecer una empresa más grande de lo que soy.',
    highlight: '',
    rating: 5,
    avatar: 'BS',
  },
  {
    name: 'Claudia Nadal',
    company: 'Palabra Traducciones',
    date: '2/3/2025',
    text: 'Necesitaba algo simple: quién soy, qué hago y cómo contactarme. Cumple perfectamente esa función y encima quedó con un diseño cuidado.',
    highlight: '',
    rating: 5,
    avatar: 'CNa',
  },
  {
    name: 'Iker Zubiaga',
    company: 'Reparaciones Express a Domicilio',
    date: '14/12/2024',
    text: 'La web cumple lo que necesitaba para mi negocio pequeño. En la fase inicial hubo algo de confusión con el texto de los servicios, pero se resolvió sin problema.',
    highlight: '',
    rating: 4,
    avatar: 'IZ',
  },
];
