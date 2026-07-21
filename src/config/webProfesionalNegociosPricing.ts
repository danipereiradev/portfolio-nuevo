// Fuente única de precios y contenido de los packs de la landing
// /web-profesional-360. Cambiar aquí un precio o una característica
// actualiza automáticamente la comparativa de packs, el desplegable "Ver
// todo lo incluido" y la sección de mantenimiento, sin tocar el JSX de la
// página ni escribir el mismo contenido dos veces.
//
// `highlights` son los beneficios que se muestran siempre visibles en la
// tarjeta (los primeros N de `includes`). El resto de `includes` solo se
// muestra al desplegar "Ver todo lo incluido".

export interface WebPack {
  id: 'presencia' | 'gestion-autonoma';
  name: string;
  priceFrom: string;
  priceNote: string;
  idealFor: string;
  recommended: boolean;
  includes: string[];
  highlightsCount: number;
  ctaText: string;
  formPlanName: string;
}

export const webPacks: WebPack[] = [
  {
    id: 'presencia',
    name: '360 Presencia',
    priceFrom: '1.090 €',
    priceNote: 'Pago único + IVA',
    idealFor:
      'Negocios que necesitan una web profesional y prefieren delegar los cambios en PereiraWeb',
    recommended: true,
    highlightsCount: 6,
    includes: [
      'Diseño adaptado a la identidad de tu negocio',
      'Web responsive (móvil, tablet y escritorio)',
      'Entre 4 y 6 páginas o secciones principales',
      'Inicio, servicios, sobre el negocio y contacto',
      'Adaptación de colores, logo, textos e imágenes',
      'Formulario de contacto y botón de WhatsApp',
      'Mapa, horarios y datos de contacto',
      'SEO técnico y SEO local básico',
      'Metadatos, Open Graph, sitemap y robots.txt',
      'Datos estructurados Schema.org adecuados a tu sector',
      'Optimización de imágenes y rendimiento',
      'Configuración de Analytics y Search Console',
      'Páginas legales básicas con tus datos',
      'Dos rondas de cambios',
      'Publicación y conexión de tu dominio',
    ],
    ctaText: 'Solicitar propuesta',
    formPlanName: '360 Presencia',
  },
  {
    id: 'gestion-autonoma',
    name: '360 Gestión',
    priceFrom: '1.590 €',
    priceNote: 'Pago único + IVA',
    idealFor:
      'Negocios que quieren poder actualizar ellos mismos servicios, equipo, testimonios o artículos',
    recommended: false,
    highlightsCount: 6,
    includes: [
      'Todo lo incluido en 360 Presencia',
      'Panel de gestión propio, sencillo y en español',
      'Acceso privado para el cliente',
      'Edición de servicios, equipo y testimonios',
      'Edición de preguntas frecuentes y artículos',
      'Campos limitados para que no se rompa el diseño',
      'Configuración completa del panel de gestión',
      'Integración del panel con tu web',
      'Formación inicial de unos 30 minutos',
      'Guía básica de uso para el día a día',
    ],
    ctaText: 'Solicitar propuesta',
    formPlanName: '360 Gestión',
  },
];

export interface MaintenancePlan {
  id: 'web360';
  name: string;
  price: string;
  priceNote: string;
  annualSavingsNote?: string;
  features: string[];
}

export const maintenancePlans: MaintenancePlan[] = [
  {
    id: 'web360',
    name: 'Mantenimiento Web 360',
    price: '60 €/mes + IVA o 650 €/año + IVA',
    priceNote: 'Para cualquier proyecto de Web Profesional 360',
    annualSavingsNote: 'Ahorra 70 € frente al pago mensual',
    features: [
      'Alojamiento web gestionado',
      'Certificado SSL',
      'Supervisión técnica básica',
      'Actualizaciones y mantenimiento técnico',
      'Revisión del formulario',
      'Copias y control de despliegues',
      'Soporte técnico',
      'Gestión básica de dominio y DNS',
      'Mantenimiento técnico del CMS, cuando el proyecto lo incluya',
      'Hasta 120 minutos mensuales de pequeños cambios',
      'Los minutos no utilizados no se acumulan',
    ],
  },
];

export const CUSTOM_MAINTENANCE_NOTE =
  '¿Necesitas más minutos al mes, mantenimiento del panel de gestión o soporte editorial? Podemos adaptar un mantenimiento a medida según lo que necesite tu proyecto.';

export const OUT_OF_SCOPE_NOTE =
  'Nuevas páginas, funcionalidades, rediseños, reservas, tienda online, catálogos, integraciones, redacción de contenidos y SEO mensual se presupuestan aparte.';
