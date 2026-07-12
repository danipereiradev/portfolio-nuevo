// FAQ compartida entre las páginas de servicio (página web, tienda online,
// mantenimiento). Ayuda a que el cliente entienda qué servicio necesita, sin
// precios públicos: el precio siempre se cierra en la propuesta.
export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export const servicesFaqs: ServiceFaqItem[] = [
  {
    question: '¿Qué incluye una página web profesional?',
    answer:
      'Incluye la definición de estructura, diseño responsive, desarrollo, formularios o vías de contacto, base SEO inicial, optimización técnica básica, publicación y acompañamiento inicial. El alcance exacto se define en la propuesta según las necesidades del proyecto.',
  },
  {
    question: '¿Qué diferencia hay entre una web profesional y una tienda online?',
    answer:
      'Una web profesional está pensada principalmente para presentar servicios, transmitir confianza y captar contactos. Una tienda online añade catálogo, carrito, pagos, gestión de pedidos y configuración comercial para vender productos o servicios por internet.',
  },
  {
    question: '¿Podéis mejorar una web que ya existe?',
    answer:
      'Sí. Podemos revisar una web existente y plantear mejoras de diseño, estructura, velocidad, contenido, contacto, mantenimiento o conversión. En algunos casos conviene rediseñar la web completa y en otros basta con mejorar partes concretas.',
  },
  {
    question: '¿El mantenimiento web es obligatorio?',
    answer:
      'No es obligatorio, pero sí recomendable si quieres que la web siga actualizada, revisada y en buen estado después de publicarla. El mantenimiento evita que la web quede abandonada y permite realizar cambios o mejoras con continuidad.',
  },
  {
    question: '¿Podéis encargaros de todo el proceso?',
    answer:
      'Sí. Podemos encargarnos de la estructura, diseño, desarrollo, publicación y acompañamiento inicial. También podemos continuar con mantenimiento o mejoras posteriores si el proyecto lo necesita.',
  },
  {
    question: '¿Cómo sé qué servicio necesito?',
    answer:
      'Si necesitas presentar tu negocio y captar contactos, normalmente necesitas una página web profesional. Si quieres vender productos o servicios online, necesitas una tienda online. Si ya tienes una web y quieres mantenerla o mejorarla, el mantenimiento web puede ser la mejor opción. Si tienes dudas, puedes contarnos tu caso y prepararemos una orientación inicial.',
  },
];
