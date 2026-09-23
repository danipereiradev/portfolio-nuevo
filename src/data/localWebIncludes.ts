/** Bloque común de las páginas `/diseno-web/{ciudad}/`. */
export const LOCAL_WEB_INCLUDES = {
  title: 'Qué incluye tu página web',
  intro:
    'La base de una web profesional para tu negocio. El alcance, precio y plazos quedan definidos antes de empezar.',
  items: [
    {
      title: 'Diseño adaptado a tu marca',
      description:
        'Colores, estructura y estilo alineados con tu negocio. No reutilizamos el mismo diseño entre clientes.',
    },
    {
      title: 'Adaptada a móvil',
      description:
        'La web se diseña para que tus clientes puedan consultar servicios, llamar, escribir o pedir información cómodamente desde el teléfono.',
    },
    {
      title: 'Formulario y WhatsApp',
      description:
        'Incluimos vías de contacto claras para facilitar consultas, solicitudes de presupuesto o reservas.',
    },
    {
      title: 'Publicación a tu nombre',
      description:
        'Dominio, hosting inicial y accesos a tu nombre. La web se entrega con títulos, encabezados y una estructura técnica básica bien preparada para buscadores; el SEO continuo se contrata aparte.',
    },
  ],
} as const;
