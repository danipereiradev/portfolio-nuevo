// Fuente única de precios y contenido de las modalidades de la landing
// /web-profesional-360. Cambiar aquí un precio o una característica
// actualiza automáticamente la comparativa, el desplegable "Ver todo lo
// incluido" y la sección de mantenimiento.

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
    priceFrom: '1.090 € + IVA',
    priceNote: 'Pago único o fraccionado',
    idealFor:
      'Autónomos, pymes y negocios locales que prefieren que PereiraWeb se ocupe de los cambios.',
    recommended: true,
    highlightsCount: 7,
    includes: [
      'Diseño adaptado a la imagen de tu negocio',
      'Preparada para móvil, tablet y ordenador',
      'Entre 4 y 6 páginas o secciones principales',
      'Adaptación de tus textos, imágenes, colores y logo',
      'Formulario de contacto y botón de WhatsApp',
      'Publicación con tu propio dominio',
      'Dos rondas de cambios',
      'Preparada para aparecer en Google y búsquedas locales',
      'Estadísticas para conocer las visitas de tu web',
      'Páginas legales básicas con tus datos',
    ],
    ctaText: 'Quiero esta opción',
    formPlanName: '360 Presencia',
  },
  {
    id: 'gestion-autonoma',
    name: '360 Gestión',
    priceFrom: '1.590 € + IVA',
    priceNote: 'Pago único o fraccionado',
    idealFor:
      'Negocios que quieren actualizar por su cuenta servicios, equipo, testimonios, preguntas frecuentes o artículos.',
    recommended: false,
    highlightsCount: 6,
    includes: [
      'Todo lo incluido en 360 Presencia',
      'Panel sencillo y en español',
      'Acceso privado para tu negocio',
      'Edición de servicios, equipo y testimonios',
      'Edición de preguntas frecuentes y artículos',
      'Campos preparados para mantener el diseño',
      'Formación inicial de unos 30 minutos',
      'Guía básica de uso para el día a día',
    ],
    ctaText: 'Quiero esta opción',
    formPlanName: '360 Gestión',
  },
];

export interface MaintenancePlan {
  id: 'web360';
  name: string;
  idealFor: string;
  monthlyPrice: string;
  monthlyPriceNote: string;
  annualPrice: string;
  annualPriceNote: string;
  annualSavingsNote?: string;
  features: string[];
}

export const maintenancePlans: MaintenancePlan[] = [
  {
    id: 'web360',
    name: 'Mantenimiento Web 360',
    idealFor: 'Cualquier proyecto de Web Profesional 360',
    monthlyPrice: '60 €',
    monthlyPriceNote: '/mes + IVA',
    annualPrice: '650 €',
    annualPriceNote: '/año + IVA',
    annualSavingsNote: 'Ahorra 70 € frente al pago mensual',
    features: [
      'Alojamiento de la web gestionado',
      'Web segura y actualizada',
      'Revisión básica de que todo funcione bien',
      'Actualizaciones para mantener la web segura',
      'Comprobación del formulario de contacto',
      'Copias de seguridad periódicas',
      'Soporte técnico cuando tengas un problema',
      'Ayuda con el dominio y el alojamiento',
      'Hasta 120 minutos mensuales de pequeños cambios',
      'Los minutos no utilizados no se acumulan',
    ],
  },
];

export const CUSTOM_MAINTENANCE_NOTE =
  '¿Necesitas más minutos al mes, mantenimiento del panel de gestión o ayuda con contenidos? Podemos adaptar un mantenimiento a medida según lo que necesite tu proyecto.';

export const OUT_OF_SCOPE_NOTE =
  'Nuevas páginas, reservas, tienda online, redacción completa desde cero y el trabajo mensual para mejorar posiciones en Google se presupuestan aparte.';
