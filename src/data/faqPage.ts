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
        question: '¿Qué es 36web?',
        answer:
          'Un estudio pequeño de diseño y desarrollo web. Hacemos webs, tiendas y mantenimiento. Trabajamos online con clientes de toda España. Precio por escrito antes de empezar.',
      },
      {
        question: '¿Con quién hablaré durante el proyecto?',
        answer:
          'Con quien lleva tu web. No hay comercial de por medio ni cinco departamentos para una duda.',
      },
      {
        question: '¿Puedo pedir propuesta solo para enterarme?',
        answer:
          'Sí. Cuéntanos el caso. Si encaja, te mandamos propuesta. Si no, te lo decimos. Preguntar no te obliga a nada.',
      },
      {
        question: '¿Cómo os contacto?',
        answer:
          'hola@36web.es, teléfono, WhatsApp o videollamada. En Madrid también podemos vernos. Respondemos pronto.',
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
          'Web a medida si quieres presentarte y que te escriban. Tienda si vendes productos. Mantenimiento si ya tienes web. También rediseñamos. Si dudas, cuéntanos el caso y te orientamos.',
      },
      {
        question: '¿Qué incluye una web a medida?',
        answer:
          'Diseño propio, móvil, formulario o WhatsApp, dominio conectado y una base razonable para Google. Si hace falta reservas, paneles o integraciones, va en la propuesta.',
      },
      {
        question: '¿Podéis mejorar una web que ya existe?',
        answer:
          'Sí. Miramos lo que hay y te decimos si conviene rediseño o apaños concretos. Precio y alcance por escrito.',
      },
      {
        question: '¿Hacéis reservas, paneles o cosas a medida?',
        answer:
          'Sí, cuando hace falta. Se presupuesta según lo que pedáis, no con un pack genérico.',
      },
    ],
  },
  {
    id: 'precios',
    title: 'Precios y pagos',
    faqs: [
      {
        question: '¿Cuánto cuesta una web?',
        answer:
          'No hay tarifa fija en la web. Orientación: muchas quedan entre 600 € y 3.000 € + IVA. Tras hablarte, te damos un número concreto.',
      },
      {
        question: '¿Y tienda o mantenimiento?',
        answer:
          'Tienda según catálogo y funciones. Mantenimiento según cuota y cambios mensuales. Primero vemos el caso; luego propuesta.',
      },
      {
        question: '¿Se puede pagar a plazos?',
        answer:
          'Sí. Lo habitual: 50% al empezar y 50% antes de publicar. También se puede pago único.',
      },
      {
        question: '¿Hay costes ocultos?',
        answer:
          'No. Lo acordado va por escrito. Si luego quieres algo nuevo, te decimos el precio antes de hacerlo.',
      },
    ],
  },
  {
    id: 'proceso',
    title: 'Proceso y contenidos',
    faqs: [
      {
        question: '¿Cómo es el proceso?',
        answer:
          'Hablamos → propuesta → pago inicial → montamos → revisas → pago final → publicamos. El detalle está en Condiciones del proyecto.',
      },
      {
        question: '¿Cuánto tarda?',
        answer:
          'Lo pone la propuesta. Si los textos e imágenes llegan tarde, la fecha se mueve.',
      },
      {
        question: '¿Qué tengo que entregar?',
        answer:
          'Info del negocio, textos o ideas, fotos, logo y contacto. Si falta algo, lo ordenamos con lo que haya.',
      },
      {
        question: '¿Quién escribe los textos?',
        answer:
          'Tú mandas material; nosotros lo metemos en la web. Redactar todo desde cero se valora aparte.',
      },
      {
        question: '¿Cuántas rondas de cambios?',
        answer:
          'Las de la propuesta. Sirven para afinar lo acordado. Páginas o funciones nuevas van aparte.',
      },
    ],
  },
  {
    id: 'diseno',
    title: 'Diseño y funcionamiento',
    faqs: [
      {
        question: '¿Se ve bien en el móvil?',
        answer: 'Sí. La revisamos en móvil, tablet y ordenador.',
      },
      {
        question: '¿Carga rápido?',
        answer:
          'Cuidamos peso de imágenes y estructura para que no se arrastre.',
      },
      {
        question: '¿Puedo editar yo la web?',
        answer:
          'Depende de lo acordado. A veces hay panel; otras veces los cambios van por mantenimiento. Ampliar luego también se puede: te decimos precio antes.',
      },
    ],
  },
  {
    id: 'dominio',
    title: 'Dominio y mantenimiento',
    faqs: [
      {
        question: '¿El dominio es mío? ¿Y el hosting?',
        answer:
          'El dominio es tuyo. Podemos registrarlo o configurarlo. Si hosting/dominio van incluidos depende del servicio; lo aclaramos en la propuesta.',
      },
      {
        question: '¿El mantenimiento es obligatorio?',
        answer:
          'No. Recomendable, pero opcional. Sin él la web sigue siendo tuya y puede seguir online.',
      },
      {
        question: '¿Qué incluye el mantenimiento?',
        answer:
          'Suele ir: actualizaciones, copias, que siga online, cambios pequeños de textos/fotos y soporte. El detalle está en cada plan.',
      },
      {
        question: '¿Si cancelo el mantenimiento?',
        answer:
          'La web no se apaga. Dejas de tener actualizaciones, copias, soporte y cambios del plan.',
      },
      {
        question: '¿Mantenéis webs que no hicisteis vosotros?',
        answer:
          'Sí, en muchos casos. Primero miramos cómo está y te decimos si tiene sentido.',
      },
    ],
  },
  {
    id: 'google',
    title: 'Google y posicionamiento',
    faqs: [
      {
        question: '¿La web queda lista para Google?',
        answer:
          'Sí: títulos, estructura y base técnica. Eso no es lo mismo que SEO mes a mes.',
      },
      {
        question: '¿Garantizáis la primera posición?',
        answer:
          'No. Nadie puede. Dejamos la web bien hecha desde el principio; el ranking depende de más cosas.',
      },
      {
        question: '¿El SEO continuo está incluido?',
        answer:
          'No. Contenidos y seguimiento mes a mes van aparte. Si te interesa, lo valoramos.',
      },
    ],
  },
  {
    id: 'tiendas',
    title: 'Tiendas online',
    faqs: [
      {
        question: '¿Qué incluye una tienda?',
        answer:
          'Catálogo, cobro online, pedidos y panel. Productos, envíos y extras se definen en la propuesta. Plazo habitual: 4–6 semanas.',
      },
      {
        question: '¿Cómo pagan los clientes?',
        answer:
          'Con tarjeta. La pasarela concreta según tu banco y tu público, en la propuesta.',
      },
      {
        question: '¿Me enseñáis a gestionarla?',
        answer:
          'Sí. Una formación para productos, pedidos y el día a día sin pedirnos ayuda cada vez.',
      },
    ],
  },
  {
    id: 'propiedad',
    title: 'Propiedad y publicación',
    faqs: [
      {
        question: '¿La web es mía al terminar?',
        answer:
          'Con el pago íntegro adquieres los derechos de uso. Código y metodologías: según términos de contratación (propiedad de 36web).',
      },
      {
        question: '¿Podéis enseñar el proyecto en el portfolio?',
        answer:
          'Sí, por defecto. Si necesitas confidencialidad, dilo antes de empezar.',
      },
      {
        question: '¿Cuándo se publica?',
        answer:
          'Cuando validas la última revisión incluida y está el pago final. Entonces conectamos dominio y sale online.',
      },
      {
        question: '¿Hay garantía?',
        answer:
          'Sí. En el periodo de garantía corregimos gratis errores de programación de lo entregado. No incluye rediseños ni funciones nuevas.',
      },
      {
        question: '¿Dónde están las condiciones?',
        answer:
          'En Condiciones del proyecto (pagos, revisiones, plazos). El marco legal: Términos y condiciones.',
      },
    ],
  },
];

export const allFaqItems: FaqItem[] = faqCategories.flatMap(
  (category) => category.faqs,
);
